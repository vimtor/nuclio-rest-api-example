import { Schema, model } from "mongoose"

const recipeSchema = new Schema({
  title: String,
  keywords: [String],
  photo: String,
})

const recipeModel = model("Recipe", recipeSchema)

const findAll = async (filter = {}) => {
  return recipeModel.find(filter)
}

const findById = async id => {
  return recipeModel.findById(id)
}

const save = async fields => {
  return await recipeModel.create(fields)
}

const updateById = async (id, fields) => {
  return recipeModel.findByIdAndUpdate(id, fields)
}

const removeById = async id => {
  recipeModel.findByIdAndRemove(id)
}

const findByKeywords = async keywords => {
  return recipeModel.find({ keywords: { $in: keywords } })
}

export default {
  findAll,
  save,
  updateById,
  removeById,
  findById,
  findByKeywords,
}
