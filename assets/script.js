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
                                            <input type="text" placeholder="Texto da pergunta"></input>
                                            <input type="text" placeholder="Cor de fundo da pergunta"></input>
                                            <h3>Resposta correta</h3>
                                            <input type="text" placeholder="Resposta correta></input>
                                            <input type="text" placeholder="URL da imagem"></input>
                                            <h3>Respostas incorretas</h3>
                                            <input type="text" placeholder="Resposta incorreta 1"></input>
                                            <input type="text" placeholder="URL da imagem"></input>
                                            <input type="text" placeholder="Resposta incorreta 2"></input>
                                            <input type="text" placeholder="URL da imagem"></input>
                                            <input type="text" placeholder="Resposta incorreta 3"></input>
                                            <input type="text" placeholder="URL da imagem"></input>
                                        </div>
                                    </div>
                                    `
    questions_box.innerHTML += `<h2></h2>
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

function constructPageThree() {
    
    const levels_box = document.querySelector('.screen3-3');
    console.log(userQuizz)
    console.log(userQuizz.numLevels)

    for(let i = 0; i < parseInt(userQuizz.numLevels); i++) 
        levels_box.innerHTML += `<div class="level">
                                    <div class="container level-box">
                                        <h3>Nível ${i+1}</h1>
                                        <img src="assets/images/Vector (3).svg" onclick="openLevel(this)">
                                    </div>
                                    <div class="container ocult level-info">
                                        <input type="text" placeholder="Titulo do nível">
                                        <input type="text" placeholder="% de acerto mínima">
                                        <input type="text" placeholder="URL da imagem do nível">
                                        <input type="text" placeholder="Descrição do nível">
                                    </div>
                                </div>`
    
    levels_box.innerHTML += `<h2></h2>
                                <button onclick=""();">Finalizar Quizz</button>`;

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
    constructPageThree();
    nodeTransition(".screen3-2", "screen3-3");

}

function resetLevel(element) {

    const logo = element.querySelector('img');
    logo.classList.toggle('ocult');

    const form = element.querySelector('.level-info');
    form.classList.toggle('ocult');
}

function openLevel(element) {
    
    element = element.parentNode.parentNode;
    const question_list = element.parentNode;

    previous = question_list.querySelector('.selected');
    if(previous !== null) {
        previous.classList.remove('selected');
        resetLevel(previous);
    }

    element.classList.add('selected');
    resetLevel(element);

}

function resetForm(element) {

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
        userQuizz = initialInfo;
        constructPageThree();
        nodeTransition(".screen3-1", ".screen3-3");
    }
    
    else 
        displayAlert(validation, ".screen3-1");
    

}

function loadIndividualQuizz(response){
    window.scrollTo(0, 0);

    const QuizzList = document.querySelector('.quizz-list');
    QuizzList.classList.add('ocult');

    const IndividualQuizz = document.querySelector('.individual-quizz');
    IndividualQuizz.classList.remove('ocult');

    const Image = response.data.image;
    const Title = response.data.title;

    const Container = document.querySelector('.screen2-1');

    Container.innerHTML = `
        <div class="top-banner" style="background: linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${Image}')"><h1>${Title}</h1></div>
        <div class="main"></div>
    `

    const Main = document.querySelector('.main')

    //Percorre a array de perguntas:
    for(let i = 0; i < response.data.questions.length; i++){

        const Answers = response.data.questions[i].answers;

        const shuffledAnswers = Answers.sort(function () {
            return Math.random() - 0.5;
        });

        let Answer = '';

        //Percorre a array de respostas para cada pergunta:
        for(let x = 0; x < response.data.questions[i].answers.length; x++){
            Answer += `
                <div class="answer">
                    <img src="${shuffledAnswers[x].image}">
                    <h1>${shuffledAnswers[x].text}</h1>
                </div>
            `
        }

        const Question = response.data.questions[i].title;

        Main.innerHTML += `
            <div class="question-container">
                <div class="question">
                    ${Question}
                </div>
                <div class="answer-container">${Answer}</div>
            </div>
        `;
    }
}

function getIndividualQuizz(quizzId){
    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`)
    promise.then(loadIndividualQuizz);
}

function loadQuizzes(response){
    const QuizzContainer = document.querySelector('.quizz-container');
    for (let i = 0; i < response.data.length; i++){
        QuizzContainer.innerHTML += `
            <div style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${response.data[i].image}')" class="quizz" onclick="getIndividualQuizz(${response.data[i].id})">
                <h1>${response.data[i].title}</h1>
            </div>
        `
    }
}

function getQuizzes() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    promise.then(loadQuizzes);
}

getQuizzes() 