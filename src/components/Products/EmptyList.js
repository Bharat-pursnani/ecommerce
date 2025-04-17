import React from 'react'
import styles from './NewArrivals.module.css'
const EmptyList = ({message}) => {
    const words=message.split("")
  return (
    <div className={styles.empty}>
        {words.map((word,index)=>(
            <span 
            key={index}
            className={styles.word}
            style={{animationDelay:`${index*0.05}s`}}>
                {word}
            </span>
        ))}
    </div>
  )
}

export default EmptyList