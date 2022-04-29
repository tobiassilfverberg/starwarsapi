import axios from "axios"

axios.defaults.baseURL = "https://swapi.dev/api"

const getPeople = async (page) => {
	const res = await axios.get(`/people/?page=${page}`)
	return res.data
}

const getPerson = async (id) => {
	const res = await axios.get(`/people/${id}`)
	return res.data
}

const getMovies = async (page) => {
	const res = await axios.get(`/films?page=${page}`)
	return res.data
}

const getMovie = async (id) => {
	const res = await axios.get(`/films/${id}`)
	return res.data
}

const searchApi = async (resource, query, page) => {
	const res = await axios.get(`${resource}/?search=${query}&page=${page}`)
	return res.data
}

const getIdFromUrl = (url) => {
	// eslint-disable-next-line no-unused-vars
	const [_endpoint, id] = url
		.replace("https://swapi.dev/api/", "")
		.slice(0, -1)
		.split("/")

	return id
}

const values = {
	getPeople,
	getPerson,
	getMovies,
	getMovie,
	getIdFromUrl,
	searchApi,
}

export default values
