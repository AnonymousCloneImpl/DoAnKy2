import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "@/components/Loading";
import QrCode from "@/components/qr-code";

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [paymentCode]);

  if (loading) return <Loading />;

  return (
    <QrCode image={qrCodeImage} />
  )

}