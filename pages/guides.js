import Head from "next/head";
import { AiOutlineArrowRight } from "react-icons/ai";

const guides = () => {
  return (
    <>
      <Head>
        <title>Guides | UOW Room Booking System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="text-center mt-5 container">
        <h1>Guides</h1>
        <hr />
      </div>

      <div className=" col-xxl-7 px-3 py-3 text-dark light-background">
        <div className="container">
          <div className="row flex-lg-row-reverse align-items-center g-2 py-2">
            <div className="col-7 col-sm-3"></div>
            <div className="col-lg-13">
              <p className="lead text-center">
                To book a room with UOW, you have to make sure you know which
                room you want to book and specify the exact timing. This website
                is made to allow user to book rooms in UOW in the most practical
                way possibble.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="dark-background px-4 pt-5 mb-5 text-center border-bottom">
        <h1 className="display-5 fw-bold lh-1 mb-2">Useful Features</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-5">
            There are many rooms inside the UOW building which can be chosen.
            Fill in the filter to help you find your preferred room in the blink
            of an eye.
          </p>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: "350px" }}>
          <div className="container px-5">
            <img
              src="./preview.png"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              width="700"
              height="500"
              loading="lazy"
              align-items-center
            />
          </div>
        </div>
      </div>

      <div className="col-xxl-7 pt-3 text-dark light-background">
        <div className="container">
          <p className="lead text-center">
            Everyone who has an access to the room booking website can book the
            room. Enquiries can be sent to the contact provided at contact page.
          </p>
        </div>
      </div>

      <div className="container pb-5 pt-3" id="icon-grid">
        <div className="row row-cols-4 mb-5 py-5 text-light dark-background">
          <div className="col d-flex align-items-start">
            <div>
              <h4 className="fw-bold mb-1">
                LOG-IN <AiOutlineArrowRight />
              </h4>
              <p>As a student or staff.</p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div>
              <h4 className="fw-bold mb-1">
                DECIDE <AiOutlineArrowRight />
              </h4>
              <p>For the room and timings.</p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div>
              <h4 className="fw-bold mb-1">
                BOOK <AiOutlineArrowRight />
              </h4>
              <p>Pick and Checkout your booking.</p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div>
              <h4 className="fw-bold mb-1">READY!</h4>
              <p>The Room Slot is now booked.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default guides;
