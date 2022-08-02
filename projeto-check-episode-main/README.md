.![](https://occ-0-2794-2219.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABQOxGMxzPfr3lvtrDxZ9ahcGCw4wMQsdBljUXHiuon2Oa1SmjgGWYx-QWkyLuFwEaguoI3yaq592H-XkHzLbtgh5Pu9ljDJV6AzS.png?r=1ab)

## Sobre o Projeto

Este é um projeto como atividade de avaliação para o curso  Análise e Desenvolvimento de Sistemas - Tecnologias para Dispositivos Móveis - ministrado por Gustavo Calixto.

Projeto realizado por :
- Bianca Golin Flores
- Denise Trevizo
- Rodrigo Correa de Santana
- Victória Paiva Maia de Oliveira

## Sobre o Sistema

Sistema de listagem de episódios da série de animação **Rick and Morty***, com acesso por meio de login de usuário, possibilidade de marcação dos
capítulos assistidos e de inserção de comentários sobre os episódios.  

O tema foi escolhido devido à afinidade da equipe com a animação, e à possibilidade de acompanhamento da série com maior precisão, por meio da
marcação dos episódios assistidos e da inclusão de comentários.  

Dificuldades que possam existir para o desenvolvimento do projeto: pouca familiaridade com a linguagem de programação utilizada,
impossibilidade de gravação dos dados para visualização posterior, codificação.  

*API disponível em: https://rickandmortyapi.com/documentation*

## Tecnologias

Este codigo foi desenvolvido em React, com auxílio e distribuição da plataforma e framework [Expo](https://expo.dev). A Principal IDE Utilizada durante o processo de desenvolvimento foi o VSCode.

Para elaboração do projeto foi necessário a instalacão local do Node e a dependência do Expo-cli:

    #Comando de instalação do Expo-cli
    npm install --global expo-cli

Para Criação do projeto:

    expo init rick-and-morty-episodes

Para Desenvolvimento local e vizualização WEB:

    expo start

Para Publicação da aplicação na plataforma da Expo:

    expo login -u USUARIOEXPO -p SENHAEXPO
    expo publish


## Estutura diretório
~~~
rick-and-morty-episodes/
├─ assets/
│  ├─ logo.pnh
│  ├─ rick.png
├─ node_modules/
├─ src/
│  ├─ components/
│  │  ├─ FormSignIn.tsx
│  │  ├─ FormSignUp.tsx
│  │  ├─ Button.tsx
│  │  ├─ EpisodeItem.tsx
│  ├─ pages/
│  │  ├─ Auth,tsx
│  │  ├─ Home.tsx
│  ├─ types/
│  │  ├─ Info.ts
│  │  ├─ Episode.ts
│  ├─ utils/
│  │  ├─ asyncStorage.ts
├─ .gitignore
├─ App.tsx
├─ package.json
├─ tsconfig.json
~~~
## Expo.dev
A Plataforma Expo fornece um sistema de distribuição das aplicações muito simplificado sem a necesidade de utlização das lojas oficiais de cada sistema. Para executar o projeto e navegar na aplicação basta ter o aplicativo do Expo Go instalado ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) ou [iOS](https://apps.apple.com/us/app/expo-go/id982107779)) e acessar este [Link](https://expo.dev/@bianca123/rick-and-morty)!