import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SecondFactorAuth = ({ username, onSuccess }) => {
  const [otp, setOtp] = useState("");
  //const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [allotedRole, setAllotedRole] = useState("");
  const navigate = useNavigate();

  const handleSecondFactorAuth = async () => {
    try {
      const response = await axios.post(
        "https://usermanagementapiteam4.azurewebsites.net/api/Authentication/Login-2FA",
        { username: username, code: otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;
      localStorage.setItem('token', token);
      const decodedtoken = parseJwt(token);
      console.log(token);

      const {
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": name,
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": role,
      } = decodedtoken;

      const userObject = {
        name,
        role,
      };

      setAllotedRole(userObject.role);

      if (token) {
        onSuccess(token);
        
        console.log("success");
      } else {
        alert("You are not authorized to access this page");
      }
    } catch (error) {
      console.error("Error during second-factor authentication:", error);
      setErrorMessage("Please Enter Valid OTP");
    }
  };

  function parseJwt(token) {
    //     // ... (your existing code)
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  return (
    <div>
      <section class="vh-100" >
        <div class="container py-5 h-100" style={{ backgroundColor: "orange" }}>
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong" style={{ borderRadius: "1rem", backgroundColor: "lightgrey" }}>
                <div class="card-body p-5 text-center">
                <h3 class="mb-5">Second Factor Authentication</h3>
      {/* <label>Enter OTP {username}:</label> */}
      <div class="form-outline mb-4">
      <input placeholder=" Enter OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
      </div>
      <br />
      <button class="btn btn-primary btn-lg btn-block" onClick={handleSecondFactorAuth}>Verify</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
export default SecondFactorAuth;
