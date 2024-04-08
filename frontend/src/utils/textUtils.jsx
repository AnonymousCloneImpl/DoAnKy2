function AddSpaceBeforeUpperCase({str}) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i].toUpperCase() && i > 0) {
            result += ' ' + str[i].toLowerCase();
        } else {
            result += str[i];
        }
    }
    return result.toUpperCase();
}

export default AddSpaceBeforeUpperCase;