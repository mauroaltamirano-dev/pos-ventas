export const CodeGenerator = (data) => {
  const lastIdProduct = data.id + 1;
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const codeLength = 4;
  let randomCode = "";
  for (let i = 0; i < codeLength; i++) {
    randomCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  const code = `${randomCode}${lastIdProduct}TUK`;
  return code;
};
