import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { decryptData } from './crypto';

const useIdentityCheck = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies(['user']);
    const [identity, setIdentity] = useState(undefined);
    const [username, setUsername] = useState(undefined);
    const [displayName, setDisplayName] = useState(undefined);
    const [userID, setUserID] = useState(undefined);
    const [loadingAuth, setLoading] = useState(true); // Optional loading state

    useEffect(() => {
        const checkAuth = () => {
            try {
                const usernameCookie = cookies.user ? decryptData(cookies.user).username : undefined;
                const displaynameCookie = cookies.user ? decryptData(cookies.user).display_name : undefined;
                const userIDCookie = cookies.user ? decryptData(cookies.user).id : undefined;
                const userIdentityCookie = cookies.user ? decryptData(cookies.user).identity : undefined;
                setUsername(usernameCookie);
                setDisplayName(displaynameCookie);
                setUserID(userIDCookie);
                setIdentity(userIdentityCookie);
            } catch (error) {
                console.error('Error decrypting cookie:', error);
            } finally {
                setLoading(false); // Set loading to false after check
            }
        };

        checkAuth();
    }, [cookies.user, navigate]);

    return { identity, username, displayName, userID, loadingAuth }; // Return loading state if needed
};

export default useIdentityCheck;