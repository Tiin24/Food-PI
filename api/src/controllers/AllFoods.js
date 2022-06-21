const axios = require("axios");
const { Diet, Recipe } = require("../db");
const { API_KEY, API_KEY2, API_KEY3 , API_KEY4 , API_KEY5 , API_KEY6} = process.env;

const getApiRecipes = async () => {
  try {
    const apiInfo = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY4}&addRecipeInformation=true&number=100`
    );
    const apiRecipes = apiInfo.data?.results.map((recipe) => ({
      id: recipe.id,
      name: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
      health_score: recipe.healthScore,
      diets: recipe.diets.map((diet) => ({ name: diet })),
      steps: recipe.analyzedInstructions[0]?.steps.map((step) => {
        return step.step;
      }),
    }));
    return apiRecipes;
  } catch (error) {
    console.log(error);
  }
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: [
      {
        model: Diet,
        attributes: ["name"],
        thorough: {
          attributes: [],
        },
      },
    ],
  });
};

const getAllInfo = async () => {
  const apiRecipes = await getApiRecipes();
  const dbRecipes = await getDbInfo();
  
  const infoTotal = apiRecipes.concat(dbRecipes);
  return infoTotal;
};

//TRAIGO la receta ESPECIFICADO POR PARAMS (ID)
const getApiRecipesDetail = async (id) => {
  try {
    const apiInfo = await axios(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY4}`
    );
    const detail = apiInfo.data;
    return {
      id: detail.id,
      name: detail.title,
      image: detail.image,
      summary: detail.summary,
      health_score: detail.healthScore,
      diets: detail.diets.map((diet) => ({ name: diet })),
      steps: detail.analyzedInstructions[0]?.steps.map((step) => {
        return step.step;
      }
      ),
    }
  } catch (error) {
    console.log(error);
  }
};

const getDbId = async (id) => {
  try {
    const recipe = await Recipe.findByPk(id,{
      include: [
        {
          model: Diet,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    return recipe;    
  } catch (error) {
    
  }
};

const getAllInfoId = async (id) => {
  const apiRecipes = await getApiRecipesDetail(id);
  const dbRecipes = await getDbId(id);

  const [apiRecipesDetail, dbRecipesDetail] = await Promise.all([
    apiRecipes,
    dbRecipes,
  ]);

  return apiRecipesDetail || dbRecipesDetail;
}
 

module.exports = {
  getAllInfo,
  getApiRecipes,
  getDbInfo,
  getApiRecipesDetail,
  getDbId,
  getAllInfoId,
};
