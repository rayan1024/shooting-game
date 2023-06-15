(function () {
    // Game constants
    let canvas = document.getElementById("gameCanvas");
    let ctx = canvas.getContext("2d");
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let playerSize = 20;
    let bulletSize = 10;
    let targetSize = 20;
    let bulletSpeed = 5;
    let targetSpeed = 2;
    let score = 0;
    let gameOver = false;
  
    // Player object
    let player = {
      x: canvasWidth / 2 - playerSize / 2,
      y: canvasHeight - playerSize,
    };
  
    // Bullets array
    let bullets = [];
  
    // Targets array
    let targets = [];
  
    // Keyboard input handling
    document.addEventListener("keydown", handleKeyDown);
  
    function handleKeyDown(event) {
      if (event.key === " ") {
        shoot();
      }
    }
  
    // Shoot a bullet from the player
    function shoot() {
      let bullet = {
        x: player.x + playerSize / 2 - bulletSize / 2,
        y: player.y,
      };
  
      bullets.push(bullet);
    }
  
    // Generate a random target
    function generateTarget() {
      let target = {
        x: Math.random() * (canvasWidth - targetSize),
        y: -targetSize,
      };
  
      targets.push(target);
    }
  
    // Update game state
    function update() {
      // Move bullets
      bullets.forEach(function (bullet) {
        bullet.y -= bulletSpeed;
      });
  
      // Move targets
      targets.forEach(function (target) {
        target.y += targetSpeed;
  
        // Check for collision with bullets
        bullets.forEach(function (bullet, bulletIndex) {
          if (
            bullet.x < target.x + targetSize &&
            bullet.x + bulletSize > target.x &&
            bullet.y < target.y + targetSize &&
            bullet.y + bulletSize > target.y
          ) {
            bullets.splice(bulletIndex, 1);
            targets.splice(targets.indexOf(target), 1);
            score++;
          }
        });
  
        // Check for collision with player
        if (
          player.x < target.x + targetSize &&
          player.x + playerSize > target.x &&
          player.y < target.y + targetSize &&
          player.y + playerSize > target.y
        ) {
          gameOver = true;
        }
      });
  
      // Remove bullets that are out of bounds
      bullets = bullets.filter(function (bullet) {
        return bullet.y > -bulletSize;
      });
  
      // Generate new targets
      if (Math.random() < 0.01) {
        generateTarget();
      }
    }
  
    // Draw game state
    function draw() {
      // Clear the canvas
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
      // Draw player
      ctx.fillStyle = "#32CD32";
      ctx.fillRect(player.x, player.y, playerSize, playerSize);
  
      // Draw bullets
      ctx.fillStyle = "#000000";
      bullets.forEach(function (bullet) {
        ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize);
      });
  
      // Draw targets
      ctx.fillStyle = "#FF0000";
      targets.forEach(function (target) {
        ctx.fillRect(target.x, target.y, targetSize, targetSize);
      });
  
      // Draw score
      ctx.fillStyle = "#000000";
      ctx.font = "24px Arial";
      ctx.fillText("Score: " + score, 10, 30);
  
      // Draw game over message
      if (gameOver) {
        ctx.fillStyle = "#000000";
        ctx.font = "36px Arial";
        ctx.fillText("Game Over", canvasWidth / 2 - 100, canvasHeight / 2);
      }
    }
  
    // Game loop
    function gameLoop() {
      if (gameOver) {
        return;
      }
  
      update();
      draw();
      requestAnimationFrame(gameLoop);
    }
  
    // Start the game loop
    gameLoop();
  })();
  