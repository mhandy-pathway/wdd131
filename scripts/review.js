let reviewCnt = parseInt(localStorage.getItem('reviewCnt')) || 0;
reviewCnt += 1;
localStorage.setItem('reviewCnt', reviewCnt);
document.getElementById('reviewNumber').textContent = reviewCnt;