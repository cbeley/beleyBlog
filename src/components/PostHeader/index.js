import React from 'react';

import styles from './styles.module.css';

export default ({ title, subTitle, date, readingTimeString }) => {
    return (
        <header className={styles.header}>
            <h1>{title}</h1>
            {subTitle ? <h2>{subTitle}</h2> : null}
            <small>{`${date} · ${readingTimeString}`}</small>
        </header>
    );
};
