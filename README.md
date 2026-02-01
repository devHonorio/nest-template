# nest-template

Template pronto com configurações iniciais com swagger para documentação, autenticação com otp, validação de Dto's com zod

# Pendencia

- Redis para confirmação de usuário
- Redis para cache
- Autenticação OAuth
- Guard para autorização
- Evolution api para encaminhar Otp

## Requisitos

- Docker
- Node.js

## Instalação

- [Linux](#linux)
- [Windows](#windows)
- [macOS](#macos)

### Linux

1. Instale o Docker seguindo as instruções [aqui](https://docs.docker.com/engine/install/).
2. Instale o Node.js usando o gerenciador de pacotes da sua distribuição ou [aqui](https://nodejs.org/).

### Windows

1. Baixe e instale o Docker Desktop [aqui](https://www.docker.com/products/docker-desktop).
2. Instale o Node.js através do instalador disponível [aqui](https://nodejs.org/).

### macOS

1. Instale o Docker Desktop [aqui](https://www.docker.com/products/docker-desktop).
2. Instale o Node.js usando o Homebrew:

```bash
brew install node
```

## Repositório

```bash
git clone https://github.com/devHonorio/nest-template.git
cd nest-template
```

## Iniciando o projeto

instale as dependências

```bash
npm i
```

Rode um `npm test` para verificar se está tudo correto

```bash
npm test
```

O teste não vai finalizar por conta do timeOut provisório, click `Ctrl + c`

Rode o servidor

```bash
npm run start:dev
```
