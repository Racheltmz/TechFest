import http from '../api/http';

export const styleTransfer = (formData) => {
    return http.post('/generate', formData);
}