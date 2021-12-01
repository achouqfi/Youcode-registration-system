function Question(text, choix, reponse){
    this.text = text;
    this.choix = choix;
    this.reponse = reponse;
}

Question.prototype.correctReponse = function(choix){
    return choix === this.reponse;
};