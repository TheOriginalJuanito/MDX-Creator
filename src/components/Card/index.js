import React from "react";
import styles from "./PreviewBox.module.css";

export default function Card({ bg, children, LinkTo, label, scale}) {
    const imgStyle = {
        ...(scale && { transform: `scale(${scale})` }),
    };

    return (
        <div className={styles.manualContainer}>
            <a href={LinkTo} className={styles.cardLink}>
                <img className={`${styles.containerHead}`} src={bg} style={imgStyle}  />
                <div className={styles.containerBody}>
                    <div className={styles.Text}>{children}</div>
                    <button>{label}</button>
                </div>
            </a>
        </div>
    );
}
