using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Pokedex.Models;
using PokeApiNet;
using Microsoft.Extensions.Caching.Memory;


namespace Pokedex.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class PokemonController : ControllerBase
    {
        #region DataConfig
        //Creates a client to consume the PokeApi.
        readonly PokeApiClient pokeClient = new PokeApiClient();

        private readonly ILogger<PokemonController> _logger;
        private readonly IMemoryCache _cache;

        //Dependency Inject.
        public PokemonController(ILogger<PokemonController> logger, IMemoryCache memoryCache)
        {
            _logger = logger;
            _cache = memoryCache;
        }

        #endregion

        #region RestAPI
        /// <summary>
        /// REST-GET. Retrieves a list of 20 pokemons, depending on the current pagination
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        [HttpGet("{pageIndex}")]
        public async Task<ActionResult<List<PokemonDataModel>>> GetPokemonList(int pageIndex)
        {
            List<PokemonDataModel> cacheValue;

            if (!_cache.TryGetValue<List<PokemonDataModel>>(pageIndex, out cacheValue))
            {
                //Get Data if not in cache.

                //Create List to store Pokemon Data.
                List<PokemonDataModel> pokemonList = new List<PokemonDataModel>();

                //Data Settings per page.
                int limit = 20;
                int offset = 20 * pageIndex;

                if (pageIndex > 50 || pageIndex < 0)
                {
                    return BadRequest();
                }

                //Get Page Data.
                var pokemonPageData = await pokeClient.GetNamedResourcePageAsync<Pokemon>(limit, offset);
                if (pokemonPageData == null)
                {
                    return NotFound();
                }

                //Processing for each one of the pokemon in the page data retrieved.
                foreach (var result in pokemonPageData.Results)
                {
                    //Create Data Structures for one pokemon.
                    PokemonDataModel pokemonModel = new PokemonDataModel
                    {
                        Types = new List<string>(),
                        Abilities = new List<string>()
                    };

                    // Get Opertiaon to obtain the specific pokemon data.
                    var fetchedPokemonData = await pokeClient.GetResourceAsync<Pokemon>(result.Name);
                    if (fetchedPokemonData == null)
                    {
                        return NotFound();
                    }
                    //Fill the Data Model
                    pokemonModel.Name = fetchedPokemonData.Name;
                    pokemonModel.Weight = fetchedPokemonData.Weight;
                    pokemonModel.ImageUrl = fetchedPokemonData.Sprites.FrontDefault;
                    pokemonModel.Types.AddRange(fetchedPokemonData.Types.Select(element => element.Type.Name));
                    pokemonModel.Abilities.AddRange(fetchedPokemonData.Abilities.Select(element => element.Ability.Name));

                    //Add the pokemon data to the list.
                    pokemonList.Add(pokemonModel);
                }
                cacheValue = pokemonList;

                //Cache expiration in 3 minutes
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(3));

                // Save values in cache for a given key.
                _cache.Set<List<PokemonDataModel>>(pageIndex, cacheValue, cacheEntryOptions);
            }
            return Ok(cacheValue);
        }





        /// <summary>
        /// Retrieves additional data for a specific Pokemon, this includes Evolutions and description.
        /// </summary>
        /// <param name="pokemonName"></param>
        /// <returns></returns>
        [HttpGet("details/{pokemonName}")]
        public async Task<ActionResult<DetailedPokemonData>> GetPokemonData(string pokemonName)
        {
            DetailedPokemonData cacheValue;

            //LOOK FOR CACHE KEY.
            if (!_cache.TryGetValue<DetailedPokemonData>(pokemonName, out cacheValue))
            {
                // Key not in cache, so get data.
                if (pokemonName == null)
                {
                    return BadRequest();
                }

                DetailedPokemonData pokeData = new DetailedPokemonData
                {
                    EvolutionsNames = new List<string>()
                };

                try
                {
                    var pokemonData = await pokeClient.GetResourceAsync<Pokemon>(pokemonName);
                    if (pokemonData == null)
                    {
                        return NotFound();
                    }

                    PokemonSpecies PokemonSpecies = await pokeClient.GetResourceAsync(pokemonData.Species);

                    if (PokemonSpecies == null)
                    {
                        return NotFound();
                    }

                    var queryEngDescription = PokemonSpecies.FlavorTextEntries.First(result => result.Language.Name == "en");
                    pokeData.Description = queryEngDescription.FlavorText.Replace('\n', ' ');

                    var evolutionChainUrl = PokemonSpecies.EvolutionChain.Url;
                    var evolutionChainID = Int32.Parse(evolutionChainUrl.Split("/")[6]);

                    EvolutionChain evolutionChain = await pokeClient.GetResourceAsync<EvolutionChain>(evolutionChainID);
                    if (evolutionChain == null)
                    {
                        return NotFound();
                    }

                    var basePokemon = evolutionChain.Chain.Species.Name;
                    pokeData.EvolutionsNames.Add(basePokemon);
                    try
                    {
                        var FirstLevelEvolution = evolutionChain.Chain.EvolvesTo.Select(x => x.Species.Name);
                        pokeData.EvolutionsNames.AddRange(FirstLevelEvolution);
                        var secondLevelEvolution = evolutionChain.Chain.EvolvesTo[0].EvolvesTo.Select(x => x.Species.Name);
                        pokeData.EvolutionsNames.AddRange(secondLevelEvolution);
                    }
                    catch
                    {
                        System.Diagnostics.Debug.Write("No evolutions for this pokemon");
                    }
                    cacheValue = pokeData;
                }
                catch (Exception)
                {
                    return BadRequest();
                }

                //Cache expiration in 3 minutes
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromMinutes(3));

                // Save values in cache for a given key.
                _cache.Set<DetailedPokemonData>(pokemonName, cacheValue, cacheEntryOptions);
            }
            return Ok(cacheValue);
        }
        #endregion

    }
}