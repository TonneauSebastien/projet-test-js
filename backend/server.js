// backend/server.js
const express = require('express');
const { pool } = require('./db');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors()); // Activation de CORS pour toutes les routes

// CRÉER UNE VARIABLE D'ENVIRONNEMENT POUR /synoptique-test/ !!!!!!!!!!!
app.get('/synoptique-test/', (req, res) => {
	res.send('Synoptique Test Backend is running');
});

// Route pour CREATE un utilisateur
app.post('/test', (req, res) => {
	const { username, password, role } = req.body;
	const query = "INSERT INTO test (username, password, role) VALUES (?, ?, ?)";

	pool.query(query, [username, password, role], (error, results) => {
		if (error) {
			res.status(500).json({ success: false, message: "Erreur lors de l'ajout de l'utilisateur." });
		} else {
			// Créer un objet utilisateur avec les informations reçues et l'ID généré.
			const newUser = {
				id: results.insertId,
				username,
				role
			};
			res.status(201).json({ success: true, message: 'Utilisateur ajouté avec succès.', user: newUser });
		}
	});
});

// Route pour READ tous les utilisateurs
app.get('/test', (req, res) => {
	pool.query('SELECT * FROM test', (error, results) => {
		if (error) throw error;
		res.status(200).json(results);
	});
});

// Route pour READ un utilisateur spécifique par ID
app.get('/test/:id', (req, res) => {
	const { id } = req.params;
	pool.query('SELECT * FROM test WHERE id = ?', [id], (error, results) => {
		if (error) throw error;
		res.status(200).json(results[0]);
	});
});

// Route pour UPDATE un utilisateur
app.put('/test/:id', (req, res) => {
	const { id } = req.params;
	const { username, password, role } = req.body;
	const query = "UPDATE test SET username = ?, password = ?, role = ? WHERE id = ?";
	pool.query(query, [username, password, role, id], (error, results) => {
		if (error) {
			res.status(500).json({ success: false, message: `Utilisateur avec l'ID: ${id} a été mis à jour.` });
		} else {
			res.status(200).json({ success: true, message: `Utilisateur avec l'ID : ${id} a été mis à jour` });
		}
	});
});

// Route pour DELETE un utilisateur
app.delete('/test/:id', (req, res) => {
	const { id } = req.params;
	pool.query('DELETE FROM test WHERE id = ?', [id], (error, results) => {
		if (error) {
			// Si une erreur survient, renvoyez une réponse JSON avec le message d'erreur.
			console.error(error);
			res.status(500).json({ success: false, message: "Une erreur s'est produite lors de la suppression." });
		} else {
			// Sinon, renvoyez une réponse JSON confirmant la suppression.
			res.status(200).json({ success: true, message: `Utilisateur avec l'ID: ${id} a été supprimé.` });
		}
	});
});

app.listen(PORT, () => {
	console.log(`Serveur démarré sur le port ${PORT}`);
});
