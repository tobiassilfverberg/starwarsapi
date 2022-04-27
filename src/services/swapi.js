import axios from "axios"

const BASE_URL = "https://swapi.dev/api"

/**
 * Get all people
 */
const getPeople = async () => {
	const res = await axios.get(`${BASE_URL}/people`)
	return res.data
}

/**
 * Get a single person
 */
const getPerson = async (id) => {
	const res = await axios.get(`${BASE_URL}/people/${id}`)
	return res.data
}

/**
 * Get all movies
 */
const getMovies = async () => {
	const res = await axios.get(`${BASE_URL}/films`)
	return res.data
}

/**
 * Get a single movie
 */
const getMovie = async (id) => {
	const res = await axios.get(`${BASE_URL}/films/${id}`)
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

export default {
	getPeople,
	getPerson,
	getMovies,
	getMovie,
	getIdFromUrl,
}
