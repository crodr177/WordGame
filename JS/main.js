var words3OrMore = commonWords.filter(function(item){
  if(item.length >= 3) {
    return true;
  }else {
    return false;
  }
});

var placeWord = document.querySelector("#word");
var lifeCount = document.querySelector("#lives");
var graveyard = document.querySelector("#graveyard");

var word = Math.floor(Math.random() * words3OrMore.length);

var randomWord = words3OrMore[word];
console.log(randomWord);

var placeholder = "_";

var wordHidden = placeholder.repeat(randomWord.length);

var letterComparer = randomWord.split('');

var wordArr = wordHidden.split('');

var lives = 8;

var graveArr = [];

$("#start-game").on("click", function(){

  placeWord.innerHTML = wordHidden;
  lifeCount.innerHTML = `Lives: ${lives}`;

  if(!(wordArr.join('') === randomWord)){
    $("#letter-guess").on("click", function(e){
      e.preventDefault();
      var value = $("#input").val();
      if(wordArr.join('') !== randomWord){
        if (letterComparer.indexOf(value) === -1) {
            if(graveArr.indexOf(value) === -1) {
              lives--
              graveArr.push(value);
              graveyard.innerHTML = graveArr.join('');
            }
            else {
              alert("Already used letter.");
            }
            if(lives === 0) {
              alert("You lost.")
              lives = 8;
              location.reload();
              graveArr = [];
            }
        } else {
          for(var i = 0; i < letterComparer.length; i++){
            if(value === letterComparer[i]){
              wordArr.splice(i, 1, value);
            }
          }
        }
      }
      $("#input").val('');
      lifeCount.innerHTML = `Lives: ${lives}`;
      placeWord.innerHTML = wordArr.join('');
      if(wordArr.join('') === randomWord) {
        alert("You won!");
        graveArr = [];
      }
    })
  }else {
    location.reload();
  }
})