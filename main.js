  const closeButton = document.querySelector(".closeButton");
  const ruleBtnId = document.getElementById("button");
  const ruleInfo = document.querySelector(".rule-info");
  const pcScore = document.querySelector("#pcScoreBoard");  
  const userScore = document.querySelector("#userScoreBoard");
  const winnerUpdate = document.getElementById("you-win");
  const nextButtton = document.querySelector("#nextPageRedirect");
  const playAgainButton = document.querySelector(".playAgainButton");
  const whoPicked = document.querySelector(".picked-heading");
  const AGAINSTPC = document.querySelector("#against-pc");
  const line = document.querySelectorAll(".line");


  const whatHaveBeenPicked = document.querySelector(".whatHaveBeenPicked");//visible isse kara diya
  const userPicked = document.getElementById("userPicked"); // inner text
  const compPicked =  document.getElementById("compPicked") // inner text

  let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;
  let playerScore = parseInt(localStorage.getItem("playerScore")) || 0;

  playerScore > computerScore
    ? (nextButtton.style.display = "block")
    : (nextButtton.style.display = "none");

  pcScore.innerText = computerScore;
  userScore.innerText = playerScore;

  let choices = document.querySelectorAll(".CIRCLE"); //it is selecting all 3 circle

  const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  const tie = () => {
    console.log("game tie");
    winnerUpdate.innerText = "TIE";
  };

  const showWinner = (userWin) => {
    if (userWin) {
      playerScore++;
      userScore.innerText = playerScore;
      localStorage.setItem("playerScore", playerScore);
      console.log("you win");
      winnerUpdate.innerText = "YOU WIN";
    } else {
      computerScore++;
      pcScore.innerText = computerScore;
      localStorage.setItem("computerScore", computerScore);
      console.log("you lost");
      winnerUpdate.innerText = "YOU LOST";
    }
  };

  // -----------------------------------------------------------------------------main-----------------------------------------------------------------
  const playGame = (userChoice) => {
    console.log("user choice is = ", userChoice);
    userPicked.innerText =  userChoice;

    const computerChoice = genCompChoice();

    console.log("comp choice is = ", computerChoice);
    compPicked.innerHTML = computerChoice;

    if (userChoice === computerChoice) {
      tie();
    } else {
      let userWin = true;
      if (userChoice === "rock") {
        userWin = computerChoice === "paper" ? false : true;
      } else if (userChoice === "paper") {
        userWin = computerChoice === "scissor" ? false : true;
      } else {
        userWin = computerChoice === "rock" ? false : true;
      }
      showWinner(userWin);
    }

    let circleHidden = () => {
      choices.forEach(element => {
        element.style.pointerEvents = "none";
        element.style.opacity = "0";
        element.style.transition = "all 0.8s ease";
      });
    }
    circleHidden();

    let lineHidden = () => {
      line.forEach(element => {
        element.style.opacity = "0";
        element.style.transition = "all 0.8s ease";
      });
    }
    lineHidden();

    function whoPickedWhatDisplay () {
      whatHaveBeenPicked.classList.add("visible");
    }
    whoPickedWhatDisplay();

    function playAgainButtonPopUP() {
      playAgainButton.classList.add("visible");
    }
    playAgainButtonPopUP();

    let against = () => {
      AGAINSTPC.classList.add("visible");
    };
    against();

    function pickedText() {
      whoPicked.classList.add("visible");
      setTimeout(() => {
        whoPicked.style.transition = "all 0.5s out";
      }, 0);
    }
    pickedText();
    
    playerScore > computerScore
      ? (nextButtton.style.display = "block")
      : (nextButtton.style.display = "none");
  };

  // was trying to set what user and computer have choose to be in center but i can't...
    // document.querySelectorAll(".CIRCLE").forEach((element) => {
    //   element.addEventListener("click", (event) => {
    //     event.target.classList.add("userChoiceCenterDiv");
    //   });
    // });

  // we got the id and run a for each loop  without doing onclick thing  and it is giving our id
  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const userChoice = choice.getAttribute("id");
      playGame(userChoice);
    });
  });

  closeButton.addEventListener("click", () => {
    ruleInfo.classList.remove("visible");
  });

  ruleBtnId.addEventListener("click", () => {
    ruleInfo.classList.toggle("visible");
  });
