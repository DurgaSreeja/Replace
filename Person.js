// Person constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Add method to Person prototype
Person.prototype.getInfo = function () {
  return `Name: ${this.name}, Age: ${this.age}`;
};

// Teacher constructor (inherits from Person)
function Teacher(name, age, subject) {
  Person.call(this, name, age); 
  this.subject = subject;
}

// Inherit Person prototype
Teacher.prototype = Object.create(Person.prototype);
Teacher.prototype.constructor = Teacher;

// Override getInfo method
Teacher.prototype.getInfo = function () {
  return `Name: ${this.name}, Age: ${this.age}, Teaches: ${this.subject}`;
};

module.exports = {
  Person,
  Teacher
};
