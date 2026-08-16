import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

// ======================================
// CREATE SAME SHA256 KEY
// ======================================

const KEY = CryptoJS.SHA256(SECRET_KEY);

// ======================================
// ENCRYPT
// ======================================

export const encryptData = (data: any) => {
  const iv = CryptoJS.lib.WordArray.random(16);

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), KEY, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return {
    iv: iv.toString(),
    encryptedData: encrypted.ciphertext.toString(),
  };
};

// ======================================
// DECRYPT
// ======================================

export const decryptData = (encryptedData: string, iv: string) => {
  const decrypted = CryptoJS.AES.decrypt(
    {
      ciphertext: CryptoJS.enc.Hex.parse(encryptedData),
    } as any,
    KEY,
    {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  );

  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};
