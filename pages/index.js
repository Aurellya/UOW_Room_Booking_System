import Head from "next/head";
import Image from "next/image";
import { MdUpdate } from "react-icons/md";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

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
              <h1 className="display-5 fw-bold mb-4">Login As:</h1>
              <div className="col-lg-6 mx-auto">
                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <Nav.Link className="button2" href="/admin">
                    <Button
                      className="transparent"
                      variant="dark"
                      type="button"
                    >
                      <b>Admin</b>
                    </Button>
                  </Nav.Link>
                  <Nav.Link className="button1" href="/student">
                    <Button
                      className="transparent"
                      variant="outline-dark"
                      type="button"
                    >
                      <b>Student</b>
                    </Button>
                  </Nav.Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" col-xxl-8 px-4 py-5 text-light dark-background">
        <div className="container">
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src="./test.png"
                className="d-block mx-lg-auto img-fluid"
                alt="Bootstrap Themes"
                width="700"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold lh-1 mb-3">
                Responsive left-aligned hero with image
              </h1>
              <p className="lead">
                Quickly design and customize responsive mobile-first sites with
                Bootstrap, the world’s most popular front-end open source
                toolkit, featuring Sass variables and mixins, responsive grid
                system, extensive prebuilt components, and powerful JavaScript
                plugins.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5" id="icon-grid">
        <h2 className="pb-2 border-bottom">Features</h2>
        <div className="row row-cols-4 g-4 py-5">
          <div className="col d-flex align-items-start">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
          <div className="col d-flex align-items-start">
            <div className="bi text-muted flex-shrink-0 me-3 px-2">
              <MdUpdate size={40} />
            </div>
            <div>
              <h4 className="fw-bold mb-0">Featured title</h4>
              <p>
                Paragraph of text beneath the heading to explain the heading.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="dark-background px-4 pt-5 mb-5 text-center border-bottom">
        <h1 className="display-5 fw-bold lh-1 mb-2">Centered screenshot</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-5">
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system.
          </p>
        </div>
        <div className="overflow-hidden" style={{ maxHeight: "30vh" }}>
          <div className="container px-5">
            <img
              src="test2.png"
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example image"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className=" col-xxl-8 px-4 pb-5">
        <div className="container">
          <div className="row flex-lg-row align-items-center g-5 py-5">
            <div className="col-10 col-sm-8 col-lg-6">
              <img
                src="./test4.jpg"
                className="d-block mx-lg-auto img-fluid"
                alt="student"
                width="500"
                height="500"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <p className="lead">
                "Unlike the conventional method of learning in Hong Kong, the
                UOW course was very cutting-edge and I believe this will help me
                stand out in the fierce competition of job applications in Hong
                Kong as I can contribute with a new perspective and mindset."
              </p>
              <p className="lead">
                <b>CONSEJA DIANA JAHN BRILLANTES</b>
                <br />
                BACHELOR’S IN COMMUNICATION AND MEDIA STUDIES, UOWCH
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
