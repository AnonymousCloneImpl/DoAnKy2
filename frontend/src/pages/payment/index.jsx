import axios from "axios";
import { useRouter } from "next/router";
import CustomErrorPage from "@/pages/error";

/*
Tên param: vnp_Amount, Giá trị: 1000000
Tên param: vnp_BankCode, Giá trị: VNPAY
Tên param: vnp_CardType, Giá trị: QRCODE
Tên param: vnp_PayDate, Giá trị: 20240403172037
Tên param: vnp_ResponseCode, Giá trị: 24
Tên param: vnp_TmnCode, Giá trị: T86B7AXA
Tên param: vnp_TransactionNo, Giá trị: 0
Tên param: vnp_TransactionStatus, Giá trị: 02
Tên param: vnp_TxnRef, Giá trị: 33619595
 */

const Payment = () => {
  const router = useRouter();
  const query = router.query;

  const price = query.price;
  const orderCode = query.orderCode;
  const paymentId = query.paymentId;

  if (price === null || price === 0) {
    return <CustomErrorPage />
  }

  if (price > 0) {
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
  }

  return (
    <div>
      <h1 className='text-3xl'>Redirecting...</h1>
    </div>
  );
};

export default Payment;
