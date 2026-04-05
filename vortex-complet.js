document.addEventListener("DOMContentLoaded", () => {

const outputDiv = document.getElementById('output');
const textInput = document.getElementById('textInput');
const sendBtn = document.getElementById('sendBtn');
const startBtn = document.getElementById('startBtn');

// ===== VOIX =====
let recognition;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'fr-FR';

    startBtn.addEventListener('click', () => {
        recognition.start();
    });

    recognition.addEventListener('result', (event) => {
        const question = event.results[0][0].transcript;
        addUserMessage(question);
        respond(question);
    });

} else {
    startBtn.disabled = true;
    startBtn.textContent = "❌";
}

// ===== TEXTE =====
sendBtn.addEventListener('click', () => {
    sendMessage();
});

textInput.addEventListener('keydown', (e) => {
    if(e.key === "Enter"){
        sendMessage();
    }
});

function sendMessage(){
    const question = textInput.value.trim();
    if(question === "") return;

    addUserMessage(question);
    respond(question);
    textInput.value = "";
}

// ===== AFFICHAGE =====
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

// ===== BASE =====
const knowledgeBase = [
{keywords:["bonjour","salut"], response:"Bonjour 😊 ! Comment puis-je vous aider ?"},
{keywords:["ça va","comment ça va"], response:"Je vais bien merci 😊. Et vous ?"},
{keywords:["merci"], response:"Je vous en prie 😊 !"},
{keywords:["au revoir"], response:"Au revoir 👋 !"},

{keywords:["créateur","béni kikwika"], response:"Mon créateur est Béni Kikwika Kambwala.", creator:true},

{keywords:["informatique"], response:"L'informatique est le traitement automatique de l'information."},
{keywords:["ordinateur"], response:"Un ordinateur traite les données."},
{keywords:["programmation"], response:"La programmation permet de créer des logiciels."}
];

// ===== LOGIQUE =====
function respond(question){
    question = question.toLowerCase();
    let answer = "Je ne comprends pas bien, peux-tu préciser ?";
    let creator = false;
    let found = false;

    for(let item of knowledgeBase){
        for(let kw of item.keywords){
            if(question.includes(kw) || kw.includes(question)){
                answer = item.response;
                creator = item.creator || false;
                found = true;
                break;
            }
        }
        if(found) break;
    }

    addBotMessage(answer);

    if(creator){
        outputDiv.innerHTML += `<div class="creator-bubble">👤 Béni Kikwika Kambwala</div>`;
    }

    speak(answer);
}

// ===== VOIX SORTIE =====
function speak(text){
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-FR";
    synth.speak(utter);
}

});
