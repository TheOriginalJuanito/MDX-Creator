import React, { useState } from 'react';
import styles from './imageMap.module.css';

export default function Image({ children, imgSrc, border }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);

    return (
        <div>
            <div className={styles.ImagemapContainer}>
                <img src={imgSrc} onClick={() => setLightboxOpen(true)} className={styles.clickableImage} style={{ border: border ? '2px solid black' : 'none' }} />
                {children}
            </div>

            {lightboxOpen && (
                <div className={styles.lightbox} onClick={() => setLightboxOpen(false)}>
                    <div className={styles.ImagemapContainer}>
                        <img alt="Image" src={imgSrc} className={styles.lightBoxImage}/>
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
}
