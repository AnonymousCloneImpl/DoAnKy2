package project.common;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;

public class PriceUtils {
  public static double roundedPrice(double number, int decimalPlaces) {
    DecimalFormatSymbols symbols = new DecimalFormatSymbols(Locale.getDefault());
    symbols.setDecimalSeparator('.');
    DecimalFormat df = new DecimalFormat("#." + "0".repeat(decimalPlaces), symbols);
    String roundedNumber = df.format(number);
    return Double.parseDouble(roundedNumber);
  }
}
