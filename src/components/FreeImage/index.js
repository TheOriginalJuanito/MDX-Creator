import React from "react";
import styles from "./FreeImages.module.css";

export default function FreeImage({ children, aspectRatio}) {
    return (
    <div className={styles.allscreen}>
        <div className={styles.freeimageContainer} style={{ aspectRatio: aspectRatio}}>
            {children}
        </div>
    </div>
    );
}
