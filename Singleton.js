class Database {
  // Add your code here
  constructor(){
      if(Database.instance){
        return Database.instance;
      }
      Database.instance=this;
  }
}

module.exports = Database;
