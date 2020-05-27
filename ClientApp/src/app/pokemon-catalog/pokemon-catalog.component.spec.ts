import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCatalogComponent } from './pokemon-catalog.component';

describe('PokemonCatalogComponent', () => {
  let component: PokemonCatalogComponent;
  let fixture: ComponentFixture<PokemonCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PokemonCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
