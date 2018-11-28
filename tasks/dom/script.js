

document.querySelector('#some-ul').addEventListener('click', ($event) => {
    alert($event.target.nodeName);
});