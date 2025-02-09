import React, {useState} from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {contactUs} from "../../utils";
import {toast} from "react-hot-toast";
import ImageCaptcha from "../schema/Captcha2";
import {useRef} from "react";

export default function ContactPage({props}) {
  const childRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [contactData, setContactData] = useState({
    fname: "",
    lname: "",
    mail: "",
    number: "",
    message: "",
  });

  const contactChange = (e) => {
    const {name, value} = e.target;
    setContactData({...contactData, [name]: value});
  };
  const contactSubmit = async (e) => {
    e.preventDefault();
    if (
      contactData.fname === "" ||
      contactData.lname === "" ||
      contactData.mail === "" ||
      contactData.number === "" ||
      contactData.message === ""
    ) {
      toast.error("Please fill in all fields", {
        duration: 3000,
        id: "clipboard",
      });
    } else {
      if (captchaVerified) {
        setLoading(true);
        const res = await contactUs(contactData);
        if (res.message === "Contact  successfully!") {
          setContactData({
            fname: "",
            lname: "",
            mail: "",
            number: "",
            message: "",
          });
          if (childRef.current) {
            childRef.current.generateCaptchaImage();
          }
          setLoading(false);
          toast.success("Sent Successfully", {
            duration: 3000,
            id: "clipboard",
          });
        } else {
          toast.error("Something went wrong", {
            duration: 3000,
            id: "clipboard",
          });
        }
      } else {
        if (captchaVerified === "") {
          toast.error("Please enter the captcha", {
            duration: 3000,
            id: "clipboard",
          });
        } else {
          toast.error("Captcha mismatched", {
            duration: 3000,
            id: "clipboard",
          });
        }
      }
    }
  };
  return (
    <>
      <title>Contact Us - Kuber Wins</title>

      <Navbar props={{mainPage: "contact", subPage: ""}} />

      <section className="sec-second pb-4">
        <div className="container">
          <h2 className="mt-4 mb-4 sec-heading text-center">Contact Us</h2>
          <div className="row d-flex justify-content-center align-items-center">
            <form className="col-lg-6" onSubmit={contactSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      autofocus
                      id="txtFirstName"
                      placeholder=" "
                      name="fname"
                      value={contactData.fname}
                      onChange={contactChange}
                    />
                    <label htmlFor="txtFirstName">First Name</label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="txtLastName"
                      placeholder=" "
                      name="lname"
                      value={contactData.lname}
                      onChange={contactChange}
                    />
                    <label htmlFor="txtLastName">Last Name</label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      autofocus
                      id="txtEmail"
                      placeholder=" "
                      name="mail"
                      value={contactData.mail}
                      onChange={contactChange}
                    />
                    <label htmlFor="txtEmail">E-mail</label>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      autofocus
                      id="txtContact"
                      name="number"
                      value={contactData.number}
                      onChange={contactChange}
                      placeholder=" "
                    />
                    <label htmlFor="txtContact">Contact Number</label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      id="txtMensagem"
                      placeholder=" "
                      style={{height: 200}}
                      onChange={contactChange}
                      value={contactData.message}
                      name="message"
                    ></textarea>
                    <label for="txtMensagem">Message</label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-floating mb-3">
                    <ImageCaptcha
                      setCaptchaVerified={setCaptchaVerified}
                      ref={childRef}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <button
                    className="btn btn-info rounded-0 w-100 text-white border-0 py-2"
                    disabled={loading}
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer props={""} />
    </>
  );
}
