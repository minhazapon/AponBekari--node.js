
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());

console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
 

app.get('/', (req, res) => {
  res.send(' This is apon Bekari Server ')
})


 const query = [

     {id:1, title:'Premium Products', name:'biscute', img:'https://img.freepik.com/free-photo/top-view-delicious-snack-homemade-cookies_114579-88457.jpg?t=st=1727189204~exp=1727192804~hmac=60bd25fa21daff5284bbc5ce25af58a62ec1e5aa6194848509fa69125fc9d76c&w=740' },
     {id:2, title:'Premium Products', name:'Breads', img:'https://img.freepik.com/premium-photo/tray-breads-with-sesame-seeds-it_1077535-14944.jpg?w=740' },
     {id:3, title:'Premium Products', name:'Batter Cake', img:'https://img.freepik.com/premium-photo/female-hands-preparing-homemade-cheesecake-home-kitchen_271580-1361.jpg?w=740' },
     {id:4, title:'Premium Products', name:'Cream Roll', img:'https://img.freepik.com/free-photo/side-view-swiss-roll-with-apricot-jam-black-board_141793-6222.jpg?t=st=1727189352~exp=1727192952~hmac=334a45a84e8809229648a3ea856748a0ca67041a2e7c24d2d4b8156bd7905003&w=740' },
     {id:5, title:'Premium Products', name:'coclate cake', img:'https://img.freepik.com/free-photo/front-view-delicious-cake-concept_23-2148769308.jpg?t=st=1727189401~exp=1727193001~hmac=fa543b4a9b927a9177d0df57b152467b19a668448b9807e984d8e20c08bbc3ca&w=740' },
     {id:6, title:'Premium Products', name:'Cheese Cake', img:'https://img.freepik.com/free-photo/fresh-cheesecake-served-with-mint_144627-521.jpg?t=st=1727189441~exp=1727193041~hmac=a875ae707201d3566b7cb7366b7b20f16bfafee3d66623f8f59a452df684de81&w=740' },

 ]

 app.get('/query', (req, res) => {
  res.send(query)
})




const breads = [

    {id:1, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/ghgh.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:2, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/rre.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:3, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/trrt.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:4, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/j.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:5, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/666662.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:6, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/fgfgfg.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:7, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/gfgffg.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' },
    {id:8, img:'https://assets.nicepagecdn.com/d2cc3eaa/3379718/images/fgfgr.jpg', name:'White breads', details:'this companies breads are so good and premium plzzz take this companies products' }


] 

app.get('/breads', (req, res) => {
  res.send(breads)
})
  

////////////////////////////////////////mongoDB/////////////////////////////


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ruz4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

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

    //fireBaseData//
    
    
    const signCollection = client.db('signDB').collection('sign')
    const userCollection = client.db('usersDB').collection('users')


    app.post('/signData',  async(req, res) => {
             
        const signData = req.body 
        console.log(signData)
        const signResult = await signCollection.insertOne(signData)
        res.send(signResult)

  
    }) 


    app.get('/signData',  async(req, res) => {
             
       const cursor = signCollection.find() 
       const result = await cursor.toArray() 
       res.send(result)

  
    }) 


    //fireBaseData//
     
    

    //crud//


    //create//

    app.post('/users',  async(req, res) => {

      const users = req.body 
      console.log(users) 
      const result = await userCollection.insertOne(users)
      res.send(result)
  
    }) 
    //create//

    //read// 

    app.get('/users', async(req, res) => {
     
         const cursor = userCollection.find();
         const result = await cursor.toArray();
         res.send(result)
 

    })
    //read//


    //delete//
      
    app.delete('/users/:id', async(req, res) => {
     
       const id = req.params.id 
       const query = { _id: new ObjectId(id)}
       const result = await userCollection.deleteOne(query)
       res.send(result)

    })
    //delete//


    //update// 
    
    
    app.get('/users/:id', async(req, res) => {
     
      const id = req.params.id 
      const query = { _id: new ObjectId(id)}
      const result = await userCollection.findOne(query)
      res.send(result)

   })

  
    app.put('/users/:id', async(req, res) => {
     
      const id = req.params.id 
      const upUser = req.body 
      console.log(id, upUser)
      const filter = { _id: new ObjectId(id)} 
      const option = {upsert: true}
      const upSer = {
        
        $set: {
          name: upUser.name,
          Chef: upUser.Chef,
          Supplier: upUser.Supplier,
          PhotoUrl: upUser.PhotoUrl,
          Taste: upUser.Taste,
          Category: upUser.Category,
          Details: upUser.Details
        }   
 
      }  
 
      const result = await userCollection.updateOne(filter, option, upSer)
      res.send(result)

 

   })
 
 
 
    //update//





    //crud//


    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


////////////////////////////////////////mongoDB/////////////////////////////

app.listen(port, () => {
  console.log(` Apon Bekari port ${port}`)
})