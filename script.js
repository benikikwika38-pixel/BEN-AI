// 🎯 GENERATE IA MESSAGE
function generateMessage(){

    let type = document.getElementById("type").value;

    let debut = ["Je comprends que", "Aujourd’hui je sais que", "Avec le temps,", "Il faut accepter que"];

    let milieu = {
        motivation: ["la discipline bat le talent", "le travail paye toujours", "chaque effort compte"],
        amour: ["l’amour vrai est rare", "les sentiments sont puissants", "aimer demande du courage"],
        clash: ["tout le monde n’a pas ton niveau", "les faibles critiquent", "tu es dans une autre catégorie"],
        mystere: ["le silence parle", "tout ne doit pas être dit", "les vrais comprennent"]
    };

    let fin = ["... et ça change tout.", "... avance sans peur.", "... reste concentré.", "... le reste suivra."];

    let phrase =
        debut[Math.floor(Math.random()*debut.length)] + " " +
        milieu[type][Math.floor(Math.random()*milieu[type].length)] + " " +
        fin[Math.floor(Math.random()*fin.length)];

    document.getElementById("resultat").innerText = phrase;
}

// 🔊 VOICE
function speakMessage(){
    let text = document.getElementById("resultat").innerText;

    if(text === ""){
        alert("Génère un message !");
        return;
    }

    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "fr-FR";

    window.speechSynthesis.speak(speech);
}

// 🎤 VOICE RECOGNITION
function startListening(){

    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.lang = "fr-FR";
    recognition.start();

    recognition.onresult = function(event){
        let voiceText = event.results[0][0].transcript;

        document.getElementById("resultat").innerText = "Tu as dit : " + voiceText;

        respondAI(voiceText);
    }
}

// 🤖 IA RESPONSE
function respondAI(text){

    let response = "";

    text = text.toLowerCase();

    if(text.includes("motivation")){
        response = "Continue, tu es sur la bonne voie.";
    }
    else if(text.includes("amour")){
        response = "L’amour est une force puissante.";
    }
    else if(text.includes("bonjour")){
        response = "Bonjour bro, comment vas-tu ?";
    }
    else{
        response = "Je comprends… continue d’avancer.";
    }

    document.getElementById("resultat").innerText = response;

    let speech = new SpeechSynthesisUtterance(response);
    speech.lang = "fr-FR";

    window.speechSynthesis.speak(speech);
}
