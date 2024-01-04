/** @type HTMLAudioElement */
const audio = document.getElementById('audio')
/** @type HTMLImageElement */
const avatar = document.getElementById('avatar')

let playing = false

function rotate() {
    avatar.style.animationPlayState = 'running'
}

function pause() {
    avatar.style.animationPlayState = 'paused'
}

function play() {
    if (playing) {
        audio.pause()
    } else {
        audio.play()
    }
    playing = !playing;
}

avatar.onclick = play
audio.onplay = audio.onplaying = rotate
audio.onpause = audio.onended = audio.onwaiting = pause