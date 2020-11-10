import Typography from 'typography';
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants';
import verticalRhythm from 'compass-vertical-rhythm';

import { darkAccent } from '../colors.module.css';

const systemUIFontList = [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
];

const typography = new Typography({
    title: 'Ocean Beach',
    baseFontSize: '19px',
    baseLineHeight: 1.58,
    googleFonts: [],
    headerFontFamily: systemUIFontList,
    bodyFontFamily: systemUIFontList,
    headerWeight: 700,
    bodyWeight: 400,
    boldWeight: 700,
    overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => {
        const vr = verticalRhythm({
            baseFontSize: '17px',
            baseLineHeight: '28px',
        });
        return {
            a: {
                color: darkAccent,
                textDecoration: 'none',
            },
            'a:hover,a:active': {},
            'h1,h2,h3,h4,h5,h6': {
                marginTop: rhythm(2),
            },
            // children ol, ul
            'li>ol,li>ul': {
                marginLeft: '20px',
                marginBottom: 0,
            },
            // Blockquote styles.
            blockquote: {
                ...scale(1 / 5),
                borderLeft: `${rhythm(6 / 16)} solid ${darkAccent}`,
                paddingLeft: rhythm(10 / 16),
                fontStyle: 'italic',
                marginLeft: 0,
                marginRight: 0,
            },
            'blockquote > :last-child': {
                marginBottom: 0,
            },
            'blockquote cite': {
                ...adjustFontSizeTo(options.baseFontSize),
                color: options.bodyColor,
                fontStyle: 'normal',
                fontWeight: options.bodyWeight,
            },
            'blockquote cite:before': {
                content: '"— "',
            },
            [MOBILE_MEDIA_QUERY]: {
                html: {
                    ...vr.establishBaseline(),
                },
                blockquote: {
                    borderLeft: `${rhythm(3 / 16)} solid ${darkAccent}`,
                    paddingLeft: rhythm(9 / 16),
                    fontStyle: 'italic',
                    marginLeft: rhythm(-3 / 4),
                    marginRight: 0,
                },
            },
        };
    },
});

export const { scale, rhythm, options } = typography;
export default typography;
