function qualifie(){
    if(test.FinQuestion()){
        
    }else{
        //affichage des questions
        var question = document.getElementById("question");
        question.innerHTML = test.getQuestionNumber().text;

        //affichage des choix
        var choix = test.getQuestionNumber().choix;

        for(var i=0 ; i<choix.length ; i++){
            var element = document.getElementById("choice"+i);
            element.innerHTML = choix[i];
        }
    }
}

function reponse(id, reponse){
    var button = document.getElementById(id);
    button.onclick = function(){
        test.reponse(reponse);
        qualifie();
    }
}


function scoreTest(){
    var resultat_de_test_en_ligne = "<h1>resultat</h1>";
        resultat_de_test_en_ligne += "<h1 id='scoore'>le score est :"+ quiz.score +" </h1>";
    var element = document.getElementById("quiz");
    element.innerHTML = resultat_de_test_en_ligne;
}

//instanciation
var questions=[
    new Question("What does HTML stand for?",  
        ["Hyper Text Preprocessor langage",
        "Hyper Text Markup Language",
        "Hyper Text Multiple Language",
        "Hyper Tool Multi Language"],
        "Hyper Text Markup Language"),
    new Question(
        "What does CSS stand for?",  
        ["Hyper Text Preprocessor",
        "Hyper Text Markup Language",
        "Hyper Text Multiple Language",
        "Hyper Tool Multi Language"],
        "Cascading Style Sheet"),
    new Question(
        "What does PHP stand for?",  
        ["Common Style Sheet",
        "Colorful Style Sheet",
        "Computer Style Sheet",
        "Cascading Style Sheet"],
        "Hyper Text Markup Language"),
    Question(
        "What does SQL stand for?",  
        ["Stylish Question Language",
        "Stylesheet Query Language",
        "Statement Question Language",
        "Structured Query Language"],
        "Structured Query Language"),
    Question(
        "What does XML stand for?",  
        ["eXtensible Markup Language",
        "eXecutable Multiple Language",
        "eXTra Multi-Program Language",
        "eXamine Multiple Language"],
        "extensible Markup Language"),
];

var test = new Test(questions);

qualifie();