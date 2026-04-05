// ===== RECONNAISSANCE VOCALE =====
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'fr-FR';

const startBtn = document.getElementById('startBtn');
const outputDiv = document.getElementById('output');
const textInput = document.getElementById('textInput');
const sendBtn = document.getElementById('sendBtn');

startBtn.addEventListener('click', () => {
    recognition.start();
});

recognition.addEventListener('result', (event) => {
    const question = event.results[0][0].transcript;
    addUserMessage(question);
    respond(question);
});

// ===== ENVOI TEXTE =====
sendBtn.addEventListener('click', () => {
    const question = textInput.value.trim();
    if(question !== ""){
        addUserMessage(question);
        respond(question);
        textInput.value = "";
    }
});

textInput.addEventListener('keypress', (e) => {
    if(e.key === "Enter"){
        sendBtn.click();
    }
});

// ===== MESSAGES =====
function addUserMessage(text){
    outputDiv.innerHTML += `<div class="user-msg">🧑 ${text}</div>`;
    scrollDown();
}

function addBotMessage(text){
    outputDiv.innerHTML += `<div class="bot-msg">🤖 ${text}</div>`;
    scrollDown();
}

function scrollDown(){
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

// ===== BASE DE CONNAISSANCE =====
const knowledgeBase = [

{keywords:["bonjour","salut"], response:"Bonjour 😊 ! Comment puis-je vous aider ?"},
{keywords:["ça va","comment ça va"], response:"Je vais très bien merci 😊. Et vous ?"},
{keywords:["merci"], response:"Je vous en prie 😊 !"},
{keywords:["au revoir"], response:"Au revoir 👋 !"},

{keywords:["qui es-tu"], response:"Je suis Vortex Voice, un assistant en informatique."},

{
keywords:["béni kikwika","créateur","propriétaire"],
response:`Béni Kikwika Kambwala est un jeune développeur congolais né le 20 mai 2007 à Kinshasa.

Il est le créateur de Technova Academy, une plateforme éducative lancée en 2026.

Il est aussi le créateur de Vortex Voice, un assistant intelligent pour aider les étudiants.`,
creator:true
},

{keywords:["ordinateur"], response:"Un ordinateur est une machine capable de traiter des informations."},
{keywords:["informatique"], response:"L'informatique est la science du traitement automatique de l'information."},
{keywords:["bit"], response:"Un bit est 0 ou 1."},
{keywords:["octet"], response:"Un octet contient 8 bits."},

{keywords:["programmation"], response:"La programmation consiste à créer des programmes pour un ordinateur."},

{
keywords:["langage"],
response:`Exemples :
Python, JavaScript, Java, C++, HTML, CSS`
},

{keywords:["algorithme"], response:"Un algorithme est une suite d'instructions."},

{keywords:["logiciel"], response:"Un logiciel est un programme informatique."},
{keywords:["word"], response:"Word est un logiciel de texte."},
{keywords:["excel"], response:"Excel est un tableur."},
{keywords:["base de données"], response:"Permet de stocker les informations."},

{keywords:["ia"], response:"L'intelligence artificielle imite l'intelligence humaine."},

{
keywords:["composants"],
response:`CPU, RAM, Disque dur, Carte mère, Carte graphique`
},

{
keywords:["créateurs informatique"],
response:`Babbage (1837), Ada (1843), Turing (1936)`
}

];

// ===== LOGIQUE =====
function respond(question){
    question = question.toLowerCase();
    let answer = "Je ne comprends pas bien, peux-tu préciser ?";
    let creator = false;

    for(let item of knowledgeBase){
        for(let kw of item.keywords){
            if(question.includes(kw) || kw.includes(question)){
                answer = item.response;
                creator = item.creator || false;
                break;
            }
        }
    }

    addBotMessage(answer);

    if(creator){
        outputDiv.innerHTML += `
        <div class="creator-bubble">
        👤 Créateur : Béni Kikwika Kambwala
        </div>`;
    }

    speak(answer);
}

// ===== VOIX =====
function speak(text){
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-FR";
    synth.speak(utter);
 }
