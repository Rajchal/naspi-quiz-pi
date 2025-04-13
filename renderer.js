async function fetchQuestion() {
  try {
    const res = await fetch("http://192.168.85.216:5000");
    const data = await res.json();

    document.getElementById("question").textContent = data.question;
    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    data.options.forEach((opt) => {
      const li = document.createElement("li");
      li.className = "p-4 bg-gray-800 rounded hover:bg-gray-700";
      li.textContent = opt;
      answers.appendChild(li);
    });
  } catch (e) {
    console.error("Error fetching question:", e);
  }
}

setInterval(fetchQuestion, 3000);
