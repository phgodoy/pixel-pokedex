const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonShyny = document.querySelector('.btn-shyny');

let searchPokemon = 1;

//retorna dados do pokemon da api
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIResponse.status === 200) {
    //transforma dados em json
    const data = await APIResponse.json();
    return data;
  }
}

//renderiza pokemon na tela
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  
  //busca o pokemon na funçao anterior
  const data = await fetchPokemon(pokemon);
 
  //se o dado existir ele é  tratado, se  nao ele  retorna not found
  if (data) {

    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found';
    pokemonNumber.innerHTML = '';
  }
}


const  renderShinyPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...';
  pokemonNumber.innerHTML = '';
  
  //busca o pokemon na funçao anterior
  const data = await fetchPokemon(pokemon);
 
  //se o dado existir ele é  tratado, se  nao ele  retorna not found
  if (data) {
    pokemonImage.style.display = 'block';
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-vi']['x-y']['front_shiny'];
    input.value = '';
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = 'none';
    pokemonName.innerHTML = 'Not found';
    pokemonNumber.innerHTML = '';
    alert("In this moment the pokemon don't have shyni version ")
  }
}

//acao do formulario para execultar a busca do pokemon
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

//acao do botao para procurar o pokemon  anterior da lista
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

//acao do botao para procurar o proximo pokemon  da lista
buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

buttonShyny.addEventListener('click', () => {
  renderShinyPokemon(searchPokemon);
});

//chamada dafunçao para  renderizar o pokemon selecionado  da api  
renderPokemon(searchPokemon);
