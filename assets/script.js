let userQuizz = {};
let QuestionInfoResult = []; // Saves server information for the chosen question
let ResultPoints = 0;        // Count the number of correct answers
let QtdMenu = 0;             // Count the number of quizz result menu

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
    questions_box.innerHTML = '<h1>Crie suas perguntas</h1>';

    for(let i = 0; i < numQuestions; i++) 
        questions_box.innerHTML += `<div class="qc-question" data-identifier="question-form">
                                        <div class="container qc-question-box">
                                            <h3>Pergunta ${i+1}</h1>
                                            <img src="assets/images/Vector (3).svg" onclick="openForm(this)" data-identifier="expand">
                                        </div>
                                        <div class="container ocult qc-question-info">
                                            <input type="text" placeholder="Texto da pergunta">
                                            <h2 class="ocult"></h2>
                                            <input type="text" placeholder="Cor de fundo da pergunta">
                                            <h2 class="ocult"></h2>
                                            <h3>Resposta correta</h3>
                                            <input type="text" placeholder="Resposta correta">
                                            <h2 class="ocult"></h2>
                                            <input type="text" placeholder="URL da imagem">
                                            <h2 class="ocult"></h2>
                                            <h3>Respostas incorretas</h3>
                                            <input type="text" placeholder="Resposta incorreta 1"></input>
                                            <h2 class="ocult"></h2>
                                            <input type="text" placeholder="URL da imagem"></input>
                                            <h2 class="ocult"></h2>
                                            <input type="text" placeholder="Resposta incorreta 2"></input>
                                            <h2 class="ocult"></h2>
                                            <input type="text" placeholder="URL da imagem"></input>
                                            <h2 class="ocult"></h2>
                                            <input type="text" placeholder="Resposta incorreta 3"></input>
                                            <h2 class="ocult"></h2>
                                            <input type="text" placeholder="URL da imagem"></input>
                                            <h2 class="ocult"></h2>
                                        </div>
                                    </div>
                                    `
    questions_box.innerHTML += `<h2></h2>
                                <button onclick="getQuestionsInfo();">Prosseguir para criar níveis</button>`;
    

}


function validateInitial(obj, element) {

    const alerts = element.querySelectorAll('h2');
    let ok = "ok";
    if(obj.title.length < 20 || obj.title.length > 65) {
        alerts[0].innerHTML =  "O título do quizz precisa ter entre 20 a 65 caracteres";
        alerts[0].classList.remove('ocult');
        ok = "a";
    }
    else 
        alerts[0].classList.add('ocult');
    

    if(!isValidUrl(obj.image)) {
        alerts[1].innerHTML =  "A imagem precisa ter uma URL válida";
        alerts[1].classList.remove('ocult');
        ok = "a";
    }
    else 
        alerts[1].classList.add('ocult');
    

    if(obj.numQuestions < 3) {
        alerts[2].innerHTML =  "O quizz precisa ter no mínimo 3 perguntas";
        alerts[2].classList.remove('ocult');
        ok = "a";
    }
    else 
        alerts[2].classList.add('ocult');
    

    if(obj.numLevels < 2) {
        alerts[3].innerHTML =  "O quizz precisa ter no mínimo 2 níveis";
        alerts[3].classList.remove('ocult');
        ok = "a";
    }
    else 
        alerts[3].classList.add('ocult');
    
    
    return ok;

}

function validateLevel(levelObj, element) {
    const alerts = element.querySelectorAll('h2')
    let ok = "";
    if(levelObj.title.length < 10) {
        alerts[0].classList.remove('ocult');
        alerts[0].innerHTML = 'O titulo dos níveis deve ter pelo menos 10 caracteres'
        ok = "a";
    }
    else 
        alerts[0].classList.add('ocult');    

    if(levelObj.minValue < 0 || levelObj.minValue > 100) {
        alerts[1].classList.remove('ocult');
        alerts[1].innerHTML = "O valor minimo deve ser um número de 0 a 100";
        ok = "a";
    }
    else 
        alerts[1].classList.add('ocult');


    if(!isValidUrl(levelObj.image)) {
        alerts[2].classList.remove('ocult');
        alerts[2].innerHTML = "A imagem deve vir de um URL válido";
        ok = "a";
    }
    else 
        alerts[2].classList.add('ocult');


    if(levelObj.text.length < 30) {
        alerts[3].classList.remove('ocult');
        alerts[3].innerHTML = "A descrição do nível deve ter um mínimo de 30 caracteres";
        ok = "a";
    }
    else 
        alerts[3].classList.add('ocult');

    return ok;
}

function validateAnswer(answer, element, i) {
    const alerts = element.querySelectorAll('h2');
    let ok = "";
    if(!answer.text.length && !answer.image.length) {
        if(i == 2) {
            alerts[2].innerHTML = 'É preciso que as perguntas tenham alguma resposta correta'
            alerts[3].innerHTML = 'É preciso que as perguntas tenham alguma resposta correta'
            alerts[2].classList.remove('ocult');
            alerts[3].classList.remove('ocult');
            ok = "a";
            return ok;
        } 
        else if(i == 4) {
            alerts[4].innerHTML = 'É preciso que as perguntas tenham alguma resposta incorreta'
            alerts[5].innerHTML = 'É preciso que as perguntas tenham alguma resposta incorreta'
            alerts[4].classList.remove('ocult');
            alerts[5].classList.remove('ocult');
            ok = "a";
            return ok;
        }
        else return "";
    }
    else {
        alerts[i].classList.add('ocult');
        alerts[i+1].classList.add('ocult');
    }
    if(!answer.text.length) {
        alerts[i].innerHTML = "Textos das respostas não podem estar vazios"
        alerts[i].classList.remove('ocult');
        ok = "a";
    }
    else 
        alerts[i].classList.add('ocult');

    if(!isValidUrl(answer.image)) {
        alerts[i+1].innerHTML = "URL das imagens das respostas devem ter formato de URL";
        alerts[i+1].classList.remove('ocult');
        ok = "a";
    }
    else
        alerts[i+1].classList.add('ocult');
        
    return ok;
}

function getLevelsInfo() {
    
    const levels = document.querySelectorAll('.level-info');
    const levelsArray = [];

    let haveZero = false;
    let noContinue = false;

    levels.forEach(element => {
        const levelArray = element.querySelectorAll('input');
        const alerts = element.querySelectorAll('h2')
        if(levelArray[1].value == 0)
            haveZero = true;
        levelObj = {
            title: levelArray[0].value,
            minValue: levelArray[1].value,
            image: levelArray[2].value,
            text: levelArray[3].value
        }
        
        const validation = validateLevel(levelObj, element);

        if(validation !== "") {
            noContinue = true;
            return;
        }

        levelsArray.push(levelObj);

    })

    if(!haveZero) {
        displayAlert("É necessário que pelo menos um nível tenha valor mínimo de 0%", ".screen3-3");
        return;
    }
    if(noContinue)
        return;

    delete userQuizz.numLevels;
    delete userQuizz.numQuestions

    userQuizz.levels = levelsArray;

    constructPageFour();
    nodeTransition(".screen3-3", ".screen3-4");

}

function backToHome() {
    nodeTransition('.screen3-4', '.screen3-1');
    nodeTransition('.quizz-creation', '.quizz-list');
    const homePage = document.querySelector('.screen1-1')
    homePage.classList.remove('.ocult');
    getQuizzes();
}

function loadUserQuizz(id) {
    nodeTransition('.screen3-4', '.loading-screen');
    getIndividualQuizz(id);
}

function constructPageFour() {
    
    const img = document.querySelector('.user-quizz-ready img'); 
    img.src = userQuizz.image;

    const title = document.querySelector('.user-quizz-ready h4');
    title.textContent = userQuizz.title;

    nodeTransition(".quizz-creation", ".loading-screen");

    let promise = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", userQuizz);

    promise.then(response => {
        
        nodeTransition(".loading-screen", ".quizz-creation");
        console.log(response);

        let userQuizzesList = JSON.parse(localStorage.getItem("userQuizzesList"));
        let userQuizzesKeys = JSON.parse(localStorage.getItem("userQuizzesKeys"));

        if(userQuizzesKeys == null) {
            userQuizzesList = [];
            userQuizzesKeys = [];
        }

        userQuizzesList.push(response.data.id);
        userQuizzesKeys.push(response.data.key);


        localStorage.setItem("userQuizzesList", JSON.stringify(userQuizzesList));
        localStorage.setItem("userQuizzesKeys", JSON.stringify(userQuizzesKeys));

        const initiateButton = document.querySelector('.screen3-4 button');
        initiateButton.setAttribute('onclick', `loadUserQuizz(${response.data.id})`);



    })

    promise.catch(response => {
        console.log(userQuizz);
        console.log(response);
    })

}

function constructPageThree() {
    
    const levels_box = document.querySelector('.screen3-3');
    levels_box.innerHTML = "<h1>Agora, decida os níveis</h1>";

    for(let i = 0; i < parseInt(userQuizz.numLevels); i++) 
        levels_box.innerHTML += `<div class="level" data-identifier="level">
                                    <div class="container level-box">
                                        <h3>Nível ${i+1}</h1>
                                        <img src="assets/images/Vector (3).svg" onclick="openLevel(this)" data-identifier="expand">
                                    </div>
                                    <div class="container ocult level-info">
                                        <input type="text" placeholder="Titulo do nível">
                                        <h2 class="ocult"></h2>
                                        <input type="number" placeholder="% de acerto mínima">
                                        <h2 class="ocult"></h2>
                                        <input type="text" placeholder="URL da imagem do nível">
                                        <h2 class="ocult"></h2>
                                        <input type="text" placeholder="Descrição do nível">
                                        <h2 class="ocult"></h2>
                                    </div>
                                </div>`
    
    levels_box.innerHTML += `<h2></h2>
                            <button onclick="getLevelsInfo();">Finalizar Quizz</button>`;

}

function validateQuestion(question, element) {
    const alerts = element.querySelectorAll('h2')
    let ok = "";
    if(question.title.length < 20)  {
        alerts[0].innerHTML = "Textos das perguntas devem ter no mínimo 20 caracteres";
        alerts[0].classList.remove('ocult');
        ok = "a";
    }
    else 
        alerts[0].classList.add('ocult');
    
    if(question.color[0] != '#' || question.color.length != 7) {
        alerts[1].innerHTML = "A coloração deve ser um código hexadecimal começado em #.";
        alerts[1].classList.remove('ocult');
        ok = "a";
    }
    else 
        alerts[1].classList.add('ocult');
    
    return ok;
}

function displayAlert(orientation, screen) {
    const warning = document.querySelectorAll(`${screen} h2`);
    warning[warning.length-1].classList.remove('ocult');
    warning[warning.length-1].innerHTML = orientation;
}

function getQuestionsInfo() {
    const questions = document.querySelectorAll('.qc-question-info');

    const questionsArr = [];
    let notGo = false;
    questions.forEach(question => {
        
        const forms = question.querySelectorAll('input');
        const questionObj = {
            title: forms[0].value,
            color: forms[1].value,
            answers: []
        }

        const check = validateQuestion(questionObj, question);

        if(check !== "") 
            notGo = true;  

        let validation;
        for(let i = 2; i < 10; i += 2) {
            
            const answer = {
                text: forms[i].value,
                image: forms[i+1].value,
                isCorrectAnswer: (i === 2)
            }

            validation = validateAnswer(answer, question, i);
            console.log(i, validation);      

            if(validation !== "") {
                notGo = true;
                continue;
            }

            if(answer.text != '' && answer.image != '')
                questionObj.answers.push(answer);
            
        }
        
        questionsArr.push(questionObj);
    
    })

    if(notGo)
        return;
        
    userQuizz.questions = questionsArr;
    constructPageThree();
    nodeTransition(".screen3-2", ".screen3-3");

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

    const form = element.querySelector('.qc-question-info');
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

    const validation = validateInitial(initialInfo, document.querySelector('.initial-info'))

    if(validation === "ok") {
        userQuizz = initialInfo;
        for(let i = 0; i < 4; i++)
            form[i].value = "";
        constructPageTwo(userQuizz.numQuestions);
        nodeTransition(".screen3-1", ".screen3-2");
    }
    

}

function deleteQuizz(quizzId) {
    
    if(!confirm("Tem certeza que deseja deletar o quizz?"))
        return;
    
    let quizzList = JSON.parse(localStorage.getItem("userQuizzesList"));
    const index = quizzList.indexOf(quizzId);

    let keyList = JSON.parse(localStorage.getItem("userQuizzesKeys"));


    const headers = {
        'Secret-Key': keyList[index]
    }

    const promise = axios.delete("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/" + quizzId, {headers});
    promise.then(element => {
        keyList.splice(index, 1);
        quizzList.splice(index, 1);
        localStorage.setItem("userQuizzesList", JSON.stringify(quizzList));
        localStorage.setItem("userQuizzesKeys", JSON.stringify(keyList));
        getQuizzes();
    })

}

function loadIndividualQuizz(response){
    QtdMenu = 0;
    nodeTransition('.loading-screen', '.individual-quizz');

    window.scrollTo(0, 0);

    const Image = response.data.image;
    const Title = response.data.title;

    const Container = document.querySelector('.screen2-1');

    Container.innerHTML = `
        <div style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url('${Image}')" class="top-banner"><h1>${Title}</h1></div>
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
                <div class="answer" onclick="choose(this, ${response.data.questions.length})" data-identifier="answer">
                    <img src="${shuffledAnswers[x].image}">
                    <h1>${shuffledAnswers[x].text}</h1>
                    <div class="${response.data.questions[i].answers[x].isCorrectAnswer}"></div>
                </div>
            `
        }
        
        const Question = response.data.questions[i].title;
        const BackgroundColor = response.data.questions[i].color;

        Main.innerHTML += `
            <div class="question-container" data-identifier="question">
                <div class="question" style="background-color: ${BackgroundColor}">
                    ${Question}
                </div>
                <div class="answer-container">${Answer}</div>
            </div>
        `;
    }

    QuestionInfoResult = [];
    for (let i = 0; i < response.data.levels.length; i++){
        QuestionInfoResult.push({title: response.data.levels[i].title, image:response.data.levels[i].image, text:response.data.levels[i].text, minValue:response.data.levels[i].minValue})
    }
}

let Screen2QuizzId;

function getIndividualQuizz(quizzId){
    ResultPoints = 0;
    Screen2QuizzId = quizzId;

    nodeTransition('.quizz-list', '.loading-screen');

    const promise = axios.get(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzId}`)
    promise.then(loadIndividualQuizz);
}

function loadQuizzes(response){
    nodeTransition('.loading-screen', '.quizz-list');

    let CheckLocalStorage = localStorage.getItem("userQuizzesList");

    const QuizzContainer = document.querySelector('.quizz-container');
    const UserQuizzContainer = document.querySelector('.yq-quizzlist');
    QuizzContainer.innerHTML = "";
    UserQuizzContainer.innerHTML = "";
    for (let i = 0; i < response.data.length; i++){
        if (CheckLocalStorage.indexOf(`${response.data[i].id}`) !== -1){
            nodeTransition('.yq-empty', '.yq-filled')
            UserQuizzContainer.innerHTML += `
            <div>
                <div style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${response.data[i].image}')" class="quizz" data-identifier="quizz-card">
                    <h1 onclick="getIndividualQuizz(${response.data[i].id})">${response.data[i].title}</h1>
                    <div onclick="getIndividualQuizz(${response.data[i].id})" class="quizz-ghost"></div>
                    <div class="container button-section" onclick="">
                        <ion-icon style="padding-left: 2.5px" name="create-outline"></ion-icon>
                        <div onclick="deleteQuizz(${response.data[i].id});">
                            <ion-icon name="trash-outline" onclick="deleteQuizz();"></ion-icon>
                        </div>
                    </div>
                </div>
            </div>
        `
        } else{
            QuizzContainer.innerHTML += `
                <div style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url('${response.data[i].image}')" class="quizz" onclick="getIndividualQuizz(${response.data[i].id})" data-identifier="quizz-card">
                    <h1>${response.data[i].title}</h1>
                </div>
            `
        }
    }
}

function getQuizzes() {
    nodeTransition('.quizz-list', '.loading-screen');

    const promise = axios.get('https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes')
    promise.then(loadQuizzes);
}

getQuizzes();
