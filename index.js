const express = require('express')
const app = express();
require('dotenv').config();
let cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const port =process.env.PORT|| 4000
app.use(cors());
 app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5nj1o0g.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    await client.connect();
 const database = client.db("Tstore");
    const productCollection = database.collection("products");

app.get('/product' ,async (req,res)=>{
let cursor= productCollection.find();
let result= await cursor.toArray();
res.send(result)

})

 app.get('/product/:id' , async (req,res )=>{
let id = req.params.id;
const query = { _id: new ObjectId(id) };
let user= await productCollection.findOne(query);
res.send(user);
 })

app.post('/product', async(req,res)=>{
 let data=req.body;
 let result=await productCollection.insertOne(data)
res.send(result)


})

// app.put('/user/:id' , async(req,res)=>{

// let id= req.params.id;
// let user= req.body;
// console.log(user);
// const filter = { _id: new ObjectId(id)  };
// const options = { upsert: true };
// let updatelog={
// $set:{
 
//   email:user.email,
//    name:user.name,
// }

// }
// const result = await userCollection.updateOne(filter, updatelog, options);
// res.send(result)
// })

app.delete('/product/:id', async  (req ,res)=>{
  let Id = req.params.id;
  const query = { _id: new ObjectId(Id) };
  
  const result = await productCollection.deleteOne(query);
  res.send(result)
  })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);


//ashrafulfahim07 - ROsWFjT8ufinnoLW


app.get('/', (req, res) => {
  res.send('Hello W orld!')
})





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})