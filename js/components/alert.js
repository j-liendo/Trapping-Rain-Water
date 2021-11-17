export default class Alert {
    constructor() {
        this.alert = document.getElementById('alert');
    }

    showAlert(message) {
        this.alert.classList.remove('d-none');
        this.alert.innerText = message;
    }

    hideAlert() {
        this.alert.classList.add('d-none');
    }
}