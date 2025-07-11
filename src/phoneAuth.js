// phoneAuth.js
import { auth } from "./firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

export const sendSMS = async (phoneNumber, setCodeSent, setConfirmationResult) => {
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
    size: "invisible",
    callback: () => {},
  }, auth);

  try {
    const confirmation = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
    setConfirmationResult(confirmation);
    setCodeSent(true);
  } catch (err) {
    console.error("Помилка надсилання SMS:", err);
    alert("Не вдалося надіслати код.");
  }
};

export const verifySMSCode = async (confirmationResult, code) => {
  try {
    const result = await confirmationResult.confirm(code);
    const user = result.user;
    console.log("Користувач підтверджено:", user.phoneNumber);
    return true;
  } catch (error) {
    console.error("Неправильний код:", error);
    return false;
  }
};