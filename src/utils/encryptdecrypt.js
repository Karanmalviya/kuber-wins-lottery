const ENCRYPTION_KEY =
  "Ek0SBggDEAIYAhohAP4v0pziVF9Hefn8BgApUHOu2Y1TkMcejrYC4U24M3xIiBAf0VIP1S6ULGLaDf4td3RIb4F58";
const ENCRYPTED_MESSAGE_LENGTH = 34;

function padMessage(message, length) {
  return message.padEnd(length, " ");
}

function encrypt(message) {
  let paddedMessage = padMessage(message, ENCRYPTED_MESSAGE_LENGTH);
  let encryptedMessage = "";
  let key = ENCRYPTION_KEY;
  for (let i = 0; i < ENCRYPTED_MESSAGE_LENGTH; i++) {
    let charCode = paddedMessage.charCodeAt(i);
    let keyCharCode = key.charCodeAt(i);
    charCode = (charCode + keyCharCode) % 256;
    encryptedMessage += String.fromCharCode(charCode);
  }
  return btoa(encryptedMessage);
}

function decrypt(encryptedMessage) {
  encryptedMessage = atob(encryptedMessage);
  let message = "";
  let key = ENCRYPTION_KEY;
  for (let i = 0; i < ENCRYPTED_MESSAGE_LENGTH; i++) {
    let charCode = encryptedMessage.charCodeAt(i);
    let keyCharCode = key.charCodeAt(i);
    charCode = (charCode - keyCharCode + 256) % 256;
    message += String.fromCharCode(charCode);
  }
  return message.trim();
}
export { encrypt, decrypt };
