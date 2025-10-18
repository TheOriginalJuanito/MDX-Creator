import React, { useEffect, useRef } from "react";
import styles from "./Masonry.module.css";

let Masonry = null;
if (typeof window !== 'undefined') {
  Masonry = require('masonry-layout');
}

export default function MasonryGallery ({ children, lg, md }) {
    const varLg = lg ?? 3;
    const varMd = md ?? 3;
    const gridRef = useRef(null);
    const masonryInstance = useRef(null);

    useEffect(() => {
        masonryInstance.current = new Masonry(gridRef.current, {
            itemSelector: `.${styles.masonryitem}`,
            columnWidth: `.${styles.masonrysizer}`,
            percentPosition: true,
        });

        const images = gridRef.current.querySelectorAll("img");
        let loadedCount = 0;

        const checkAllImagesLoaded = () => {
            loadedCount++;
            if (loadedCount === images.length) {
                masonryInstance.current.layout();
            }
        };


        images.forEach((img) => {
            if (img.complete) {
                checkAllImagesLoaded();
            } else {
                img.addEventListener("load", checkAllImagesLoaded);
            }
        });

    }, []);

    const childrenWithClass = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                className: `${styles.masonryitem} ${child.props.className || ""}`,
            });
        }
        return child;
    });

    return (
        <div className={styles.masonrygrid} style={{ "--row-on-lg": varLg, "--row-on-md": varMd }} ref={gridRef}>
            <div className={styles.masonrysizer} />
            {childrenWithClass}
        </div>
    );
};
