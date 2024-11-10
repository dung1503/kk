function createPixels(digitEl) {
    digitEl.innerHTML = '';
    for (let i = 0; i < 15; i++) { // 3 columns * 5 rows = 15 pixels
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        digitEl.appendChild(pixel);
    }
}

function updateDigit(digitEl, number) {
    const pixels = digitEl.querySelectorAll('.pixel');
    const patterns = {
        '0': [0, 1, 2, 3, 5, 6, 8, 9, 10, 11, 12, 13, 14],
        '1': [1, 4, 7, 10, 13],
        '2': [0, 1, 2, 5, 6, 7, 8, 9, 12, 13, 14],
        '3': [0, 1, 2, 5, 6, 7, 8, 11, 12, 13, 14],
        '4': [0, 3, 5, 6, 7, 8, 11, 14],
        '5': [0, 1, 2, 3, 6, 7, 8, 11, 12, 13, 14],
        '6': [0, 1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        '7': [0, 1, 2, 5, 8, 11, 14],
        '8': [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        '9': [0, 1, 2, 3, 5, 6, 7, 8, 11, 12, 13, 14]
    };

    // Reset all pixels
    pixels.forEach(pixel => pixel.classList.remove('on'));

    // Turn on pixels for the current number
    if (patterns[number]) {
        patterns[number].forEach(index => {
            pixels[index].classList.add('on');
        });
    }
}

function updateClock() {
    const hourTensEl = document.getElementById('hour-tens');
    const hourOnesEl = document.getElementById('hour-ones');
    const minuteTensEl = document.getElementById('minute-tens');
    const minuteOnesEl = document.getElementById('minute-ones');
    const colonEl = document.getElementById('colon');
    const dateEl = document.getElementById('date');

    createPixels(hourTensEl);
    createPixels(hourOnesEl);
    createPixels(minuteTensEl);
    createPixels(minuteOnesEl);

    // Cập nhật lần đầu (bắt đầu từ 23:59)
    updateDigit(hourTensEl, '2');
    updateDigit(hourOnesEl, '3');
    updateDigit(minuteTensEl, '5');
    updateDigit(minuteOnesEl, '9');

    // Chuyển đổi giờ sau  giây
    setTimeout(() => {
        updateDigit(hourTensEl, '0');
        updateDigit(hourOnesEl, '0');
        updateDigit(minuteTensEl, '0');
        updateDigit(minuteOnesEl, '0');
    }, 5000);

    // Hiệu ứng nhấp nháy cho dấu hai chấm
    setInterval(() => {
        colonEl.classList.toggle('on');
    }, 5000);

    // Cập nhật ngày
    const today = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('vi-VN', dateOptions);
    dateEl.textContent = formattedDate;
}

updateClock();