// auth.js
const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/user`;

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
