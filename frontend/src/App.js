import React, { useState } from 'react';
import Register from './components/register.js';
import ProductCRUD from './components/productCRUD.js';
import Login from './components/login.js';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleRegister = () => {
        setIsRegistering(false); // Kembali ke halaman login setelah register
    };

    return (
        <div className="App">
            {isLoggedIn ? (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <ProductCRUD />
                </>
            ) : isRegistering ? (
                <Register onRegister={handleRegister} />
            ) : (
                <Login onLogin={handleLogin} />
            )}
            {!isRegistering && !isLoggedIn && (
                <button onClick={() => setIsRegistering(true)}>Go to Register</button>
            )}
        </div>
    );
}

export default App;
