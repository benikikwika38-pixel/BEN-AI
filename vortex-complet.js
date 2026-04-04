// Vérifier compatibilité
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'fr-FR';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const startBtn = document.getElementById('startBtn');
const outputDiv = document.getElementById('output');

// Fonction pour lancer l'écoute
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
    let answer = "Désolé, je ne sais pas répondre à cela pour le moment.";
    question = question.toLowerCase();

    // Salutations et présentation
    const greetings = ["bonjour", "salut", "hello", "salutations"];
    for (let g of greetings) {
        if (question.includes(g)) {
            answer = `Bonjour ! Je suis Vortex Voice, votre assistant vocal spécialisé en informatique. Je peux répondre à vos questions sur l'informatique, les logiciels, la programmation et plus encore. Mon créateur est Béni Kikwika Kambwala.`;
            speak(answer);
            outputDiv.textContent += `\n💡 Réponse: ${answer}`;
            return;
        }
    }

    // FAQ complète
    const faq = [
        {keywords: ["qu'est ce qu'un algorithme", "définition d'algorithme"], response: "Un algorithme est une suite d'instructions étape par étape permettant de résoudre un problème ou d'effectuer une tâche précise."},
        {keywords: ["python"], response: "Python est un langage de programmation simple et puissant. Il est utilisé pour le développement web, la science des données, l'intelligence artificielle et l'automatisation."},
        {keywords: ["javascript"], response: "JavaScript est un langage de programmation qui rend les pages web interactives et dynamiques."},
        {keywords: ["html"], response: "HTML est un langage de balisage utilisé pour structurer le contenu d'une page web."},
        {keywords: ["css"], response: "CSS est un langage de style qui permet de mettre en forme les pages web, ajouter des couleurs, des polices et des animations."},
        {keywords: ["word"], response: "Microsoft Word est un logiciel de traitement de texte qui permet de créer, modifier et mettre en forme des documents facilement."},
        {keywords: ["excel"], response: "Microsoft Excel est un tableur qui permet de gérer des données, effectuer des calculs et créer des graphiques."},
        {keywords: ["bases de données", "base de données"], response: "Une base de données est un système organisé permettant de stocker, gérer et interroger des informations de manière structurée."},
        {keywords: ["programmation générale"], response: "La programmation générale consiste à apprendre les concepts de base de la programmation pour créer des programmes et résoudre des problèmes informatiques."},
        {keywords: ["initiation à l'informatique", "informatique débutant"], response: "L'initiation à l'informatique permet de comprendre les concepts de base, comme l'utilisation d'un ordinateur, des logiciels et des notions de programmation."},
        {keywords: ["vortex"], response: "Vortex Voice est votre assistant vocal créé pour répondre à toutes vos questions sur l'informatique."},
        {keywords: ["ia", "intelligence artificielle"], response: "L'intelligence artificielle permet aux machines de simuler des fonctions humaines comme l'apprentissage, la compréhension et la prise de décision."},
        {keywords: ["machine learning", "apprentissage automatique"], response: "Le machine learning est une technique d'IA où l'ordinateur apprend à partir de données pour effectuer des tâches sans programmation explicite."},
        {keywords: ["algorithme tri", "tri"], response: "Un algorithme de tri organise des données selon un ordre précis, comme croissant ou décroissant."}
    ];

    for (let item of faq) {
        for (let kw of item.keywords) {
            if (question.includes(kw)) {
                answer = item.response;
                break;
            }
        }
        if (answer !== "Désolé, je ne sais pas répondre à cela pour le moment.") break;
    }

    outputDiv.textContent += `\n💡 Réponse: ${answer}`;
    speak(answer);
}

// Fonction pour parler
function speak(text) {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'fr-FR';
    synth.speak(utter);
}
