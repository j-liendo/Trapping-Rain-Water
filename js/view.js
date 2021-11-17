export default class View {
    constructor() {
        this.table = document.getElementById('table');
        this.info = document.getElementById('info');
    }

    render(histogram) {
        const graphic = histogram.graphic;
        this.table.innerHTML = '';
        // graphic Render
        for (const i in graphic) {
            const row = this.table.insertRow();;
            for (const j in graphic[i]) {
                const col = document.createElement('td');
                col.classList = `box ${graphic[i][j]}`
                row.appendChild(col);
            }
        }
        // Histogram render data
        this.info.innerHTML = `
        <li><b>Units of Water:</b> <em>${histogram.units}</em></li>
        <li><b>Width:</b> <em>${histogram.width}</em></li>
        <li><b>Height:</b> <em>${histogram.height}</em></li>
    `;
    }
}