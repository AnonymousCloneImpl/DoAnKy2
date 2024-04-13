package project.common;

public class InputValidUtils {
    public static boolean validName(String name) {
        String nameRegex = "^[a-zA-ZÀ-ỹ\\s]+$";
        return name.matches(nameRegex);
    }

    public static boolean validPhone(String phone) {
        String phoneRegex = "^[0-9]+$";
        return phone.matches(phoneRegex);
    }

    public static boolean validEmail(String email) {
        String emailRegex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        return email.matches(emailRegex);
    }
}
