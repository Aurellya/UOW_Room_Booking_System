import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="d-flex">
        <span className="mr-auto">
          Copyright &#169; 2021{" "}
          <Link href="https://www.uow.edu.au/" passHref={true}>
            <a>University of Wollonggong</a>
          </Link>
        </span>
        <span>
          <AiOutlineMail
            size={20}
            className="mr-2"
            style={{ marginBottom: "0.6px" }}
          />
          student_accounts@uow.edu.au
        </span>
      </div>
    </footer>
  );
};

export default Footer;
