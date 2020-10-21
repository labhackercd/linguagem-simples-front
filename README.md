[![Build Status](https://travis-ci.org/labhackercd/linguagem-simples-front.svg?branch=master)](https://travis-ci.org/labhackercd/linguagem-simples-frontend)
[![Test Coverage](https://api.codeclimate.com/v1/badges/03e26f6afcb7d21ba77f/test_coverage)](https://codeclimate.com/github/labhackercd/linguagem-simples-front/test_coverage)

# linguagem-simples

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/labhackercd/linguagem-simples-front/">
    <img src="https://i.ibb.co/tYd2fq2/acompanhe.png" alt="acompanhe" border="0">
  </a>
</p>

<a href="https://github.com/labhackercd/linguagem-simples-front/#About-the-project"> Click here to see the English version </a>

## Sobre o projeto
<center><img src="https://media.giphy.com/media/GDzLnVXvO67Q0hTloy/giphy.gif"></center>

O projeto Linguagem Simples (posteriormente renomeado para Plenário Simples) é uma iniciativa do <a href="http://labhackercd.leg.br">Laboratório Hacker da Câmara dos Deputados</a> para tornar mais fácil a compreensão da rotina dos deputados e das discussões que acontecem no plenário da Câmara, por meio de uma linha do tempo que cobre os eventos que acontecem no plenário da câmara em tempo real. Este repositório contém o código **de front-end** da plataforma que permite aos jornalistas da Casa inserir novas atualizações na linha do tempo. Além disso, este é um projeto derivado dos levantamentos feitos durante o <a href="https://medium.com/labhacker/eu-tu-ela-ele-n%C3%B3s-planejamos-266deed2ddfb?source=collection_home---5------9-----------------------"> Nós do Lab </a>, respondendo aos desafios levantados pela sociedade para a gestão de transparência, participação e cidadania do legislativo brasileiro.

## Pré-requisitos
É necessário ter instalados os seguintes softwares para executar utilizando o Docker:
* [Docker](https://docs.docker.com/engine/install/) versão 19.03.6
* [Docker-Compose](https://docs.docker.com/compose/install/) versão 1.25.5

Para executar localmente, é necessário:
* [Node](https://nodejs.org/en/) versão 10 ou superior
* [React](https://reactjs.org/) versão 16.13.1

## Comandos para executar o projeto
1. Clone o projeto
```bash
git clone https://github.com/labhackercd/linguagem-simples-backend.git
```
2. Entre dentro da pasta raiz do projeto
```bash
cd linguagem-simples-front
```

3. Execute o comando para iniciar os containers 
```bash
docker-compose up
```

4. Para versão de desenvolvimento, execute o comando 
```bash
docker-compose up dev
```
**A API neste momento já vai estar rodando na porta 3000 do localhost.**

## Documentação 

Devido a arquitetura escolhida pela equipe (com front e backend desacoplados entre si), e por uma questão de organização, o desenvolvimento deste projeto utilizou a metodologia ágil Scrum, e os documentos gerados podem ser acessados na nossa <a href="https://github.com/labhackercd/linguagem-simples-backend/wiki"> Wiki </a>

<hr>

## About the project

<center><img src="https://media.giphy.com/media/GDzLnVXvO67Q0hTloy/giphy.gif"></center>

The Linguagem Simples (<i>Plain Language</i>) project (which was later rebranded to Plenário Simples (<i> Simple Plenary </i>) is an initiative of the <a href="http://labhackercd.leg.br">National Congress Of Brazil's Laboratório Hacker</a> (<i> Hacker Lab </i>) to make understanding of the day-to-day routine of the representatives and discussions of the brazilian legislative house more accessible to citizens by providing them with an easy-to-understand timeline of events happening in plenary's sessions. This repo contains **the front-end** code for the platform which allows in-house journalists to update the timeline with content (such as text, image, tweets and so on) that allow for citizens to have a better understanding of the law-making process. This project derives directly from the 
<a href="https://medium.com/labhacker/eu-tu-ela-ele-n%C3%B3s-planejamos-266deed2ddfb?source=collection_home---5------9-----------------------"> Nós do Lab </a> event, which engaged multiple sectors of the society to help us disrupt the work processes behind the Brazilian Legislative House with a focus on transparency, participation and citizenship.

## Pre-requisites

In order to run the project via Docker the following software packages need to be installed:
* [Docker](https://docs.docker.com/engine/install/) version 19.03.6
* [Docker-Compose](https://docs.docker.com/compose/install/) version 1.25.5

In order to run the project locally the following software packages are necessary:
* [Node](https://nodejs.org/en/) version 10 or higher
* [React](https://reactjs.org/) version 16.13.1

## How to run the project

1. Clone this repo
```bash
git clone https://github.com/labhackercd/linguagem-simples-backend.git
```
2. Enter the project's root directory
```bash
cd linguagem-simples-front
```

3. Start up the docker instance
```bash
docker-compose up
```

4. To run the development version, run the following command
```bash
docker-compose up dev
```
**The API will be running on port 3000.**

## Documentation

Due to the decoupled architecture chosen by team (with separate repositories for back and front-end code) and to the use of the SCRUM agile methodology, the documentation of this project happened in our <a href="https://github.com/labhackercd/linguagem-simples-backend/wiki"> Wiki </a>
