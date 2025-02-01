import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { decryptData } from './crypto';

const useAuthRedirect = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['user']);
    const [username, setUsername] = useState(undefined);
    const [loadingAuth, setLoading] = useState(true); // Optional loading state

    useEffect(() => {
        const checkAuth = () => {
            try {
                const usernameCookie = cookies.user ? decryptData(cookies.user).username : undefined;
                if (usernameCookie === undefined) {
                    navigate('/login', { replace: true });
                } else {
                    setUsername(usernameCookie);
                }
            } catch (error) {
                console.error('Error decrypting cookie:', error);
                navigate('/login', { replace: true });
            } finally {
                setLoading(false); // Set loading to false after check
            }
        };

        checkAuth();
    }, [cookies.user, navigate]);

    return { username, setUsername, loadingAuth }; // Return loading state if needed
};

export default useAuthRedirect;