function Test(questions){
    this.score = 0;
    this.questions = questions;
    this.questionNumber =0;
};

Test.prototype.getQuestionNumber = function(){
    return this.questions[this.questionNumber];
};

Test.prototype.FinQuestion = function(){
    return this.questions.length === this.getQuestionNumber;
};

Test.prototype.guess = function(choix){
    this.getQuestionNumber++;

    if(this.getQuestionNumber().correctReponse(choix)){
        this.score++;
    }
}