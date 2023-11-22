import express from 'express';
import ProductManager from './ProductManger.js';

const productManager = new ProductManager('file/products.json');

const PORT = 8080;
const app = express();

app.use(express.urlencoded({extended:true}))

app.listen(PORT, ()=>{
    console.log(`Estamos en el puerto: ${PORT}`);
})

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts(limit);
  res.json(products);
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);

  if (product) {
      res.json(product);
  } else {
      res.status(404).json({ error: 'Producto no encontrado' });
  }
});


/*
// Agregar un nuevo producto
const product1 = {
  title: 'Pasacables',
  description: 'Pasacables con alma de acero de 5m',
  price: 3500,
  thumbnail: 'path/to/product1.jpg',
  code: 'P1',
  stock: 15,
};

const product2 = {
  title: 'Pelacables',
  description: 'Pelacables hasta 6mm',
  price: 8000,
  thumbnail: 'path/to/product2.jpg',
  code: 'P2',
  stock: 20,
};

// Agregar productos
const addedProduct1 = productManager.addProduct(product1);
const addedProduct2 = productManager.addProduct(product2);

console.log('Product 1 added:', addedProduct1);
console.log('Product 2 added:', addedProduct2);

// Obtener todos los productos después de agregar más productos
const allProductsAfterAddition = productManager.getProducts();
console.log('All products after addition:', allProductsAfterAddition);

// Eliminar un producto por su ID
const productIdToDelete = 2; // Reemplaza con el ID del producto que deseas eliminar
productManager.deleteProduct(productIdToDelete);
console.log(`Product with ID ${productIdToDelete} deleted.`);

// Actualizar un producto por su ID
const productIdToUpdate = 1; // Reemplaza con el ID del producto que deseas actualizar
const updatedFields = {
stock: 20,
  // Agrega otros campos que deseas actualizar
};

const updatedProduct = productManager.updateProduct(productIdToUpdate, updatedFields);
if (updatedProduct) {
console.log('Product updated:', updatedProduct);
} else {
console.log(`Product with ID ${productIdToUpdate} not found.`);
}
*/