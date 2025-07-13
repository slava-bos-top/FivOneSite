import React, { useState } from "react";
import RegisterForm from "./RegisterForm";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyyxOA_BqhytFq3Se00rLFSsTe2ACJBHKl4lLCBMpeKkqMLR1GTwNv7zF91bowo9o_l/exec";

function Register({ onLoginSuccess }) {

  return (
    <>
        <RegisterForm
          onRequestSms={handleRequestSms}
          onVerifyCode={handleVerifyCode}
          onSubmit={handleSubmit}
        />
    </>
  );
}

export default Register;