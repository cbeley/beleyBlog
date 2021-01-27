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
