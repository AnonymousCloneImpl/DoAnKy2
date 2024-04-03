package project.common;

import java.text.DecimalFormat;

public class PriceUtils {
    public static double roundedPrice(double number, int decimalPlaces) {
        DecimalFormat df = new DecimalFormat("#." + "0".repeat(decimalPlaces));
        String roundedNumber = df.format(number);
        return Double.parseDouble(roundedNumber);
    }
}
