import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import swapi from "../services/swapi"
import Pagination from "../components/Pagination"
import Loading from "../components/Loading"
import Search from "../components/Search"
import PersonCard from "../components/PersonCard"

const PeoplePage = () => {
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

	// Get characters from api
	const getPeople = async (searchQuery, page) => {
		setLoading(true)

		try {
			const res = await swapi.getPeople(searchQuery, page)
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
			const res = await swapi.searchApi("people", searchQuery, page)
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

	// call function to get characters from api
	useEffect(() => {
		if (!query) {
			getPeople(page)
			return
		}
		searchSwapi(query, page)
	}, [query, page])

	return (
		<>
			<h1 className="mt-2">Characters</h1>

			<Search
				onHandleSubmit={handleSubmit}
				onSetSearchInput={setSearchInput}
				onSearchInput={searchInput}
			/>

			{loading && <Loading />}

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

			{error && { error }}

			{data.count > 0 && (
				<div className="people container d-flex flex-wrap row">
					<PersonCard people={data} />
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

export default PeoplePage
