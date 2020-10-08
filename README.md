[![Build Status](https://travis-ci.org/labhackercd/linguagem-simples-front.svg?branch=master)](https://travis-ci.org/labhackercd/linguagem-simples-frontend)
[![Test Coverage](https://api.codeclimate.com/v1/badges/03e26f6afcb7d21ba77f/test_coverage)](https://codeclimate.com/github/labhackercd/linguagem-simples-front/test_coverage)

# linguagem-simples
Este repositório contém os arquivos de front-end do projeto Linguagem Simples


# Como iniciar o projeto?

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
