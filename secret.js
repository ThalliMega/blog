let count = 0
const ename = document.getElementById('name')

ename.onclick = () => {
    count++
    if (count==22) {
        happen()
    }
}

function happen() {
    const body = document.getElementsByTagName('body')[0]
    while (body.lastChild) {
        body.removeChild(body.lastChild)
    }
    body.style = 'justify-content: center;align-items: center;'
    const p = document.createElement('p')
    p.style = 'text-align: center;font-size: 2em;max-width: 50vw;word-break: break-all;'
    p.textContent = '5LiW55WM5bey5oKE54S25rqc6LWw44CCCuWcqOaIkeeBtemtgua3seWkhArmraTml7bmraTliLvllK/kuIDnmoTnnJ/lrp7kuYvlnLAK5raM6LW35by654OI6ICM5peg5b2i55qE5oKy5Lyk77yMCuS7v+S9m+acieS6uuato+WcqOm7keaal+eahOaIv+mXtOmHjOeXm+WTreOAgg=='
    const audio = document.createElement('audio')
    audio.src = 'https://files.thallimega.win/129. You Cannot Go Back.mp3'
    audio.autoplay = true
    audio.onended = () => location.reload()
    body.insertAdjacentElement('afterbegin', audio)
    body.insertAdjacentElement('beforeend', p)
}