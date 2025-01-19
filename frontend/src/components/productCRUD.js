import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductCRUD = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
    };

    const addProduct = async () => {
        await axios.post('http://localhost:5000/api/products', { name, price, stock });
        fetchProducts();
        setName('');
        setPrice('');
        setStock('');
    };

    const updateProduct = async () => {
        await axios.put(`http://localhost:5000/api/products/${currentId}`, { name, price, stock });
        fetchProducts();
        setEditing(false);
        setName('');
        setPrice('');
        setStock('');
    };

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container">
            <h1>CRUD Kasir</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                 <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                {editing ? (
                    <button onClick={updateProduct}>Update</button>
                ) : (
                    <button onClick={addProduct}>Add</button>
                )}
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        setEditing(true);
                                        setCurrentId(product.id);
                                        setName(product.name);
                                        setPrice(product.price);
                                        setStock(product.stock);
                                    }}
                                >
                                    Edit
                                </button>
                                <button onClick={() => deleteProduct(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductCRUD;
