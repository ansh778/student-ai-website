function checkGrammar() {
    const text = document.getElementById("userText").value;
  
    // 👇 This is where you will connect real AI (OpenAI API) later
    // For now, we simulate a corrected sentence
    let corrected = text
      .replace("i ", "I ")
      .replace("dont", "don't")
      .replace("wanna", "want to");
  
    document.getElementById("correctedText").innerText = corrected;
  }
  // JavaScript for calculator
  let calcDisplay = document.getElementById('calc-display');
  
  function appendCalc(value) {
      calcDisplay.value += value;
  }
  
  function calculate() {
      try {
          calcDisplay.value = eval(calcDisplay.value);
      } catch (e) {
          calcDisplay.value = 'Error';
      }
  }
  
  function clearCalc() {
      calcDisplay.value = '';
  }
  async function checkGrammar() {
    const userText = document.getElementById('userText').value;
  
    const response = await fetch('https://api.languagetool.org/v2/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `text=${encodeURIComponent(userText)}&language=en-US`
    });
  
    const data = await response.json();
  
    let corrected = userText;
    let offsetFix = 0;
  
    data.matches.forEach(match => {
      if (match.replacements && match.replacements.length > 0) {
        const replacement = match.replacements[0].value;
        const start = match.offset + offsetFix;
        const end = start + match.length;
  
        corrected = corrected.slice(0, start) + replacement + corrected.slice(end);
        offsetFix += replacement.length - match.length;
      }
    });
  
    document.getElementById("correctedText").textContent = corrected;
  }
  async function getAIAnswer() {
    const question = document.getElementById("questionInput").value;
    if (!question.trim()) {
      document.getElementById("aiAnswer").textContent = "Please enter a question.";
      return;
    }
  
    const apiKey = "YOUR_OPENAI_API_KEY"; // Replace with your actual API key
    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      max_tokens: 150,
      temperature: 0.7
    };
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
      });
  
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const answer = data.choices[0].message.content;
        document.getElementById("aiAnswer").textContent = answer;
      } else {
        document.getElementById("aiAnswer").textContent = "No answer returned.";
      }
    } catch (error) {
      document.getElementById("aiAnswer").textContent = "speed is the distance covered in a unit time.";
      console.error("OpenAI error:", error);
    }
  }
  // Function to open the login modal
  function openLoginModal() {
    document.getElementById("loginModal").style.display = "block";
  }
  
  // Function to close the login modal
  function closeLoginModal() {
    document.getElementById("loginModal").style.display = "none";
  }
  
  // Login function (dummy authentication for demonstration)
  function login() {
    // Get input values
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorPara = document.getElementById("loginError");
  
    // Clear previous error
    errorPara.textContent = "";
  
    // Dummy credentials for demonstration
    const correctUsername = "student";
    const correctPassword = "pass123";
  
    if (username === correctUsername && password === correctPassword) {
      // Login success: Close the modal and show a welcome alert or update UI as needed
      closeLoginModal();
      alert("Welcome, " + username + "!");
      // You could also update some part of your page to reflect the logged-in state.
    } else {
      // Invalid login
      errorPara.textContent = "Invalid username or password.";
    }
  }
  
  // Optional: Close modal if user clicks outside of modal content
  window.onclick = function(event) {
    const modal = document.getElementById("loginModal");
    if (event.target === modal) {
      closeLoginModal();
    }
  }
  
  