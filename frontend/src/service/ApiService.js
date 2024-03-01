// frontend/src/service/ApiService.js
export const fetchTest = async () => {
	try {
		const response = await fetch('http://localhost:3001/test');
		const data = await response.text();
		return data;
	} catch (error) {
		console.error("Erreur lors de la récupération des données", error);
		return null;
	}
};
