class SeriesData {
    constructor (
        public name: number | string,
        public value: number | string,
        public min?: number | string,
        public max?: number | string
    ) {}
};

class ColorScheme {
    constructor (
        public domain: string[]
    ) {}
}

class GraphData {
    constructor (
        public name: string | number,
        public series: SeriesData[]
    ) {}
}

export { SeriesData, GraphData, ColorScheme };
