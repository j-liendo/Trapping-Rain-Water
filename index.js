import Controller from './modules/controller';

console.log('Connect');

document.addEventListener('DOMContentLoaded', () => {
    const controller = new Controller();
    const btn = document.getElementById('button');
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        controller.handleInput();
    });

    const array = [2, 1, 4];
    console.log(controller.computeWaterTrap(array));
});