import Head from "next/head";

function NotFound() {
  return (
    <>
      <Head>
        <title>404 | UOW Room Booking System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="text-center my-5">
        <h1>
          Ooops.. The Page you are looking for
          <br />
          is currently unavailable.
        </h1>
      </div>
    </>
  );
}

export default NotFound;
