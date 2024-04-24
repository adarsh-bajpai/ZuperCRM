// Generate Unique of length 16

function generateUniqueID(length = 25) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    let id = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        id += chars[randomIndex];
    }
    return id;
}

module.exports = { generateUniqueID }
