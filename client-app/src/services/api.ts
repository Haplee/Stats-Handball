import axios from 'axios';

// Create an Axios instance with default config
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust if port differs in prod
    withCredentials: true, // Important for session cookies
    headers: {
        'Content-Type': 'application/json'
    }
});

// Response interceptor for error handling
api.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response ? error.response.data : error.message);
        return Promise.reject(error);
    }
);

// Generic file upload helper
export const uploadFile = async (url: string, file: File, fieldName: string = 'file', additionalData: any = {}) => {
    const formData = new FormData();
    formData.append(fieldName, file);

    Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
    });

    return api.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export default api;
