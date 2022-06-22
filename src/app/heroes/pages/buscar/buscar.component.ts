import { Component, OnInit } from '@angular/core';
import { Heroes } from '../../interfaces/Heroes';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  termino:string='';
  heroes:Heroes[]=[];
  heroeSelected!:Heroes;
  constructor(private heroesService:HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getHeroeByFilter(this.termino).subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  selectItem(event:any){
    if(event.option.value==='') return ;
    
    const heroe:Heroes = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroe(heroe.id!).subscribe(resp=>{
      this.heroeSelected=resp;
      console.log(this.heroeSelected);
    })
  }

}
