import { Injectable } from '@angular/core';
import { PokemonDataModel,  DetailedPokemonData } from '../models/PokemonDataModel'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getBaseUrl } from 'src/main';


@Injectable({
  providedIn: 'root'
})

export class PokemonDataService {

  constructor(private http: HttpClient) { }

  //Endpoint
  baseUrl = getBaseUrl();
  //#region Rest Services
  
  //GET - Get a single page of pokemon data from the server. 
  getPokemonDataPage(page: number):Observable<PokemonDataModel[]> {
    var apiURL = this.baseUrl + `api/Pokemon/${page}`;
    return this.http.get<PokemonDataModel[]>(apiURL);
  }

  //GET -> Detail Pokemon Data For pokemon-detail view.
  getDetailedPokemonData(pokemonName: string):Observable<DetailedPokemonData> {
    var apiURL = this.baseUrl +  `api/Pokemon/details/${pokemonName}`;
    return this.http.get<DetailedPokemonData>(apiURL);
  }
  //#endregion

}
