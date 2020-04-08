import React from 'react'

export default function CategoriesIndex(props) {
  return (
    <div>
      <h3>Categories list:</h3>
      {props.categories.map((category) => (
        <p>{category.name}</p>
      ))}
    </div>
  )
}