let defaultCardNumbers = 3
let level = 1
const waitTime = 5

const playButton = document.querySelector('.timer')
const instructionText = document.querySelector('.instruction-text')
const cards = document.querySelector('.cards')
const modalContainer = document.querySelector('.modal-container')
const levelNumberHeader = document.querySelector('.level-header')

let numbers = []

// playButton.

const createCards = () => {
    instructionText.classList.add('d-none')
    cards.innerHTML = ""
    let counter = waitTime

    for (let i = 0; i < defaultCardNumbers + level - 1; i++) {
        const card = document.createElement('div')
        const randomNumber = getRandomInterval(100)
        card.classList.add('card')
        card.innerHTML = `<div class="card-inner">
                            <div class="card-front">${randomNumber}</div>
                            <div class="card-back"></div>
                          </div>`
        cards.append(card)
        numbers.push(randomNumber)
    }
    numbers.sort((a, b) => a - b)

    let interval = setInterval(() => {
        if (counter === 0) {
            clearInterval(interval)
            const icon = document.createElement('i');
            icon.classList = 'fa fa-refresh'
            playButton.innerHTML = ""
            playButton.append(icon)
            closeCards()
        } else {
            playButton.innerHTML = counter;
            counter--
        }
    }, 1000)
}

const closeCards = () => {
    Array.from(cards.children).forEach((card) => {
        const innerCard = card.children[0]
        innerCard.classList.add('card-close')
        innerCard.addEventListener("click", handleCardClick)
    })
}

const showSuccessModal = () => {
   setTimeout(() => {
       modalContainer.querySelector('.modal-body-success').classList.remove('d-none')
       modalContainer.querySelector('.modal-body-error').classList.add('d-none')
       modalContainer.classList.remove('d-none')
   }, 600)
}

const showErrorModal = () => {
    setTimeout(() => {
        modalContainer.querySelector('.modal-body-success').classList.add('d-none')
        modalContainer.querySelector('.modal-body-error').classList.remove('d-none')
        modalContainer.classList.remove('d-none')
    }, 600)
}

const handleCardClick = (event) => {
    event.target.classList.remove('card-close')
    const cardNumber = +event.target.innerText
    if (cardNumber !== numbers[0]) {
        modalContainer.querySelector('.level-number').innerHTML = level + "-level"
        showErrorModal()
    }
    numbers.shift()

    if (numbers.length === 0) {
        showSuccessModal()
    }
}


const getRandomInterval = (max) => {
    return Math.floor(Math.random() * max + 1)
}

const resetGame = () => {
    modalContainer.classList.add('d-none')
    level = 1;
    numbers = []
    setLevelNumber(level)
    createCards()
}

const setLevelNumber = (number) => {
    levelNumberHeader.innerHTML = number + "-level"
}

const goNextLevel = () => {
    modalContainer.classList.add('d-none')
    level++
    numbers = []
    setLevelNumber(level)
    createCards()
}
// 1 level - 3
// 2 level - 4
// 3 level - 5
