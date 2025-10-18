import React from 'react';
import styles from './Error.module.css';
import clsx from 'clsx';
export default function NotFoundContent({}) {
    return (
    <main className={clsx(styles.ErrorPage)}>
            <h2>Oops!</h2> 
            <span>
                <p className={clsx(styles.Subtext)}>Die gesuchte Seite existiert nicht oder wurde verschoben.</p> 
                <p>Was nun?</p>
                <ul>
                    <li><p>Überprüfen Sie die URL auf Tippfehler.</p></li>
                    <li><p>Gehen Sie zurück zur <a href="/">Startseite</a>.</p></li>
                    <li><p>Nutzen Sie die Suche, um die gewünschte Information zu finden.</p></li>
                </ul>
            </span> 
        </main>
    );
}