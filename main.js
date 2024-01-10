const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

// loop through list and to each one attach an eventlistener CLICK.  WHenever that's fired execute function flip card

function flipCard() {
  if(lockBoard) return;

  if (this === firstCard) return;

  this.classList.add('flip');
  //Can use the console.log to see what the function is referencing to what fired the event
  //console.log(this);

  if(!hasFlippedCard) {

    //first click
    hasFlippedCard = true;
    firstCard = this;
    //console.log(hasFlippedCard, firstCard);

    return;

  } 

  //second click
  hasFlippedCard = false;
  secondCard = this;

  //console.log(firstCard, secondCard);

  checkForMatch();

}


function checkForMatch() {
//do cards match???
  //CHECK IF CARDS MATCH use the data attribute in HTML example: data-framework
  //console.log(firstCard.dataset.framework);
  //console.log(secondCard.dataset.framework);
let isMatch =firstCard.dataset.framework === secondCard.dataset.framework;

isMatch ? disableCards() : unflipCards();
 
}

function disableCards() {
  //if it's a match remove eventListener so other cards can't be flipped over
  
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  // if no match, we won't fill all the cards back to beginning

  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    lockBoard = false;
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12)
    card.style.order = randomPos;
  })
})();


cards.forEach(card => card.addEventListener('click', flipCard));
