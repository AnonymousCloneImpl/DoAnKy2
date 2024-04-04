import {useState} from "react";
import postMethodFetcher from "@/utils/postMethod";
import Success from "@/pages/order/success";
import {useRouter} from "next/router";


export default function Process() {
    const router = useRouter();
    const query = router.query;

    const body = {
        "paymentId" : query.paymentId,
        "payerID" : query.PayerID,
    }

    if (query.paymentId !== null && query.paymentId !== undefined && query.PayerID !== null && query.PayerID !== undefined) {
        const checkout = async () => {
            const data = await postMethodFetcher(`${process.env.DOMAIN}/api/payment/paypal/checkPayment`, body);
            console.log(data)
            if (data.data === "Success") {
                router.push("/order/success");
            }
        }

        checkout();
    }

}