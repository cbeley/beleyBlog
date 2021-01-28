import React from 'react';

import ImageWrapper from './ImageWrapper';
import GridImage from './GridImage';
import _WideImage from './WideImage';
import _ImageGrid from './ImageGrid';

import gridImageStyles from './ImageGrid.module.css';

export const WideImage = ImageWrapper(_WideImage);
export const ImageGrid = ImageWrapper(_ImageGrid);

export const GridImageFullWidth = GridImage(gridImageStyles.fullWidthImage);
export const GridImageFourtyWidth = GridImage(gridImageStyles.fourtyWidthImage);
export const GridImageFillWidth = GridImage(gridImageStyles.fillWidthImage);

/**
 * I want a LargeImage to be exactly like a filled width image is in a grid, so
 * we just re-use the grid image component with a quick inline react component.
 */
export const LargeImage = (props) => (
    <ImageGrid {...props}>
        <GridImageFillWidth {...props} />
    </ImageGrid>
);
