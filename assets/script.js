let userQuizz = {};

function isValidUrl(urlString) {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e){ 
        return false; 
    }
}

function validateInitial(obj) {

    if(obj.title.length < 20 || obj.title.length > 65)
        return "O título do quizz precisa ter entre 20 a 65 caracteres";

    if(!isValidUrl(obj.imgUrl))
        return "A imagem precisa ter uma URL válida";

    if(obj.numQuestions < 3)
        return "O quizz precisa ter no mínimo 3 perguntas";

    if(obj.numLevels < 2)
        return "O quizz precisa ter no mínimo 2 níveis";
    
    return "ok";

}

function nodeTransition(initial, target) {

    initial = document.querySelector(initial);
    target = document.querySelector(target);

    console.log(initial);

    initial.classList.add('ocult');
    target.classList.remove('ocult');

}

function getInitialInfo() {
    
    const form = document.querySelectorAll('.initial-info input');

    const initialInfo = {
        title: form[0].value,
        imgUrl: form[1].value,
        numQuestions: form[2].value,
        numLevels: form[3].value
    }

    const validation = validateInitial(initialInfo)

    if(validation === "ok") {
        nodeTransition(".screen3-1", ".screen3-2");
        userQuizz = initialInfo;
    }
    
    else {
        const warning = document.querySelector('.screen3-1 h2');
        warning.classList.remove('ocult');
        warning.innerHTML = validation;
    }

}