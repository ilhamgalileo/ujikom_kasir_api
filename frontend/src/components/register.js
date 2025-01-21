import React, { useState } from 'react';

const Register = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error();

            onRegister();
        } catch (err) {
            setError('Username sudah digunakan atau terjadi kesalahan.');
        }
    };

    // Styles
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4',
            fontFamily: 'Arial, sans-serif',
        },
        registerBox: {
            width: '300px',
            padding: '20px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
        },
        heading: {
            fontSize: '24px',
            marginBottom: '20px',
            color: '#28a745',
        },
        input: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px',
            outline: 'none',
        },
        button: {
            width: '100%',
            padding: '10px',
            marginTop: '10px',
            backgroundColor: '#28a745',
            border: 'none',
            borderRadius: '5px',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '14px',
        },
        error: {
            color: '#dc3545',
            marginTop: '10px',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.registerBox}>
                <h1 style={styles.heading}>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>
                        Register
                    </button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default Register;
