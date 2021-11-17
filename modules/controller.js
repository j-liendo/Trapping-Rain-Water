import Alert from "./components/alert.js";
import Model from "./model.js";

export default class Controller {
    constructor() {
        this.input = '';
        this.inputTag = document.getElementById('input');
        this.alert = new Alert();

        this.model = new Model();
    }

    handleInput = () => {
        // Hide alert
        this.alert.hideAlert();

        // Input tag mustn't empty
        if (this.inputTag.value === '') {
            this.alert.showAlert('Input is empty')
            return;
        }

        this.input = this.inputTag.value;
        let arr = this.input.split(',');

        // All arr elementes are numbers
        for (const i in arr) {
            if (isNaN(arr[i]) && arr[i] < 0) {
                this.alert.showAlert('Input not valid')
                return;
            }
        }

        // All arr elementes are numbers positives
        for (const i in arr) {
            if (arr[i] < 0) {
                this.alert.showAlert('Number(s) most be positives')
                return;
            }
        }

        // All arr elementes are numbers int
        for (const i in arr) {
            if (arr[i] != parseInt(arr[i])) {
                this.alert.showAlert('Number(s) most be integers')
                return;
            }
        }

        // Render Function
        this.computeWaterTrap(arr);
    }

    // Render Function   
    computeWaterTrap = (array) => {
        // Make a copy of array
        let arr = [...array];

        // Parse the array to numbers int
        arr = arr.map(element => parseInt(element));

        // Get the maximium value in the array
        const max = [...arr].sort((a, b) => b - a)[0];

        // Create a new Array. This will be the graphic
        let newArr = [];

        // Make the graphic
        for (let i = max; i > 0; i--) {
            // Create a row
            let row = [];

            // Variables
            let space = false;
            let first = false;

            for (let j = 0; j < arr.length; j++) {
                if (arr[j] >= i) {
                    if (first && space) {
                        row.push('c');
                        row = row.map(n => (n === 0) ? n = 'f' : n = n);
                        space = false;
                    } else {
                        row.push('c');
                        first = true;
                    }
                } else {
                    if (!first) {
                        row.push('b');
                    } else {
                        row.push(0)
                    }
                    space = true
                }
            }
            // Push the row
            newArr.push(row);
        }

        const histogram = {
            'graphic': newArr,
            'width': array.length,
            'height': max,
            'units': this.spaceCounter(newArr)
        };

        // Set the histogram in the model
        this.model.setHistogram(histogram);
    }

    spaceCounter = (array) => {
        let counter = 0;

        for (const i in array) {
            for (const j in array[i]) {
                if (array[i][j] === 'f') {
                    counter++;
                }
            }
        }

        return counter;
    }
}