from flask import Flask, render_template, request, jsonify
import openai
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

# Mots-clés pour filtrer questions d'informatique
mots_informatique = [
    "python","java","html","css","javascript","c++",
    "algorithme","réseau","base de données","sql",
    "flask","django"
]

def est_question_informatique(question):
    return any(mot in question.lower() for mot in mots_informatique)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/poser_question", methods=["POST"])
def poser_question():
    question = request.json.get("question")
    if est_question_informatique(question):
        reponse = openai.ChatCompletion.create(
            model="gpt-5-mini",
            messages=[{"role":"user","content": question}]
        )
        return jsonify({"reponse": reponse.choices[0].message.content})
    else:
        return jsonify({"reponse": "Désolé, je ne réponds qu'aux questions d'informatique 😅"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
