import db from '../config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Fungsi untuk login
export function loginUser(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) throw err;

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            });

            res.json({
                message: 'success',
                data: {
                    id_user: user.id,
                    nama: user.username,
                    token
                },
            });
        });
    });
}

export function registerUser(req, res) {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    // Hash password sebelum disimpan
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) throw err;

        // Query untuk menyimpan data pengguna, dengan default role sebagai 'admin'
        const role = 'petugas'; // Default role
        const query = 'INSERT INTO users (username, password, role) VALUES (?, ?, ?)';
        const values = [username, hashedPassword, role];

        db.query(query, values, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to register user' });
            }

            // Respon sukses
            res.status(201).json({
                status: 'success',
                message: 'User registered successfully',
                data: {
                    username,
                    role,
                },
            });
        });
    });
}
