const questions = [
    {
      question : "Qual ingrediente NÃO faz parte da película?",
      options: ["Amido de milho", "Glicose", "Vinagre", "Plástico"],
      answer: 3
    },
    {
      question: "Qual o principal benefício da película?",
      options: ["Deixar a fruta mais doce", "Reduzir desperdício de alimentos", "Aumentar o preço", "Produzir mais plástico"],
      answer: 1
    },
    {
      question: "O que a película faz com a fruta?",
      options: ["Apodrece mais rápido", "Perde mais água", "Mantém fresca por mais tempo", "Deixa com gosto ruim"],
      answer: 2
    },
    {
      question: "Qual ingrediente funciona como plastificante, deixando a película flexível?",
      options: ["Vinagre", "Água", "Glicose", "Amido de milho"],
      answer: 2
    },
    {
      question: "O vinagre na receita tem qual função principal?",
      options: ["Adoçar a mistura", "Acidificar e aumentar a durabilidade", "Dar cor", "Substituir a água"],
      answer: 1
    },
    {
      question: "O plástico tradicional demora cerca de quanto tempo para se decompor?",
      options: ["1 mês", "10 anos", "100 anos", "Mais de 400 anos"],
      answer: 3
    },
    {
      question: "Qual problema ambiental é causado pelo excesso de plástico?",
      options: ["Poluição dos oceanos", "Aumento da fertilidade do solo", "Produção de mais oxigênio", "Aceleração da decomposição natural"],
      answer: 0
    },
    {
      question: "Se essa película fosse aplicada em grande escala, qual impacto positivo traria?",
      options: ["Mais plástico nas feiras", "Redução do desperdício e menos plástico descartável", "Aumento no preço das frutas", "As frutas estragariam mais rápido"],
      answer: 1
    }
  ];
  
  let current = 0;
  let score = 0;
  let answered = false; // controla se a questão foi respondida
  
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const resultEl = document.getElementById("result");
  const nextBtn = document.getElementById("nextBtn");
  const quizEl = document.getElementById("quiz");
  const scoreboardEl = document.getElementById("scoreboard");
  const finalScoreEl = document.getElementById("finalScore");
  
  function loadQuestion() {
    resultEl.innerText = "";
    resultEl.style.color = "#333"; // cor padrão
    let q = questions[current];
    questionEl.innerText = q.question;
    optionsEl.innerHTML = "";
    answered = false; // reseta a cada questão
  
    q.options.forEach((opt, i) => {
      let btn = document.createElement("button");
      btn.innerText = opt;
      btn.onclick = () => checkAnswer(i, btn);
      optionsEl.appendChild(btn);
    });
  }
  
  function checkAnswer(i, btn) {
    if (answered) return; // impede marcar mais de uma vez
  
    let q = questions[current];
    if (i === q.answer) {
      btn.classList.add("correct");
      resultEl.innerText = "✅ Correto!";
      resultEl.style.color = "#2E7D32"; // verde
      score++;
    } else {
      btn.classList.add("wrong");
      resultEl.innerText = "❌ Errado!";
      resultEl.style.color = "#f44336"; // vermelho
    }
  
    // desabilita todas as opções
    Array.from(optionsEl.children).forEach(b => b.disabled = true);
  
    answered = true; // agora pode ir para a próxima
  }
  
  function nextQuestion() {
    if (!answered) {
      resultEl.innerText = "⚠️ Responda a questão antes de avançar!";
      resultEl.style.color = "#f44336"; // vermelho de aviso
      return;
    }
  
    if (current < questions.length - 1) {
      current++;
      loadQuestion();
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    quizEl.classList.add("hidden");
    scoreboardEl.classList.remove("hidden");
  
    // Mostra pontuação
    finalScoreEl.innerText = `Você fez ${score} pontos de ${questions.length}!`;
  
    // Mensagens personalizadas
    let mensagemFinal = "";
    if (score === questions.length) {
      mensagemFinal = "🌱 Parabéns! Você é um herói do meio ambiente!";
    } else if (score >= Math.floor(questions.length / 2)) {
      mensagemFinal = "♻️ Muito bom! Mas ainda dá pra aprender mais sobre sustentabilidade!";
    } else {
      mensagemFinal = "🍃 Quase lá! Continue estudando sobre consumo consciente!";
    }
  
    // Exibe mensagem abaixo da pontuação
    const msgEl = document.createElement("p");
    msgEl.innerText = mensagemFinal;
    msgEl.classList.add("final-message"); 
    finalScoreEl.appendChild(document.createElement("br"));
    finalScoreEl.appendChild(msgEl);
  }
  
  function restartQuiz() {
    current = 0;
    score = 0;
    quizEl.classList.remove("hidden");
    scoreboardEl.classList.add("hidden");
    loadQuestion();
  }
  
  nextBtn.addEventListener("click", nextQuestion);
  
  loadQuestion();
  