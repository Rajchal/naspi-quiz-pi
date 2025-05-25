document.addEventListener("DOMContentLoaded", function() {
  const imageContainer = document.getElementById("image-container");
  const questionContainer = document.getElementById("question-container");

  let switchFlag = false;
  let chapter = 'none';
  let myQuestion = [];

  async function fetchQuestion(chapter_name) {
    try {
      const res = await fetch(`http://192.168.4.1:5000/live-quiz/${chapter_name}`);
      const data = await res.json();
      const display = data.display;
      if (!display) {
        imageContainer.style.display = "block";
        questionContainer.style.display = "none";
        switchFlag = false;
        return;
      } 
      console.log("Question data:", data.question.options);
      myQuestion = data.question.options;
      const ques = document.getElementById("question");
      ques.textContent = data.question.title;
      ques.classList.remove("animate-pulse");

      const answers = document.getElementById("answers");
      answers.innerHTML = "";
      myQuestion.forEach((opt) => {
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
      if (data.question['imageRelativePath']!==null){
        const img = document.getElementById("question-image");
        img.style.display = "block";
        img.alt = "Question Image";
        img.src = "/home/ainas/api-test/uploads/"+chapter_name+"/"+data.question['imageRelativePath'];
      }else {
        const img = document.getElementById("question-image");
        img.style.display = "none";
      }
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
      const res = await fetch("http://192.168.4.1:5000/display");
      const data = await res.json();
      if (data.display){
        console.log("Display data:", data);
        imageContainer.style.display = "none";
        questionContainer.style.display = "block";
        chapter = data.quizName;
        switchFlag = true;
      }
    }
    catch (e) {
      console.error("Error fetching display:", e);
    }
  }

  showImage();
  function startup(){
    if (!switchFlag) {
      console.log("Fetching display for chapter:");
      fetchDisplay();
    }
    else {
      console.log("Fetching question for chapter:");
      fetchQuestion(chapter);
    }
  }

  setInterval(startup, 1000);
});