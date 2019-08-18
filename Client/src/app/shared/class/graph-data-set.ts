import { GraphData, ColorScheme } from './graph-data';

export class GraphDataSet {
    constructor (
        public graphData?: GraphData[],
        public graphColorScheme?: ColorScheme,
        public graphSize?: number[]
    ) {}
}
