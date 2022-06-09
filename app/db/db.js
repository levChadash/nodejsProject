//const {MongoClient} = require('mongodb');
//const connectionString= "mongodb://srv1:27017";
let mongoose=require('mongoose');

//const client = new MongoClient(connectionString);

class dataBase{
    constructor(){
      this.connect()
    }  

    async connect(){
    mongoose.connect(`mongodb://${'srv1:27017'}/${"324103357MiriamLeah"}`)
    .then(()=>{
      console.log('database conected')
    }).catch(err=>{
      console.error('database error')
    })
      //  const client = new MongoClient(connectionString/*, {
      //      useNewUrlParser: true,
      //      useUnifiedTopology: true,
      //    }*/);
   
      //  let connected = await client.connect();
      //  this.db = connected.db("324103357MiriamLeah");
       
      //  console.log("DB Connected!")
   };
   
     getDB(){
         return this.db;
     }
   }
   
   
     module.exports = new dataBase();