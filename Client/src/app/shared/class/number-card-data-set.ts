// import { SeriesData, ColorScheme } from './index';
import { ColorScheme, SeriesData } from './graph-data';

export class NumberCardDataSet {
    constructor (
        public graphData: SeriesData[],
        public graphColorScheme: ColorScheme,
        public graphSize?: number[]
    ) {}
}
