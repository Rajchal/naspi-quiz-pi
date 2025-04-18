async function fetchQuestion() {
  try {
    const res = await fetch("http://192.168.1.17:5000");
    const data = await res.json();

    document.getElementById("question").textContent = data.question;
    const answers = document.getElementById("answers");
    answers.innerHTML = "";
    const showAnswer = data.show;
    inde = 0;
    data.options.forEach((opt) => {
      const li = document.createElement("li");
      li.textContent = opt;
      li.id = inde;
      li.classList.add(
        "bg-gray-700",
        "p-4",
        "rounded-lg",
        "cursor-pointer",
        "hover:bg-blue-500",
        "transition",
        "duration-300",
        "text-lg"
      );
      answers.appendChild(li);
      inde++;
    });
    if (showAnswer == "yes") {
      const popppElement = document.getElementById(data.correct);
      if (popppElement) {
        popppElement.classList.remove("bg-gray-700");
        popppElement.classList.add("bg-green-900");
      } else {
        console.warn('Element with ID "poppp" not found.');
      }
    }
  } catch (e) {
    console.error("Error fetching question:", e);
  }
}

setInterval(fetchQuestion, 3000);
