// const MongoClient =require('mongodb').MongoClient;
const {MongoClient, ObjectID} =require('mongodb');

var obj =new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , db )=>{
    if( err ){
        return console.log('Unable to connect to MongoDb Server');
    }
    console.log('Connected  to MongoDb Server');
    // db.collection('Todos').insertOne({
    //     text : 'Something to do',
    //     completed :false
    // } , ( err ,result)=>{
    //     if(err){
    //         return console.log('Unable to inserttodo' , err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // })
    // db.collection('Users').insertOne({
    //     name: "Rishi",
    //     age: 23,
    //     location :"Kanpur"
    // },( err , result) =>{
    //     if(err){
    //         return console.log('Unable to insert to Users' , err);
    //     }
    //     console.log(JSON.stringify(result.ops[0]._id.getTimestamp(),undefined,2));
    // })
    db.close();
    
})