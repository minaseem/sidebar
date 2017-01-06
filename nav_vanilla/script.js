/**
 * Created by imamudinnaseem on 1/6/17.
 */

var css = (element, name, value) => {
    element.style[name] = value
}
var hide = function (selector) {
    css(document.querySelector(selector), 'display', 'none')
}

var show = function (selector) {
    css(document.querySelector(selector), 'display', 'initial')
}

var executeSideEffects = (currentPos, isMoving) => {
    if(isMoving)
        css(document.querySelector('.nav'), 'transition', 'none')
    else
        css(document.querySelector('.nav'), 'transition', 'transform 200ms cubic-bezier(0, 0, 0.3, 1)')
    css(document.querySelector('.nav'), 'transform', `translate3d(${currentPos}%, 0 ,0)`)
    css(document.querySelector('.overlay'), 'opacity', 1 + currentPos * 0.01)
}
(function () {
    hide('.overlay')
    var currentPos = -105
    var startX;
    var isMoving = false;
    var navWidth = document.querySelector('.nav').getBoundingClientRect().width
    document.querySelector('.ham').addEventListener('click', () => {
        css(document.querySelector('.nav'), 'transform', 'translate3d(0,0,0)')
        show('.overlay')
        currentPos = 0
        css(document.querySelector('.overlay'), 'opacity', 1)
    })

    document.querySelector('.overlay').addEventListener('click', () => {
        css(document.querySelector('.nav'), 'transform', 'translate3d(-105%,0,0)')
        css(document.querySelector('.overlay'), 'opacity', 0)
    })

    document.querySelector('.overlay').addEventListener('transitionend', function (e) {
        if (this.style.opacity === '0') {
            hide('.overlay')
        }
    })

    document.querySelector('.nav').addEventListener('touchmove', (e) => {
        e.preventDefault()
        const currentX = e.touches[0].clientX
        const delta = (startX - currentX) / navWidth
        const newPos = currentPos - delta * 100
        if (newPos <= 0 && newPos >= -105) {
            currentPos = newPos
            isMoving = true
            startX = currentX
            executeSideEffects(currentPos, isMoving)
        }
    })


    document.querySelector('.nav').addEventListener('touchend', (e) => {
        isMoving = false
        if (currentPos > -50) {
            currentPos = 0
        } else {
            currentPos = -105
        }
        executeSideEffects(currentPos)
        if(currentPos === -105)
            hide('.overlay')
    })


    document.querySelector('.nav').addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX
    })
})()
