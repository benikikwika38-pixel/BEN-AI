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

// Fonction principale pour répondre
function respond(question) {
    let answer = "Je ne suis pas sûr de comprendre. Peux-tu préciser ta question ? Par exemple, sur un logiciel, un langage de programmation ou un algorithme.";
    question = question.toLowerCase();

    // Salutations et présentation
    const greetings = ["bonjour", "salut", "hello", "salutations"];
    for (let g of greetings) {
        if (question.includes(g)) {
            answer = `Bonjour ! Je suis Vortex Voice, votre assistant vocal spécialisé en informatique. Je peux répondre à vos questions sur les logiciels, la programmation, les algorithmes et plus encore. Mon créateur est Béni Kikwika Kambwala.`;
            speakAnswer(answer);
            return;
        }
    }

    // Réponses sur le créateur
    const creatorQuestions = ["qui t'a créé", "qui est ton propriétaire", "qui est ton créateur"];
    for (let cq of creatorQuestions) {
        if (question.includes(cq)) {
            answer = "Mon créateur est Béni Kikwika Kambwala.";
            speakAnswer(answer);
            return;
        }
    }

    // FAQ étendue pour informatique
    const faq = [
        {keywords: ["qu'est ce qu'un algorithme", "définition d'algorithme", "algorithme"], response: "Un algorithme est une suite d'instructions étape par étape permettant de résoudre un problème ou d'effectuer une tâche précise."},
        {keywords: ["tri", "algorithme de tri"], response: "Un algorithme de tri organise des données dans un ordre précis, comme croissant ou décroissant."},
        {keywords: ["programmation", "c'est quoi la programmation", "coder", "écrire un programme"], response: "La programmation consiste à écrire des instructions que l'ordinateur peut comprendre pour créer des logiciels, résoudre des problèmes ou automatiser des tâches. Les langages de programmation sont utilisés pour cela."},
        {keywords: ["langage de programmation", "langages de programmation", "python", "javascript", "html", "css", "java", "c++"], 
         response: "Un langage de programmation est un outil qui permet de communiquer avec l'ordinateur pour créer des programmes et logiciels. Exemples : Python, JavaScript, Java, C++, HTML, CSS."},
        {keywords: ["logiciel", "logiciels"], response: "Un logiciel est un programme informatique qui permet d'exécuter des tâches spécifiques sur un ordinateur, comme Word pour le traitement de texte ou Excel pour les calculs."},
        {keywords: ["word"], response: "Microsoft Word est un logiciel de traitement de texte qui permet de créer, modifier et mettre en forme des documents facilement."},
        {keywords: ["excel"], response: "Microsoft Excel est un logiciel de tableur qui permet de gérer des données, effectuer des calculs et créer des graphiques."},
        {keywords: ["bases de données", "base de données"], response: "Une base de données est un système organisé permettant de stocker, gérer et interroger des informations de manière structurée."},
        {keywords: ["programmation générale"], response: "La programmation générale consiste à apprendre les concepts de base de la programmation pour créer des programmes et résoudre des problèmes informatiques."},
        {keywords: ["initiation à l'informatique", "informatique débutant"], response: "L'initiation à l'informatique permet de comprendre les concepts de base, comme l'utilisation d'un ordinateur, des logiciels et des notions de programmation."},
        {keywords: ["vortex"], response: "Vortex Voice est votre assistant vocal créé pour répondre à toutes vos questions sur l'informatique."},
        {keywords: ["ia", "intelligence artificielle"], response: "L'intelligence artificielle permet aux machines de simuler des fonctions humaines comme l'apprentissage, la compréhension et la prise de décision."},
        {keywords: ["machine learning", "apprentissage automatique"], response: "Le machine learning est une technique d'IA où l'ordinateur apprend à partir de données pour effectuer des tâches sans programmation explicite."}
    ];

    // Recherche de mot-clé dans la question
    for (let item of faq) {
        for (let kw of item.keywords) {
            if (question.includes(kw)) {
                answer = item.response;
                break;
            }
        }
        if (answer !== "Je ne suis pas sûr de comprendre. Peux-tu préciser ta question ? Par exemple, sur un logiciel, un langage de programmation ou un algorithme.") break;
    }

    speakAnswer(answer);
}

// Fonction pour parler et afficher la réponse
function speakAnswer(text) {
    outputDiv.textContent += `\n💡 Réponse: ${text}`;
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'fr-FR';
    synth.speak(utter);
    }
