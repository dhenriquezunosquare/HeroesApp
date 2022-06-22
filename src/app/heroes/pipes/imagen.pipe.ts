import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../interfaces/Heroes';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroes, ...args: unknown[]): unknown {
    if(heroe.id){
      return `assets/heroes/${heroe.id}.jpg`;
    }
    return "";
  }

}
