import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { resetPassword } from "../../lib/auth";
import AppContext from "../../context/AppContext";

function resetPwd(props) {
  const [data, updateData] = useState({
    code: "",
    password: "",
    passwordConfirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  // useEffect(() => {
  //   if (appContext.isAuthenticated) {
  //     router.push("/"); // redirect if you're already logged in
  //   }
  // }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <>
      <Head>
        <title>Student Login | UOW Room Booking System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div>
        <div className="d-md-flex flex-md-equal w-100  ps-md-3">
          <div className="login-fb1 me-md-3 pt-3 pb-5 px-3 pt-md-5 px-md-5 overflow-hidden">
            <div className="waves">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                id="wave"
              >
                <path
                  fill="#001440"
                  fillOpacity="1"
                  d="M0,288L80,261.3C160,235,320,181,480,170.7C640,160,800,192,960,186.7C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                id="wave2"
              >
                <path
                  fill="#001440"
                  fillOpacity="1"
                  d="M0,288L80,261.3C160,235,320,181,480,170.7C640,160,800,192,960,186.7C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                ></path>
              </svg>
            </div>

            <div className="vert-c">
              <div className="text-center">
                <Image
                  src="/uow_logo.png"
                  alt="UOW logo"
                  width={360}
                  height={181}
                  className="d-block mx-auto"
                />
              </div>
            </div>
          </div>

          <div className="login-fb2 me-md-3 pt-3 pb-5 px-3 pt-md-5 px-md-5 overflow-hidden">
            <div className="mt-3 p-2 text-center text-light">
              <h2 className="display-5">Reset Password</h2>
              <p className="lead">And an even wittier subheading.</p>
            </div>
            <div className="text-center">
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                error.message.map((error) => {
                  return (
                    <div
                      key={error.messages[0].id}
                      style={{ marginBottom: 20 }}
                    >
                      <small style={{ color: "red" }}>
                        {error.messages[0].message}
                      </small>
                    </div>
                  );
                })}
            </div>
            <div className="shadow-sm mx-auto bg-form mb-3">
              <Form style={{ padding: "12px 16px" }}>
                <Form.Group controlId="formBasicCode">
                  <Form.Label>Enter Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Code"
                    onChange={(event) => onChange(event)}
                    name="code"
                  />
                  <Form.Text className="text-muted">
                    We sent the code to your email.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    onChange={(event) => onChange(event)}
                    name="password"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type={passwordShown ? "text" : "password"}
                    placeholder="Password"
                    onChange={(event) => onChange(event)}
                    name="passwordConfirmation"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    onClick={togglePasswordVisiblity}
                    type="checkbox"
                    label="Show password"
                  />
                </Form.Group>
                <Button
                  variant="outline-dark"
                  className="button2 button-h2"
                  onClick={() => {
                    if (data.identifier == "uow_admin@uowmail.edu.au") {
                      data.identifier = "a";
                    }

                    setLoading(true);
                    resetPassword(
                      data.code,
                      data.password,
                      data.passwordConfirmation
                    )
                      .then((res) => {
                        setLoading(false);
                        // set authed User in global context to update header/app state
                        appContext.setUser(res.data.user);
                      })
                      .catch((error) => {
                        setError(error.response.data);
                        setLoading(false);
                      });
                  }}
                >
                  {loading ? "Loading... " : "Reset"}
                </Button>
              </Form>
              <hr className="ml-0 mt-2" />
              <div className="pl-3 z-1">
                <Link href="/student/forgotPwd">Not getting email?</Link>
                <p>
                  Do not have an account yet?&nbsp;
                  <Link href="/student/register">Create Account</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default resetPwd;
