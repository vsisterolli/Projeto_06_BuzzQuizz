function choose(ChoosenAnswer){
    const Parent = ChoosenAnswer.parentNode  // Find the question
    const AllAnswers = Parent.children // Find all alternatives to the specific question


    if (!ChoosenAnswer.classList.contains('AnswerOpacity')){ // To avoid exchanging alternatives
        for (let i = 0; i < AllAnswers.length; i++){
            if (AllAnswers[i] !== ChoosenAnswer){ // Apply opacity to unchosen alternatives
                AllAnswers[i].classList.add('AnswerOpacity');
            }

            // Adicionar Cores
            if (AllAnswers[i].children[2].classList.contains('true')){
                console.log(AllAnswers[i].children[2].classList.contains('true'))
                console.log(AllAnswers[i].children[1].classList)
                AllAnswers[i].children[1].classList.add('true');
                console.log(AllAnswers[i].children[1].classList)
            } else if (AllAnswers[i].children[2].classList.contains('false')){
                console.log(AllAnswers[i].children[2].classList.contains('true'))
                console.log(AllAnswers[i].children[1].classList)
                AllAnswers[i].children[1].classList.add('false');
                console.log(AllAnswers[i].children[1].classList)
            }
        }
    }
}