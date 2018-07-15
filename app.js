new Vue({
  el: '#app',
  data: {
    gameLive: false,
    playerHealth: 100,
    monsterHealth: 100,
    rounds: []
  },
  methods: {
    //** Functions

    endGame() {
      this.gameLive = false;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.rounds = [];
    },
    getNum(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    startGame() {
      this.gameLive = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.rounds = [];
    },
    check() {
      if (this.monsterHealth <= 0) {
        if (confirm(`Congratulations, you win!\n Play again?`)) {
          this.startGame();
        } else {
          this.endGame();
        }
      } else if (this.playerHealth <= 0) {
        if (confirm(`You died!\nTry again?`)) {
          this.startGame();
        } else {
          this.endGame();
        }
      }
    },

    //** Actions

    attack() {
      let playerDmg = this.getNum(0, 10);
      this.monsterHealth -= playerDmg;
      this.rounds.unshift({
        player: true,
        text: `You attack the monster for ${playerDmg}.`
      });
      this.monsterAttack();
      this.check();
    },
    monsterAttack() {
      let monsterDmg = this.getNum(0, 12);
      this.playerHealth -= monsterDmg;
      this.rounds.unshift({
        player: false,
        text: `The monster attacks you for ${monsterDmg}.`
      });
      this.check();
    },
    heal() {
      if (this.playerHealth <= 90) {
        let healing = this.getNum(8, 10);
        this.playerHealth += healing;
        let monsterDmg = this.getNum(0, 12);
        this.playerHealth -= monsterDmg;
        this.rounds.unshift({
          player: true,
          text: `You heal yourself for ${healing}.`
        });
        this.rounds.unshift({
          player: false,
          text: `The monster attacks you for ${monsterDmg}.`
        });
      } else {
        let healing = 100;
        let monsterDmg = this.getNum(0, 12);
        this.playerHealth -= monsterDmg;
        this.playerHealth = healing;
        this.rounds.unshift({
          player: true,
          text: `You have fully healed yourself.`
        });
        this.rounds.unshift({
          player: false,
          text: `The monster attacks you for ${monsterDmg}.`
        });
      }
      this.check();
    },
    specialAttack() {
      let playerDmg = this.getNum(5, 20);
      let monsterDmg = this.getNum(10, 25);
      this.monsterHealth -= playerDmg;
      this.playerHealth -= monsterDmg;
      this.rounds.unshift({
        player: true,
        text: `You attack the monster for ${playerDmg}.`
      });
      this.rounds.unshift({
        player: false,
        text: `The monster attacks you for ${monsterDmg}.`
      });
      this.check();
    }
  }
});
