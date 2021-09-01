import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EscolaDetalhesComponent } from './escola-detalhes/escola-detalhes.component';
import { EscolaDetalhesFormComponent } from './escola-detalhes/escola-detalhes-form/escola-detalhes-form.component';
import { ResponsavelDetalhesComponent } from './responsavel-detalhes/responsavel-detalhes.component';
import { ResponsavelDetalhesFormComponent } from './responsavel-detalhes/responsavel-detalhes-form/responsavel-detalhes-form.component';
import { AlunoDetalhesComponent } from './aluno-detalhes/aluno-detalhes.component';
import { AlunoDetalhesFormComponent } from './aluno-detalhes/aluno-detalhes-form/aluno-detalhes-form.component';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    EscolaDetalhesComponent,
    EscolaDetalhesFormComponent,
    ResponsavelDetalhesComponent,
    ResponsavelDetalhesFormComponent,
    AlunoDetalhesComponent,
    AlunoDetalhesFormComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
