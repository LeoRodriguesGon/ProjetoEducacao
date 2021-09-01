import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlunoDetalhes } from './aluno-detalhes.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoDetalhesService {

  constructor(private http:HttpClient) { }

  formData:AlunoDetalhes = new AlunoDetalhes();

  list : AlunoDetalhes[];

  readonly baseURL = 'http://localhost:5000/api/aluno'

  postAluno(){
    return this.http.post(this.baseURL, this.formData);
  }

  putAluno(){
    return this.http.put(`${this.baseURL}/${this.formData.alunoId}`, this.formData);
  }

  deleteAluno(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  refreshList(){
    this.http.get(this.baseURL)
    .toPromise()
    .then(res => this.list = res as AlunoDetalhes[]);
  }
}
