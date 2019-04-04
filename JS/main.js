var words3OrMore = commonWords.filter(function(item){
  if(item.length >= 3) {
    return true;
  }else {
    return false;
  }
});

var placeWord = document.querySelector("#word");
var placeImg = document.querySelector("#word-section");
var lifeCount = document.querySelector("#lives");
var lifeBar = document.getElementById("#lives");
var graveyard = document.querySelector("#graveyard");
var audio = document.querySelector("#audio");

var word = Math.floor(Math.random() * words3OrMore.length);

var randomWord = words3OrMore[word];
console.log(randomWord);

var placeholder = "_";

var wordHidden = placeholder.repeat(randomWord.length);

var letterComparer = randomWord.split('');

var wordArr = wordHidden.split('');

var lives = 100;

var graveArr = [];

var backgroundSizing = 250;

$("#start-game").on("click", function(){

  placeWord.innerHTML = wordHidden;
  lifeCount.innerHTML = `${lives}%`;
  $("#lives").width(backgroundSizing);

  if(!(wordArr.join('') === randomWord)){
    $("#letter-guess").on("click", function(e){
      e.preventDefault();
      var value = $("#input").val();
      if(wordArr.join('') !== randomWord){
        if (letterComparer.indexOf(value) === -1) {
            if(graveArr.indexOf(value) === -1) {
              backgroundSizing -= 25;
              lives -= 10;
              graveArr.push(value);
              graveyard.innerHTML = graveArr.join('');
              $("#lives").width(backgroundSizing);
              audio.play();
            }
            else {
              alert("Already used letter.");
            }
            if(lives === 0) {
              placeImg.innerHTML = '<img src="assets/loser-screen2.gif" style= "margin-left: 20px; border: 5px solid black;" />';
              $("#start-game").on("click", function(){
                location.reload();
                backgroundSizing = 250;
                lives = 100;
                graveArr = [];
              })
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
      lifeCount.innerHTML = `${lives}%`;
      placeWord.innerHTML = wordArr.join('');
      if(wordArr.join('') === randomWord) {
        alert("You won!");
        graveArr = [];
        backgroundSizing = 250;
      }
    })
  }else {
    location.reload();
  }
})