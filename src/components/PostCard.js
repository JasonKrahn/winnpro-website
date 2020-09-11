import React from 'react'
import { Link } from 'gatsby'
import Image from './Image'
import './PostCard.css'

const PostCard = ({
  featuredImage,
  title,
  completed,
  budget,
  architect,
  slug,
  categories = [],
  className = '',
  ...props
}) => (
  <Link to={slug} className={`PostCard ${className}`}>
    {featuredImage && (
      <div className="PostCard--Image relative">
        <Image background src={featuredImage} alt={title} />
      </div>
    )}
    <div className="PostCard--Content">
      {title && <h3 className="PostCard--Title">{title}</h3>}
      <div className="PostCard--Category">
        {categories && categories.map((cat) => cat.category).join(', ')}
      </div>
      {completed && (
        <div className="PostCard--Details">
          <b>Date Completed: </b>
          {completed}
        </div>
      )}
      {budget && (
        <div className="PostCard--Details">
          <b>Budget: </b>
          {budget}
        </div>
      )}
      {architect && (
        <div className="PostCard--Details">
          <b>Architect: </b>
          {architect}
        </div>
      )}
    </div>
  </Link>
)

export default PostCard
