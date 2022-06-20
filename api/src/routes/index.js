const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RouteRecipe = require("./RouteRecipe");
const RouteDiet = require("./RouteDiet");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipe", RouteRecipe);
router.use("/diet", RouteDiet);
module.exports = router;
