let targets = document.querySelectorAll('.observer-item');
let currentIndex = 0;

function initAnimation(element) {
    element.classList.add('pl-exp-animation');
}

function transformProgress(element, callback) {
    requestAnimationFrame(function monitorTransform() {
        let transformValue = getComputedStyle(element).transform;

        if (transformValue !== 'none') {
            let matrix = transformValue.match(/matrix.*\((.+)\)/)?.[1].split(', ');
            let translateX = matrix ? parseFloat(matrix[4]) : 0;

            if (translateX <= window.innerWidth * 0.8) {
                callback();
                return;
            }
        }
        requestAnimationFrame(monitorTransform);
    });
}

function animateNext() {
    if (currentIndex < targets.length) {
        let target = targets[currentIndex];
        let observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                initAnimation(entry.target);
                transformProgress(entry.target, () => {
                    currentIndex++;
                    observer.unobserve(entry.target);
                    animateNext();
                });
            }
        });

        observer.observe(target);
    }
}

window.onload = function() {
    animateNext();
};
  
