// backend/server.js
const express = require('express');
const { pool } = require('./db');
const app = express();
const PORT = 3001;

app.use(express.json());

// Route de test pour vérifier la connexion à la base de données
app.get('/test', (req, res) => {
    pool.query('SELECT 1 + 1 AS solution', (error, results) => {
        if (error) throw error;
        res.send(`La réponse est: ${results[0].solution}`);
    });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
