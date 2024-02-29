package project.product.utils;

public class ProductUtils {
    public static String getFirstImageUrl(String imageList) {
        return imageList.split("\\|")[0];
    }
}
