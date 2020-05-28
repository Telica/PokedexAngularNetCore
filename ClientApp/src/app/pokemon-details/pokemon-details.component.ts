import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../services/pokemon-data.service'
import { PokemonDataModel, DetailedPokemonData } from '../models/PokemonDataModel'
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  
  detailedPokemonData : DetailedPokemonData = {
    description: '',
    evolutionsNames: ''
  }; 

  public generalPokemonData : PokemonDataModel;
  public pokemonDataString : string;

  constructor(private router : Router, private pokemonDataService: PokemonDataService) { }

  ngOnInit() {
    this.pokemonDataString = localStorage.getItem('dataSource');
    this.generalPokemonData = JSON.parse(this.pokemonDataString);
    this.loadPokemonDetails(this.generalPokemonData.name);
   }

  loadPokemonDetails(pokemonName : string){
     this.pokemonDataService.getDetailedPokemonData(pokemonName).subscribe(fetchData => {
       this.detailedPokemonData = fetchData;
       console.log(this.detailedPokemonData);
     })
  }

  onBack(){
    this.router.navigate(['pokemon-catalog']);
  }

}
