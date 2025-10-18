import React from 'react';
import styles from './imageMap.module.css';

export default function Markers({ top, left, type, children, markerWidth, markerHeight, link}) {

    var topValues = top.split(" ")
    var leftValues = left.split(" ")
    let classList = `${styles.marker} ${styles.markerelement}`;


    if (type?.includes("outline")) {
        classList = `${styles.marker} ${styles.outlineMarker}`;
        if (markerWidth) {
            classList = `${styles.marker} ${styles.outlineMarker} ${styles.widthcorection}`;
        }

    }
    if (type?.includes("square")) {
        classList = `${styles.marker} ${styles.squareMarker}`;
        if (markerWidth) {
            classList = `${styles.marker} ${styles.squareMarker} ${styles.widthcorection} ${styles.heightcorection}`;
        }

    }

    if (markerWidth) {
        return (
            <span className={classList} style={{ top: topValues, left: leftValues, width: markerWidth, height: markerHeight}} data-marker="squaremarker">
                {children}
            </span>
        );
    } else {
        return (
            <span className={classList} style={{ top: topValues, left: leftValues }} data-marker="dotmarker" data-link={link || null}>
                {children}
            </span>
        );
    }
}
