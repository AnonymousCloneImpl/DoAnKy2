package project.common;

import java.util.concurrent.ThreadLocalRandom;

public class GenerateCodeUtils {
    private static final String prefix = "TGMD";

    public static String getRandomCode() {
        long nanoTime = System.nanoTime() % 10000;
        long randomPart = ThreadLocalRandom.current().nextLong(10000);

        StringBuilder codeBuilder = new StringBuilder();
        codeBuilder.append(prefix)
                .append(Long.toUnsignedString(nanoTime))
                .append(randomPart);

        return codeBuilder.toString().toUpperCase();
    }

    public static String getRandomId() {
        long nanoTime = System.nanoTime() % 10000;
        long randomPart = ThreadLocalRandom.current().nextLong(10000);
        return String.valueOf(nanoTime) + randomPart;
    }
}
