import Head from "next/head";

const about = () => {
  return (
    <>
      <Head>
        <title>About | UOW Room Booking System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="text-center my-5">
        <h1>About</h1>
      </div>

      <div className=" col-xxl-9 px-9 py-6 text-light dark-background">
        <div className="container">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-5 p-5 bg-light">
              <img
                src="./uow_logo.png"
                className="d-block mx-lg-auto img-fluid"
                alt="UOW logo"
                width="700"
                height="800"
                loading="lazy"
              />
            </div>
            <div className="col-lg-7" style={{ paddingRight: "86px" }}>
              <h2 className="display-5 fw-bold lh-1 mb-3">Our Story</h2>
              <hr style={{ borderTop: "1px solid white" }} />
              <p className="lead" style={{ fontSize: "19px" }}>
                The university of Wollongong traces its origins to 1951 when a
                Division of the then New South Wales University of Technology
                was established in Wollongong. Ten years later the Division
                became the Wollongong College of the University of New South
                Wales and, in 1975, the University of Wollongong was
                incorporated by the Parliament of New South Wales as an
                independent institution. In 1982, the University amalgamated
                with the Wollongong Institute of Higher Education, which had
                begun life in 1962 as the Wollongong Teachers' College.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5" id="icon-grid">
        <div className="row row-cols-4 g-4 py-5">
          <div className="col d-flex align-items-start">
            <div>
              <h4 className="fw-bold mb-2">WELCOME</h4>
              <hr />
              <p className="mb-2">
                "We are a young and vibrant university with undiminished
                ambitions and a strong sense of who we are and where we are
                going."
              </p>

              <p>
                We work tirelessly to excel in our research and education, and
                to address complex, real-world problems in partnership with our
                communities.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div>
              <h4 className="fw-bold mb-2">OUR VALUES</h4>
              <hr />
              <p className="mb-2">
                We inspire a better future through education, research and
                partnership.
              </p>
              <p>
                We are grounded by our intellectual openness, excellence and
                dedication, empowerment and academic freedom, mutual respect and
                diversity, recognition and performance. These are our values.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div>
              <h4 className="fw-bold mb-2">CONTACTS</h4>
              <hr />
              <p className="mb-2">
                <b>Current Students:</b>
              </p>
              <p className="mb-2">Australia: 1300 ASK UOW</p>
              <p className="mb-3">International: 1300 275 869</p>
              <p className="mb-2">
                <b> Future Students:</b>
              </p>
              <p className="mb-2">Australia: 1300 367 869</p>
              <p>International: +61 2 4221 3218</p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div>
              <h4 className="fw-bold mb-2">AWARDS</h4>
              <hr />
              <p className="mb-2">
                <b>Top 20</b> 14th best modern university in the world
              </p>
              <p className="mb-2">
                <b>Top 1%</b> of the world's universities
              </p>
              <p className="mb-2">
                <b>5 star</b> Student experience across all indicators
              </p>
              <p className="mb-2">
                <b> 72%</b> of UOW graduates secured full-time employment within
                four months of completing their course
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default about;
