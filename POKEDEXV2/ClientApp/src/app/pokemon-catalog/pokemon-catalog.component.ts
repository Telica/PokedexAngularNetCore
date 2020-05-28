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
  
  //#region  variables.
  // matPaginator variables

  //Used to disable Paginator UI actions while fetching data.
  isCurrentlyFetching = false;

  @Input()
  pageSize = 20;
  @Input()
  isPaginatorEnabled = false;
  @Input()
  pageIndex = 0;
  private paginator: MatPaginator;
  currentPage : number = 0;
  @ViewChild(MatPaginator, {static: true}) set matPaginator(mp : MatPaginator){
    this.paginator = mp;
    this.paginator.length = length;
    this.paginator.pageSize = this.pageSize;
    this.paginator.disabled = this.isPaginatorEnabled;
  }
  // Mat Table
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['name','types', 'weight', 'abilities', 'imageUrl'];
  public pokemonData : PokemonDataModel[];
  //#endregion

  constructor(private router: Router, private snackBar: MatSnackBar, private pokemonDataService: PokemonDataService) { }

  ngOnInit() {
    this.currentPage = +localStorage.getItem('pageIndexStorage');
    this.pageIndex = +localStorage.getItem('pageIndexStorage');
    this.loadPageData(this.currentPage);
  }

  loadPageData(currentPage : number){
    this.isCurrentlyFetching = true;
    this.isPaginatorEnabled = true;
    this.pokemonDataService.getPokemonDataPage(currentPage).subscribe(fetchData => {
      this.dataSource.data = fetchData;
      this.isCurrentlyFetching = false;
      this.isPaginatorEnabled = false;
      }, error => {
        this.snackBar.open("Error retrieving data from server.", "", {duration: 5000});
        this.isCurrentlyFetching = false;
        console.log(error);
      } )
  }

  //Go to the detail Pokemon view.
  GoToDetails(row : string){
    localStorage.setItem('dataSource', JSON.stringify(row));
    this.router.navigate(['pokemon-details']);
  }

  //TODO: Don't save the page in local storagee, instead use query parameters, mix both or do something else.
  //Handles the Event of the paginator buttons to load a new pokemon Data page.
  public GetData(e : any) {
    this.currentPage = e.pageIndex;
    localStorage.setItem('pageIndexStorage', this.currentPage.toString());
    if (!this.isCurrentlyFetching){
      this.loadPageData(this.currentPage);
    }
  }
}
