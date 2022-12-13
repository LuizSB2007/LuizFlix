import { API_KEY, IMG_URL } from './api.js'

const botao = document.querySelector(".button");
let select = document.querySelector("#idioma");
let value = select.options[select.selectedIndex].value
let filmes, detalhes, random;
let lastRandom = 0;
let page = 0;
let language = "language=pt-BR";

function mostrarFilme(title, description, img){
  document.querySelector(".img-mv").setAttribute('src', img)
  document.querySelector(".title-mv").innerText = title
  document.querySelector(".description-mv").innerText= description
  document.querySelector(".filmes").style.display= "flex"
}

async function buscarFilme(){
  await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&${language}&page=${page}`)
  .then(response => response.json()).then(data => filmes = data.results)
  await fetch(`https://api.themoviedb.org/3/movie/${filmes[random].id}?api_key=${API_KEY}&${language}`)
  .then(response => response.json()).then(data => detalhes = data.overview)
}
  

botao.onclick= async()=> {
  page++;
  random = Math.floor(Math.random() * 20)
  while(lastRandom == random){
    random = Math.floor(Math.random() * 20)
  }
  lastRandom = random

  value = select.options[select.selectedIndex].value
  if(value === 'en'){
    language = "language=en-US"
  }else {language = "language=pt-BR"}

  await buscarFilme(); 
  mostrarFilme(filmes[random].title, detalhes, IMG_URL + filmes[random].poster_path);
}
