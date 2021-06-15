import React from 'react'
import { useHistory, useParams } from 'react-router-dom';

function Redirect() {
	const { path } = useParams();
	const history = useHistory();
	React.useEffect(() => {
		history.push(`/${path}`)
	})
	return (
		<>
		</>
	)
}

export default Redirect
