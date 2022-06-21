const { Router } = require("express");
const { getAllInfo, getAllInfoId } = require("../controllers/AllFoods");
const { Recipe, Diet } = require("../db");
const router = Router();

//const { name }= req.query;
//  const allRecipes = await getAllInfo(name);
//  try {
//    if (name) {
//      let recipe = allRecipes.filter(
//        (e) => e.name.toLowerCase().includes(name.toLowerCase())
//      );
//      recipe.length
//      ? res.status(200).json(recipe)
//      : res.status(404).json({ message: "Recipe not found" });
//    } else {
//      let recipes = await getAllInfo();
//      return res.status(200).json(recipes);
//    }
//  } catch (error) {
//    console.log(error);
//  }

router.get("/",  (req, res) => {
  let promise = new Promise((resolve, reject) => {
    getAllInfo().then((data) => resolve(data));
  });
  const { name } = req.query;
  if (name) {
    promise.then((data) => {
      let recipe = data.filter(
        (e) => e.name.toLowerCase().includes(name.toLowerCase())
      );
      recipe.length
        ? res.status(200).json(recipe)
        : res.status(404).json({ message: "Recipe not found" });
    }
    );
  } else {
    promise.then((data) => res.status(200).json(data));
  }
});

router.get("/:id",  (req, res) => {
  const { id } = req.params;
  getAllInfoId(id).then((data) => {
    return res.json(data);
  }
  ).catch((err) => console.log(err));
    
});

//router.post("/", async (req, res) => {
//  try {
//    const { name, image, summary, health_score, diets, steps } =
//      req.body;
//    const newRecipe = await Recipe.create({
//      name,
//      image,
//      summary,
//      health_score,
//      diets,
//      steps,
//    });
//    const diet = await Diet.findOrCreate({
//      where: {
//        name: diets,
//      },
//    });
//    await newRecipe.addDiet(diet[0]);
//    res.status(201).json(newRecipe);
//  } catch (error) {
//    console.log(error);
//  }
//});

router.post("/",  (req, res) => {
    const { name, image, summary, health_score, diets, steps } =
      req.body;
    
    let promise = new Promise((resolve, reject) => {
      Recipe.create({
        name,
        image,
        summary,
        health_score,
        diets,
        steps,
      }).then((data) => resolve(data));
    }
    );
    promise.then((data) => {
      Diet.findOrCreate({
        where: {
          name: diets,
        },
      }).then((diet) => {
        data.addDiet(diet[0]);
        res.status(201).json(data);
      }
      ).catch((err) => console.log(err));
    }
    );
});


module.exports = router;
