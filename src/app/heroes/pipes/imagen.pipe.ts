import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/Heroes';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  transform(heroe: Heroes, ...args: unknown[]): unknown {
    if (!heroe.id ||  heroe.alt_img === "") {
      return `assets/no-image.png`;
    }else if (heroe.alt_img){
      return heroe.alt_img;
    }else{
      return `assets/heroes/${heroe.id}.jpg`;
    }
  }
}
