import AppContext from "../../context/AppContext";
import { useContext } from "react";
import Image from "next/image";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

const studentProfile = () => {
  const { user, setUser } = useContext(AppContext);

  return (
    <>
      <div className="container col-xxl-8 px-5 py-3 my-5 rounded-3 border shadow">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <div className="row">
              <h4 className="mb-1 col-6">Account Information</h4>
              <div className="col-6 text-right px-4">
                <Link href="/student/editProfile">
                  <a>
                    <HiPencilAlt />
                  </a>
                </Link>
              </div>
            </div>

            <hr className="mb-4" />

            {user ? (
              <div className="row  g-3">
                <div className="col-sm-6">
                  <label htmlFor="username " className="font-weight-bold">
                    Username:
                  </label>
                  <p id="username">{user.username}</p>
                </div>
                <div className="col-sm-6">
                  <label htmlFor="role" className="font-weight-bold">
                    Role:
                  </label>
                  <p id="role">
                    {user.role.name == "Student" ? "Student" : user.role.name}
                  </p>
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="font-weight-bold">
                    Email:
                  </label>
                  <p id="email">{user.email}</p>
                </div>

                <div className="col-12">
                  <label htmlFor="created_at" className=" font-weight-bold">
                    Created at:
                  </label>
                  <p id="created_at">
                    {user.created_at.split("T").slice(0, 1)}
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="col-lg-6 text-center">
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
    </>
  );
};

export default studentProfile;
