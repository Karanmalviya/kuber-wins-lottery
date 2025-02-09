function generateTransactionId() {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  let transactionId = "";
  transactionId += uppercaseLetters.charAt(
    Math.floor(Math.random() * uppercaseLetters.length)
  );
  for (let i = 0; i < 14; i++) {
    transactionId += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }
  return transactionId;
}
export { generateTransactionId };
