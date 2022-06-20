const { Router } = require("express");
const { getAllInfo, getAllInfoId } = require("../controllers/AllFoods");
const { Recipe, Diet } = require("../db");
const router = Router();

router.get("/",  (req, res) => {
  let promise = new Promise((resolve, reject) => {
    getAllInfo().then((data) => resolve(data));
  });

  if (req.query.name) {
    const {name} = req.query;
    promise
      .then((data) => data.find((el) => el.name.toLowerCase() === name.toLowerCase())
      )
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => console.log(err));
  }
  else {
    promise.then((data) => {
      return res.json(data);
    })
  }
});

router.get("/:id",  (req, res) => {
  const { id } = req.params;
  getAllInfoId(id).then((data) => {
    return res.json(data);
  }
  ).catch((err) => console.log(err));
    
});

router.post("/", async (req, res) => {
  try {
    const { name, image, summary, health_score, diets, steps } =
      req.body;
    const newRecipe = await Recipe.create({
      name,
      image,
      summary,
      health_score,
      diets,
      steps,
    });
    const diet = await Diet.findOrCreate({
      where: {
        name: diets,
      },
    });
    await newRecipe.addDiet(diet[0]);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
