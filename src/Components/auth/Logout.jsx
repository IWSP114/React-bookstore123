
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'

import './Logout.css'

function Logout() {
    const navigate = useNavigate();
    const [cookies, , removeCookie] = useCookies(['user']);

    useEffect(()=>{

        removeCookie('user');
        const myInterval = setTimeout(()=>{
            if(!cookies.user) {
                removeCookie('user');
                navigate('/'); 
            } else {
                removeCookie('user');
                navigate('/logout'); 
            }
        }, 1000);
        
        return () => {
            clearTimeout(myInterval);
        }

    },[cookies.user, navigate, removeCookie]);

    return (
        <>
        <div className="logout-background-container">
            <div className="background-container">
                <div className="text-container">
                    <h2>You will be logged out for any second</h2>
                </div>
            </div>
        </div>
            
            
        </>
    );
}

export default Logout;