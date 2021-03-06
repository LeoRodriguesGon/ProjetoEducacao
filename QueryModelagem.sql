create database bancoeducacao

use bancoeducacao

create table escola(
escolaid int primary key not null identity(1,1),
nome varchar(20) not null
)

create table responsavel(
responsavelid int primary key not null identity(1,1),
nome varchar(180) not null,
datanascimento date not null,
cpf varchar(11) not null
)

create table aluno(
alunoid int primary key not null identity(1,1),
nome varchar(200) not null,
datanascimento date not null,
numerocertidaonova varchar(32),
cpf varchar(11),
responsavelid int references responsavel(responsavelid),
escolaid int references escola(escolaid) not null
)

--inserindo valores teste na tabela escola
insert into escola(nome) values ('Funlec')
insert into escola(nome) values ('Joaquim Murtinho')
insert into escola(nome) values ('Paulo Freire')
insert into escola(nome) values ('Bionatus')

--inserindo valores teste na tabela responsavel
insert into responsavel(nome, datanascimento, cpf) values ('Antonio Fagundes', '1970-03-12', '00177389865')
insert into responsavel(nome, datanascimento, cpf) values ('Gloria Maria', '1968-06-22', '12365478955')
insert into responsavel(nome, datanascimento, cpf) values ('Pedro Bial', '1950-01-14', '89056723476')
insert into responsavel(nome, datanascimento, cpf) values ('Renato Russo', '1990-07-28', '42464686899')

--inserindo valores teste na tabela aluno
insert into aluno(nome, datanascimento, numerocertidaonova, responsavelid, escolaid) values ('Zequinha da Silva', '2012-02-23', '123879129381',1,4)
insert into aluno(nome, datanascimento, numerocertidaonova, responsavelid, escolaid) values ('Enzo Gabriel', '2015-08-12', '87324920984',3,3)
insert into aluno(nome, datanascimento, cpf, escolaid) values ('Neymar Junior', '1999-01-14', '03690354104',1)
insert into aluno(nome, datanascimento, cpf, escolaid) values ('Gabriel Medina', '1997-05-15', '23485994833',2)
insert into aluno(nome, datanascimento, cpf, numerocertidaonova, responsavelid, escolaid) values ('Chico Bento', '2013-06-01', '88877766655', '927349822004',4,3)
insert into aluno(nome, datanascimento, cpf, numerocertidaonova, escolaid) values ('Agostinho Carrara', '2000-03-29', '08001577100', '8394872940',1)
