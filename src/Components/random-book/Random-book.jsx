import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function RandomBook() {

  const [data, setData] = useState([]); // State for storing fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}getProduct`); 
            setData(response.data.Products); // Update state with fetched data
            console.log(response.data.Products);

        } catch (error) {
            setError(error.message); 
        } finally {
            setLoading(false); 
        }
    };

    fetchData(); 
  }, []); 

  useEffect(()=> {
    if(loading === false) {
      const randomNumber = Math.floor(Math.random() * data.length);
      navigate(`/product/${data[randomNumber].productID}`);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error}</div>; // Display error message
  
  return (
    <></>
  );
}
export default RandomBook