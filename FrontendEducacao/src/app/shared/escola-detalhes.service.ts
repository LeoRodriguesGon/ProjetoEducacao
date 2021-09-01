import { Injectable } from '@angular/core';
import { EscolaDetalhes } from './escola-detalhes.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EscolaDetalhesService {

  constructor(private http:HttpClient) { }

  formData:EscolaDetalhes = new EscolaDetalhes();

  list : EscolaDetalhes[];

  readonly baseURL = 'http://localhost:5000/api/escola'
  
  postEscola(){
    return this.http.post(this.baseURL, this.formData);
  }

  putEscola(){
    return this.http.put(`${this.baseURL}/${this.formData.escolaId}`, this.formData);
  }

  deleteEscola(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList(){
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as EscolaDetalhes[]);
  }
}
