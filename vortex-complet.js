// Vérifier compatibilité
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'fr-FR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const startBtn = document.getElementById('startBtn');
const outputDiv = document.getElementById('output');

startBtn.addEventListener('click', () => {
    outputDiv.textContent = "🎙️ Écoute en cours...";
    recognition.start();
});

recognition.addEventListener('result', (event) => {
    const question = event.results[0][0].transcript;
    outputDiv.textContent = `Vous avez dit: "${question}"`;
    respond(question);
});

recognition.addEventListener('error', (event) => {
    outputDiv.textContent = `Erreur: ${event.error}`;
});

// Base de connaissances initiale
let knowledgeBase = [
    {keywords:["bonjour","salut","hello"], response:"Bonjour ! Je suis Vortex Voice, votre assistant vocal spécialisé en informatique. Mon créateur est Béni Kikwika Kambwala.", creator:true},
    {keywords:["qui t'a créé","qui est ton créateur","propriétaire"], response:"Mon créateur est Béni Kikwika Kambwala. Il m'a conçu pour répondre à toutes les questions d’informatique et aider les étudiants et développeurs.", creator:true},
    {keywords:["ordinateur"], response:"Un ordinateur est une machine électronique capable de traiter, stocker et manipuler des informations selon des instructions données par un programme."},
    {keywords:["informatique"], response:"L'informatique est la science du traitement automatique de l'information à l'aide d'ordinateurs et de logiciels."},
    {keywords:["bit"], response:"Un bit est l'unité minimale d'information en informatique, pouvant être 0 ou 1."},
    {keywords:["octet"], response:"Un octet est un ensemble de 8 bits, utilisé pour mesurer la capacité de stockage ou la taille des données."},
    {keywords:["algorithme"], response:"Un algorithme est une suite d'instructions pour résoudre un problème ou exécuter une tâche."},
    {keywords:["programmation","coder"], response:"La programmation consiste à écrire des instructions compréhensibles par l'ordinateur pour créer des logiciels et résoudre des problèmes."},
    {keywords:["langage","python","javascript","html","css","java","c++"], response:"Un langage de programmation permet de communiquer avec l'ordinateur pour créer des programmes. Exemples : Python, JavaScript, Java, C++, HTML, CSS."},
    {keywords:["logiciel","word","excel","tableur"], response:"Un logiciel est un programme permettant d'accomplir une tâche sur l'ordinateur. Word est un traitement de texte et Excel est un tableur."},
    {keywords:["bases de données"], response:"Une base de données est un système organisé pour stocker et gérer des informations."},
    {keywords:["vortex"], response:"Vortex Voice est votre assistant vocal spécialisé en informatique."},
    {keywords:["ia","intelligence artificielle"], response:"L'intelligence artificielle permet à la machine de simuler l'intelligence humaine."},
    {keywords:["machine learning","apprentissage automatique"], response:"Le machine learning permet à l'ordinateur d'apprendre à partir de données."},
    {keywords:["composants","parties pc","ordinateur composants"], response:`Les composants principaux d'un ordinateur :
- Processeur (CPU)
- Mémoire vive (RAM)
- Carte mère
- Carte graphique (GPU)
- Disque dur / SSD
- Alimentation (PSU)
- Carte son
- Carte réseau
- Boîtier
- Ventilateurs / refroidissement
- Périphériques (clavier, souris, écran, imprimante)`},
    {keywords:["créateurs de l'informatique","pionniers"], response:`Pionniers de l'informatique :
- Charles Babbage (~1837) : machine analytique
- Ada Lovelace (~1843) : premier programme
- Alan Turing (~1936) : machine de Turing
- John von Neumann (~1945) : architecture moderne
- Grace Hopper (~1959) : langage COBOL`},
    {keywords:["générations d'ordinateur"], response:`Générations d’ordinateurs :
1. 1ère génération (1940-1956) : tubes à vide
2. 2ème génération (1956-1963) : transistors
3. 3ème génération (1964-1971) : circuits intégrés
4. 4ème génération (1971-1980) : microprocesseurs
5. 5ème génération (1980-aujourd’hui) : intelligence artificielle et parallélisme`}
];

// Charger le contenu mémorisé
if(localStorage.getItem('vortexKnowledge')){
    knowledgeBase = JSON.parse(localStorage.getItem('vortexKnowledge'));
}

// Fonction principale
function respond(question) {
    question = question.toLowerCase();
    let answer = "Je ne suis pas sûr de comprendre. Peux-tu préciser ta question ?";
    let creator = false;
    let found = false;

    knowledgeBase.forEach(item => {
        for(let kw of item.keywords){
            if(question.includes(kw)){
                answer = item.response;
                creator = item.creator || false;
                found = true;
                break;
            }
        }
    });

    // Si la question n'est pas trouvée → apprentissage
    if(!found){
        const userAnswer = prompt("Je ne connais pas la réponse. Peux-tu me dire la bonne réponse ?");
        if(userAnswer && userAnswer.trim() !== ""){
            knowledgeBase.push({keywords:[question], response:userAnswer});
            localStorage.setItem('vortexKnowledge', JSON.stringify(knowledgeBase));
            answer = "Merci ! J'ai appris cette réponse pour la prochaine fois.";
        } else {
            answer = "D'accord, je n'ai pas appris cette réponse.";
        }
    }

    speakAnswer(answer, creator);
}

// Fonction pour parler et afficher la réponse + bulle du créateur
function speakAnswer(text, creator = false) {
    if (creator) {
        const bubble = document.createElement("div");
        bubble.className = "creator-bubble";
        bubble.innerHTML = `
            <strong>Créateur :</strong> Béni Kikwika Kambwala<br>
            <em>Il m'a conçu pour répondre à toutes les questions d’informatique et aider les étudiants et développeurs.</em>
        `;
        outputDiv.appendChild(bubble);
    }

    outputDiv.textContent += `\n💡 Réponse: ${text}`;
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'fr-FR';
    synth.speak(utter);
                }
