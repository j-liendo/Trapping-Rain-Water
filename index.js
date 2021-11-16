const calc = (array) => {
    let arr = [...array];
    arr = arr.map(element => parseInt(element));
    console.log(arr)
    const max = [...arr].sort((a, b) => b - a)[0];
    let newArr = [];
    for (let i = max; i > 0; i--) {
        let row = [];
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
        newArr.push(row);
    }
    return {
        'histogram': newArr,
        'width': array.length,
        'height': max,
        units: spaceCounter(newArr)
    };
}

const spaceCounter = (array) => {
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

const render = (object) => {
    const histogram = object.histogram;
    const info = document.getElementById('info');
    const table = document.getElementById('table');
    table.innerHTML = '';
    // Histogram Render
    for (const i in histogram) {
        const row = table.insertRow();;
        for (const j in histogram[i]) {
            const col = document.createElement('td');
            col.classList = `box ${histogram[i][j]}`
            row.appendChild(col);
        }
    }
    // Histogram render data
    info.innerHTML = `
        <li><b>Units of Water:</b> <em>${object.units}</em></li>
        <li><b>Width:</b> <em>${object.width}</em></li>
        <li><b>Height:</b> <em>${object.height}</em></li>
    `;
    console.log(object)
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('button');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        handleInput(e)
    });

    const array = [3, 10, 0, 11, 2, 4];
    console.log(calc(array));
    render(calc(array));


})


var input = ''

const handleInput = (e) => {

    hideAlert();
    const inputTag = document.getElementById('input');
    if (inputTag.value === '') {
        showAlert('Input is empty')
        return;
    }
    input = inputTag.value;
    let arr = input.split(',');
    for (const i in arr) {
        if (isNaN(arr[i])) {
            showAlert('Input not valid')
            return;
        }
    }

    console.log(arr);
    render(calc(arr));
}

const showAlert = (message) => {
    const alert = document.getElementById('alert');
    alert.classList.remove('d-none');
    alert.innerText = message;
}

const hideAlert = () => {
    const alert = document.getElementById('alert');
    alert.classList.add('d-none');
}