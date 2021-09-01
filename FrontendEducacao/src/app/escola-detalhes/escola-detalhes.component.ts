import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EscolaDetalhes } from '../shared/escola-detalhes.model';
import { EscolaDetalhesService } from '../shared/escola-detalhes.service';

@Component({
  selector: 'app-escola-detalhes',
  templateUrl: './escola-detalhes.component.html',
  styles: [
  ]
})
export class EscolaDetalhesComponent implements OnInit {

  constructor(public service : EscolaDetalhesService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: EscolaDetalhes){
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number){
    if(confirm('O registro da escola será removido permanentemente. Deseja continuar?'))
    {
      this.service.deleteEscola(id).subscribe(
        res=>{
          this.service.refreshList();
          this.toastr.error("Deletado com Sucesso", "Registro de Escola");
        },
        err=>{console.log(err)}
      )
    }
  }
}
