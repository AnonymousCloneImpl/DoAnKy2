package project;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.apache.commons.codec.DecoderException;
import project.common.Encode_Decode;
import project.common.PaymentUtils;
import project.const_.PAYMENT_METHOD;
import project.const_.SHIPPING_METHOD;
import project.dto.order.OrderDto;
import project.dto.order.OrderItemDto;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class DemoQrCodePaypal {
    public static void main(String[] args) throws IOException, DecoderException {
        List<OrderItemDto> orderItemDtoList = new ArrayList<>();
        orderItemDtoList.add(
                OrderItemDto.builder()
                        .price(500.00)
                        .productId(1L)
                        .productName("\"hahaha")
                        .productType("\"laptop")
                        .quantity((short) 200)
                        .build()
        );
        OrderDto orderDto = OrderDto.builder()
                .shippingMethod(SHIPPING_METHOD.STANDARD_SHIPPING)
                .paymentMethod(PAYMENT_METHOD.PAYPAL)
                .totalPrice(1000.00)
                .customerEmail("\"huunghia98er@gmail.com")
                .orderItemDtoList(orderItemDtoList)
                .customerName("\"nghia")
                .customerPhone("\"012346798")
                .build();


        // TẠO HÓA ĐƠN
        URL url = new URL("https://api-m.sandbox.paypal.com/v2/invoicing/invoices");
        HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
        httpConn.setRequestMethod("POST");

        httpConn.setRequestProperty("Authorization", "Bearer A21AAK29IDIhu3f-yfcSK8ennZ8X-velSks5YwtL9I88shUfJalOaeg5OGYe8PNRyPCcpj5siQ37U1SBDvyTI0lWD3qzZyR2A");
        httpConn.setRequestProperty("Content-Type", "application/json");
        httpConn.setRequestProperty("Prefer", "return=representation");

        httpConn.setDoOutput(true);
        OutputStreamWriter writer = new OutputStreamWriter(httpConn.getOutputStream());
        String str = PaymentUtils.paypalQrRequestBuilder(orderDto);
        System.out.println(str);
        writer.write(str);
        writer.flush();
        writer.close();
        httpConn.getOutputStream().close();

        InputStream responseStream = httpConn.getResponseCode() / 100 == 2
                ? httpConn.getInputStream()
                : httpConn.getErrorStream();
        Scanner s = new Scanner(responseStream).useDelimiter("\\A");
        String response = s.hasNext() ? s.next() : "";
        System.out.println(response);
        Gson gson = new Gson();

        JsonObject jsonObject = gson.fromJson(response, JsonObject.class);

        String id = jsonObject.get("id").getAsString();
        System.out.println("ID: " + id);

        // GỬI HÓA ĐƠN
        URL urlSend = new URL("https://api-m.sandbox.paypal.com/v2/invoicing/invoices/" + id + "/send");
        HttpURLConnection httpConnSend = (HttpURLConnection) urlSend.openConnection();
        httpConnSend.setRequestMethod("POST");

        httpConnSend.setRequestProperty("Authorization", "Bearer A21AAK29IDIhu3f-yfcSK8ennZ8X-velSks5YwtL9I88shUfJalOaeg5OGYe8PNRyPCcpj5siQ37U1SBDvyTI0lWD3qzZyR2A");
        httpConnSend.setRequestProperty("Content-Type", "application/json");
        httpConnSend.setRequestProperty("PayPal-Request-Id", "b1d1f06c7246c");

        httpConnSend.setDoOutput(true);
        OutputStreamWriter writerSend = new OutputStreamWriter(httpConnSend.getOutputStream());
        writerSend.write("{ \"send_to_invoicer\": true }");
        writerSend.flush();
        writerSend.close();
        httpConnSend.getOutputStream().close();

        InputStream responseStreamSend = httpConnSend.getResponseCode() / 100 == 2
                ? httpConnSend.getInputStream()
                : httpConnSend.getErrorStream();
        Scanner sSend = new Scanner(responseStreamSend).useDelimiter("\\A");
        String responseSend = sSend.hasNext() ? sSend.next() : "";
        System.out.println(responseSend);

        // TẠO QR CODE
        URL urlQR = new URL("https://api-m.sandbox.paypal.com/v2/invoicing/invoices/" + id + "/generate-qr-code");
        HttpURLConnection httpConnQR = (HttpURLConnection) urlQR.openConnection();
        httpConnQR.setRequestMethod("POST");

        httpConnQR.setRequestProperty("Authorization", "Bearer A21AAK29IDIhu3f-yfcSK8ennZ8X-velSks5YwtL9I88shUfJalOaeg5OGYe8PNRyPCcpj5siQ37U1SBDvyTI0lWD3qzZyR2A");
        httpConnQR.setRequestProperty("Content-Type", "application/json");

        httpConnQR.setDoOutput(true);
        OutputStreamWriter writerQr = new OutputStreamWriter(httpConnQR.getOutputStream());
        writerQr.write("{ \"width\": 400, \"height\": 400, \"action\": \"pay\" }");
        writerQr.flush();
        writerQr.close();
        httpConnQR.getOutputStream().close();
        InputStream responseStreamQr = httpConnQR.getResponseCode() / 100 == 2
                ? httpConnQR.getInputStream()
                : httpConnQR.getErrorStream();
        Scanner sQr = new Scanner(responseStreamQr).useDelimiter("\\A");
        String responseQr = sQr.hasNext() ? sQr.next() : "";
        System.out.println(responseQr);

        byte[] data = Encode_Decode.decodeBase64(responseQr.split("\n")[4]);
        BufferedImage img = ImageIO.read(new ByteArrayInputStream(data));
        File outputfile = new File("image.png");
        ImageIO.write(img, "png", outputfile);
    }
}
