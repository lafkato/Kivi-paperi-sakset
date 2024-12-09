const choices = document.querySelectorAll('.choices img');
const resultText = document.getElementById('result-text');
const resetBtn = document.getElementById('reset-btn');
const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const fightContainer = document.getElementById('fight-container');

let userScore = 0;
let computerScore = 0;
const maxScore = 15; // Maksimipisteet pelin päättämiseksi

const computerChoice = () => ['kivi', 'paperi', 'sakset'][Math.floor(Math.random() * 3)];

const determineWinner = (userChoice, compChoice) => {
    if (userChoice === compChoice) return "Tasapeli!";
    if ((userChoice === 'kivi' && compChoice === 'sakset') ||
        (userChoice === 'paperi' && compChoice === 'kivi') ||
        (userChoice === 'sakset' && compChoice === 'paperi')) return "Voitit!";
    return "Tietokone voitti!";
}

const checkGameOver = () => {
    if (userScore === maxScore) {
        showGameOver("Voitit pelin! Onnittelut!");
    } else if (computerScore === maxScore) {
        showGameOver("Tietokone voitti pelin! Yritä uudelleen!");
    }
};

const showGameOver = (message) => {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 9999;
    overlay.style.color = '#fff';
    overlay.style.fontSize = '2em';
    overlay.style.textAlign = 'center';
    overlay.innerHTML = `<p>${message}</p><button id="play-again">Pelaa uudelleen</button>`;
    document.body.appendChild(overlay);

    const playAgainBtn = document.getElementById('play-again');
    playAgainBtn.style.marginTop = '20px';
    playAgainBtn.style.padding = '10px 20px';
    playAgainBtn.style.backgroundColor = '#2ecc71';
    playAgainBtn.style.color = '#fff';
    playAgainBtn.style.border = 'none';
    playAgainBtn.style.cursor = 'pointer';
    playAgainBtn.addEventListener('click', () => {
        userScore = 0;
        computerScore = 0;
        userScoreElement.textContent = '0';
        computerScoreElement.textContent = '0';
        resultText.textContent = "Valitse kivi, paperi tai sakset aloittaaksesi pelin.";
        fightContainer.innerHTML = '';
        overlay.remove();
    });
};

const playGame = (userChoice) => {
    if (userScore === maxScore || computerScore === maxScore) return; // Estää pelaamisen pelin päätyttyä
    const compChoice = computerChoice();
    const result = determineWinner(userChoice, compChoice);
    resultText.innerHTML = `Valitsit: ${userChoice}<br>Tietokone valitsi: ${compChoice}<br>${result}`;
    animateResult(result, userChoice, compChoice);
    checkGameOver();
}

const animateResult = (result, userChoice, compChoice) => {
    resultText.classList.remove('tasapeli', 'voitit', 'tietokone-voitti');
    if (result === "Tasapeli!") {
        resultText.classList.add('tasapeli');
    } else if (result === "Voitit!") {
        resultText.classList.add('voitit');
        userScore++;
        animateScore(userScoreElement);
    } else {
        resultText.classList.add('tietokone-voitti');
        computerScore++;
        animateScore(computerScoreElement);
    }
    animateFight(userChoice, compChoice, result);
}

const animateScore = (scoreElement) => {
    scoreElement.textContent = scoreElement.id === 'user-score' ? userScore : computerScore;
    scoreElement.style.transform = 'scale(1.5)';
    setTimeout(() => {
        scoreElement.style.transform = 'scale(1)';
    }, 500);
}

const animateFight = (userChoice, compChoice, result) => {
    fightContainer.innerHTML = '';
    let userImg = document.createElement('img');
    let compImg = document.createElement('img');

    userImg.src = `${userChoice}.png`;
    compImg.src = `${compChoice}.png`;

    fightContainer.appendChild(userImg);
    fightContainer.appendChild(compImg);

    if (result === "Voitit!") {
        compImg.classList.add('explosion');
    } else if (result === "Tietokone voitti!") {
        userImg.classList.add('explosion');
    }
}

choices.forEach(choice => {
    choice.addEventListener('click', () => playGame(choice.id));
});

resetBtn.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    userScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    resultText.textContent = "Valitse kivi, paperi tai sakset aloittaaksesi pelin.";
    fightContainer.innerHTML = '';
});
