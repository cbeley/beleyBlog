/**
 * It should be very rare I use windows in this code-base,
 * so I'd prefer to whitelist it on a file-by-file basis.
 */
/* global window */
import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import InfoWindow from './InfoWindow';

import * as styles from './index.module.css';

// Default to US as the center...
const center = {
    lat: 39.5,
    lng: -98.35,
};

export default ({ mapURL }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyATtXuN4euh1uDM5Vc-Pcefuko4y8rIrwY',
    });

    const [map, setMap] = React.useState(null);
    const [selectedPlaceName, setSelectedPlaceName] = React.useState(null);

    const onMapLoad = React.useCallback((mapReference) => {
        mapReference.data.loadGeoJson(mapURL, undefined, (features) => {
            const bounds = new window.google.maps.LatLngBounds();

            features.forEach((feature) => {
                feature.getGeometry().forEachLatLng((latlng) => {
                    bounds.extend(latlng);
                });
            });

            mapReference.fitBounds(bounds);
        });

        setMap(mapReference);
    }, []);

    const onInfoWindowLoad = React.useCallback((infoWindowReference) => {
        // Note that how the infoWindow is being handled here is not
        // very React-like and may even have bugs. However, I'm a tad lazy
        // right now, may re-think this later, and am worried about
        // unnecessary re-renders.
        //
        // The bigger problem here is react-google-maps is wrapping an API that
        // is at odd-ends with react in the first place...

        infoWindowReference.close(map);

        map.data.addListener('click', (event) => {
            const { feature, latLng } = event;

            setSelectedPlaceName(feature.getProperty('name'));

            infoWindowReference.setPosition(latLng);
            infoWindowReference.open(map);
        });
    });

    const onUnmount = React.useCallback(() => {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerClassName={styles.mapContainer}
            center={center}
            zoom={3}
            onLoad={onMapLoad}
            onUnmount={onUnmount}
        >
            <InfoWindow
                onLoad={onInfoWindowLoad}
                position={center}
                placeName={selectedPlaceName}
            />
        </GoogleMap>
    ) : undefined;
};
