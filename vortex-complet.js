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

// Fonction principale
function respond(question) {
    let answer = "Je ne suis pas sûr de comprendre. Peux-tu préciser ta question ?";
    question = question.toLowerCase();

    // Salutations et présentation
    const greetings = ["bonjour", "salut", "hello", "salutations"];
    for (let g of greetings) {
        if (question.includes(g)) {
            answer = `Bonjour ! Je suis Vortex Voice, votre assistant vocal spécialisé en informatique. Mon créateur est Béni Kikwika Kambwala.`;
            speakAnswer(answer, true);
            return;
        }
    }

    // Questions sur le créateur
    const creatorQuestions = [
        "qui t'a créé", "qui est ton propriétaire", "qui est ton créateur",
        "parle-moi de ton créateur", "parle-moi de toi", "qui est derrière toi"
    ];
    for (let cq of creatorQuestions) {
        if (question.includes(cq)) {
            answer = "Mon créateur est Béni Kikwika Kambwala. Il m'a conçu pour répondre à toutes les questions d’informatique et aider les étudiants et développeurs.";
            speakAnswer(answer, true);
            return;
        }
    }

    // Définitions fondamentales
    const definitions = [
        {keywords:["ordinateur"], response:"Un ordinateur est une machine électronique capable de traiter, stocker et manipuler des informations selon des instructions données par un programme."},
        {keywords:["informatique"], response:"L'informatique est la science du traitement automatique de l'information à l'aide d'ordinateurs et de logiciels."},
        {keywords:["bit"], response:"Un bit est l'unité minimale d'information en informatique, pouvant être 0 ou 1."},
        {keywords:["octet"], response:"Un octet est un ensemble de 8 bits, utilisé pour mesurer la capacité de stockage ou la taille des données."}
    ];

    for (let def of definitions) {
        for (let kw of def.keywords) {
            if (question.includes(kw)) {
                answer = def.response;
                speakAnswer(answer);
                return;
            }
        }
    }

    // Composants de l'ordinateur
    const computerComponents = [
        {keywords: ["composants de l'ordinateur", "ordinateur composants", "parties du pc"], response:
`Les composants principaux d'un ordinateur sont :
- Processeur (CPU) : le cerveau de l’ordinateur (~exécute les instructions).
- Mémoire vive (RAM) : mémoire temporaire pour les données en cours d'utilisation.
- Carte mère : connecte tous les composants.
- Carte graphique (GPU) : gère l'affichage et les calculs graphiques.
- Disque dur / SSD : stockage permanent.
- Alimentation (PSU) : fournit l'énergie.
- Carte son : gère l'audio.
- Carte réseau : connecte à Internet.
- Boîtier : protège les composants.
- Ventilateurs / refroidissement : régulent la température.
- Périphériques : clavier, souris, écran, imprimante.`}
    ];

    for (let comp of computerComponents) {
        for (let kw of comp.keywords) {
            if (question.includes(kw)) {
                answer = comp.response;
                speakAnswer(answer);
                return;
            }
        }
    }

    // Créateurs célèbres avec années
    const creatorsFAQ = [
        {keywords:["créateurs de l'informatique", "pionniers informatique"], response:
`Pionniers de l'informatique :
- Charles Babbage (~1837) : machine analytique.
- Ada Lovelace (~1843) : premier programme pour machine analytique.
- Alan Turing (~1936) : machine de Turing.
- John von Neumann (~1945) : architecture moderne.
- Grace Hopper (~1959) : langage COBOL.`},
        {keywords:["générations d'ordinateur", "évolution ordinateur"], response:
`Générations d’ordinateurs :
1. 1ère génération (1940-1956) : tubes à vide.
2. 2ème génération (1956-1963) : transistors.
3. 3ème génération (1964-1971) : circuits intégrés.
4. 4ème génération (1971-1980) : microprocesseurs.
5. 5ème génération (1980-aujourd’hui) : intelligence artificielle et parallélisme.`}
    ];

    for (let item of creatorsFAQ) {
        for (let kw of item.keywords) {
            if (question.includes(kw)) {
                answer = item.response;
                speakAnswer(answer);
                return;
            }
        }
    }

    // FAQ informatique
    const faq = [
        {keywords: ["algorithme", "définition d'algorithme"], response: "Un algorithme est une suite d'instructions pour résoudre un problème ou exécuter une tâche."},
        {keywords: ["programmation", "coder", "écrire un programme"], response: "La programmation consiste à écrire des instructions compréhensibles par l'ordinateur pour créer des logiciels et résoudre des problèmes."},
        {keywords: ["langage de programmation", "python", "javascript", "html", "css", "java", "c++"], response: "Un langage de programmation permet de communiquer avec l'ordinateur pour créer des programmes. Exemples : Python, JavaScript, Java, C++, HTML, CSS."},
        {keywords: ["logiciel", "logiciels"], response: "Un logiciel est un programme permettant d'accomplir une tâche sur l'ordinateur, comme Word ou Excel."},
        {keywords: ["word"], response: "Microsoft Word est un logiciel de traitement de texte."},
        {keywords: ["excel"], response: "Microsoft Excel est un logiciel de tableur."},
        {keywords: ["bases de données"], response: "Une base de données est un système organisé pour stocker et gérer des informations."},
        {keywords: ["vortex"], response: "Vortex Voice est votre assistant vocal spécialisé en informatique."},
        {keywords: ["ia", "intelligence artificielle"], response: "L'intelligence artificielle permet à la machine de simuler l'intelligence humaine."},
        {keywords: ["machine learning", "apprentissage automatique"], response: "Le machine learning permet à l'ordinateur d'apprendre à partir de données."}
    ];

    for (let item of faq) {
        for (let kw of item.keywords) {
            if (question.includes(kw)) {
                answer = item.response;
                break;
            }
        }
        if (answer !== "Je ne suis pas sûr de comprendre. Peux-tu préciser ta question ?") break;
    }

    speakAnswer(answer);
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
