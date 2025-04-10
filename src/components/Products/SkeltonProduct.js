import React from "react";
import styles from './SingleProduct.module.css'
const SkeletonProduct = ({type}) => {
    const base=styles.skeleton
    if(type==='image')return <div className={`${styles.image} ${base} `} style={{background:'#c1c1c1'}}/>
    if(type==='text') return (<div className={`${styles.info} ${base}`} style={{ background:'#ccc', height: '20px', width: '40%' }}></div>)
    if(type==='product')
      {return(
    <div className={styles.card} style={{border:'1px solid rgb(238, 237, 237)'}}>
      <div className={`${styles.image} ${base}`} style={{background:'#eee'}} ></div>
      <div className={styles.info} style={{ padding:'10px' }}>
        <div className={base} style={{ background:'#ddd', height:'20px', width:'60%', marginBottom: '10px' }}></div>
        <div className={base} style={{ background:'#ccc', height:'20px', width:'40%' }}></div>
      </div>
    </div>)
    
}};
export default SkeletonProduct;
