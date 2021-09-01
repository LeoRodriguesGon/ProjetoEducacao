import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlunoDetalhes } from 'src/app/shared/aluno-detalhes.model';
import { AlunoDetalhesService } from 'src/app/shared/aluno-detalhes.service';

@Component({
  selector: 'app-aluno-detalhes-form',
  templateUrl: './aluno-detalhes-form.component.html',
  styles: [
  ]
})
export class AlunoDetalhesFormComponent implements OnInit {

  constructor(public service: AlunoDetalhesService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.service.formData.alunoId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    
  }

  insertRecord(form:NgForm){
    this.service.formData.responsavelId = Number(this.service.formData.responsavelId);
    this.service.formData.escolaId = Number(this.service.formData.escolaId);
    this.service.postAluno().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Cadastrado com sucesso!', 'Registro de Aluno');
      },
      err =>{
        console.log(err)
        this.toastr.error('Falha no Cadastro!', 'Registro de Aluno');
      }
    )
  }

  updateRecord(form:NgForm){
    this.service.putAluno().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Atualizado com sucesso!', 'Registro de Aluno');
      },
      err =>{
        console.log(err);
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new AlunoDetalhes();
  }
}
