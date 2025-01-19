import db from "../config.js";

export function getProducts(req, res) {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}

export function createProduct(req, res) {
    const { name, price, stock } = req.body;
    db.query('INSERT INTO products (name, price, stock) VALUES (?, ?, ?)',
        [name, price, stock],
        (err) => {
            if (err) throw err;
            res.status(201).json({
                message: 'Berhasil menambahkan produk!',
                data: {
                    produk: name,
                    harga: price,
                    stock: stock,
                }
            });
        });
}

export function updateProduct(req, res) {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    db.query('UPDATE products SET name = ?, price = ?, stock = ? WHERE id = ?', [name, price, stock, id], (err) => {
        if (err) throw err;
        res.status(200).json({
            message: 'Product updated successfully!',
            data: {
                id_produk: id,
                nama: name,
                harga: price,
                stok: stock,
            },
        });
    });
}

export function deleteProduct(req, res) {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Product deleted successfully!' });
    });
}
