import Joi from "joi"
import photoService from "./photo-service"
import recipeRepository from "../repositories/recipe-repository"

const keywordsSchema = Joi.array().items(Joi.string().lowercase()).min(1).max(8)

const recipeSchema = Joi.object({
  title: Joi.string().min(1).max(50).trim().required(),
  keywords: keywordsSchema.required(),
  photo: Joi.string().uri().optional(),
})

const validateRecipe = recipe => {
  const { error, value } = recipeSchema.validate(recipe)
  return { error, value }
}

const validateKeywords = keywords => {
  const { error, value } = keywordsSchema.validate(keywords)
  return { error, value }
}

const getAll = async () => {
  return recipeRepository.findAll()
}

const create = async recipe => {
  if (!recipe.photo) {
    recipe.photo = await photoService.generatePhotoUrl({ keywords: recipe.keywords })
  }
  return recipeRepository.save(recipe)
}

const update = async (id, fields) => {
  return update(id, fields)
}

const remove = async id => {
  const recipe = await recipeRepository.findById(id)
  if (!recipe) {
    return false
  }
  await recipeRepository.removeById(id)
  return true
}

const getAllByKeywords = async keywords => {
  return recipeRepository.findByKeywords(keywords)
}

const getById = async id => {
  const recipe = await recipeRepository.findById(id)
  if (!recipe) return null
  return recipe
}

export default {
  validateRecipe,
  validateKeywords,
  getAll,
  create,
  update,
  getById,
  remove,
  getAllByKeywords,
}
