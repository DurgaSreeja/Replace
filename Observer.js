class Subject {
    // Add your code here
    constructor(){
        this.observers=[];
    }
    subscribe(observer){
        this.observers.push(observer);
    }
    unsubscribe(observer){
        this.observers=this.observers.filter(obs=> obs!=observer);
    }
    notify(data){
        this.observers.forEach(obs=>obs.update(data));
    }
}

class Observer {
    // Add your code here
    constructor(name){
        this.name=name;
        this.lastReceived=null;
    }
    update(data){
        this.lastReceived=data;
        console.log(`Update received : ${data}`);
    }
}


module.exports = { Subject, Observer };
