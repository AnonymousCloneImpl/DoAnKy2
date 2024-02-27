package project.common;

import java.util.concurrent.ThreadLocalRandom;

public class GenerateCodeUtils {
    public static String getRandomCode(String prefix) {
        long nanoTime = System.nanoTime() % 10000;
        long randomPart = ThreadLocalRandom.current().nextLong(10000);

        String[] prefixList = prefix.trim().split(" ");

        prefix = (prefixList[prefixList.length - 1].length() <= 5) ?
            prefixList[prefixList.length - 1] : "order";

        StringBuilder codeBuilder = new StringBuilder();
        codeBuilder.append(prefix)
            .append(Long.toUnsignedString(nanoTime))
            .append(randomPart);

        return codeBuilder.toString().toUpperCase();
    }
}
