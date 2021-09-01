import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlunoDetalhes } from '../shared/aluno-detalhes.model';
import { AlunoDetalhesService } from '../shared/aluno-detalhes.service';

@Component({
  selector: 'app-aluno-detalhes',
  templateUrl: './aluno-detalhes.component.html',
  styles: [
  ]
})
export class AlunoDetalhesComponent implements OnInit {

  constructor(public service : AlunoDetalhesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: AlunoDetalhes){
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number){
    if(confirm('O registro do Aluno será removido permanentemente. Deseja continuar?'))
    {
      this.service.deleteAluno(id).subscribe(
        res=>{
          this.service.refreshList();
          this.toastr.error("Deletado com Sucesso", "Registro de Aluno");
        },
        err=>{console.log(err)}
      )
    }
  }
}
