import React from 'react';
import styles from './ColorBoxes.module.css';


// Primary component
export default function ColorBoxes ({ web, rgb, pantone, cmyk , textcolor, children}) {


	const copyToClipboard = (text) => {navigator.clipboard.writeText(text).then(() => {alert(`Copied: ${children} (${text})`);})}

    const gradient = `linear-gradient(to bottom, ${web}, #fff)`;
    let font = Array
    font = web

    if (web == '#fff' ||web == '#ffffff') {
        font = '#000000'
        textcolor = '#000000'
    } else {
        font = web
    }


    return (
        <div className={styles.logofarben}>
            <div style={{ background: gradient, color: textcolor,   border: `1px solid ${font}`,}} onClick={() => copyToClipboard(web)}>
                <div>
                    {pantone && <span>Pantone: {pantone}</span>}
                    {cmyk && <span>CMYK: {cmyk}</span>}
                    {web && <span>Web: {web}</span>}
                    {rgb && <span>RGB: {rgb}</span>}
                </div>
                <h3 style={{color: font}}>{children}</h3>
            </div>
        </div>
    )
};
