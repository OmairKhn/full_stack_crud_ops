const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const userRoutes = require('./routes/user-route.js')
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('running')
});
app.use(userRoutes)

async function connectDB() {
 
    await mongoose.connect("mongodb://localhost:27017", {
   
      dbName: 'UsersDb'
    })
    console.log('Connected to MongoDB')
  }
  connectDB().catch((error)=>console.error(err));
    
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
