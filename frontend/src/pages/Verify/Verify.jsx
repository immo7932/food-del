import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        // Log the URL and parameters to debug
        console.log("URL:", url);
        console.log("Success:", success);
        console.log("OrderId:", orderId);

        // Ensure the URL is correctly constructed
        const endpoint = `${url}/api/order/verify`;
        console.log("Endpoint:", endpoint);

        try {
            const response = await axios.post(endpoint, { success, orderId });
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            navigate("/");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='verify'>
            <div className='spinner'>
                {/* Add some loading spinner or message */}
                <p>Verifying your payment...</p>
            </div>
        </div>
    )
}

export default Verify
