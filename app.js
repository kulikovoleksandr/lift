class Lift {
  constructor({
    selector: selector = "#lift",
    levels: levels = 9,
    currentLevel: currentLevel = 1,
    doorSpeed: doorSpeed = 1000,
    liftSpeed: liftSpeed = 1000,
    doorOpen: doorOpen = false,
    classes = {
      levels: "levels",
      cabine: "cabine",
      cabineLevelBtns: "cabine__level-controls",
      cabineLevelBtn: "cabine__btn--level",
      openCabineDoorBtn: "cabine__btn--open",
      closeCabineDoorBtn: "cabine__btn--close",
    },
  }) {
    this.classes = classes;
    this.selector = document.querySelector(selector);
    this.rootHtml();
    this.levels = levels;
    this.doorSpeed = doorSpeed;
    this.liftSpeed = liftSpeed;
    this.currentLevel = currentLevel;
    this.cabine = document.querySelector(`.${classes.cabine}`);
    this.cabineLevelBtns = document.querySelector(
      `.${classes.cabineLevelBtns}`
    );
    this.openCabineDoorBtn = document.querySelector(
      `.${classes.openCabineDoorBtn}`
    );
    this.closeCabineDoorBtn = document.querySelector(
      `.${classes.closeCabineDoorBtn}`
    );
    this.levelsHolder = document.querySelector(`.${classes.levels}`);

    this.rootStyles();
    this.generateLevels();
    this.generateCabineBtns();
    this.cabineLevelBtn = document.querySelector(`.${classes.cabineLevelBtn}`);
    this.openCabineDoorBtn.onclick = () => this.openDoor();
    this.closeCabineDoorBtn.onclick = () => this.closeDoor();
  }
  rootStyles() {
    document.head.insertAdjacentHTML(
      "beforeend",
      `<style>
        :root {
          --level-height: calc(100vh / ${this.levels});
          --door-speed: ${this.doorSpeed}ms;
          --lift-speed: ${this.liftSpeed}ms;
        }
      </style>`
    );
  }
  generateLevels() {
    for (let i = this.levels; i > 0; i--) {
      this.levelsHolder.innerHTML += `<div class="level"><button class="level__btn" value="${i}"></button><div class="level__label">${i}</div></div>`;
    }
  }
  generateCabineBtns() {
    for (let i = this.levels; i > 0; i--) {
      let cabineBtn = document.createElement("button");
      cabineBtn.className = "cabine__btn " + this.classes.cabineLevelBtn;
      cabineBtn.setAttribute("value", i);
      cabineBtn.innerText = i;
      this.cabineLevelBtns.appendChild(cabineBtn);
    }
  }
  rootHtml() {
    this.selector.innerHTML = `
    <div class="${this.classes.levels}"></div>
    <div class="${this.classes.cabine}">
      <div class="cabine__inner">
        <div class="cabine__door cabine__door--left"></div>
        <div class="cabine__door cabine__door--right"></div>
      </div>
    </div>
    <div class="cabine__controls">
      <div class="${this.classes.cabineLevelBtns}"></div>
      <div class="cabine__extra-controls">
        <button class="cabine__btn ${this.classes.openCabineDoorBtn}">open</button>
        <button class="cabine__btn cabine__btn--stop">stop</button>
        <button class="cabine__btn ${this.classes.closeCabineDoorBtn}">close</button>
      </div>
    </div>
    `;
  }
  openDoor() {
    this.cabine.classList.add("cabine--open");
  }
  closeDoor() {
    this.cabine.classList.remove("cabine--open");
  }
  moveCabine(level) {
    this.cabine.style.transform = `translateY(-${level - 1}00%)`;
  }
}

const lift = new Lift({
  levels: 8,
  doorSpeed: 1000,
});

lift.openDoor();

document.querySelectorAll(".cabine__btn--level").forEach((el) => {
  el.addEventListener("click", function () {
    lift.closeDoor();
    setTimeout(() => lift.moveCabine(this.value), lift.doorSpeed);
  });
});
