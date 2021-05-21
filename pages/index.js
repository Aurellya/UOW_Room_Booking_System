import Head from "next/head";
import Image from "next/image";
import { MdUpdate } from "react-icons/md";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>UOW Room Booking System</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container my-5 top-line">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-3 align-items-center rounded-3 border shadow-lg">
          <div className="px-4 pt-5 pb-1 mt-3 mb-5 text-center mx-auto">
            <Image
              src="/uow_logo.png"
              alt="UOW logo"
              width={300}
              height={151}
              className="d-block mx-auto"
            />
            <div className="choice">
              <h1 className="display-5 fw-bold mb-4 mt-2">
                Room Booking System
              </h1>
              <div className="col-lg-6 mx-auto">
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Link href="/contact">
                    <a className="link1">
                      <b>Register</b>
                    </a>
                  </Link>
                  <Link href="/login">
                    <a className="link2">
                      <b>Book&nbsp;Now</b>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" col-xxl-8 px-4 py-5 text-light dark-background">
        <div className="container">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6 container px-5">
              <img
                src="./preview.png"
                className="d-block mx-lg-auto img-fluid rounded"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3">
                Modern Design: Book a Room from Anywhere, Anytime
              </h1>
              <p className="lead">
                UOW provides a professional, easy-to-use and the most extensive
                room booking system for students. UOW Room booking system will
                allow you to do the online bookings and payments easily. The
                booking can be done anywhere and anytime you like.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5" id="icon-grid">
        <h2 className="pb-2 border-bottom">Features</h2>
        <div className="row row-cols-4 g-4 py-5">
          <div className="col d-flex align-items-start my-1">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-1">Security</h4>
              <p>We provide the secure environment for the online payments.</p>
            </div>
          </div>
          <div className="col d-flex align-items-start my-1">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-1">Look & Feel</h4>
              <p>
                Providing you look & feel. Great User Interface and
                functionality? Say No More!
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start my-1">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-1">Easy-to-use</h4>
              <p>
                We provide the easy and self-explanatory design for the system.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start my-1">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-1">Real-time</h4>
              <p>
                View the real-time data update of the available rooms to book.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start my-1">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-1">Book Room</h4>
              <p>
                After successful login, you can pick and book a room of your
                choice.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start my-1">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-1">Modify Booking</h4>
              <p>
                We make it possible to update or modify your existing booking.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start my-1">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-1">Cancellation</h4>
              <p>Cancellation allows you to cancel your booking immediately.</p>
            </div>
          </div>
          <div className="col d-flex align-items-start my-1">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-1">Forgot Password</h4>
              <p>
                Recover your account's password easily. A code will be sent to
                your email.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="dark-background px-4 pt-5 mb-5 text-center border-bottom">
        <h1 className="display-5 fw-bold lh-1 mb-2">Unique Experience</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-5">
            UOW Booking System is created to enable UOW students to book a room
            easier than ever. Book a Room online without a need to queue in the
            counter. Save time and effort. Provide you with the stunning design
            and perfect built-in functionality.
          </p>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: "350px" }}>
          <div className="container px-5">
            <img
              src="preview2.png"
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Preview"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="col-xxl-8 px-4 pb-5">
        <div className="container">
          <div className="row flex-lg-row align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src="./student.jpg"
                className="d-block mx-lg-auto img-fluid"
                alt="student"
                width="500"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <p className="lead">
                "Unlike the conventional room booking system, the UOW room
                booking system is very cutting-edge and I believe this will help
                me and lots of students in terms of time-saving and efficiency.
                This system is also have a really interesting and nice user
                interface design and functionality."
              </p>
              <hr />
              <p className="lead">
                <b>MAGDALENA JOANNE ENN ERIKSSON</b>
                <br />
                Bachelor's in Communication and Media Studies, UOWCH
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
