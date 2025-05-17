// Charger les variables d'environnement
import "dotenv/config";

// Import des dépendances
import express from "express";
import cors from "cors";

// Import des dépendances locales
import { router as apiRouter } from "./src/routers/index.js";
import { bodySanitizer } from "./src/bodySanitizer.js";

// Initialisation d'une app Express
const app = express();

// Utilisation de CORS, avec autorisation de requêtes cross-origins
app.use(cors());

// Ajout des body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Utilisation globale de Sanitize, pour éviter des injections XSS
app.use(bodySanitizer);

// Mise à disposition de l'API, avec sa version dans l'URL
app.use(`/api/v${process.env.VERSION}`, apiRouter);

// Setup d'une "homepage"
app.get("/", (req, res) => {
	res.json({
		hello: "Bienvenue sur l'API de oKanban !",
	});
});

// Démarrer le serveur sur le port déinit dans les variables d'environnement, sinon sur le port 3000
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
	console.log(`🚀 Serveur démarré, disponible sur http://localhost:${port}`);
});
