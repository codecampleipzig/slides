function User(name, score) {
  this.name = name;
  this.score = score;
}

User.prototype.incrementScore = function() {
  this.score += 1;
};

const fred = new User("Fred", 0);
Object.getPrototypeOf(fred); // createUser.prototype
fred.incrementScore();
