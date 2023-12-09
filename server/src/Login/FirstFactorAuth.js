import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FirstFactorAuth = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFirstFactorAuth = async () => {
    try {
      const response = await axios.post(
        "https://usermanagementapiteam4.azurewebsites.net/api/Authentication/login",
        {
          username: username,
          password: password,
        }
      );

      if (response.data.status === "Success") {
        onSuccess(username);
        
      } else {
        // Handle authentication failure
        console.log("err");
      }
    } catch (error) {
      // Handle network or other errors
      console.log("err1");
    }
  };

  return (
    <>

      <section class="vh-100" >
        <div class="container py-5 h-100" style={{ backgroundColor: "orange" }}>
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
              <div class="card shadow-2-strong" style={{ borderRadius: "1rem", backgroundColor: "lightgrey" }}>
                <div class="card-body p-5 text-center">
                  <h3 class="mb-5">Login</h3>
                  <div class="form-outline mb-4">
                    <input
                      type="text"
                      placeholder=" Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div class="form-outline mb-4">
                    <input
                      type="password"
                      placeholder=" Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button class="btn btn-primary btn-lg btn-block" onClick={handleFirstFactorAuth}>Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default FirstFactorAuth;
