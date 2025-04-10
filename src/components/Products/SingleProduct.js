/*
 ** Author: Santosh Kumar Dash
 ** Author URL: http://santoshdash.epizy.com/
 ** Github URL: https://github.com/quintuslabs/fashion-cube
 */

 import React, { useState } from "react";
 import SkeletonProduct from "./SkeltonProduct";
 import FavouriteIcon from "./FavouriteIcon";
 import ProductPrice from "./ProductPrice";
 import styles from "./SingleProduct.module.css";
 const SingleProduct = ({ productItem, onNavigate, onAddToCart }) => {
   const[imageError,setImageError]=useState(false)
   if (!productItem) {
     return <SkeletonProduct type={'product'} />;
   }
   const HandleNavigate = () => {
     onNavigate(productItem._id);
   };
   const HandleAddToCart = (e) => {
     e.stopPropagation();
     onAddToCart(productItem._id);
   };
   return (
     <div className={styles.card}>
       <div
         className={`${styles.product} ${styles.discount}`}
         onClick={HandleNavigate}
       >
         <div className={styles.image}>
           {!imageError ?<img
             src={productItem.imagePath}
             alt={productItem.title}
             className={styles.imageTag}
             loading="lazy"
             onError={()=>setImageError(true)}
           />:<SkeletonProduct type={'image'}/>}
           
         </div>
         <div>
           <FavouriteIcon />
         </div>
         {productItem.discount && (
           <div className={`${styles.productBubble}`}>
             <span>-${productItem.discount}</span>
           </div>
         )}
 
         <div className={styles.info}>
           <h6 className={styles.name}>
             <div>{productItem.title}</div>
           </h6>
           <div>
             <ProductPrice productItem={productItem} />
           </div>
         </div>
         <button
           className={`${styles.addToCart}`}
           onClick={HandleAddToCart}
           aria-label={`Add${productItem.title} to cart`}
         >
           Add to Cart
         </button>
       </div>
     </div>
   );
 };
 
 export default React.memo(SingleProduct);
 