// url donde nos vamosa  conectar con la API

const baseURL = 'https://pokeapi.co/api/v2/';

//logica para llamar a la API, transformar esos datos en un json y manejo de error si no nos trae nada la api //

const callApi = async (id) => {
	try {
		const res = await fetch(`${baseURL}pokemon/${id}`);
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

callApi();
