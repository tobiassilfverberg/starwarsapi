import Image from "react-bootstrap/Image"
import SadImage from "../assets/images/sad-kitten.gif"

const NotFound = () => {
	return (
		<>
			<h1>Sorry, that page could not be found.</h1>

			<Image src={SadImage} fluid />
		</>
	)
}

export default NotFound
