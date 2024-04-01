import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CustomErrorPage from "@/pages/error";

const Index = ({ totalPrice }) => {
    const router = useRouter();

    useEffect(() => {
        if (totalPrice !== null && totalPrice !== undefined) {
            return <CustomErrorPage />
        }

        axios({
            method: 'post',
            url: `${process.env.DOMAIN}/api/payment/paypal/create`,
            headers: {},
            data: {
                "total": totalPrice === undefined ? 100000 : totalPrice,
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

export default Index;
