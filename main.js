const inputNumber = document.getElementById('number');
const submitSearch = document.getElementById('submit');
const form = document.getElementById('form');
const contenedor = document.querySelector('.card-container');
const mensaje = document.querySelector('.msg');

//armado local storage //

let pokemons = JSON.parse(localStorage.getItem('pokemones')) || [];

const saveLocalStorage = (pokelist) => {
	localStorage.setItem('pokemons', JSON.stringify(pokelist));
};

// fin local storage //

const obtenerPokemon = async (e) => {
	e.preventDefault();
	const inputPokemon = inputNumber.value.trim();
	const fetchPokemon = await callApi(inputPokemon);
	if (inputPokemon === '') {
		mensaje.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> No ha ingresado ningún Pokemon, por favor ingrese uno`;
		return;
	} else if (!fetchPokemon) {
		mensaje.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> No existe el Pokemón ingresado, porfavor ingrese otro número`;
		return;
	} else if (pokemons.some((pokemon) => pokemon.id === fetchPokemon.id)) {
		mensaje.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>el pokemon ya fue ingresado`;
		return;
	}

	pokemons = [fetchPokemon, ...pokemons];
	form.reset();
	inputNumber.value = '';
	saveLocalStorage(pokemons);
	renderizadoCartas(pokemons);
};

const peso = (kilos) => {
	let peso = kilos / 10;
	return peso;
};

const alto = (metros) => {
	let alto = metros / 10;
	return alto;
};

const colorFondo = {
	electric: '#FFEA70',
	normal: '#B09398',
	fire: '#FF675C',
	water: '#0596C7',
	ice: '#AFEAFD',
	rock: '#999799',
	flying: '#7AE7C7',
	grass: '#4A9681',
	psychic: '#FFC6D9',
	ghost: '#561D25',
	bug: '#A2FAA3',
	poison: '#795663',
	ground: '#D2B074',
	dragon: '#DA627D',
	steel: '#1D8A99',
	fighting: '#2F2F2F',
	default: '#2A1A1F',
};

const printCard = (pokemon) => {
	const imagenPrincipal = pokemon.sprites.other.dream_world.front_default;
	return `<div class="sub-container">
    <div class="header-card">
	<p class"id-pokemon">N°${pokemon.id}</p>
	<span class="pc">HP: ${pokemon.stats[0].base_stat}</span>
    </div>
<div id="card" style="background-color: ${
		colorFondo[pokemon.types[0].type.name]
	}">
    <div class="titles">
	    <h2>${pokemon.forms[0].name.toUpperCase()}</h2>
        <p>TIPO: ${pokemon.types[0].type.name}</p>
	</div>
        <img src="${imagenPrincipal}" alt="pokemon">
    <div class="data">
        <span class="weigth">PESO:${peso(pokemon.weight)}Kgs</span>
        <span class="heigth">ALTURA:${alto(pokemon.height)}Mts</span>
        <span class="moves">MOVIMIENTOS:${pokemon.moves[0].move.name},${
		pokemon.moves[1].move.name
	},${pokemon.moves[2].move.name}</span>  
    </div>
</div>
<div class="img-pokebola">
<img src="/Assets/img/pokebola2.png"><img src="/Assets/img/pokebola2.png"><img src="/Assets/img/pokebola2.png"><img src="/Assets/img/pokebola2.png"><img src="/Assets/img/pokebola2.png"><img src="/Assets/img/pokebola2.png">
</div>
    </div>
`;
};

renderizadoCartas = (listaPokemon) => {
	contenedor.innerHTML = listaPokemon
		.map((pokemon) => printCard(pokemon))
		.join('');
};
// funcion iniciazion //

const init = () => {
	form.addEventListener('submit', obtenerPokemon);
	renderizadoCartas(pokemons);
};

init();

// fin iniciazion //
