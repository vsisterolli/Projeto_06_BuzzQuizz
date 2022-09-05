function choose(ChoosenAnswer, QtdQuestions){
    let Parent = ChoosenAnswer.parentNode   // Find the question
    const AllAnswers = Parent.children      // Find all alternatives to the specific question
    let h1Elements                          // Need to change color inside the html's h1 that doesn't accept classes


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

        // Avoid double clicking on the same question and count twice 
        if (ChoosenAnswer.children[2].classList.contains('true') && !ChoosenAnswer.children[2].classList.contains('AlreadySelected')){
            ChoosenAnswer.children[2].classList.add('AlreadySelected')
            ResultPoints++;
        } 

        // Scroll to the next question
        if (Parent.parentNode.nextElementSibling !== null) {
            setTimeout(ScroollToNextQuestion, 2000, Parent.parentNode.nextElementSibling);
        } else{ // For the last question
            CalculateResult(QtdQuestions);
            ShowResult();
            const Main = document.querySelector('.main')
            setTimeout(ScroollToNextQuestion, 2000, Main.lastElementChild);
        }
    }
}

function ScroollToNextQuestion(NextElement){
    NextElement.scrollIntoView({behavior: "smooth", block: "center"});
}

function CalculateResult(NumberOfQuestions){
    ResultPoints = Math.round(ResultPoints*100/NumberOfQuestions);
}

function ShowResult (){
    const Main = document.querySelector('.main')
    for (let j = QuestionInfoResult.length - 1; j >= 0; j--){
        if (ResultPoints >= Number(QuestionInfoResult[j].minValue) && QtdMenu === 0) {
            QtdMenu++;
            Main.innerHTML += `
            <div class="question-container" data-identifier="quizz-result">
                <div class="question final-result-title">
                    ${ResultPoints}% de acerto: ${QuestionInfoResult[j].title}
                </div>
                <div class="answer-container">
                    <div class="final-result-container">
                        <img src="${QuestionInfoResult[j].image}">
                        <p class="final-result-text">${QuestionInfoResult[j].text}</p>
                    </div>
                </div>
            </div>
            <div class="container end-quizz-buttons">
                <button class="eq-restart" onclick="getIndividualQuizz(Screen2QuizzId)">Reiniciar Quizz</button>
                <button class="eq-back" onclick="window.location.reload()">Voltar para home</button>
            </div>
            `;
        }
    }
}