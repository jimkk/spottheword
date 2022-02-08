var answers = [
    'THE DOOR OPPOSITE MINE I TRIED, BUT FOUND IT LOCKED.|0,14,15,45,49|TITLE'
];
var clue;
var answer = '';

$(document).ready(()=>{
    var clue_w_answers = answers[0];
    clue = clue_w_answers.split('|')[0]
    answer_key = clue_w_answers.split('|')[1].split(',')
    for (var i = 0; i < answer_key.length; i++){
        answer += clue[parseInt(answer_key[i])]
    }
    var j = 20;
    clue_html = '<span>';
    for (var i = 0; i < clue.length; i++){
        if(clue[i].localeCompare(' ') == 0){
            clue_html += '</span><span> </span><span>';
        }
        else if (answer_key.includes(i.toString())){
            clue_html += '<span class="a">' + clue[i] + '</span>'  ;
        }
        else {
            clue_html += '<span>' + clue[i] + '</span>';
        }
    }
    clue_html += '</span>';
    $('#clue').append(clue_html);
})

function colourSpan(s, c){
    console.log('colouring...');
    $(s).css('background-color', c);
}

$('#guessForm').submit((e) =>{
    e.preventDefault();
    var guess = $('#guess').val();
    guess = guess.toUpperCase();
    if(guess.length != 5){
        console.log('Guess must be 5 letters')
        return false;
    }
    console.log('Guess is: ' + guess);
    
    var j = 0
    $('#clue').children('span').children('span').each(function(i){
        var letter = $(this).text();
        if(guess.includes(letter)){
            if(answer.includes(letter) && $(this).attr('class') === 'a'){
                setTimeout(colourSpan, 120*j, this, 'green')
                // $(this).css('background-color', 'green')
            }
            else{
                // console.log('found letter')
                setTimeout(colourSpan, 120*j, this, 'red')
                // $(this).css('background-color', 'red');
                // $(this).attr('class', 'shrink');
            }
            j += 1;
            // sleep(1000);
        }
    });

    if(guess == answer){
        console.log('Correct!')
        $('#clue').children('span').each(function(){
            var has_answer_letters = false;
            $(this).children('span').each(function(i){
                if ($(this).attr('class') != 'a')
                {
                    $(this).attr('class', 'shrink');
                }
                else
                {
                    colourSpan(this, 'green');
                    has_answer_letters = true;
                }
            });
            if(!has_answer_letters){
                $(this).attr('class', 'shrink');
            }
        });
    }

    $('#guesses').append('<span>' + guess + '</span>')
    $('#guess').val('');
    return false;
});

function sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
 }