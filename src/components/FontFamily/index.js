import React from 'react';
import styles from './FontFamily.module.css';

export default function FontFamily({ Font, children}) {

  return (
    <div  style={{ '--font-family': Font }} className={styles.fontDisplay}>
        {children}
    </div>
  );
}
