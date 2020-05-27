import { Injectable } from '@angular/core';
import { PokemonDataModel,  DetailedPokemonData } from '../models/PokemonDataModel'
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable , BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PokemonDataService {

  private baseUrl = 'https://localhost:44349/';
  constructor(private http: HttpClient) { }

  //#region Rest Services
  getPokemonDataPage(page: number):Observable<PokemonDataModel[]> {
    var apiURL = this.baseUrl + `api/Pokemon/${page}`;
    return this.http.get<PokemonDataModel[]>(apiURL);
  }

  getDetailedPokemonData(pokemonName: string):Observable<DetailedPokemonData> {
    var apiURL = this.baseUrl +  `api/Pokemon/details/${pokemonName}`;
    return this.http.get<DetailedPokemonData>(apiURL);
  }
  //#endregion

  //#region LocalServices

  public pokemonDataMessage : PokemonDataModel;
  private messageSource = new BehaviorSubject(this.pokemonDataMessage);
  currentMessage = this.messageSource.asObservable(); 

  changueMessage(message : PokemonDataModel){
    this.messageSource.next(message)
  }

  //#endregion
}
