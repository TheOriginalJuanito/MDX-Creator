import React from 'react';
import styles from './title.module.css';

export default function Title({children}) {

    return (
        <div className={styles.headderTitle}>
            <h3> {children} </h3>
            <hr />
        </div>
    );
}
