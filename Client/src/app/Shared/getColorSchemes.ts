import { ColorScheme } from '../Classes';

function getArtHistoryInspiredColorScheme () {
    return new ColorScheme([
        '#FFCE00',
        '#0375B4',
        '#007849',
        '#262228'
    ]);
}

function getMutedAndMinimalColorScheme () {
    return new ColorScheme([
        '#96858F',
        '#6D7993',
        '#9099A2',
        '#D5D5D5'
    ]);
}

function getModernAndCleanColorScheme () {
    return new ColorScheme([
        '#E37222',
        '#07889B',
        '#66B9BF',
        '#EEAA7B'
    ]);
}


function getSubduedAndProfessional () {
    return new ColorScheme([
        '#90AFC5',
        '#d8efff',
        '#336B87',
        '#145170',
        '#006da5',
        '#2A3132',
        '#234b51',
        '#763726',
        '#b7624b',
        '#4f2b21',
        '#5e4b46',
        '#a83112',
        '#211411'
    ]);
}

export {
    getModernAndCleanColorScheme,
    getMutedAndMinimalColorScheme,
    getArtHistoryInspiredColorScheme,
    getSubduedAndProfessional
};

