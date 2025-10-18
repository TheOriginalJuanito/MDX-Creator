import React from 'react';
import styles from './Reference.module.css';

export default function Reference({ children, link}) {

    return (
        <span data-link={link} className={styles.textelement}>
            {children}
        </span>
    );
}

