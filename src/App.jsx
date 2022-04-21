import Container from "react-bootstrap/Container"
import { Routes, Route } from "react-router-dom"
import Navigation from "./components/Navigation"
import CreateTodo from "./pages/CreateTodo"
import EditTodoPage from "./pages/EditTodoPage"
import HomePage from "./pages/HomePage"
import NotFound from "./pages/NotFound"
import TodoPage from "./pages/TodoPage"
import TodosPage from "./pages/TodosPage"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Container>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />
					<Route path="/todos/:id" element={<TodoPage />} />
					<Route
						path="/todos/:id/EditTodoPage"
						element={<EditTodoPage />}
					/>
					<Route path="/todos/create" element={<CreateTodo />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App
