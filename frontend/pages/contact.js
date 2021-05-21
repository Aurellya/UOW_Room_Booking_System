import Head from "next/head";

const contact = () => {
  return (
    <>
      <Head>
        <title>Contact | UOW Room Booking System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="text-center mt-5 container">
        <h1>Contact</h1>
        <hr />
      </div>

      <div className="col-xxl-7 px-7 pb-2">
        <div className="container">
          <div className="row flex-lg-row align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src="../contact.png"
                className="d-block mx-lg-auto img-fluid"
                alt="student"
                width="500"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-5">
              <p className="lead" style={{ fontSize: "19px" }}>
                On Campus and Online Students should contact the IT Service Desk
                on <b>(02) 4221 3000</b> or email{" "}
                <b>student-accounts@uow.edu.au</b>. Staff should contact the IT
                Service Desk on <b>(02) 4221 4494</b> or log a ticket via the
                self-service portal. <br />
                <br />
                Student Hub:{" "}
                <b>
                  <a href="https://www.uow.edu.au/student/">
                    https://www.uow.edu.au/student/
                  </a>
                </b>
              </p>
              <hr />
              <p className="lead" style={{ fontSize: "19px" }}>
                Australian campus business hours are generally from Monday to
                Friday 9am-5pm, Australian Eastern Standard Time UTC+10:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default contact;
