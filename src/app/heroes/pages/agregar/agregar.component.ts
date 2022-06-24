import { Component, OnInit } from '@angular/core';
import { Heroes, Publisher } from '../../interfaces/Heroes';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})
export class AgregarComponent implements OnInit {
  publisher = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroes = {
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.MarvelComics,
    superhero: '',
    alt_img: '',
  };
  constructor(
    private service: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, 'ok', {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    if (this.router.url.includes('editar')) {
      this.activatedRoute.params
        .pipe(switchMap(({ id }) => this.service.getHeroe(id)))
        .subscribe((heroe) => (this.heroe = heroe));
    }
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) return;

    if (this.heroe.id) {
      return this.editar();
    }

    this.service.postHeroe(this.heroe).subscribe((resp) => {
      this.router.navigate(['/heroes/editar', resp.id]);
      this.openSnackBar('Registro Guardado!');
    });
  }

  editar() {
    if (this.heroe.superhero.trim().length === 0) return;
    this.service.putHeroe(this.heroe).subscribe((resp) => {
      console.log(resp);
      this.openSnackBar('Registro Actualizado!');
    });
  }

  eliminar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe },
    });
    dialog.afterClosed().subscribe((resp) => {
      if (resp) {
        if (this.heroe.id) {
          this.service.deleteHeroe(this.heroe.id).subscribe((resp) => {
            console.log(resp);
            this.router.navigate(['/heroes']);
            this.openSnackBar("Registro Eliminado!");
          });
        }
      }
    });
  }
}
