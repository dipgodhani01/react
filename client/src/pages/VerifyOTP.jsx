import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnglishConstant } from "../messages/message";
import { OtpVerify } from "../redux/Action";
import { useDispatch } from "react-redux";
import FormField from "../component/common/FormField";

function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeField = (value) => {
    setOtp(value);
  };

  const verify = (e) => {
    e.preventDefault();
    if (otp.trim() === "") {
      setOtpError(EnglishConstant.Otp);
    } else {
      dispatch(OtpVerify(otp, navigate));
    }
  };

  const preventSpace = (e) => {
    if (e.which === 32) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#D3D9EF] text-3xl h-[100vh] p-4">
      <div className="bg-no-repeat p-8 rounded-3xl bg-right-top bg-white w-full max-w-md">
        <h6 className="text-gray-400 text-2xl font-semibold mb-4 text-center">
          Verify your account
        </h6>
        <p className="text-sm text-orange-500">
          Your one time password is valid till 2 minutes
        </p>
        <form onSubmit={verify} className="mt-0">
          <FormField
            type="number"
            field="otp"
            placeholder="OTP"
            label="One time password (OTP)"
            value={otp}
            error={otpError}
            onChange={(e) => onChangeField(e.target.value)}
            onKeyPress={preventSpace}
          />
          <div className="mt-4">
            <button
              type="submit"
              className="mx-auto bg-[#43a047] hover:bg-[#388e3c] text-white py-1 px-6 text-base rounded transition duration-200 w-fit"
            >
              Verify
            </button>
            <button
              className="mx-auto bg-[#ef5350] hover:bg-[#f44336] text-white py-1 px-6 text-base rounded transition duration-200 w-fit ml-4"
              onClick={() => navigate("/register")}
            >
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyOTP;
