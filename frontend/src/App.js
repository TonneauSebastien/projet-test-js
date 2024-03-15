// src/App.js
import React, { useState, useEffect } from 'react';
import { getAllUsers, createUser, updateUserById, deleteUserById } from './services/ApiService';

function App() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [initialLoading, setInitialLoading] = useState(true);
	// États pour les champs du formulaire
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [role, setRole] = useState('');

	useEffect(() => {
		// Fonction pour charger les utilisateurs
		const fetchUsers = async () => {
			const usersData = await getAllUsers();
			setUsers(usersData);
			setLoading(false);
			setInitialLoading(false); // Désactiver le chargement initial après le premier chargement
		};

		fetchUsers(); // Chargez immédiatement les utilisateurs une première fois

		// Configurer le polling pour rafraîchir les utilisateurs toutes les 5 secondes
		const interval = setInterval(() => {
			fetchUsers();
		}, 60000); // 60 secondes

		// Fonction de nettoyage pour arrêter le polling lorsque le composant est démonté
		return () => clearInterval(interval);
	}, []); // Le tableau vide indique que cet effet ne dépend d'aucune variable d'état et ne s'exécute qu'au montage

	// Hooks ===============

	const handleCreateUser = async (userData) => {
		const newUser = await createUser(userData);
		setUsers([...users, newUser]);
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await createUser({ username, password, role });
			if (response.success) {
				setUsers([...users, response.user]); // Utilisez `response.user` qui contient le nouvel utilisateur
				// Réinitialisez les champs du formulaire ici
				setUsername('');
				setPassword('');
				setRole('');
			} else {
				// Affichez une notification d'erreur ici
			}
		} catch (error) {
			console.error("Error creating user: ", error);
			// Affichez une notification d'erreur ici
		}
	};


	const handleUpdateUser = async (id, userData) => {
		const updatedUser = await updateUserById(id, userData);
		const index = users.findIndex((user) => user.id === id);
		const newUsers = [...users];
		newUsers[index] = updatedUser;
		setUsers(newUsers);
	};

	const handleDeleteUser = async (id) => {
		try {
			const deleteUserResponse = await deleteUserById(id);
			// Logique pour gérer la réponse, par exemple :
			if (deleteUserResponse.success) {
				setUsers(users.filter(user => user.id !== id));
			} else {
				// Gérer le cas où la suppression n'a pas fonctionné
			}
		} catch (error) {
			console.error("Failed to delete user: ", error);
			// Ici vous pouvez par exemple afficher une alerte à l'utilisateur
		}
	};

	// Vue ================

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Utilisateurs</h1>
			<form onSubmit={handleFormSubmit}>
				<label>
					Nom d'utilisateur:
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<br></br>
				<label>
					Mot de passe:
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<br></br>
				<label>
					Rôle:
					<input
						type="text"
						value={role}
						onChange={(e) => setRole(e.target.value)}
						required
					/>
				</label>
				<br></br>
				<button type="submit">Créer un utilisateur</button>
			</form>
			<h2>Utilisateurs</h2>
			{users.length > 0 ? (
				users.map((user) => (
					<div key={user.id}>
						{user.username} - {user.role}
						<button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
					</div>
				))
			) : (
				<p>Aucun utilisateur trouvé.</p>
			)}
		</div>
	);
}

export default App;