import { Router } from "express"
import recipeService from "../services/recipe-service"

const router = Router()

router.get("/", async (req, res) => {
  if (!req.query.keywords) {
    const recipes = await recipeService.getAll()
    res.status(200).json(recipes)
    return
  }

  const keywords = req.query.keywords.split(",")
  const { error, value } = recipeService.validateKeywords(keywords)

  if (error) {
    res.status(400).json({ error: error.message })
  } else {
    const recipes = await recipeService.getAllByKeywords(value)
    res.status(200).json(recipes)
  }
})

router.post("/", async (req, res) => {
  const { error, value } = recipeService.validateRecipe(req.body)

  if (error) {
    res.status(400).json({ error: error.message })
  } else {
    const recipe = await recipeService.create(value)
    res.status(201).json(recipe)
  }
})

router.get("/:id", async (req, res) => {
  const recipe = await recipeService.getById(req.params.id)
  res.status(200).json(recipe)
})

router.put("/:id", async (req, res) => {
  const recipe = await recipeService.update(req.params.id, req.body)
  res.status(201).json(recipe)
})

router.delete("/:id", async (req, res) => {
  const removed = await recipeService.remove(req.params.id)
  if (removed) {
    res.status(204).end()
  } else {
    res.status(304).end()
  }
})

export default router
