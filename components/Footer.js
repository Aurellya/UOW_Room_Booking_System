import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <div className="row d-flex">
          <span className="mr-auto">
            Copyright &#169; 2021{" "}
            <Link href="https://www.uow.edu.au/" passHref={true}>
              <a>University of Wollonggong</a>
            </Link>
          </span>
          <span>
            <AiOutlineMail size={20} className="mr-2" />
            student_accounts@uow.edu.au
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
