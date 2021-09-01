import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResponsavelDetalhes } from '../shared/responsavel-detalhes.model';
import { ResponsavelDetalhesService } from '../shared/responsavel-detalhes.service';

@Component({
  selector: 'app-responsavel-detalhes',
  templateUrl: './responsavel-detalhes.component.html',
  styles: [
  ]
})
export class ResponsavelDetalhesComponent implements OnInit {

  constructor(public service : ResponsavelDetalhesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: ResponsavelDetalhes){
    this.service.formData.dataNascimento.substring(0,9);
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number){
    if(confirm('O registro do responsável será removido permanentemente. Deseja continuar?'))
    {
      this.service.deleteResponsavel(id).subscribe(
        res=>{
          this.service.refreshList();
          this.toastr.error("Deletado com Sucesso", "Registro de Responsavel");
        },
        err=>{console.log(err)}
      )
    }
  }
}
