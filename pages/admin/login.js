import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const login = () => {
  return (
    <>
      <Head>
        <title>Admin Login | UOW Room Booking System</title>
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
                <h1 className="display-5 admin-title">Admin</h1>
              </div>
            </div>
          </div>

          <div className="login-fb2 me-md-3 pt-3 pb-5 px-3 pt-md-5 px-md-5 overflow-hidden">
            <div className="my-3 p-2 text-center text-light">
              <h2 className="display-5">Login Page</h2>
              <p className="lead">And an even wittier subheading.</p>
            </div>
            <div className="shadow-sm mx-auto bg-form mb-3">
              <Form style={{ padding: "16px" }}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Show password" />
                </Form.Group>
                <Button
                  variant="outline-dark"
                  className="button2 button-h2"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
              <hr className="ml-0 mt-2" />
              <div className="pl-3 z-1">
                <Link href="/">Forgotten your username or password?</Link>
                <p>
                  Not Admin?&nbsp;
                  <Link href="/student/login">Log in as Student</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
