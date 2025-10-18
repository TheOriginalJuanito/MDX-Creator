
import React from 'react';
import styles from './DownloadBTN.module.css';

export default function DownloadBTN({href, name, label}) {

    return (
        <a href={href} download={name} >
            <div className={styles.card}>
                <div className={styles.cardHeader}  style={{ backgroundImage: `url(${href})` }}></div>
                <div className={styles.cardFooter}>{label}</div>
            </div>


        </a>
    );
}
