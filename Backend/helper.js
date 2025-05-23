function createuniqueimage(image) {
    const time = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `${random}_${time}_${image}`;
    
}

module.exports = { createuniqueimage };