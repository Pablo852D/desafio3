const fs = require('fs');

    class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.loadProducts();
    }

    loadProducts() {
        try {
        const data = fs.readFileSync(this.path, 'utf8');
        return JSON.parse(data) || [];
        } catch (error) {
        return [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
    }

    addProduct(newProduct) {
        newProduct.id = this.generateUniqueId();
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    generateUniqueId() {
        // Generar un ID único basado en la longitud actual de la lista de productos
        return this.products.length + 1;
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        return this.products.find(product => product.id === productId);
    }

    updateProduct(productId, updatedFields) {
    const existingProductIndex = this.products.findIndex(product => product.id === productId);

    if (existingProductIndex !== -1) {
    this.products[existingProductIndex] = {
        ...this.products[existingProductIndex],
        ...updatedFields,
        id: productId, // Asegurarse de mantener el ID
    };

    this.saveProducts();
    return this.products[existingProductIndex];
    } else {
      return null; // Producto no encontrado
    }
}

    deleteProduct(productId) {
    this.products = this.products.filter(product => product.id !== productId);
    this.saveProducts();
    }
}

module.exports = ProductManager;