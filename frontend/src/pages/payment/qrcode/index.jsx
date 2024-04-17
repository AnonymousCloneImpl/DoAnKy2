import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import QrCode from "@/components/qr-code";
import Success from "@/pages/order/success";

export default function QrcodePayment() {
  const router = useRouter();
  const paymentCode = router.query.paymentCode;

  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = `${process.env.DOMAIN}/api/payment/paypal/get-qrcode`;
    axios({
      method: 'post',
      url: url,
      headers: {},
      data: {
        "paymentCode": paymentCode
      }
    })
      .then((response) => {
        setQrCodeImage('data:image/png;base64,' + response.data);
        setLoading(false);
        checkResult();
      })
      .catch((error) => {
        console.log(error);
      });

    const checkResult = async () => {
      const id = process.env.PAYPAL_ID;
      const secret = process.env.PAYPAL_SECRET;
      const str = id + ":" + secret;
      const base64 = Buffer.from(str).toString("base64");
      const headers = {
        'Authorization': `Basic ${base64}`,
      };
      if (paymentCode !== null && paymentCode !== undefined) {
        const interval = setInterval(() => {
          axios.get("https://api-m.sandbox.paypal.com/v2/invoicing/invoices/" + paymentCode, {headers})
            .then(res => {
              if (res.data.status === "PAID") {
                clearInterval(interval);
                router.push("/order/success")
              }
            });
        }, 5000);
      }
    }
  }, [paymentCode, router]);

  if (loading) return <Loading />;

  return (
    <QrCode image={qrCodeImage} />
  )

}