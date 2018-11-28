function debounce(func, delay) {
    let timer;
    return () => {

        clearTimeout(timer);
        timer = setTimeout(func, delay);
    }
}

document.querySelector('.t').addEventListener('keyup', debounce(() => console.log(1), 1000));
