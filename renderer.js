const imageContainer = document.getElementById("image-container");
const questionContainer = document.getElementById("question-container");

switchFlag = false;
chapter='none'

async function fetchQuestion(chapter_name) {
  try {
    const res = await fetch(`http://139.59.27.235:5000/live-quiz/${chapter_name}`);
    const data = await res.json();
    const display = data.display;
    if (!display) {
      imageContainer.style.display = "none";
      questionContainer.style.display = "block";
      switchFlag = false;
      return;
    } 

    const ques = document.getElementById("question-container");
    ques.textContent = data.question.title;
    ques.classList.remove("animate-pulse");

    const answers = document.getElementById("answers");
    answers.innerHTML = "";
    data.question.options.forEach((opt) => {
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
    });
  } catch (e) {
    console.error("Error fetching question:", e);
  }
}


function showImage() {
  imageContainer.style.display = "block";
  questionContainer.style.display = "none";
}

async function fetchDisplay() {
  try {
    const res = await fetch("http://139.59.27.235:5000/display");
    const data = await res.json();
    if (data.display){
      imageContainer.style.display = "block";
      questionContainer.style.display = "none";
      chapter=data.quizName;
      switchFlag = true;
    }
    else {  
      imageContainer.style.display = "none";
      questionContainer.style.display = "block";
      questionContainer.classList.add("animate-pulse");
    }
  }
  catch (e) {
    console.error("Error fetching display:", e);
  }
}

showImage();
function startup(){
  if (switchFlag) {
    fetchDisplay();
  }
  else {
    fetchQuestion();
  }
}
