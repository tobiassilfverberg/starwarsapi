import Container from "react-bootstrap/Container"
import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import HomePage from "./pages/HomePage"
import MoviePage from "./pages/MoviePage"
import MoviesPage from "./pages/MoviesPage"
import PeoplePage from "./pages/PeoplePage"
import PersonPage from "./pages/PersonPage"
import NotFound from "./pages/NotFound"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Container>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/people" element={<PeoplePage />} />
					<Route path="/person/:id" element={<PersonPage />} />
					<Route path="/movies" element={<MoviesPage />} />
					<Route path="/movie/:id" element={<MoviePage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
