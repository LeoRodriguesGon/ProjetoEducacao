import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EscolaDetalhes } from 'src/app/shared/escola-detalhes.model';
import { EscolaDetalhesService } from 'src/app/shared/escola-detalhes.service';

@Component({
  selector: 'app-escola-detalhes-form',
  templateUrl: './escola-detalhes-form.component.html',
  styles: [
  ]
})
export class EscolaDetalhesFormComponent implements OnInit {

  constructor(public service: EscolaDetalhesService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.service.formData.escolaId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    
  }

  insertRecord(form:NgForm){
    this.service.postEscola().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Cadastrado com sucesso!', 'Registro de Escola');
      },
      err =>{
        console.log(err);
      }
    );
  }

  updateRecord(form:NgForm){
    this.service.putEscola().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Atualizado com sucesso!', 'Registro de Escola');
      },
      err =>{
        console.log(err);
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new EscolaDetalhes();
  }
}
