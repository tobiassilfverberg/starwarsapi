import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import swapi from "../services/swapi"
import Loading from "../components/Loading"
import Pagination from "../components/Pagination"
import Search from "../components/Search"
import MovieCard from "../components/MovieCard"

const MoviesPage = () => {
	const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [searchInput, setSearchInput] = useState([])

	const [searchParams, setSearchParams] = useSearchParams()
	const query = searchParams.get("query") ?? ""
	const page = parseInt(searchParams.get("page") ?? 1)

	const nextPage = () => {
		setSearchParams({ query, page: page + 1 })
	}

	const prevPage = () => {
		setSearchParams({ query, page: page - 1 })
	}

	// Get todos from api
	const getMovies = async (searchQuery, page) => {
		setLoading(true)

		try {
			const res = await swapi.getMovies(searchQuery, page)
			setData(res)

			setLoading(false)
		} catch (err) {
			setError(err.message)
		}
	}

	const searchSwapi = async (searchQuery, page) => {
		setData([])
		setLoading(true)

		try {
			const res = await swapi.searchApi("films", searchQuery, page)
			if (res.count === 0) {
				return
			}
			setData(res)

			setLoading(false)
		} catch (err) {
			setError(err.message)
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setData([])

		if (!searchInput) {
			return
		}

		searchSwapi(searchInput, 1)
		setSearchParams({ query: searchInput, page: 1 })
	}

	// Get todos from api when component is first mounted
	// call function to get characters from api
	useEffect(() => {
		if (!query) {
			getMovies(page)
			return
		}
		searchSwapi(query, page)
	}, [query, page])

	return (
		<>
			<h1 className="mt-2">Movies</h1>

			<Search
				onHandleSubmit={handleSubmit}
				onSetSearchInput={setSearchInput}
				onSearchInput={searchInput}
			/>

			{loading && <Loading />}

			{error && { error }}

			{!loading && (
				<>
					{" "}
					{query && (
						<p>
							Showing {data.count} search results for {query}
							...
						</p>
					)}
				</>
			)}

			{data.count > 0 && (
				<div className="people container d-flex flex-wrap row">
					<MovieCard movies={data} />
				</div>
			)}
			{!loading && (
				<Pagination
					page={page}
					prevPage={prevPage}
					nextPage={nextPage}
					data={data}
				/>
			)}
		</>
	)
}

export default MoviesPage
