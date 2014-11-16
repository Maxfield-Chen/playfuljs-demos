$(function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'TCWS', { preload: preload, create: create, update: update, render: render });
  var emitter;

  function preload() {
      game.load.image('spirit', 'assets/sprites/spirit.png');
  }

  function create() {
      game.physics.startSystem(Phaser.Physics.ARCADE);

      game.stage.backgroundColor = 0x34495e;

      emitter = game.add.emitter(0, 0, 1000);

      emitter.minParticleSpeed.setTo(-200, -300);
      emitter.maxParticleSpeed.setTo(200, -400);
      emitter.minParticleScale = 0.5;
      emitter.maxParticleScale = 2;
      emitter.makeParticles('spirit');

      game.input.onDown.add(particleBurst, this);
  }

  function update() {
      //game.physics.arcade.collide(emitter);
  }

  function render() {
  }

  function particleBurst(pointer) {
    //  Position the emitter where the mouse/touch event was
    emitter.x = pointer.x;
    emitter.y = pointer.y;

    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    emitter.start(true, 2000, null, 100);
  }
});
