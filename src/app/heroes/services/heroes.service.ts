import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Heroes } from '../interfaces/Heroes';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl : string = environment.baseUrl;
  constructor(private http:HttpClient) { }

  getHeroes(){
    return this.http.get<Heroes[]>(this.baseUrl+'/heroes')
  }

  getHeroe(id:string){
    return this.http.get<Heroes>(this.baseUrl+'/heroes/'+id);
  }

  getHeroeByFilter(filter:string){
    return this.http.get<Heroes[]>(this.baseUrl+`/heroes?q=${filter}&limit=5`)
    
  }

}
