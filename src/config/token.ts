import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

export const generateToken = (email: string) => {
  const secretKey: string = String(process.env.JWT_SECRET_KEY);

  const payload = { email };

  try {
    return jwt.sign(payload, secretKey, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

export const verifyToken = (encryptedToken: string) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    if (secretKey) {
      const decode = jwt.verify(encryptedToken, secretKey, {
        algorithms: ["HS256"],
      });
      return { valid: true, expired: false, decode };
    }
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return { valid: false, expired: true, decoded: null };
    } else {
      return { valid: false, expired: false, decoded: null };
    }
  }
};

export const encryptToken = (token: string) => {
  const secretKey = process.env.CRYPTO_SECRET_KEY;

  if (!token) {
    return { error: "No token provided" };
  }

  try {
    if (secretKey) {
      const cipherText = CryptoJS.AES.encrypt(token, secretKey).toString();
      return { encryptedToken: cipherText };
    }
  } catch (error) {
    console.error("Encryption error:", error);
    return { error: "Server error" };
  }
};

export const decryptToken = (encryptedToken: string) => {
  try {
    const secretKey = process.env.CRYPTO_SECRET_KEY;

    if (secretKey) {
      const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
      const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedToken) {
        throw new Error("Decryption produced an empty result");
      }

      return decryptedToken;
    }
  } catch (error: any) {
    console.error("Decryption error:", error.message);
    throw new Error("Failed to decrypt token");
  }
};
