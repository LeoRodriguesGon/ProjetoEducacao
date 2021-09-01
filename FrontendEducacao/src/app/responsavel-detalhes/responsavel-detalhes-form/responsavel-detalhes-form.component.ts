import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponsavelDetalhes } from 'src/app/shared/responsavel-detalhes.model';
import { ResponsavelDetalhesService } from 'src/app/shared/responsavel-detalhes.service';



@Component({
  selector: 'app-responsavel-detalhes-form',
  templateUrl: './responsavel-detalhes-form.component.html',
  styles: [
  ]
})
export class ResponsavelDetalhesFormComponent implements OnInit {

  constructor(public service: ResponsavelDetalhesService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.service.formData.responsavelId == 0)
      this.insertRecord(form);
    else
      this.updateRecord(form);
    
  }

  insertRecord(form:NgForm){
    this.service.postResponsavel().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Cadastrado com sucesso!', 'Registro de Responsável');
      },
      err =>{
        console.log(err);
        this.toastr.error('Falha no Cadastro!', 'Registro de Responsável');
      }
    );
  }

  updateRecord(form:NgForm){
    this.service.putResponsavel().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Atualizado com sucesso!', 'Registro de Responsável');
      },
      err =>{
        console.log(err);
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new ResponsavelDetalhes();
  }
}
