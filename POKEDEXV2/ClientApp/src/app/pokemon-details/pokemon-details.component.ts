import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from '../services/pokemon-data.service'
import { PokemonDataModel, DetailedPokemonData } from '../models/PokemonDataModel'
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  
  //#region variables
  detailedPokemonData : DetailedPokemonData = {
    description: '',
    evolutionsNames: ''
  }; 

  public generalPokemonData : PokemonDataModel;
  public pokemonDataString : string;
  //#endregion

  constructor(private router : Router,private snackBar: MatSnackBar, private pokemonDataService: PokemonDataService) { }

  ngOnInit() {
    this.pokemonDataString = localStorage.getItem('dataSource');
    this.generalPokemonData = JSON.parse(this.pokemonDataString);
    this.loadPokemonDetails(this.generalPokemonData.name);
   }

  loadPokemonDetails(pokemonName : string){
     this.pokemonDataService.getDetailedPokemonData(pokemonName).subscribe(fetchData => {
       this.detailedPokemonData = fetchData;
     },error=>{
      this.snackBar.open("Error retrieving data from server.", "", {duration: 5000});
      console.log(error);
     })
  }


  onBack(){
    this.router.navigate(['pokemon-catalog']);
  }

}
