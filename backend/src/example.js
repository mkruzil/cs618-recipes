import { initDatabase } from './db/init.js'

import { Recipe } from './db/models/recipe.js'

import dotenv from 'dotenv'
dotenv.config()

await initDatabase()

const recipe = new Recipe({
  title: 'Hello second recipe!',
  author: 'Mark Smith',
  ingredients: ['frontend'],
  image: 'https://example.com/recipe.jpg',
})

await recipe.save()

const recipes = await Recipe.find()
console.log(recipes)
