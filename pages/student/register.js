// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import Image from "next/image";
// import Link from "next/link";
// import Head from "next/head";
// import React, { useState, useContext } from "react";
// import { registerUser } from "../../lib/auth";
// import AppContext from "../../context/AppContext";

// const register = () => {
//   const [data, setData] = useState({ email: "", username: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState({});
//   const appContext = useContext(AppContext);

//   const [passwordShown, setPasswordShown] = useState(false);
//   const togglePasswordVisiblity = () => {
//     setPasswordShown(passwordShown ? false : true);
//   };

//   return (
//     <>
//       <Head>
//         <title>Student Register | UOW Room Booking System</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <div>
//         <div className="d-md-flex flex-md-equal w-100  ps-md-3">
//           <div className="login-fb1 me-md-3 pt-3 pb-5 px-3 pt-md-5 px-md-5 overflow-hidden">
//             <div className="waves">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 1440 320"
//                 id="wave"
//               >
//                 <path
//                   fill="#001440"
//                   fillOpacity="1"
//                   d="M0,288L80,261.3C160,235,320,181,480,170.7C640,160,800,192,960,186.7C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
//                 ></path>
//               </svg>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 1440 320"
//                 id="wave2"
//               >
//                 <path
//                   fill="#001440"
//                   fillOpacity="1"
//                   d="M0,288L80,261.3C160,235,320,181,480,170.7C640,160,800,192,960,186.7C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
//                 ></path>
//               </svg>
//             </div>

//             <div className="vert-c">
//               <div className="text-center">
//                 <Image
//                   src="/uow_logo.png"
//                   alt="UOW logo"
//                   width={360}
//                   height={181}
//                   className="d-block mx-auto"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="login-fb2 me-md-3 pt-3 pb-5 px-3 pt-md-5 px-md-5 overflow-hidden">
//             <div className="mt-3 mb-2 p-2 text-center text-light">
//               <h2 className="display-5">Register Now</h2>
//               <p className="lead">And an even wittier subheading.</p>
//             </div>
//             <div className="text-center">
//               {Object.entries(error).length !== 0 &&
//                 error.constructor === Object &&
//                 error.message.map((error) => {
//                   return (
//                     <div
//                       key={error.messages[0].id}
//                       style={{ marginBottom: 20 }}
//                     >
//                       <small style={{ color: "red" }}>
//                         {error.messages[0].message}
//                       </small>
//                     </div>
//                   );
//                 })}
//             </div>
//             <div className="shadow-sm mx-auto bg-form mb-3">
//               <Form style={{ minWidth: "450px", padding: "12px 16px" }}>
//                 <Form.Group controlId="formBasicUserName">
//                   <Form.Label>Username</Form.Label>
//                   <Form.Control
//                     disabled={loading}
//                     onChange={(e) =>
//                       setData({ ...data, username: e.target.value })
//                     }
//                     value={data.username}
//                     type="text"
//                     name="username"
//                     placeholder="Enter username"
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicEmail">
//                   <Form.Label>Email address</Form.Label>
//                   <Form.Control
//                     onChange={(e) =>
//                       setData({ ...data, email: e.target.value })
//                     }
//                     value={data.email}
//                     type="email"
//                     name="email"
//                     placeholder="Enter email"
//                   />
//                   <Form.Text className="text-muted">
//                     We'll never share your email with anyone else.
//                   </Form.Text>
//                 </Form.Group>
//                 <Form.Group controlId="formBasicPassword">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     onChange={(e) =>
//                       setData({ ...data, password: e.target.value })
//                     }
//                     value={data.password}
//                     type={passwordShown ? "text" : "password"}
//                     name="password"
//                     placeholder="Password"
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicConfirmPassword">
//                   <Form.Label>Confirm Password</Form.Label>
//                   <Form.Control
//                     type={passwordShown ? "text" : "password"}
//                     placeholder="Password"
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicCheckbox">
//                   <Form.Check
//                     onClick={togglePasswordVisiblity}
//                     type="checkbox"
//                     label="Show password"
//                   />
//                 </Form.Group>
//                 <Button
//                   disabled={loading}
//                   variant="outline-dark"
//                   className="button2 button-h2"
//                   type="submit"
//                   onClick={() => {
//                     setLoading(true);
//                     registerUser(data.username, data.email, data.password)
//                       .then((res) => {
//                         // set authed user in global context object
//                         appContext.setUser(res.data.user);
//                         setLoading(false);
//                       })
//                       .catch((error) => {
//                         setError(error.response.data);
//                         setLoading(false);
//                       });
//                   }}
//                 >
//                   {loading ? "Loading.." : "Submit"}
//                 </Button>
//               </Form>
//               <hr className="ml-0 mt-2" />
//               <div className="pl-3 z-1">
//                 <p>
//                   Already registered?&nbsp;
//                   <Link href="/student/login">Log in</Link>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default register;

// NOT USED ANYMORE
