import axios from 'axios';

export const fetchCurrentUserInfo = async (): Promise<number> => {
    const response = await axios.get('api/auth/validation');
    return response.status;
};
