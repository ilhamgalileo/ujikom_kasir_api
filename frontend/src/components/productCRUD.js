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

    // Styles
    const styles = {
        container: {
            maxWidth: '800px',
            margin: '40px auto',
            padding: '20px',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '20px',
            fontSize: '24px',
            color: '#007bff',
        },
        form: {
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
        },
        input: {
            flex: 1,
            padding: '10px',
            fontSize: '14px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            outline: 'none',
        },
        inputFocus: {
            borderColor: '#007bff',
        },
        button: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
        },
        primaryButton: {
            backgroundColor: '#007bff',
        },
        successButton: {
            backgroundColor: '#28a745',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
        },
        th: {
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            textAlign: 'center',
        },
        td: {
            padding: '12px',
            border: '1px solid #ddd',
            textAlign: 'center',
        },
        editButton: {
            backgroundColor: '#ffc107',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '5px',
        },
        deleteButton: {
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Product Manager</h1>
            <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    style={styles.input}
                />
                {editing ? (
                    <button
                        onClick={updateProduct}
                        style={{ ...styles.button, ...styles.primaryButton }}
                    >
                        Update
                    </button>
                ) : (
                    <button
                        onClick={addProduct}
                        style={{ ...styles.button, ...styles.successButton }}
                    >
                        Add
                    </button>
                )}
            </form>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Name</th>
                        <th style={styles.th}>Price</th>
                        <th style={styles.th}>Stock</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td style={styles.td}>{product.name}</td>
                            <td style={styles.td}>{product.price}</td>
                            <td style={styles.td}>{product.stock}</td>
                            <td style={styles.td}>
                                <button
                                    style={styles.editButton}
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
                                <button
                                    style={styles.deleteButton}
                                    onClick={() => deleteProduct(product.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductCRUD;
