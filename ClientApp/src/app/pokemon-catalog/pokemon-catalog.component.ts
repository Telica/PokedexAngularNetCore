import { Component, OnInit, ViewChild, Input} from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';

import { Router } from '@angular/router';
import { PokemonDataService } from '../services/pokemon-data.service'
import { PokemonDataModel } from '../models/PokemonDataModel'

@Component({
  selector: 'app-pokemon-catalog',
  templateUrl: './pokemon-catalog.component.html',
  styleUrls: ['./pokemon-catalog.component.css']
})
export class PokemonCatalogComponent implements OnInit {
  
  isCurrentlyFetching = false;

  @Input()
  pageSize = 20;
  @Input()
  isPaginatorEnabled = false;
  // matPaginator
  private paginator: MatPaginator;

  @ViewChild(MatPaginator, {static: true}) set matPaginator(mp : MatPaginator){
    this.paginator = mp;
    this.paginator.length = length;
    this.paginator.pageSize = this.pageSize;
    this.paginator.disabled = this.isPaginatorEnabled;
  }

  // Mat Table
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name','types', 'weight', 'abilities', 'imageUrl'];

  currentPage : number = 0;
  public pokemonData : PokemonDataModel[];
  constructor(private router: Router, private snackBar: MatSnackBar, private pokemonDataService: PokemonDataService) { }

  ngOnInit() {
    this.loadPageData();
  }

  loadPageData(){
    this.isCurrentlyFetching = true;
    this.isPaginatorEnabled = true;
    this.pokemonDataService.getPokemonDataPage(this.currentPage).subscribe(fetchData => {
      this.dataSource.data = fetchData;
      this.isCurrentlyFetching = false;
      this.isPaginatorEnabled = false;
      }, error => {
        this.snackBar.open("Error", "", {duration: 5000});
        this.isCurrentlyFetching = false;
      } )
  }

  GoToDetails(row : string){
    
    localStorage.setItem('dataSource', JSON.stringify(row));
    this.router.navigate(['pokemon-details']);
  }

  public GetData(e : any) {
    this.currentPage = e.pageIndex;
    
    if (!this.isCurrentlyFetching){
      this.loadPageData();
    }
  }
}
