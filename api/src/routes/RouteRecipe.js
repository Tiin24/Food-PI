const { Router } = require("express");
const { getAllInfo, getAllInfoId } = require("../controllers/AllFoods");
const { Recipe, Diet } = require("../db");
const router = Router();

router.get("/",  async(req, res) => {
const { name }= req.query;
  const allRecipes = await getAllInfo(name);
  try {
    if (name) {
      let recipe = allRecipes.filter(
        (e) => e.name.toLowerCase().includes(name.toLowerCase())
      );
      recipe.length
      ? res.status(200).json(recipe)
      : res.status(404).json({ message: "Recipe not found" });
    } else {
      let recipes = await getAllInfo();
      return res.status(200).json(recipes);
    }
  } catch (error) {
    console.log(error);
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
      steps,
    });
    let dietsDb = await Diet.findAll({
      where: {
        name: diets
      }
    })
    newRecipe.addDiet(dietsDb)
    res.status(200).send('Recipe Created Successfully')
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
