// Validate Email
export const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate Name
export const validName = (name) => {
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    return nameRegex.test(name);
};

// Validate Phone Number
export const validPhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^(\+?84|0)(3[2-9]|5[689]|7[06-9]|8[1-9]|9\d)\d{7}$/;
    return phoneNumberRegex.test(phoneNumber) && phoneNumber.length <= 10 && phoneNumber.length >= 9;
};
