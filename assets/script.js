let userQuizz = {};

function isValidUrl(urlString) {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e){ 
        return false; 
    }
}


function nodeTransition(initial, target) {

    initial = document.querySelector(initial);
    target = document.querySelector(target);

    console.log(initial);

    initial.classList.add('ocult');
    target.classList.remove('ocult');

}

function constructPageTwo(numQuestions) {
    
    const questions_box = document.querySelector('.screen3-2');

    for(let i = 0; i < numQuestions; i++) 
        questions_box.innerHTML += `<div class="question">
                                        <div class="container question-box">
                                            <h3>Pergunta ${i+1}</h1>
                                            <img src="assets/images/Vector (3).svg" onclick="openForm(this)">
                                        </div>
                                        <div class="container ocult question-info">
                                            <input type="text" placeholder="Texto da pergunta" class="user-title"></input>
                                            <input type="text" placeholder="Cor de fundo da pergunta" class="user-title"></input>
                                            <h3>Resposta correta</h3>
                                            <input type="text" placeholder="Resposta correta" class="user-title"></input>
                                            <input type="text" placeholder="URL da imagem" class="user-title"></input>
                                            <h3>Respostas incorretas</h3>
                                            <input type="text" placeholder="Resposta incorreta 1" class="user-title"></input>
                                            <input type="text" placeholder="URL da imagem" class="user-title"></input>
                                            <input type="text" placeholder="Resposta incorreta 2" class="user-title"></input>
                                            <input type="text" placeholder="URL da imagem" class="user-title"></input>
                                            <input type="text" placeholder="Resposta incorreta 3" class="user-title"></input>
                                            <input type="text" placeholder="URL da imagem" class="user-title"></input>
                                        </div>
                                    </div>
                                    `
    questions_box.innerHTML += `<h2>Errrrrrrrrrrrrr</h2>
                                <button onclick="getQuestionsInfo();">Prosseguir para criar níveis</button>`;
    

}

function validateInitial(obj) {

    if(obj.title.length < 20 || obj.title.length > 65)
        return "O título do quizz precisa ter entre 20 a 65 caracteres";

    if(!isValidUrl(obj.image))
        return "A imagem precisa ter uma URL válida";

    if(obj.numQuestions < 3)
        return "O quizz precisa ter no mínimo 3 perguntas";

    if(obj.numLevels < 2)
        return "O quizz precisa ter no mínimo 2 níveis";
    
    return "ok";

}

function validateAnswer(answer) {
    if(!answer.text.length)
        return "Textos das respostas não podem estar vazios"
    if(!isValidUrl(answer.image))
        return "URL das imagens das respostas devem ter formato de URL";
    return "";
}

function validateQuestion(question) {
    if(question.title.length < 20)
        return "Textos das perguntas devem ter no mínimo 20 caracteres";
    if(question.color[0] != '#' || question.color.length != 7)
        return "A cor deve ser um hexadecimal começado em # seguido por 6 caracteres";
    return "";
}

function displayAlert(orientation, screen) {
    const warning = document.querySelector(`${screen} h2`);
    warning.classList.remove('ocult');
    warning.innerHTML = orientation;
}

function getQuestionsInfo() {
    const questions = document.querySelectorAll('.question-info');

    const questionsArr = [];
    questions.forEach(question => {
        
        const forms = question.querySelectorAll('input');
        const questionObj = {
            title: forms[0].value,
            color: forms[1].value,
            answers: []
        }

        const check = validateQuestion(questionObj);
        if(check !== "") {
            displayAlert(check, ".screen3-2");
            return;
        }

        for(let i = 2; i < 10; i += 2) {
            
            const answer = {
                text: forms[i].value,
                image: forms[i+1].value,
                isCorrectAnswer: (i === 2)
            }

            const validation = validateAnswer(answer);

            if(validation === "")
                questionObj.answers.push(answer);

            else {
                displayAlert(validation, ".screen3-2");
                return;
            }
            
        }

        questionsArr.push(questionObj);
    
    })

    userQuizz.questions = questionsArr;
    console.log(userQuizz);

}

function resetForm(element) {
    console.log(element);
    const logo = element.querySelector('img');
    logo.classList.toggle('ocult');

    const form = element.querySelector('.question-info');
    form.classList.toggle('ocult');
}

function openForm(element) {
    
    element = element.parentNode.parentNode;

    previous = document.querySelector('.selected');
    if(previous !== null) {
        previous.classList.remove('selected');
        resetForm(previous);
    }

    element.classList.add('selected');
    resetForm(element);

}

function getInitialInfo() {
    
    const form = document.querySelectorAll('.initial-info input');

    const initialInfo = {
        title: form[0].value,
        image: form[1].value,
        numQuestions: form[2].value,
        numLevels: form[3].value
    }

    const validation = validateInitial(initialInfo)

    if(validation === "ok") {
        constructPageTwo(initialInfo.numQuestions);
        nodeTransition(".screen3-1", ".screen3-2");
        userQuizz = initialInfo;
    }
    
    else 
        displayAlert(validation, ".screen3-1");
    

}