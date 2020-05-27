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
  
  public detailedPokemonData : DetailedPokemonData; 
  public generalPokemonData : PokemonDataModel;
  public generalString : string;
  constructor(private router : Router, private pokemonDataService: PokemonDataService) { }

  ngOnInit() {
    this.loadPokemonDetails();
    this.generalString = localStorage.getItem('dataSource');
    this.generalPokemonData = JSON.parse(this.generalString);
   }

  loadPokemonDetails(){
     this.pokemonDataService.getDetailedPokemonData("pikachu").subscribe(fetchData => {
       this.detailedPokemonData = fetchData;
       console.log(this.detailedPokemonData);
     })
  }

  onBack(){
    this.router.navigate(['pokemon-catalog']);
  }

  onDestroy(){
    //this.pokemonDataService.changueMessage(this.generalPokemonData);
  }

}
