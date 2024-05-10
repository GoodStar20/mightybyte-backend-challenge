function generateRandomCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 10; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

async function delayRandomSeconds() {
  const randomSeconds = Math.ceil(Math.random() * 3 * 1000);

  await new Promise((resolve) => setTimeout(resolve), randomSeconds);
}

module.exports = { generateRandomCode, delayRandomSeconds };
