import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroes } from '../../interfaces/Heroes';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css'],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroes;
  constructor(
    private activeRoute: ActivatedRoute,
    private service: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      this.service.getHeroe(params.id).subscribe((heroe: Heroes) => {
        setTimeout(() => {
          this.heroe = heroe;
        }, 300);
      });
    });
  }

  regresar(){
    this.router.navigate(['/heroes']);
  }

}


