// Generate Unique of length 25

const generatedIds = new Set();

function generateUniqueID(length = 25) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    let id = '';
    
    do {
        id = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            id += chars[randomIndex];
        }
    } while (generatedIds.has(id)); // Regenerate if ID already exists
    
    generatedIds.add(id); // Add the generated ID to the set
    return id;
}


module.exports = { generateUniqueID }
