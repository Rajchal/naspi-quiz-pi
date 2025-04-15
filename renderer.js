async function fetchQuestion() {
  try {
    const res = await fetch("http://192.168.85.216:5000");
    const data = await res.json();

    document.getElementById("question").textContent = data.question;
    const answers = document.getElementById("answers");
    answers.innerHTML = "";
    const showAnswer = data.show;
    inde = 0;
    data.options.forEach((opt) => {
      const li = document.createElement("li");
      li.textContent = opt;
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
      const popppElement = document.getElementById("poppp");
      if (popppElement) {
        popppElement.className = "text-green-400";
        popppElement.style.display = "block"; // Ensure the element is visible
      } else {
        console.warn('Element with ID "poppp" not found.');
      }
    }
  } catch (e) {
    console.error("Error fetching question:", e);
  }
}

setInterval(fetchQuestion, 3000);
