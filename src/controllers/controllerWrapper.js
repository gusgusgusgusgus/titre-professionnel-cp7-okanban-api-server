// Ajout d'un controllerWrapper, oublié dans la CP6 mais nécessaire pour une API hébergée afin de retourner à minima les erreurs 500

export function controllerWrapper(controllerMdw) {
  return async (req, res, next) => {
    try {
      await controllerMdw(req, res, next);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unexpected server error. Please try again later." });
    }
  };
}