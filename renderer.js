async function fetchQuestion(chapter_name) {
  try {
    const res = await fetch(`http://139.59.27.235:5000/live-quiz/${chapter_name}`);
    const data = await res.json();

    const ques = document.getElementById("question");
    ques.textContent = data.question;
    ques.classList.remove("animate-pulse");

    const answers = document.getElementById("answers");
    answers.innerHTML = "";
    const showAnswer = data.show;
    let inde = 0;
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
        console.warn(`Element with ID ${data.correct} not found.`);
      }
    }
  } catch (e) {
    console.error("Error fetching question:", e);
  }
}

// Call fetchQuestion every 3 seconds
setInterval(fetchQuestion('1-nero_quiz'), 3000);

async function fetchChapter() {
  try {
    const res = await fetch("http://192.168.1.17:5000/chapters");
    const data = await res.json();
  } catch (e) {
    console.error("Error fetching Chapters:", e);
  }
}

const imageContainer = document.getElementById("image-container");
const questionContainer = document.getElementById("question-container");

function showImage() {
  imageContainer.style.display = "block";
  questionContainer.style.display = "none";

  setTimeout(() => {
    imageContainer.style.display = "none";
    questionContainer.style.display = "block";
    fetchQuestion();
  }, 5000);
}

async function fetchCommand() {
  try {
    const res = await fetch("http://192.168.1.17:5000/commands");
    const data = await res.json();
  } catch (e) {
    console.error("Error fetching Commands:", e);
  }
}

showImage();
setInterval(fetchCommand, 3000);
