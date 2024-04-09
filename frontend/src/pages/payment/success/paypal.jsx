import {useRouter} from "next/router";
import postMethodFetcher from "@/utils/postMethod";
import Loading from "@/components/Loading";

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
            if (data === "PAYMENT_ALREADY_DONE") {
                await router.push("/order/success");
            }
            if (data === "Success") {
                await router.push("/order/success");
            }
            if (data === "Failed") {
                await router.push("/payment/failed");
            }
        }
        checkout();
    }

    return (
        <Loading />
    )

}