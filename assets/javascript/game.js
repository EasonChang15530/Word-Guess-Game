// food list
var foodList = ["hamburger", "sandwich", "pizza", "taco", "noodle", "dumpling", "sushi", "sashimi"];

// all 26 letters in the alphabet for random input
var alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// shows the number of wins
var winCount = 0;

// shows the number of losses
var lossCount = 0;

// drives the win counter
var correctGuessCounter = 0;

// shows the number of attempts left
var guessesRemaining = 8;

// placeholder for the chosen food
var randomFood = "";

// placeholders for letters in the food
var lettersInFood = [];

// number of blanks in the food
var numBlanks = 0;

// placeholder for blanks and hits
var fillingBlank = [];

// placeholder for wrongLetters
var wrongLetters = [];


// Initiates the code
function startGame() {
    randomFood = foodList[Math.floor(Math.random() * foodList.length)];
    // console.log(randomFood)

    lettersInFood = randomFood.split("");
    // console.log(lettersInFood)
    
    numBlanks = lettersInFood.length;

    guessedLetter = 0;
    correctGuessCounter = 0;
    guessesRemaining = 8;
    wrongLetters = [];
    fillingBlank = [];
    alphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    document.getElementById("numGuessesLeft").style.color = "green";
    isGaming = false;
    
    // holds the number of underscores that match a food
    for (var i = 0; i < numBlanks; i++) {
        fillingBlank[i] = "_";
        document.getElementById("foodToGuess").textContent = fillingBlank;
    }

    document.getElementById("foodToGuess").textContent = fillingBlank.join("");
    document.getElementById("numGuessesLeft").textContent = guessesRemaining;
    document.getElementById("winCounter").textContent = winCount;
    document.getElementById("lossCounter").textContent = lossCount;
    document.getElementById("wrongGuesses").textContent = wrongLetters;

    console.log(randomFood);
    console.log(lettersInFood);
    console.log(numBlanks);
    console.log(fillingBlank);
}

// To display correct guessed letters and wrong letters in their corresponding position and also decreases the count of remaining guesses accordingly.
function compareLetter(parameter1) {
    if (randomFood.indexOf(parameter1) > -1) {
        for (var i = 0; i < numBlanks; i++) {
            if (lettersInFood[i] === parameter1) {
                correctGuessCounter++;

                // When food contains n identical letters, it means n times loops.
                console.log(i)

                // Replace the matching letter (correct guessed letter) to the corresponding position in fillingBlank.
                fillingBlank[i] = parameter1;
                
                // Update it to HTML corresponding position.
                document.getElementById("foodToGuess").textContent = fillingBlank.join("");
            }
        }

        console.log(fillingBlank);
    }
    else {
        wrongLetters.push(parameter1);
        guessesRemaining--;
        
        // Change the color to red when the guessesRemaining is 3 or less.
        if (guessesRemaining <= 3) {
            document.getElementById("numGuessesLeft").style.color = "red";
        }
        document.getElementById("numGuessesLeft").textContent = guessesRemaining;
        document.getElementById("wrongGuesses").textContent = wrongLetters;

        console.log('Wrong letters = ' + wrongLetters);
        console.log('Guesses remaining are ' + guessesRemaining);
    }
}

// To display the counts of wins and losses
function winLose() {
    if (correctGuessCounter === numBlanks) {
        winCount++;

        document.getElementById("winCounter").textContent = winCount;
        startGame();
    }
    else if (guessesRemaining === 0) {
        lossCount++;

        document.getElementById("lossCounter").textContent = lossCount;
        startGame();
    }
}


// starts Game!!!
startGame();

// Captures user input key.
document.onkeyup = function (event) {
    isGaming = true;
    var guessedLetter = event.key;
    // When any letter in the alphabetArray has been used once, it is removed from the alphabetArray.
    for (var i = 0; i < alphabetArray.length; i++) {
        if (guessedLetter === alphabetArray[i] && isGaming === true) {
            console.log('Userkey letter = ' + guessedLetter)
            console.log(alphabetArray[i])

            //Use the the array's splice method to remove the guessed letters from the alphabetArray.
            var popLetter = alphabetArray.splice(i, 1);

            console.log(alphabetArray);
            console.log('Pop letter is = ' + popLetter);

            compareLetter(guessedLetter);
            winLose();
        }
    }
}


