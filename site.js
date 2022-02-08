var answers = [
    "IT IS NOT, HOWEVER, VISIBLE FROM THE GROUNDS.|1,3,31,35,43|TIMES",
    "I BEGAN TO LOOK AT SOME OF THE BOOKS AROUND ME.|2,5,6,14,35|BANKS",
    "ENGLAND, AS IF THAT MAP HAD BEEN MUCH USED.|4,6,9,20,39|ADAMS",
    "COME; I AM INFORMED THAT YOUR SUPPER IS READY.|3,12,18,34,43|ENDED",
    "I FOUND AN EXCELLENT SUPPER READY ON THE TABLE.|5,11,23,30,44|NEPAL",
    "I COULD SEE WAS THE WARM GREY OF QUICKENING SKY.|4,8,35,39,42|USING",
    "I HAVE ONLY THE COUNT TO SPEAK WITH, AND HE!|3,25,32,37,38|ASIAN",
    "I AM MYSELF THE ONLY LIVING SOUL WITHIN THE PLACE.|9,16,26,34,47|LOGIC",
    "BUT THERE WAS NO REFLECTION OF HIM IN THE MIRROR !|2,15,26,40,47|TONER",
    "I COULD HARDLY BELIEVE THAT IT WAS EVER THERE.|3,23,24,35,43|OTHER",
    "IT IS MORE DANGEROUS THAN YOU THINK IN THIS COUNTRY.|6,7,13,15,50|MONEY",
    "COUNT DRACULA, AS IT MAY HELP ME TO UNDERSTAND.|0,11,26,43,44|CLEAN",
    "SCYTHIA HAD MATED WITH THE DEVILS IN THE DESERT.|0,5,14,15,43|SITES",
    "TURKS SAY, 'WATER SLEEPS, AND ENEMY IS SLEEPLESS.|0,15,16,33,47|TERMS",
    "DANUBE AND BEAT THE TURK ON HIS OWN GROUND?|0,1,14,18,41|DATED",
    "TURK AND BROUGHT THE SHAME OF SLAVERY ON THEM!|5,6,13,31,43|ANGLE",
    "THEY SAID THAT HE THOUGHT ONLY OF HIMSELF.|5,10,21,32,40|STUFF",
    "HAPSBURGS AND THE ROMAN- OFFS CAN NEVER REACH.|1,6,16,22,42|ARENA"
];
var clue;
var answer = '';

const urlParams = new URLSearchParams(window.location.search);
const clue_param = urlParams.get('clue');

$(document).ready(()=>{
    var clue_w_answers = answers[0];
    if(clue_param && clue_param < answers.length){
        clue_w_answers = answers[clue_param];
    }
    console.log(clue_param);
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


