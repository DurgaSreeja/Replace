// Add your code here
class Person{
    constructor(name,age){
        this.name=name;
        this.age=age;
    }
    getInfo(){
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}

class Teacher extends Person{
    constructor(name, age, subject){
        super(name,age);
        this.subject=subject;
    }
    getInfo(){
        return `Name: ${this.name}, Age: ${this.age}, Subject: ${this.subject}`;
    }
}

module.exports = { Person, Teacher };
