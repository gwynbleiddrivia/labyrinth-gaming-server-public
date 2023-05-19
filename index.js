const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

const { MongoClient, ServerApiVersion } = require('mongodb');

//middlewares here
app.use(cors())
app.use(express.json())
require('dotenv').config()



app.get('/',(req,res)=>{
	res.send('Labyrinth gaming server is running, testing...')
})





//MongoDB application code


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c32luun.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();
    
    const userCollection = client.db('usersDB').collection('users')



    app.get('/users', async(req,res)=>{
	let query = {}
	if (req.query?.email){
		query = {email: req.query.email}
	}
	const result = await userCollection.find(query).toArray()
	res.send(result)
	console.log(result)
    })





    app.post('/users', async(req,res)=>{
	const newUser = req.body
	const result = await userCollection.insertOne(newUser)
	res.send(result)
	console.log(newUser)
    })
 

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  //  await client.close();
  }
}
run().catch(console.dir);









console.log(uri)



app.listen(port, ()=>{
	console.log(`Labyrinth gaming server is running on port: ${port}`)
})
