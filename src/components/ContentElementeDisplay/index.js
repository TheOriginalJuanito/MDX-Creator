import React from "react";
import styles from "./ContentElementeDisplay.module.css";

export default function ImgCardLink({ children, bg, title, LinkTo, color }) {
    return (
        <a
            className={`${styles.DisplayElements} ${
                color ? styles[color] : ""
            }`}
            href={LinkTo}
        >
            <img className={styles.icon} src={bg} />
            <div className={styles.Text}>
                <h3>{title}</h3>
                {children}
            </div>
        </a>
    );
}
