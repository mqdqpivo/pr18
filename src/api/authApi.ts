import axios from 'axios';
import { AuthResponse, User } from '../types';

const API_URL = 'http://localhost:3001';

export const authApi = {
  login: async (email: string) => {
    // Mock login - we just check if user exists with this email for simplicity, 
    // or typically json-server-auth would handle /login.
    // Since we need to mock it manually if json-server-auth is not guaranteed:
    // Ideally we use POST /login from json-server-auth.
    // But if we just use json-server, we can fake it.
    
    // Strategy: We will assume json-server-auth is running if the user installs it.
    // If not, we can't really do a true POST /login without it.
    // So I'll implement a simple "find user by email" and generate a fake token.
    
    // TRY to use standard json-server-auth endpoint first.
    try {
        // If using json-server-auth, it expects email and password.
        // We'll just send email as password for simplicity or hardcoded.
        // Actually, let's just look up the user.
        const response = await axios.get<User[]>(`${API_URL}/users?email=${email}`);
        const user = response.data[0];
        
        if (user) {
            return {
                accessToken: "fake-jwt-token-" + Date.now(),
                user
            } as AuthResponse;
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw error;
    }
  },
};
