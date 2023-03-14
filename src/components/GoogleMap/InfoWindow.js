/**
 * It should be very rare I use windows in this code-base,
 * so I'd prefer to whitelist it on a file-by-file basis.
 */
/* global window */

import React from 'react';
import { InfoWindow } from '@react-google-maps/api';

import * as styles from './infoWindow.module.css';

export default ({ placeName, onLoad, position }) => {
    let options;

    if (typeof window !== 'undefined') {
        options = {
            pixelOffset: new window.google.maps.Size(0, -34),
        };
    }

    return (
        <InfoWindow onLoad={onLoad} position={position} options={options}>
            <section className={styles.infoBox}>{placeName}</section>
        </InfoWindow>
    );
};
