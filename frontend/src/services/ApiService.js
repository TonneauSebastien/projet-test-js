const API_URL = 'http://localhost:3001/test';

export const getAllUsers = async () => {
	try {
		const response = await fetch(API_URL);
		if (!response.ok) {
			throw new Error('Network response was not ok ' + response.statusText);
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching data: ", error);
		return [];
	}
};

export const getUserById = async (id) => {
	try {
		const response = await fetch(`${API_URL}/${id}`);
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return await response.json();
	} catch (error) {
		console.error("Error fetching data: ", error);
		return null;
	}
};

export const createUser = async (userData) => {
	try {
		const response = await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		return await response.json();
	} catch (error) {
		console.error("Error fetching data: ", error);
		return null;
	}
};

export const updateUserById = async (id, userData) => {
	try {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		return await response.json();
	} catch (error) {
		console.error("Error fetching data: ", error);
		return null;
	}
};

export const deleteUserById = async (id) => {
	try {
		const response = await fetch(`${API_URL}/${id}`, {
			method: 'DELETE'
		});

		if (!response.ok) {
			throw new Error('Server responded with an error: ' + response.statusText);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching data: ", error);
		return null;
	}
};
