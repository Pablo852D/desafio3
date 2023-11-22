import express from 'express';
const ProductManager = require('./ProductManager')

const productManager = new ProductManager('file/products.json');

const PORT = 8080;
const app = express();

app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    console.log(`Estamos en el puerto: ${PORT}`);
})