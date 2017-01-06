/**
 * Created by imamudinnaseem on 1/6/17.
 */
var hide = function (selector) {
    $(selector).css('display', 'none')
}

var show = function (selector) {
    $(selector).css('display', 'initial')
}

var executeSideEffects = (currentPos, isMoving) => {
    if(isMoving)
        $('.nav').css('transition', 'none')
    else
        $('.nav').css('transition', 'transform 200ms cubic-bezier(0, 0, 0.3, 1)')
    $('.nav').css('transform', `translate3d(${currentPos}%, 0 ,0)`)
    $('.overlay').css('opacity', 1 + currentPos * 0.01)
}
(function () {
    hide('.overlay')
    var currentPos = -105
    var startX;
    var isMoving = false;
    var navWidth = $('.nav').width()
    $('.ham').on('click', () => {
        $('.nav').css('transform', 'translate3d(0,0,0)')
        show('.overlay')
        currentPos = 0
        $('.overlay').css('opacity', 1)
    })

    $('.overlay').on('click', () => {
        $('.nav').css('transform', 'translate3d(-105%,0,0)')
        $('.overlay').css('opacity', 0)
    })

    $('.overlay').on('transitionend', function (e) {
        if (this.style.opacity === '0') {
            hide('.overlay')
        }
    })

    $('.nav').on('touchmove', (e) => {
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


    $('.nav').on('touchend', (e) => {
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


    $('.nav').on('touchstart', (e) => {
        startX = e.touches[0].clientX
    })
})()
