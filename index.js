const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

//middlewares here
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
	res.send('Labyrinth gaming server is running, testing...')
})

app.listen(port, ()=>{
	console.log(`Labyrinth gaming server is running on port: ${port}`)
})
