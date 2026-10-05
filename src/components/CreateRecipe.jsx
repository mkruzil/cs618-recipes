import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext.jsx'
import { createRecipe } from '../api/recipes'

export function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [image, setImage] = useState('')

  const [token] = useAuth()

  const queryClient = useQueryClient()

  const createRecipeMutation = useMutation({
    mutationFn: () => {
      const lines = ingredients.split('\n')
      const ingredientList = []
      for (let i = 0; i < lines.length; i++) {
        const ingredient = lines[i].trim()
        if (ingredient !== '') {
          ingredientList.push(ingredient)
        }
      }
      return createRecipe(token, {
        title,
        ingredients: ingredientList,
        image,
      })
    },
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createRecipeMutation.mutate()
  }

  if (!token) return <div>Please log in to create new recipes.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <br />
      <div>
        <label htmlFor='create-ingredients'>Ingredients: </label>
        <textarea
          id='create-ingredients'
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
      </div>
      <br />
      <br />
      <div>
        <label htmlFor='create-image'>Image URL: </label>
        <input
          type='text'
          name='create-image'
          id='create-image'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <br />
      <input 
        type='submit' 
        value={createRecipeMutation.isPending ? 'Creating....' : 'Create'} 
      />
      {createRecipeMutation.isSuccess ? (
        <>
         <br />
          Recipe created successfully!
        </>
      ) : null}
    </form>
  )
}
