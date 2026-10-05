import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Recipe({ title, ingredients, image, author: userId }) {
  const ingredientLines = []
  if (ingredients) {
    for (let i = 0; i < ingredients.length; i++) {
      ingredientLines.push(<div key={i}>{ingredients[i]}</div>)
    }
  }

  return (
    <article>
      <h3>{title}</h3>
      {image && <img src={image} alt={title} />}
      <div>{ingredientLines}</div>
      {userId && (
        <em>
          <br />
          Written by <User id={userId} />
        </em>
      )}
    </article>
  )
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
  author: PropTypes.string,
}
