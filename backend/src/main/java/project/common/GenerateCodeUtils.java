package project.common;

import java.util.concurrent.ThreadLocalRandom;

public class GenerateCodeUtils {
    public static String getRandomCode(String prefix) {
        long nanoTime = System.nanoTime() % 100000;
        long randomPart = ThreadLocalRandom.current().nextLong(100000);

        StringBuilder codeBuilder = new StringBuilder();
        codeBuilder.append(prefix)
            .append(Long.toUnsignedString(nanoTime))
            .append(randomPart);

        return codeBuilder.toString().toUpperCase();
    }
}
