document.addEventListener("DOMContentLoaded", function() {
  const imageContainer = document.getElementById("image-container");
  const questionContainer = document.getElementById("question-container");
  const pdfPage = document.getElementById("pdf-page");

  let switchFlag = false;
  let chapter = 'none';
  let pdf = 'none';
  let myQuestion = [];

  async function fetchPdfImages(pdfName) {
    try {
      const res = await fetch("http://192.168.4.1:5000/pdf-images/" + pdfName);
      const data = await res.json();
      const display = data.display;
      if (!display) {
        imageContainer.style.display = "none";
        pdfPage.style.display = "block";
        switchFlag = false;
        return;
      }
      pdfPage.src = data.images;
      pdfPage.style.display = "block";
      pdfPage.alt = "PDF Page Image";
  } catch (e) {
      console.error("Error fetching PDF images:", e);
    }
  }

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
      if (data.audio){
        const audio =document.getElementById("audio");
        audio.play();

      }
      else{
        const audio =document.getElementById("audio");
        audio.pause();
        audio.currentTime = 0;
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
        img.src = "../api-test/uploads/"+chapter_name+"/"+data.question['imageRelativePath'].split('/')[2];
        console.log("Image path:", img.src);
        
      }else {
        const img = document.getElementById("question-image");
        img.style.display = "none";
      }
      if (data.question['audioRelativePath']!==null){
        const audio = document.getElementById("audio");
        audio.style.display = "block";
        audio.src = "../api-test/uploads/"+chapter_name+"/"+data.question['audioRelativePath'].split('/')[2];
        console.log("Audio path:", audio.src);
      }
      else {
        const audio = document.getElementById("audio");
        audio.style.display = "none";
      }
    } catch (e) {
      console.error("Error fetching question:", e);
    }
  }

  function showImage() {
    imageContainer.style.display = "block";
    pdfPage.style.display = "none";
    questionContainer.style.display = "none";
  }

  async function fetchDisplay() {
    try {
      const res = await fetch("http://192.168.4.1:5000/display");
      const data = await res.json();
      if (data.display){
        imageContainer.style.display = "none";
        questionContainer.style.display = "block";
        if (chapter){chapter = data.quizName;}
        if (pdf){pdf=data.pdfName;}
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
      fetchDisplay();
    }
    else {
      if (pdf !== 'none') {
        fetchPdfImages(pdf);
      }else if( chapter !== 'none') {
        fetchQuestion(chapter);
      }
    }
  }

  setInterval(startup, 1000);
});