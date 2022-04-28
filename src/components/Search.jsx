const Search = () => {
	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="newTitle">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={(e) => setSearchInput(e.target.value)}
						placeholder="Enter your search query"
						ref={searchInputRef}
						required
						type="text"
						value={searchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-between">
					<Button
						variant="success"
						type="submit"
						disabled={!searchInput.length}
					>
						Search
					</Button>
				</div>
			</Form>

			{searchResult && (
				<div className="search-result mt-4">
					<p>
						Showing {searchResult.nbHits} search results for{" "}
						{searchResult.query}...
					</p>

					<ListGroup>
						{searchResult.hits.map((hit) => (
							<ListGroup.Item
								action
								href={hit.url}
								target="_blank"
								key={hit.objectID}
							>
								<h3>{hit.title}</h3>
								<p className="text-muted small mb-0">
									Posted at {hit.created_at} by {hit.author}
								</p>
							</ListGroup.Item>
						))}
					</ListGroup>
				</div>
			)}
		</>
	)
}

export default Search
