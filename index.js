const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let ball = {
  x: centerX,
  y: centerY,
  radius: 10,
  vx: 3,
  vy: -5,
  gravity: 0.2,
  bounce: 0.9,
};

let circles = [
  {
    x: centerX,
    y: centerY,
    radius: 100,
    color: "red",
    gapAngle: Math.PI / 3,
    visible: true,
  },
  {
    x: centerX,
    y: centerY,
    radius: 150,
    color: "green",
    gapAngle: Math.PI / 4,
    visible: true,
  },
  {
    x: centerX,
    y: centerY,
    radius: 200,
    color: "green",
    gapAngle: Math.PI / 4,
    visible: true,
  },
  {
    x: centerX,
    y: centerY,
    radius: 230,
    color: "green",
    gapAngle: Math.PI / 4,
    visible: true,
  },
  {
    x: centerX,
    y: centerY,
    radius: 260,
    color: "green",
    gapAngle: Math.PI / 4,
    visible: true,
  },
  {
    x: centerX,
    y: centerY,
    radius: 300,
    color: "green",
    gapAngle: Math.PI / 4,
    visible: true,
  },
];

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Обновляем физику шарика
  ball.vy += ball.gravity;
  ball.x += ball.vx;
  ball.y += ball.vy;

  let dist = Math.hypot(ball.x - centerX, ball.y - centerY);

  // Отскок от стен круга
  if (dist + ball.radius > 150) {
    let angle = Math.atan2(ball.y - centerY, ball.x - centerX);
    ball.vx = -ball.vx * ball.bounce;
    ball.vy = -ball.vy * ball.bounce;
    ball.x = centerX + Math.cos(angle) * (150 - ball.radius);
    ball.y = centerY + Math.sin(angle) * (150 - ball.radius);
  }

  // Проверка попадания в зазоры
  circles = circles.filter(circle => {
    let angle = Math.atan2(ball.y - circle.y, ball.x - circle.x);
    let gapStart = -circle.gapAngle / 2;
    let gapEnd = circle.gapAngle / 2;

    if (dist > circle.radius - ball.radius && dist < circle.radius + ball.radius) {
      if (angle < gapStart || angle > gapEnd) {
        return false; // Удаляем этот круг
      }
    }
    return true;
  });


  drawCircles();
  drawBall();
  requestAnimationFrame(update);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function drawCircles() {
  circles.forEach((circle) => {
    if (!circle.visible) return;

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Рисуем зазор
    let startAngle = -circle.gapAngle / 2;
    let endAngle = circle.gapAngle / 2;

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, startAngle, endAngle);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
  });
}

update();
