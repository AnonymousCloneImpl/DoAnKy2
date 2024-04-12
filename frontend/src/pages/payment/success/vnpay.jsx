import {useRouter} from "next/router";
import axios from "axios";
import moment from "moment";
import Loading from "@/components/Loading";

export default function VnpayPayment() {
    const router = useRouter();
    const query = router.query;

    const vnp_Amount = query.vnp_Amount;
    const vnp_BankCode = query.vnp_TransactionStatus;
    const vnp_BankTranNo = query.vnp_BankTranNo;
    const vnp_CardType = query.vnp_CardType;
    const vnp_OrderInfo = query.vnp_OrderInfo;
    const vnp_PayDate = query.vnp_PayDate;
    const vnp_ResponseCode = query.vnp_ResponseCode;
    const vnp_TmnCode = query.vnp_TmnCode;
    const vnp_TransactionNo = query.vnp_TransactionNo;
    const vnp_TransactionStatus = query.vnp_TransactionStatus;
    const vnp_TxnRef = query.vnp_TxnRef;
    const vnp_SecureHash = query.vnp_SecureHash;

    const body = {
        vnp_Amount: vnp_Amount,
        vnp_BankCode: vnp_BankCode,
        vnp_BankTranNo: vnp_BankTranNo,
        vnp_CardType: vnp_CardType,
        vnp_OrderInfo: vnp_OrderInfo,
        vnp_PayDate: vnp_PayDate,
        vnp_ResponseCode: vnp_ResponseCode,
        vnp_TmnCode: vnp_TmnCode,
        vnp_TransactionNo: vnp_TransactionNo,
        vnp_TransactionStatus: vnp_TransactionStatus,
        vnp_TxnRef: vnp_TxnRef,
        vnp_SecureHash: vnp_SecureHash
    };

    const date = new Date();
    const vnp_RequestId = moment(date).format("HHmmss");
    let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    let dataObj = {
        'vnp_RequestId': vnp_RequestId,
        'vnp_Version': '2.1.0',
        'vnp_Command': 'querydr',
        'vnp_TmnCode': vnp_TmnCode,
        'vnp_TxnRef': vnp_TxnRef,
        'vnp_OrderInfo': vnp_OrderInfo,
        'vnp_TransactionDate': vnp_PayDate,
        'vnp_CreateDate': vnp_CreateDate,
        'vnp_IpAddr': '0.0.0.1',
        'vnp_SecureHash': vnp_SecureHash
    };

    const doPost = async () => {
        if (vnp_TxnRef !== undefined) {
            await axios.post(
                `${process.env.DOMAIN}/api/payment/vnpay/checkPayment`,
                dataObj
            )
                .then((res) => {
                    if (res.data === "Success") {
                        router.push("/order/success");
                    } else {
                        router.push("/payment/failed");
                    }
                });
        }
    }

    doPost();

    return (
        <Loading/>
    )
}