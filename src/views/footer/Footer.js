import React, {useState} from "react";
import {Link} from "react-router-dom";
import {CreateSubscribeSendMail} from "../../utils";
import {toast} from "react-hot-toast";

export default function Footer({props}) {
  const [mail, setMail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mail !== "") {
      try {
        const response = CreateSubscribeSendMail({
          mail: mail,
        });

        toast.promise(Promise.resolve(response), {
          duration: 4000,
          loading: "Loading...",
          success: (response) => `${response.message}`,
          error: (response) => `${response.message}`,
        });
      } catch (error) {}
    } else {
      toast.error("Please Enter your email address", {
        duration: 3000,
        id: "clipboard",
      });
    }
  };

  return (
    <section className="sec-footer bg-white pt-5 pb-5">
      <div className="container-fluid">
        {props === "home" ? (
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-10">
              <div className="card">
                <div className="card-body px-5">
                  <div className="row">
                    <div className="col-lg-4">
                      <h5 className="mb-3">
                        Join our mail list to get latest announcement
                      </h5>
                    </div>
                    <div className="col-lg-8">
                      <div className="row row-input mb-4">
                        <div className="col-lg-9 col-sm col-8 px-0">
                          <input
                            className="form-control"
                            placeholder="Enter Your Email..."
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-3 col-sm col-4 px-0 text-end">
                          <button
                            className="btn btn-danger"
                            onClick={handleSubmit}
                          >
                            Subcribe Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-10">
            {/* <div className="row mt-4">
              <div className="col-lg-6">
                <ul className="list-unstyled list-group list-group-horizontal ul-links">
                  <li>
                    <Link to={"/support-ticket"}>Support</Link>
                  </li>
                  <li>
                    <Link to={"/help"}>Help</Link>
                  </li>
                  <li>
                    <Link to={"/contact-us"}>Contact Us</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 d-flex justify-content-end">
                <ul className="list-unstyled list-group list-group-horizontal ul-cards">
                  <li>
                    <Link to={"#"} title="American Express">
                      <img
                        src={"assets/images/cards/american-express.png"}
                        className="img-fluid"
                        alt=""
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} title="Maestro">
                      <img
                        src={"assets/images/cards/maestro.png"}
                        className="img-fluid"
                        alt=""
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} title="Visa Electron">
                      <img
                        src={"assets/images/cards/visa-electron.png"}
                        className="img-fluid"
                        alt=""
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} title="Visa">
                      <img
                        src={"assets/images/cards/visa-two.png"}
                        className="img-fluid"
                        alt=""
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} title="Visa">
                      <img
                        src={"assets/images/cards/visa.png"}
                        className="img-fluid"
                        alt=""
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"} title="World Pay">
                      <img
                        src={"assets/images/cards/world-pay.png"}
                        className="img-fluid"
                        alt=""
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div> */}
            {/* <div className="row mt-4">
              <div className="col-lg-8">
                <div className="row ul-links">
                  <div className="col-lg-1 col-sm col-4 mb-1">
                    <Link className="a" to={"/support-ticket"}>
                      Support
                    </Link>
                  </div>
                  <div className="col-lg-1 col-sm col-4 mb-1">
                    <Link className="a" to={"/help"}>
                      Help
                    </Link>
                  </div>
                  <div className="col-lg-2 col-sm col-4 mb-1">
                    <Link className="a" to={"/contact-us"}>
                      Contact Us
                    </Link>
                  </div>
                  <div className="col-lg-3 mb-1">
                    <Link className="a" to={"/general-terms-and-conditions"}>
                      Terms &amp; Conditions
                    </Link>
                  </div>
                  <div className="col-lg-4 mb-1">
                    <Link className="a" to={"/account-pay-out-bonuses"}>
                      Account, Pay-out and Bonuses
                    </Link>
                  </div>
                  <div className="col-lg-2 col-sm col-6 mb-1">
                    <Link className="a" to={"/aml-manual"}>
                      Aml Manual
                    </Link>
                  </div>
                  <div className="col-lg-2 col-sm col-6 mb-1">
                    <Link className="a" to={"/aml-policy"}>
                      Aml Policy
                    </Link>
                  </div>
                  <div className="col-lg-3 col-sm col-6 mb-1">
                    <Link className="a" to={"/dispute-resolution"}>
                      Dispute Resolution
                    </Link>
                  </div>
                  <div className="col-lg-5 mb-1">
                    <Link className="a" to={"/fairness-rng-testing-methods"}>
                      Fairness &amp; RNG Testing Methods
                    </Link>
                  </div>
                  <div className="col-lg-7 mb-1">
                    <Link to={"/kyc-privacy-personal-data"} className="a">
                      KYC Policy, Privacy And Management of Personal Data
                    </Link>
                  </div>
                  <div className="col-lg-4 col-sm col-4 mb-1">
                    <Link className="a" to={"/privacy-policy"}>
                      Privacy Policy
                    </Link>
                  </div>
                  <div className="col-lg-3 col-sm col-4 mb-1">
                    <Link className="a" to={"/responsible-gaming"}>
                      Responsible Gaming
                    </Link>
                  </div>
                  <div className="col-lg-3 col-sm col-4 mb-1">
                    <Link className="a" to={"/self-exclusion"}>
                      Self-Exclusion
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 d-flex justify-content-end">
                <ul className="list-unstyled list-group list-group-horizontal ul-cards">
                  <li>
                    <a href="#" title="American Express">
                      <img
                        src="assets/images/cards/american-express.png"
                        className="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Maestro">
                      <img
                        src="assets/images/cards/maestro.png"
                        className="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Visa Electron">
                      <img
                        src="assets/images/cards/visa-electron.png"
                        className="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Visa">
                      <img
                        src="assets/images/cards/visa-two.png"
                        className="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="Visa">
                      <img
                        src="assets/images/cards/visa.png"
                        className="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#" title="World Pay">
                      <img
                        src="assets/images/cards/world-pay.png"
                        className="img-fluid"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}

            <footer className="footer-39201">
              <div className="container">
                <div className="row">
                  <div className="col-md mb-4 mb-md-0">
                    <h3>About</h3>
                    <ul className="list-unstyled nav-links">
                      <li>
                        <Link
                          className="a"
                          to={"/"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Home
                        </Link>{" "}
                      </li>
                      <li>
                        <Link
                          className="a"
                          to={"/lotteries"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Lotteries
                        </Link>{" "}
                      </li>
                      <li>
                        <Link
                          className="a"
                          to={"/scratch-cards"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Scratchers
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="a"
                          to={"/winners"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Winners
                        </Link>
                      </li>
                      <li>
                        {/* <Link
                          className="a"
                          to={"/about-us"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          About
                        </Link> */}
                      </li>
                      <li>
                        {/* <Link
                          className="a"
                          to={"/faqs"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          FAQ's
                        </Link> */}
                      </li>
                    </ul>
                  </div>
                  <div className="col-md mb-4 mb-md-0">
                    <h3>Support</h3>
                    <ul className="list-unstyled nav-links">
                      <li>
                        <Link
                          className="a"
                          to={"/support-ticket"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Support
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="a"
                          to={"/contact-us"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Contact Us
                        </Link>
                      </li>
                      <li>
                        {/* <Link
                          className="a"
                          to={"/help"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Help
                        </Link> */}
                      </li>
                    </ul>
                  </div>
                  <div className="col-md mb-4 mb-md-0">
                    <h3>Legal</h3>
                    <ul className="list-unstyled nav-links">
                      <li>
                        <Link
                          className="a"
                          to={"/general-terms-and-conditions"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          General Terms &amp; Conditions
                        </Link>{" "}
                      </li>
                      <li>
                        <Link
                          className="a"
                          to={"/privacy-policy"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Privacy Policy
                        </Link>{" "}
                      </li>
                      <li>
                        <Link
                          className="a"
                          to={"/aml-manual"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          AML Manual
                        </Link>{" "}
                      </li>
                      <li>
                        <Link
                          className="a"
                          to={"/aml-policy"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          AML Policy
                        </Link>{" "}
                      </li>
                      <li>
                        <Link
                          to={"/kyc-privacy-personal-data"}
                          className="a"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          KYC Policy, Data Protection
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="a"
                          to={"/account-pay-out-bonuses"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Account, Payout and Bonuses
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="a"
                          to={"/dispute-resolution"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Dispute Resolution
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link
                          className="a"
                          to={"/fairness-rng-testing-methods"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Fairness &amp; RNG Testing
                        </Link>
                      </li>
                      <li>
                        {" "}
                        <Link
                          className="a"
                          to={"/responsible-gaming"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Responsible Gaming
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="a"
                          to={"/self-exclusion"}
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          Self-Exclusion
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-4 mb-4 mb-md-0">
                    {/* <h3>Help</h3> */}

                    <div
                    // className="col-lg-4 d-flex justify-content-end"
                    >
                      <ul className="list-unstyled list-group list-group-horizontal ul-cards">
                        <li>
                          <a href="#" title="American Express">
                            <img
                              src="assets/images/cards/american-express.png"
                              className="img-fluid"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Maestro">
                            <img
                              src="assets/images/cards/maestro.png"
                              className="img-fluid"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Visa Electron">
                            <img
                              src="assets/images/cards/visa-electron.png"
                              className="img-fluid"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Visa">
                            <img
                              src="assets/images/cards/visa-two.png"
                              className="img-fluid"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#" title="Visa">
                            <img
                              src="assets/images/cards/visa.png"
                              className="img-fluid"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#" title="World Pay">
                            <img
                              src="assets/images/cards/world-pay.png"
                              className="img-fluid"
                            />
                          </a>
                        </li>
                      </ul>
                      <div
                        style={{fontSize: "13px", textAlign: "justify"}}
                        className="text-justify py-4 px-2"
                      >
                        kuberwins.com is operated by Rockford Holdings B.V.
                        registered under No. 161827 at Zuikertuintjeweg Z/N
                        (Zuikertuin Tower), Willemstad, Curaçao. This website is
                        licensed and regulated by Curaçao eGaming, license No.
                        1668/JAZ.
                        <br /> In order to register for this website, the user
                        is required to accept the General Terms and Conditions.
                        In the event the{" "}
                        <Link
                          to={"/general-terms-and-conditions"}
                          style={{color: "inherit"}}
                        >
                          General Terms and Conditions
                        </Link>{" "}
                        are updated, existing users may choose to discontinue
                        using the products and services before the said update
                        shall become effective, which is a minimum of two weeks
                        after it has been announced.
                      </div>
                      <div className="d-flex justify-content-between align-items-center ms-1 px-1">
                        <div className="">
                          <p style={{fontSize: "13px"}}>Certified by:</p>
                        </div>
                        <div className="">
                          <a href="https://www.itechlabs.com/certificates/RockfordHoldings/RNG_Certificate_UK_RockfordHoldings_21Jul23.pdf">
                            <img
                              style={{height: "84px", width: "186px"}}
                              src="assets/img/itechlabs_logo.jpg"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="row align-items-center">
                  <div className="col-12">
                    <div className="border-top my-5" />
                  </div>
                  <div className="col-md-6">
                    <p>
                      <small>© 2019 All Rights Reserved.</small>
                    </p>
                  </div>
                  <div className="col-md-6 text-md-right">
                    <ul className="social list-unstyled">
                      <li>
                        <a href="#">
                          <span className="icon-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="icon-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="icon-pinterest" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="icon-instagram" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="icon-behance" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
            </footer>

            <div className="row mt-4 footer-bootom-last">
              <div className="col-lg-4 py-4 d-flex justify-content-lg-start justify-content-center">
                <p className="p-coyright">
                  Copyright © {new Date().getFullYear()} All Right Reserved
                </p>
              </div>
              <div className="col-lg-4 py-4 d-flex justify-content-center">
                <img
                  src={"assets/images/yOURlogo-footer.png"}
                  className="img-fluid"
                  style={{width: 185}}
                  alt=""
                />
              </div>
              <div className="col-lg-4 py-4 d-flex justify-content-lg-end justify-content-center">
                <ul className="list-unstyled list-group list-group-horizontal ul-social">
                  <li>
                    <Link to={"#"}>
                      <i className="fa-brands fa-square-facebook"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"}>
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to={"#"}>
                      <i className="fa-brands fa-discord"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
