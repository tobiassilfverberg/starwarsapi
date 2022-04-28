import Button from "react-bootstrap/Button"

const Pagination = ({ page, setPage, data }) => {
	const nextPage = () => {
		setPage((prevValue) => prevValue + 1)
	}

	const prevPage = () => {
		setPage((prevValue) => prevValue - 1)
	}

	return (
		<div className="d-flex justify-content-between align-items-center mt-4">
			<div className="prev">
				<Button
					disabled={!data.previous}
					onClick={prevPage}
					variant="primary"
				>
					Previous Page
				</Button>
			</div>
			<div className="page">
				{page} / {Math.ceil(data.count / 10)}
			</div>
			<div className="next">
				<Button
					disabled={!data.next}
					onClick={nextPage}
					variant="primary"
				>
					Next Page
				</Button>
			</div>
		</div>
	)
}

export default Pagination
