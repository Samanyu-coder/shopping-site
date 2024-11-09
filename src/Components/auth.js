// auth.js
const apiUrl = 'https://8d05-2409-4088-9cb8-d2ac-41ba-69f4-c8-af2f.ngrok-free.app/user';

export const loginUser = async (email, password, rememberMe) => {
    try {
        const response = await fetch(`${apiUrl}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const data = await response.json();
        
        
        localStorage.setItem('user_id', data.user_id);
        
        
        if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
        } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const registerUser = async (userDetails) => {
    try {
        const response = await fetch(`${apiUrl}/signup/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userDetails),
        });

        if (!response.ok) {
            throw new Error("Failed to register");
        }

        const data = await response.json();
        
        
        localStorage.setItem('user_id', data.user_id);

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};
