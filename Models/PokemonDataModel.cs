using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pokedex.Models
{
    public class PokemonDataModel
    {
        public string Name { get; set; }
        
        public List<string> Types { get; set; }

        public int Weight { get; set; }

        public string ImageUrl { get; set; }

        public List<string> Abilities { get; set; }
    }

    public class DetailedPokemonData
    {
        public string Description { get; set; }

        public List<String> EvolutionsNames { get; set; }
    }
}
