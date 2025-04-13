async function fetchQuestion() {
  try {
    const res = await fetch("http://192.168.85.216:5000");
    const data = await res.json();

    document.getElementById("question").textContent = data.question;
    const answers = document.getElementById("answers");
    answers.innerHTML = "";
    const showAnswer = data.show;

    data.options.forEach((opt) => {
      const li = document.createElement("li");
      li.textContent = opt;
      answers.appendChild(li);
    });

    if (showAnswer == "yes") {
      document.getElementById("correctAnswer").textContent = data.correct;
    }
  } catch (e) {
    console.error("Error fetching question:", e);
  }
}

setInterval(fetchQuestion, 3000);
