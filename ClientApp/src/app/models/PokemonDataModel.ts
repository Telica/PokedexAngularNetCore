export interface PokemonDataModel
{
    name : string;
    types : string[];
    weight: number;
    imageUrl : string;
    abilities : string[];
}

export interface DetailedPokemonData
{
    description : string;
    evolutionName: string;
}