const inputNumber = document.getElementById('number');
const submitSearch = document.getElementById('submit');
const form = document.getElementById('form');
const contenedor = document.querySelector('.card-container');

//array//
let pokemons = [];

//captacion del input, manejo de errores y renderizado de cartas//

const obtenerPokemon = async (e) => {
	e.preventDefault();
	const inputPokemon = inputNumber.value.trim();
	const fetchPokemon = await callApi(inputPokemon);
	if (inputPokemon === '') {
		contenedor.innerHTML = `<p class="msg-error"><i class="fa-solid fa-triangle-exclamation"></i> No ha ingresado ningún Pokemon, por favor ingrese uno</p>`;
		return;
	} else if (!fetchPokemon) {
		contenedor.innerHTML = `<p class="msg-error"><i class="fa-solid fa-triangle-exclamation"></i> No existe el Pokemón ingresado, porfavor ingrese otro número</p>`;
		return;
	}

	pokemons = [fetchPokemon];
	form.reset();
	inputNumber.value = '';
	renderizadoCartas(pokemons);
};

//transformación de altura y peso //

const peso = (kilos) => {
	let peso = kilos / 10;
	return peso;
};

const alto = (metros) => {
	let alto = metros / 10;
	return alto;
};

// color en grandient segun tipo de pokemón

const colorFondo = {
	electric:
		'linear-gradient(63deg, rgba(36,35,22,1) 17%, rgba(145,168,176,1) 46%, rgba(217,212,47,1) 53%, rgba(165,42,42,1) 89%);',
	normal:
		' linear-gradient(63deg, rgba(176,147,152,1) 17%, rgba(145,168,176,1) 46%, rgba(153,115,121,1) 45%, rgba(249,241,241,1) 89%);',

	fire: 'linear-gradient(63deg, rgba(217,127,0,1) 27%, rgba(145,168,176,1) 46%, rgba(228,226,3,1) 54%, rgba(255,11,11,1) 75%);',

	water:
		'linear-gradient(63deg, rgba(9,30,121,1) 8%, rgba(0,197,239,1) 14%, rgba(3,135,195,1) 30%, rgba(0,212,255,1) 49%, rgba(2,0,36,1) 94%)',

	ice: ' linear-gradient(63deg, rgba(175,234,253,1) 15%, rgba(255,255,255,1) 54%, rgba(3,166,228,1) 98%);',

	rock: 'linear-gradient(63deg, rgba(255,255,255,1) 0%, rgba(96,96,96,1) 40%, rgba(179,159,108,1) 83%);',

	flying:
		' linear-gradient(63deg, rgba(255,255,255,1) 11%, rgba(53,189,255,1) 21%, rgba(56,48,44,1) 24%, rgba(145,168,176,1) 46%, rgba(185,98,51,1) 63%);',

	grass:
		' linear-gradient(63deg, rgba(54,255,53,1) 18%, rgba(145,168,176,1) 46%, rgba(72,144,71,1) 86%);',

	psychic:
		' linear-gradient(63deg, rgba(131,53,255,1) 11%, rgba(70,37,122,1) 40%);',

	ghost:
		' linear-gradient(63deg, rgba(107,107,107,1) 14%, rgba(255,255,255,1) 51%, rgba(246,246,246,1) 52%, rgba(0,0,0,1) 78%);',

	bug: ' linear-gradient(63deg, rgba(45,255,2,1) 24%, rgba(0,0,0,1) 99%);',

	poison: ' linear-gradient(63deg, rgba(61,29,78,1) 22%, rgba(0,0,0,1) 70%);',

	ground:
		' linear-gradient(63deg, rgba(0,0,0,1) 9%, rgba(210,176,116,1) 32%, rgba(170,106,1,1) 59%);',

	dragon:
		' linear-gradient(63deg, rgba(255,247,70,1) 50%, rgba(255,0,0,1) 87%, rgba(1,16,170,1) 99%);',

	steel:
		' linear-gradient(63deg, rgba(193,193,193,1) 43%, rgba(208,224,255,1) 55%, rgba(43,43,43,1) 91%);',

	fighting:
		' linear-gradient(63deg, rgba(149,105,105,1) 43%, rgba(125,125,125,1) 100%);',

	fairy:
		'  linear-gradient(63deg, rgba(63,57,85,1) 2%, rgba(255,130,244,1) 44%, rgba(219,217,219,1) 51%, rgba(255,130,244,1) 55%, rgba(44,50,70,1) 97%);',
};

//armando del contenido de la carta que vamos a imprimir en el HTML //

const printCard = (pokemon) => {
	const imagenPrincipal = pokemon.sprites.other.dream_world.front_default;
	return `<div class="sub-container">
    <div class="header-card">
	<p class"id-pokemon">N°${pokemon.id}</p>
	<span class="pc">HP: ${pokemon.stats[0].base_stat}</span>
    </div>
<div id="card" style="background: ${colorFondo[pokemon.types[0].type.name]}">
    <div class="titles">
	    <h2>${pokemon.forms[0].name.toUpperCase()}</h2>
         <p>TYPE: ${pokemon.types[0].type.name.toUpperCase()}</p>
	</div>
        <img src="${imagenPrincipal}" alt="pokemon">
    <div class="data">
        <span class="weigth">WEIGTH: ${peso(pokemon.weight)}Kgs</span>
        <span class="heigth">HEIGTH: ${alto(pokemon.height)}Mts</span>
        <span class="moves">MOVES: ${pokemon.moves[0].move.name}, ${
		pokemon.moves[1].move.name
	}, ${pokemon.moves[2].move.name}</span>  
    </div>
</div>
<div class="img-pokebola">
<img src="/Assets/img/pokebola2.png"><img src="/Assets/img/pokebola2.png"><img src="/Assets/img/pokebola2.png"><img src="/Assets/img/pokebola2.png"><img src="/Assets/img/pokebola2.png"><img src="/Assets/img/pokebola2.png">
</div>
    </div>
`;
};

//lógica para imprimir en el HTML //

renderizadoCartas = (listaPokemon) => {
	contenedor.innerHTML = listaPokemon
		.map((pokemon) => printCard(pokemon))
		.join('');
};

//Funcion que va a iniciar la ejecución cuando hagamos Submit y nos va a renderizar la carta//

const init = () => {
	form.addEventListener('submit', obtenerPokemon);
	renderizadoCartas(pokemons);
};

init();
