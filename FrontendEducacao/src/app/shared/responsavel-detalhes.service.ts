import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponsavelDetalhes } from './responsavel-detalhes.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelDetalhesService {

  constructor(private http:HttpClient) { }

  formData:ResponsavelDetalhes = new ResponsavelDetalhes();

  list : ResponsavelDetalhes[];

  readonly baseURL = 'http://localhost:5000/api/responsavel'

  postResponsavel(){
    return this.http.post(this.baseURL, this.formData);
  }

  putResponsavel(){
    return this.http.put(`${this.baseURL}/${this.formData.responsavelId}`, this.formData);
  }

  deleteResponsavel(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList(){
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as ResponsavelDetalhes[]);
  }
}
