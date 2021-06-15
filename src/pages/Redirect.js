import React from 'react'
import { useHistory, useParams } from 'react-router-dom';

function Redirect() {
	const { urlPath } = useParams();
	const history = useHistory();
	React.useEffect(() => {
		history.push(`/${urlPath}`)
	})
	return (
		<>
		</>
	)
}

export default Redirect
