const { Router } = require("express");
const { Diet } = require("../db");
const axios = require("axios");
const { getAllInfo, getApiRecipes } = require("../controllers/AllFoods");
const { API_KEY } = process.env;
const router = Router();

//router.get("/", async (req, res) => {
//  try {
//    let apiInfo = await getApiRecipes()
//    const dietDb = apiInfo
//      .map((diet) => diet.diets.map((diet) => diet.name))
//      .flat();
//
//    dietDb.forEach(async (diet) => {
//      Diet.findOrCreate({
//        where: {
//          name: diet,
//        },
//      });
//    });
//
//    const allDiets = await Diet.findAll();
//    res.send(allDiets);
//  } catch (error) {
//    console.log(error);
//  }
//});

router.get("/",  (req, res) => {
  let promise = new Promise((resolve, reject) => {
    getApiRecipes().then((data) => resolve(data));
  });
  promise.then((data) => 
    data.map((diet) => diet.diets.map((diet) => diet.name)).flat()
  )
  .then((data) => {
    data.forEach( (diet) => {
      Diet.findOrCreate({
        where: {
          name: diet,
        },
      });
    }
    );
    const allDiets = Diet.findAll();
    res.send(allDiets);
  }
  ).catch((err) => console.log(err));
});

module.exports = router;
