const baseURL = 'https://pokeapi.co/api/v2/';

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
