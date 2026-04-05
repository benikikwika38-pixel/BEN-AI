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


// ================= BASE DE CONNAISSANCE =================
const knowledgeBase = [

/* ===== CONVERSATION ===== */
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

/* ===== IDENTITÉ ===== */
{
keywords:["qui es-tu","présente toi"],
response:"Je suis Vortex Voice, un assistant vocal spécialisé en informatique. Je suis là pour vous aider."
},

{
keywords:["qui est béni kikwika","béni kikwika","qui est ton créateur","propriétaire","biographie béni"],
response:`Béni Kikwika Kambwala est un jeune développeur congolais né le 20 mai 2007 et résidant à Kinshasa.

Il est le créateur de Technova Academy, une plateforme éducative lancée le 15 mars 2026 pour former les jeunes aux compétences numériques.

Il est aussi le créateur de Vortex Voice, un assistant vocal intelligent spécialisé en informatique.

Passionné par la technologie, il développe des projets pour aider les autres à apprendre et évoluer dans le domaine informatique.`,
creator:true
},

/* ===== DÉFINITIONS ===== */
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

/* ===== PROGRAMMATION ===== */
{
keywords:["programmation","coder"],
response:"La programmation consiste à écrire des instructions pour qu’un ordinateur exécute des tâches."
},
{
keywords:["langage","langage informatique"],
response:`Un langage informatique permet de communiquer avec un ordinateur.

Exemples :
- Python : simple et puissant
- JavaScript : pour les sites web
- Java : applications
- C++ : performance
- HTML/CSS : structure et design`
},
{
keywords:["algorithme"],
response:"Un algorithme est une suite d’étapes logiques permettant de résoudre un problème."
},

/* ===== LOGICIELS ===== */
{
keywords:["logiciel"],
response:"Un logiciel est un programme permettant d’effectuer une tâche sur un ordinateur."
},
{
keywords:["word"],
response:"Microsoft Word est un logiciel de traitement de texte."
},
{
keywords:["excel"],
response:"Microsoft Excel est un logiciel de tableur."
},
{
keywords:["bases de données"],
response:"Une base de données permet de stocker et organiser des informations."
},

/* ===== IA ===== */
{
keywords:["ia","intelligence artificielle"],
response:"L’intelligence artificielle permet aux machines d’imiter l’intelligence humaine."
},
{
keywords:["machine learning"],
response:"Le machine learning permet aux machines d’apprendre à partir des données."
},

/* ===== COMPOSANTS ===== */
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

/* ===== HISTOIRE ===== */
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


// ================= LOGIQUE =================
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


// ================= VOIX + AFFICHAGE =================
function speakAnswer(text, creator = false) {

    if (creator) {
        const bubble = document.createElement("div");
        bubble.className = "creator-bubble";
        bubble.innerHTML = `
            <strong>Créateur :</strong> Béni Kikwika Kambwala<br>
            <em>Développeur congolais, créateur de Technova Academy et Vortex Voice.</em>
        `;
        outputDiv.appendChild(bubble);
    }

    outputDiv.textContent += `\n💡 Réponse: ${text}`;

    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'fr-FR';
    synth.speak(utter);
}
