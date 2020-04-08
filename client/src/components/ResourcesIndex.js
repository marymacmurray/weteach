import React from 'react'

export default function ResourcesIndex(props) {
  return (
    <div>
      <h3>Resources list:</h3>
      {props.resources.map((resource) => (
        <p>{resource.name}</p>
      ))}
    </div>
  )
}