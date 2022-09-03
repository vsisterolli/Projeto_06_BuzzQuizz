function choose(ChoosenAnswer){
    const Parent = ChoosenAnswer.parentNode  // Find the question
    const AllAnswers = Parent.children // Find all alternatives to the specific question
    let h1Elements // Need to change color inside the html's h1 that doesn't accept classes


    // Avoid clicking on already answered questions 
    if (!ChoosenAnswer.classList.contains('AnswerOpacity')){ // To avoid exchanging alternatives
        for (let i = 0; i < AllAnswers.length; i++){
            if (AllAnswers[i] !== ChoosenAnswer){ // Apply opacity to unchosen alternatives
                AllAnswers[i].classList.add('AnswerOpacity');
            }
        
            // Add colors for right and wrong questions 
            h1Elements = AllAnswers[i].getElementsByTagName("h1");
            if (AllAnswers[i].children[2].classList.contains('true')){
                h1Elements[0].style.color = "#009C22";
            } else {
                h1Elements[0].style.color = "#FF4B4B";
            }
        }

        // Scroll to next question
        if (Parent.parentNode.nextElementSibling !== null) {
            setTimeout(ScroollToNextQuestion, 2000, Parent.parentNode.nextElementSibling);
        }
    }
}

function ScroollToNextQuestion(element){
    element.scrollIntoView({behavior: "smooth", block: "center"});
}
