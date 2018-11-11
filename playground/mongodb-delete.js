
const {MongoClient, ObjectID} =require('mongodb');




MongoClient.connect('mongodb://localhost:27017/TodoApp' , (err , db )=>{
    if( err ){
        return console.log('Unable to connect to MongoDb Server');
    }
    console.log('Connected  to MongoDb Server');
   
   // db.close();
//    db.collection('Todos').deleteOne({text:"Eat lunch"}).then((result)=>{
//        console.log(result);
//    })

   db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
       console.log(result);
   })
    
})