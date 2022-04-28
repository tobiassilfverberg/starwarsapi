import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const Search = ({ onHandleSubmit, onSearchInput, onSetSearchInput }) => {
	return (
		<>
			<Form onSubmit={onHandleSubmit}>
				<Form.Group className="mb-3" controlId="newSearch">
					<Form.Control
						onChange={(e) => onSetSearchInput(e.target.value)}
						placeholder="May the search be with you..."
						required
						type="text"
						value={onSearchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-between mb-4">
					<Button
						variant="success"
						type="submit"
						disabled={!onSearchInput.length}
					>
						Search
					</Button>
				</div>
			</Form>
		</>
	)
}

export default Search
