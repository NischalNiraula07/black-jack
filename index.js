let player = {
    name: "Ozzy",
    chips: 1000
}

let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let autoRestartTimeout = null

let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let playerChipsEl = document.getElementById("player-chips-el")

playerEl.textContent = player.name + ": $" + player.chips
playerChipsEl.textContent = "Player's Chips: $" + player.chips

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    clearTimeout(autoRestartTimeout)
    isAlive = true
    hasBlackJack = false
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard

    let dealerCardsEl = document.getElementById("dealer-el")
    if (dealerCardsEl) {
        dealerCardsEl.textContent = "Dealer's Cards: "
    }

    renderGame()
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false

        player.chips -= 100
        playerEl.textContent = player.name + ": $" + player.chips
        if (playerChipsEl) {
            playerChipsEl.textContent = "Player's Chips: $" + player.chips
        }

        autoRestartTimeout = setTimeout(() => {
            startGame()
        }, 2000)
    }
    messageEl.textContent = message
}

function hit() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
}

function stand() {
    if (isAlive === true && hasBlackJack === false) {
        let dealerCard1 = getRandomCard()
        let dealerCard2 = getRandomCard()
        let dealerSum = dealerCard1 + dealerCard2
        let dealerCardsEl = document.getElementById("dealer-el")
        dealerCardsEl.textContent = "Dealer's Cards: " + dealerCard1 + " " + dealerCard2 + " (Sum: " + dealerSum + ")"
        
        if (dealerSum > 21 || sum > dealerSum) {
            message = "You win!"
            player.chips += 100
        } else if (sum < dealerSum) {
            message = "Dealer wins!"
            player.chips -= 100
        } else {
            message = "It's a tie!"
        }
        
        messageEl.textContent = message
        playerEl.textContent = player.name + ": $" + player.chips
        if (playerChipsEl) {
            playerChipsEl.textContent = "Player's Chips: $" + player.chips
        }
    }
}

function resetGame() {
    clearTimeout(autoRestartTimeout)
    cards = []
    sum = 0
    hasBlackJack = false
    isAlive = false
    message = ""
    messageEl.textContent = message
    sumEl.textContent = "Sum: "
    cardsEl.textContent = "Cards: "
    let dealerCardsEl = document.getElementById("dealer-el")
    dealerCardsEl.textContent = "Dealer's Cards: "
}