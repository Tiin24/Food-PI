const { Router } = require("express");
const { Diet } = require("../db");
const axios = require("axios");
const { getAllInfo, getApiRecipes } = require("../controllers/AllFoods");
const { API_KEY } = process.env;
const router = Router();

router.get("/", async (req, res) => {
  try {
    let apiInfo = await getApiRecipes()
    const dietDb = apiInfo
      .map((diet) => diet.diets.map((diet) => diet.name))
      .flat();

      const typeDiets = [...new Set(dietDb)]
      typeDiets.forEach(async (d) => {
          await Diet.findOrCreate({
              where: { name: d }
          })
     })
    const allDiets = await Diet.findAll();
     res.send(allDiets);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
