import React, { useState } from 'react';
import styles from './SingleProduct.module.css'

const FavouriteIcon = ({isActive=false}) => {
  const[hovered,setHovered]=useState(false)
  const iconClass=hovered ||isActive ?'fas fa-heart' :'far fa-heart'
  return (
    <div className={`${styles.favorite}`}
    onMouseEnter={()=>setHovered(true)}
    onMouseLeave={()=>setHovered(false)}>
          <i className={iconClass}></i>
    </div>
  )
}

export default FavouriteIcon