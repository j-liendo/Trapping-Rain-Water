import View from "./view.js";

export default class Model {
    constructor() {
        this.histogram = {
            'graphic': [],
            'width': 0,
            'height': 0,
            'units': 0
        }
        this.view = new View();
    }

    setHistogram(histogram) {
        this.histogram = histogram;
        this.view.render(histogram);
    }

    getHistogram() {
        return this.histogram;
    }

}