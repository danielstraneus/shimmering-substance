let reset = function () {
  const canvas = document.getElementById("canvas");
  const c = canvas.getContext("2d");

  let mouseX;
  let mouseY;

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const maxRadius = 55;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Circle {
    constructor(xCoordinate, yCoordinate, radius) {
      const randomNumber = Math.floor(Math.random() * 18);
      const randomTrueOrFalse = Math.floor(Math.random() * 4);

      this.xCoordinate = xCoordinate;
      this.yCoordinate = yCoordinate;
      this.radius = radius / 6;
      this.color = colorArray[randomNumber];

      if (randomTrueOrFalse == 1) {
        this.xVelocity = -Math.random() * 0.5;
      } else {
        this.xVelocity = Math.random() * 0.5;
      }

      if (randomTrueOrFalse == 1) {
        this.yVelocity = -Math.random() * 0.5;
      } else {
        this.yVelocity = Math.random() * 0.5;
      }

      this.update = function () {
        this.xCoordinate += this.xVelocity;
        const xDistance = mouseX - this.xCoordinate;
        const yDistance = mouseY - this.yCoordinate;
        const originalRadius = radius / 4;
        this.yCoordinate += this.yVelocity;

        this.draw();
      };

      this.draw = function () {
        c.beginPath();
        c.arc(
          this.xCoordinate,
          this.yCoordinate,
          Math.abs(this.radius),
          0,
          Math.PI * 4
        );
        c.fillStyle = this.color;
        c.fill();
      };
    }
  }

  const colorArray = [
    "rgb(70,65,49)",
    "rgb(239,229,188)",
    "rgb(197,163,62)",
    "rgb(194,172,109)",
    "rgb(199,180,151)",
    "rgb(70,65,49)",
    "rgb(150,79,47)",
    "rgb(160,148,139)",
    "rgb(165,171,154)",
    "rgba(249,240,140,255)",
    "rgba(239,205,54,255)",
    "rgba(247,241,212,255)",
    "rgba(255,245,212,255)",
    "rgba(245,246,215,255)",
    "rgba(252,219,54,255)",
    "rgba(255,233,137,255)",
    "rgba(248,195,64,255)",
    "rgba(248,178,60,255)",
  ];
  const myCircle = new Circle(30, 80, 10);
  let circleArray = [];

  for (let i = 0; i < 8000; i++) {
    function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const rndInt = randomIntFromInterval(Math.cos(2) + Math.cos(20));

    const randomXCoordinate = Math.random() * canvasWidth;
    const randomYCoordinate = Math.random() * canvasHeight;
    const randomRadius = Math.random() * 12;
    circleArray.push(
      new Circle(randomXCoordinate, randomYCoordinate, randomRadius)
    );
  }

  function updateAll() {
    myCircle.update();
    for (let i = 0; i < circleArray.length; i++) {
      circleArray[i].update();
    }
    window.requestAnimationFrame(updateAll);
  }
  updateAll();
};

document.getElementById("button").addEventListener("click", reset);
