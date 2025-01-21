import React, { useState } from 'react';

const Login = ({ onLogin, goToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) throw new Error('Invalid username or password');

            const { token } = await response.json();
            localStorage.setItem('token', token);
            onLogin();
        } catch (err) {
            setError('Invalid username or password');
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
        loginBox: {
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
            color: '#007bff',
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
            backgroundColor: '#007bff',
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
        registerText: {
            marginTop: '15px',
            fontSize: '14px',
            color: '#555',
        },
        registerButton: {
            backgroundColor: 'transparent',
            border: 'none',
            color: '#007bff',
            cursor: 'pointer',
            textDecoration: 'underline',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h1 style={styles.heading}>Login</h1>
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
                        Login
                    </button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
                <p style={styles.registerText}>
                    Tidak punya akun?{' '}
                    <button onClick={goToRegister} style={styles.registerButton}>
                        Daftar
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
