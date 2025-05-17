import { Router } from "express";

// J'importe mes routers et les renomme pour les distinguer
import { router as listRouter } from "./list.router.js";
import { router as taskRouter } from "./task.router.js";
import { router as labelRouter } from "./label.router.js";

export const router = Router();

// Routes principales de l'API
router.use(listRouter);
router.use(taskRouter);
router.use(labelRouter);

// Ajout d'un middleware pour gérer les erreurs 404 (non trouvé)
router.use((_, res) => {
  res.status(404).json({ error: "Ressource not found" });
});