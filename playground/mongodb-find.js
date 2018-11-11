// const MongoClient =require('mongodb').MongoClient;
const {MongoClient, ObjectID} =require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , db )=>{
    if( err ){
        return console.log('Unable to connect to MongoDb Server');
    }
    console.log('Connected  to MongoDb Server');
    // db.collection('Todos').find({
    //     _id:new ObjectID('5be7d7d4554f0d0a447bef7f')
    // }).toArray().then( (docs)=>{
    //     console.log('ToDos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch Todos' ,err);
    // })
    // db.collection('Todos').find().count().then( (count)=>{
    //     console.log(`ToDos count : ${count}`);
    //     //console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch Todos' ,err);
    // })
    db.collection('Users').find({name:"Rishi"}).toArray().then( (docs)=>{
            console.log('ToDos');
            console.log(JSON.stringify(docs,undefined,2));
        },(err)=>{
            console.log('Unable to fetch Todos' ,err);
        })
   // db.close();
    
})