import React from 'react'
import styles from './SingleProduct.module.css';
import SkeletonProduct from './SkeltonProduct';
const ProductPrice = ({productItem}) => {
  const newprice=productItem?.price
  
  if(!newprice){
     return(
      <SkeletonProduct type={'text'}/>
     )
  }
  const oldPrice=(parseFloat(newprice) + 30).toFixed(2)
  return (
    <h2 className={styles.price}>
          <span className={styles.oldprice}> ₹ {oldPrice}</span>
          <span className={styles.newprice}>₹ {newprice}</span> 
            
          </h2>
  )
}

export default ProductPrice