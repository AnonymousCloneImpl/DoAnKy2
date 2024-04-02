import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CustomErrorPage from "@/pages/error";

const Payment = () => {
    const router = useRouter();
    const query = router.query;
    console.log(query)
    const price = query.price;
    const orderCode = query.orderCode;
    const paymentId = query.paymentId;

    useEffect(() => {
        if (price !== null && price !== undefined) {
            return <CustomErrorPage />
        }

        axios({
            method: 'post',
            url: `${process.env.DOMAIN}/api/payment/paypal/create`,
            headers: {},
            data: {
                "orderCode": orderCode,
                "paymentId": paymentId,
                "total": price,
                "currency": "USD",
                "method": "paypal",
                "intent": "sale",
                "description": "thanh toan don hang"
            }
        })
            .then((response) => {
                router.push(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1 className='text-3xl'>Redirecting...</h1>
        </div>
    );
};

export default Payment;
