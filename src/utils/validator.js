// Function that will check this is valid email or not!

const isEmailValid = (email) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const disposableDomains = [
        "mailinator.com",
        "guerrillamail.com",
        "10minutemail.com",
        // Add more disposable email domains as needed
    ];

    if (!emailRegex.test(email)) return false;

    const domain = email.split('@')[1];
    return !disposableDomains.includes(domain);
}

const userRoles = (values) => {
    return values == 1 || values == 2;
}

module.exports = { isEmailValid, userRoles }

