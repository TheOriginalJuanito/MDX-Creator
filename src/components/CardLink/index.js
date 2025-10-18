import React from 'react';
import clsx from 'clsx';
import styles from './CardLink.module.css';

const CardLink = ({ href, title }) => {
    return (
        <article className={clsx(styles.cardLink)}>
            <a className="card " href={href}>
                <h2 title="Container">{title}</h2>
            </a>
        </article>
    );
};

export default CardLink;
