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

// BASE DE CONNAISSANCE
const knowledgeBase = [

/* ===================== CONVERSATION ===================== */
{
keywords:["bonjour","salut","hello"],
response:"Bonjour 😊 ! Je suis Vortex Voice, votre assistant en informatique. Comment puis-je vous aider ?"
},
{
keywords:["ça va","ca va","comment ça va","comment vas-tu","tu vas bien"],
response:"Je vais très bien, merci 😊. Et vous ? En quoi puis-je vous aider ?"
},
{
keywords:["merci"],
response:"Je vous en prie 😊 !"
},
{
keywords:["au revoir","bye"],
response:"Au revoir 👋 ! À bientôt."
},

/* ===================== IDENTITÉ ===================== */
{
keywords:["qui es-tu","présente toi"],
response:"Je suis Vortex Voice, un assistant vocal spécialisé en informatique. Je suis là pour vous aider."
},
{
keywords:["qui t'a créé","créateur","propriétaire","biographie béni","béni kikwika"],
response:`Mon créateur est Béni Kikwika Kambwala.

Biographie :
Béni Kikwika Kambwala est un passionné d'informatique et de technologie. Il s'intéresse à la programmation, aux bases de données et à la création de solutions numériques. Il a conçu Vortex Voice pour aider les étudiants et les débutants à mieux comprendre l’informatique et évoluer dans ce domaine.`,
creator:true
},

/* ===================== DÉFINITIONS ===================== */
{
keywords:["ordinateur"],
response:"Un ordinateur est une machine électronique capable de traiter, stocker et manipuler des informations automatiquement."
},
{
keywords:["informatique"],
response:"L'informatique est la science du traitement automatique de l'information à l'aide d'ordinateurs."
},
{
keywords:["bit"],
response:"Un bit est la plus petite unité d'information, pouvant être 0 ou 1."
},
{
keywords:["octet"],
response:"Un octet est composé de 8 bits."
},

/* ===================== PROGRAMMATION ===================== */
{
keywords:["programmation","coder"],
response:"La programmation consiste à écrire des instructions pour qu’un ordinateur exécute des tâches."
},
{
keywords:["langage","langage informatique"],
response:`Un langage informatique permet de communiquer avec un ordinateur.

Exemples de langages :
- Python : simple et puissant
- JavaScript : pour les sites web
- Java : applications
- C++ : performant
- HTML/CSS : structure et design des sites`
},
{
keywords:["algorithme"],
response:"Un algorithme est une suite d’étapes logiques permettant de résoudre un problème."
},

/* ===================== LOGICIELS ===================== */
{
keywords:["logiciel"],
response:"Un logiciel est un programme qui permet d'effectuer une tâche sur un ordinateur."
},
{
keywords:["word"],
response:"Microsoft Word est un logiciel de traitement de texte."
},
{
keywords:["excel"],
response:"Microsoft Excel est un logiciel de tableur utilisé pour les calculs et tableaux."
},
{
keywords:["bases de données"],
response:"Une base de données permet de stocker et organiser des informations."
},

/* ===================== IA ===================== */
{
keywords:["ia","intelligence artificielle"],
response:"L’intelligence artificielle permet aux machines d’imiter l’intelligence humaine."
},
{
keywords:["machine learning"],
response:"Le machine learning permet aux machines d’apprendre à partir des données."
},

/* ===================== COMPOSANTS ===================== */
{
keywords:["composants","ordinateur composants","parties du pc"],
response:`Les composants d’un ordinateur :
- Processeur (CPU) : cerveau
- RAM : mémoire temporaire
- Disque dur / SSD : stockage
- Carte mère : connexion
- Carte graphique : affichage
- Alimentation : énergie
- Périphériques : clavier, souris, écran`
},

/* ===================== HISTOIRE ===================== */
{
keywords:["créateurs informatique","pionniers"],
response:`Pionniers :
- Charles Babbage (~1837)
- Ada Lovelace (~1843)
- Alan Turing (~1936)
- John von Neumann (~1945)
- Grace Hopper (~1959)`
},
{
keywords:["générations ordinateur"],
response:`Générations :
1. 1940-1956 : tubes à vide
2. 1956-1963 : transistors
3. 1964-1971 : circuits intégrés
4. 1971-1980 : microprocesseurs
5. Aujourd’hui : intelligence artificielle`
}

];

// FONCTION PRINCIPALE
function respond(question) {
    question = question.toLowerCase();
    let answer = "Je ne suis pas sûr de comprendre. Pouvez-vous préciser votre question ?";
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

    speakAnswer(answer, creator);
}

// VOIX + AFFICHAGE
function speakAnswer(text, creator = false) {

    if (creator) {
        const bubble = document.createElement("div");
        bubble.className = "creator-bubble";
        bubble.innerHTML = `
            <strong>Créateur :</strong> Béni Kikwika Kambwala<br>
            <em>Développeur et passionné d'informatique, créateur de Vortex Voice.</em>
        `;
        outputDiv.appendChild(bubble);
    }

    outputDiv.textContent += `\n💡 Réponse: ${text}`;

    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'fr-FR';
    synth.speak(utter);
}
