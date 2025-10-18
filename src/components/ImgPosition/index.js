import React from 'react';
import styles from './ImgPosition.module.css';

export default function ImgPosition({ Top, Left, Width, src, Border }) {
    return (
        <img src={src} style={{width:  Width, top: Top, left: Left, borderRadius: Border, }} className={styles.freeimageContainer}></img>
    );

}