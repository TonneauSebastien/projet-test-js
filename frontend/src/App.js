// frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { fetchTest } from './service/ApiService';

function App() {
	const [response, setResponse] = useState('');

	useEffect(() => {
		fetchTest().then(data => setResponse(data));
	}, []);

	return (
		<div>
			<h1>Réponse du serveur : {response}</h1>
		</div>
	);
}

export default App;
