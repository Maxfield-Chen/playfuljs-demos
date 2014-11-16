$(function() {
      var DAMPING = 0.97;
      var m = new MersenneTwister();

      function Particle(x, y) {
        this.x = this.oldX = x;
        this.y = this.oldY = y;
      }

      Particle.prototype.integrate = function() {
        var velocityX = (this.x - this.oldX) * DAMPING;
        var velocityY = (this.y - this.oldY) * DAMPING;
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += velocityX;
        this.y += velocityY;
      };

      Particle.prototype.attract = function(x, y) {
        if(mouseDown){
          var dx = x - this.x;
          var dy = y - this.y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          this.x += (dx / distance)*1 * m.random();
          this.y += (dy / distance) *1.5* m.random();
        } else {
          this.x += .5 * m.random() * (m.random() >= .5 ? -1 : 1);
          this.y += .5 * m.random() * (m.random() <= .5 ? -1 : 1);
        }
      };

      Particle.prototype.draw = function() {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.oldX, this.oldY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
      };

      var display = document.getElementById('display');
      var ctx = display.getContext('2d');
      var particles = [];
      var width = display.width = window.innerWidth;
      var height = display.height = window.innerHeight;
      var mouse = { x: width * 0.5, y: height * 0.5 };
      var mouseDown = false;

      for (var i = 0; i < 200; i++) {
        particles[i] = new Particle(Math.random() * width, Math.random() * height);
      }

      display.addEventListener('mousemove', onMousemove);
      display.addEventListener('mousedown', onMousedown);
      display.addEventListener('mouseup', onMouseup);

      function onMousemove(e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      }

      function onMouseup(e) { mouseDown = false; }
      function onMousedown(e) { mouseDown = true; }

      requestAnimationFrame(frame);

      function frame() {
        requestAnimationFrame(frame);
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < particles.length; i++) {
          particles[i].attract(mouse.x, mouse.y);
          particles[i].integrate();
          particles[i].draw();
        }
      }
});
