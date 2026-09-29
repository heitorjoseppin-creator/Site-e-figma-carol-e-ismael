/* ==================================================
   TRAINX
   APP.JS
================================================== */


/* ==================================================
   ELEMENTOS
================================================== */

const screens =
  document.querySelectorAll(".screen");

const sidebarButtons =
  document.querySelectorAll(
    ".menu-item[data-screen]"
  );

const mobileButtons =
  document.querySelectorAll(
    ".mobile-nav-item"
  );

const screenButtons =
  document.querySelectorAll(
    "[data-screen]"
  );


/* ==================================================
   NAVEGAÇÃO
================================================== */

function showScreen(screenName) {

  screens.forEach(screen => {

    screen.classList.remove("active");

  });


  const target =
    document.getElementById(screenName);


  if (!target) return;


  target.classList.add("active");


  updateNavigation(screenName);


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* ==================================================
   ATUALIZA MENU
================================================== */

function updateNavigation(screenName) {

  sidebarButtons.forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.screen === screenName
    );

  });


  mobileButtons.forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.screen === screenName
    );

  });

}


/* ==================================================
   TODOS OS BOTÕES DE NAVEGAÇÃO
================================================== */

screenButtons.forEach(button => {

  button.addEventListener(
    "click",
    function () {

      const screen =
        this.dataset.screen;

      if (screen) {

        showScreen(screen);

      }

    }
  );

});


/* ==================================================
   BOTÃO INICIAR TREINO
================================================== */

const startButton =
  document.getElementById(
    "startWorkoutButton"
  );


if (startButton) {

  startButton.addEventListener(
    "click",
    () => {

      showScreen("workout");

      startWorkoutTimer();

    }
  );

}


/* ==================================================
   FILTROS
================================================== */

const filters =
  document.querySelectorAll(".filter");


filters.forEach(filter => {

  filter.addEventListener(
    "click",
    () => {

      filters.forEach(item => {

        item.classList.remove(
          "active"
        );

      });


      filter.classList.add("active");

    }
  );

});


/* ==================================================
   CRONÔMETRO DO TREINO
================================================== */

let workoutSeconds = 0;

let workoutInterval = null;


function startWorkoutTimer() {

  if (workoutInterval) return;


  workoutInterval =
    setInterval(() => {

      workoutSeconds++;

      const minutes =
        Math.floor(
          workoutSeconds / 60
        );

      const seconds =
        workoutSeconds % 60;


      const timer =
        document.getElementById(
          "workoutTimer"
        );


      if (timer) {

        timer.textContent =
          String(minutes).padStart(2, "0")
          + ":"
          +
          String(seconds).padStart(2, "0");

      }

    }, 1000);

}


/* ==================================================
   DESCANSO
================================================== */

let restSeconds = 90;

let restInterval = null;


function updateRestTimer() {

  const timer =
    document.getElementById(
      "restTimer"
    );


  if (!timer) return;


  const minutes =
    Math.floor(
      restSeconds / 60
    );

  const seconds =
    restSeconds % 60;


  timer.textContent =
    String(minutes).padStart(2, "0")
    + ":"
    +
    String(seconds).padStart(2, "0");


  if (restSeconds <= 0) {

    clearInterval(restInterval);

    restInterval = null;

    timer.textContent = "00:00";

    return;

  }


  restSeconds--;

}


function startRestTimer() {

  clearInterval(restInterval);

  restSeconds = 90;

  updateRestTimer();

  restInterval =
    setInterval(
      updateRestTimer,
      1000
    );

}


const addRestButton =
  document.getElementById(
    "addRestButton"
  );


if (addRestButton) {

  addRestButton.addEventListener(
    "click",
    () => {

      restSeconds += 30;

      updateRestTimer();

    }
  );

}


const skipRestButton =
  document.getElementById(
    "skipRestButton"
  );


if (skipRestButton) {

  skipRestButton.addEventListener(
    "click",
    () => {

      restSeconds = 0;

      updateRestTimer();

    }
  );

}


/* ==================================================
   CONCLUIR SÉRIE
================================================== */

const completeSetButton =
  document.getElementById(
    "completeSetButton"
  );


if (completeSetButton) {

  completeSetButton.addEventListener(
    "click",
    completeSet
  );

}


function completeSet() {

  const activeSet =
    document.getElementById(
      "activeSet"
    );


  if (!activeSet) return;


  const weight =
    document.getElementById(
      "weightInput"
    ).value;


  const reps =
    document.getElementById(
      "repsInput"
    ).value;


  if (!weight || !reps) {

    alert(
      "Digite o peso e o número de repetições."
    );

    return;

  }


  activeSet.classList.remove(
    "active"
  );


  activeSet.classList.add(
    "completed"
  );


  activeSet.innerHTML = `

    <span>03</span>

    <strong>
      ${weight} kg
    </strong>

    <span>
      ${reps} reps
    </span>

    <b>
      ✓
    </b>

  `;


  startRestTimer();

}


/* ==================================================
   PRÓXIMO EXERCÍCIO
================================================== */

const nextExerciseButton =
  document.getElementById(
    "nextExerciseButton"
  );


let currentExercise = 1;


const exercises = [

  {
    name: "Supino Reto com Barra",
    subtitle: "Peito · Tríceps · Ombros"
  },

  {
    name: "Crucifixo Inclinado",
    subtitle: "Peito · Ombros"
  },

  {
    name: "Desenvolvimento com Halteres",
    subtitle: "Ombros · Tríceps"
  },

  {
    name: "Elevação Lateral",
    subtitle: "Ombros"
  },

  {
    name: "Tríceps Corda",
    subtitle: "Tríceps"
  },

  {
    name: "Supino Inclinado",
    subtitle: "Peito superior"
  },

  {
    name: "Tríceps Francês",
    subtitle: "Tríceps"
  },

  {
    name: "Flexão",
    subtitle: "Peito · Tríceps · Core"
  }

];


if (nextExerciseButton) {

  nextExerciseButton.addEventListener(
    "click",
    nextExercise
  );

}


function nextExercise() {

  if (
    currentExercise >=
    exercises.length
  ) {

    alert(
      "🎉 Treino concluído!\n\nParabéns pelo treino."
    );

    showScreen("dashboard");

    return;

  }


  currentExercise++;


  const exercise =
    exercises[
      currentExercise - 1
    ];


  const name =
    document.getElementById(
      "exerciseName"
    );


  const number =
    document.getElementById(
      "exerciseNumber"
    );


  const progress =
    document.getElementById(
      "workoutProgress"
    );


  const progressText =
    document.getElementById(
      "workoutProgressText"
    );


  if (name) {

    name.textContent =
      exercise.name;

  }


  const subtitle =
    document.querySelector(
      ".exercise-subtitle"
    );


  if (subtitle) {

    subtitle.textContent =
      exercise.subtitle;

  }


  if (number) {

    number.textContent =
      currentExercise;

  }


  const percentage =
    Math.round(
      (currentExercise /
        exercises.length) * 100
    );


  if (progress) {

    progress.style.width =
      percentage + "%";

  }


  if (progressText) {

    progressText.textContent =
      percentage + "%";

  }


  resetActiveSet();

  startRestTimer();

}


/* ==================================================
   RESETAR SÉRIE
================================================== */

function resetActiveSet() {

  const sets =
    document.querySelector(
      ".sets"
    );


  if (!sets) return;


  sets.innerHTML = `

    <div class="set completed">

      <span>01</span>

      <strong>—</strong>

      <span>—</span>

      <b>✓</b>

    </div>


    <div class="set completed">

      <span>02</span>

      <strong>—</strong>

      <span>—</span>

      <b>✓</b>

    </div>


    <div
      class="set active"
      id="activeSet"
    >

      <span>03</span>

      <input
        id="weightInput"
        type="number"
        value="80"
        min="0"
        placeholder="kg"
      >

      <input
        id="repsInput"
        type="number"
        value="10"
        min="1"
        placeholder="reps"
      >

      <button
        id="completeSetButton"
        class="set-button"
      >
        CONCLUIR
      </button>

    </div>


    <div class="set next-set">

      <span>04</span>

      <span>Próxima série</span>

      <span>—</span>

      <span>—</span>

    </div>

  `;


  document
    .getElementById(
      "completeSetButton"
    )
    .addEventListener(
      "click",
      completeSet
    );

}


/* ==================================================
   INICIALIZAÇÃO
================================================== */

showScreen("dashboard");
