const expres = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Products');
const cors = require("cors")
const app = expres();
const PORT = 3000;

const databaseURL = 'mongodb+srv://lordchristian88:buffaloXsteroids*@squitdb.4appt.mongodb.net/?retryWrites=true&w=majority&appName=SQUITdb'

//this is to create our Database connection
mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Mongodb connected...."))
    .catch(err => console.log("Mongodb Connection error..."))


app.use(expres.json());
app.use(cors())

//Getting all the data in database
app.get('/users', async (req, res) => {
    const users = await User.find(); //select * from
    res.json(users);
})

//getting data by ID
app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id) // this req.params.id is the :id in the url
    res.json(user);
})

//getting data by ID
app.get('/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id) // this req.params.id is the :id in the url
    res.json(user);
})

app.put('/user/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, 
            { new: true, runValidators: true });
        if(!updatedUser) {
            return res.status(404).json({ message: "Item not Found" })
        }
    
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
})


//Creating data into the database
app.post('/user', async (req, res) => {
    try {
        const newUser = new User(req.body); //creating of new user request
        await newUser.save(); //saving it in the database
        res.status(201).json(newUser); //this is the respond of created user
    } catch (err) {
        console.log("I have an error", err);
    }
})

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        User.findOne({email: email})
        .then(user => {
            if(user) {
                if(user.password === password){
                    res.json("Success")
                } else {
                    res.json("The password is incorrect")
                }
            } else {
                res.json("Account Does Not Exist")
            }
        })
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: err.message });
    }
});

//Delete a user in database
app.delete('/users/:id', async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User is deleted", deletedUser });
})

//Create product
app.post('/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body); // Creating a new product request
        await newProduct.save(); // Saving it in the database
        res.status(201).json(newProduct); // Responding with the created product
    } catch (err) {
        console.error("Error saving product", err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

  // GET endpoint to retrieve all products
  app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
  });
  
  // PUT endpoint to update a product by ID
  app.put('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(product);
  });
  
  // DELETE endpoint to delete a product by ID
  app.delete('/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ message: 'Product deleted' });
  });
  
  
app.listen(PORT, () => {
    console.log("I am running...")
})