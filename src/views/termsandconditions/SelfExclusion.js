import React, {useState} from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import {toast} from "react-hot-toast";
import ImageCaptcha from "../schema/Captcha2";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {stylesDate} from "../../styles/tableStyle";
import moment from "moment";
import {useRef} from "react";
import {DateRange} from "react-date-range";
import LoadingSpinner from "../components/LoadingSpinner";
import {selfExclusion} from "../../api/api";
import {useEffect} from "react";
import Swal from "sweetalert2";

export default function SelfExclusion({props}) {
  const childRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [contactData, setContactData] = useState({
    email: "",
    password: "",
    Period: "",
    Reason: "",
    Duration_End: "",
    Duration_Start: "",
  });
  const [displayDateRangePicker, setDisplayRangePicker] = useState(false);
  const [customDate, setCustomDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
      date: "",
    },
  ]);

  const contactChange = (e) => {
    const {name, value} = e.target;
    setContactData({...contactData, [name]: value});
  };

  const contactSubmit = async (e) => {
    e.preventDefault();
    const duration =
      contactData.Period[0] +
      " " +
      contactData.Period.slice(1, contactData.Period.length);
    if (
      !contactData.email ||
      !contactData.password ||
      !contactData.Period ||
      !contactData.Reason
    ) {
      toast.error("Please fill in all fields", {
        duration: 3000,
        id: "clipboard",
      });
      return;
    }

    if (!captchaVerified) {
      if (captchaVerified === "") {
        toast.error("Please enter the captcha", {
          duration: 3000,
          id: "clipboard",
        });
        return;
      } else {
        toast.error("Captcha mismatched", {duration: 3000, id: "clipboard"});
        return;
      }
    }
    if (
      contactData.Duration_Start &&
      contactData.Duration_Start === contactData.Duration_End
    ) {
      toast.error("Start and end Date are not allowed to be same", {
        duration: 3000,
        id: "clipboard",
      });
      return;
    }

    if (
      !isCustomSelectionValid(
        contactData?.Duration_Start,
        contactData?.Duration_End
      )
    ) {
      toast.error(
        "The Minimum and Maximum Time for self exclusion should be 3 month and 5 year",
        {
          duration: 3000,
          id: "clipboard",
        }
      );
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      text: `You account will be deactivated for  ${
        contactData.Period === "custom"
          ? moment(contactData.Duration_End).diff(
              moment(contactData.Duration_Start),
              "days"
            ) + " days"
          : duration
      }, do you want to continue?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00a3ff",
      cancelButtonColor: "#DC3545",
      confirmButtonText: "Yes!, Deactivate my account",
      cancelButtonText: "No, go back",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        const res = await selfExclusion(contactData);
        if (res.message === "Self-Exclusion From Submit Successfully!") {
          setContactData({
            email: "",
            password: "",
            Period: "",
            Reason: "",
            Duration_End: "",
            Duration_Start: "",
          });
          if (childRef.current) {
            childRef.current.generateCaptchaImage();
          }
          Swal.fire({
            title: "Successfully Excluded!",
            text: res.messageDuration,
            icon: "success",
          });
          // toast.success(res.message, { duration: 3000, id: "clipboard" });
        } else {
          toast.error(res.message, {
            duration: 3000,
            id: "clipboard",
          });
        }
        setLoading(false);
      }
    });
  };

  const handleDateRangeChange = (item) => {
    const startDate = moment(item.selection.startDate).format("YYYY-MM-DD");
    const endDate = moment(item.selection.endDate).format("YYYY-MM-DD");

    setCustomDate([
      {
        ...item.selection,
        date: new Date(),
      },
    ]);

    setContactData({
      ...contactData,
      Duration_Start: startDate,
      Duration_End: endDate,
    });
  };

  useEffect(() => {
    if (contactData.Period !== "custom") {
      setContactData({
        ...contactData,
        Duration_Start: "",
        Duration_End: "",
      });
    }
  }, [contactData.Period]);

  function isCustomSelectionValid(startDate, endDate) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const durationMs = endDate - startDate;
    const months = durationMs / (1000 * 60 * 60 * 24 * 30);
    const years = durationMs / (1000 * 60 * 60 * 24 * 365);

    if (months >= 3 && years <= 5) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <title>Terms &amp; Conditions - Kuber Wins</title>
      {loading && <LoadingSpinner />}

      <Navbar props={"general-terms-and-conditions"} />
      <section style={{background: "#f5f5f5"}} className="sec-second">
        <div className="container">
          <h2 className="mt-4 sec-heading">Self Exclusion</h2>
        </div>
      </section>
      <section className="sec-second pb-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p className="fw-bold fs-5">SELF-EXCLUSION</p>
              <p>
                All capitalized terms not otherwise defined in this document
                shall have the meanings ascribed to them in the Terms and
                Conditions
              </p>

              <p className="fw-bold">TOOLS</p>
              <p>
                We offer a number of tools to help You plan and control Your
                gaming activity. Keeping track of how much You play for is
                something We recommend all Our players, and that You can easily
                do by following Your transaction history.
              </p>

              <p className="fw-bold">COOLING DOWN</p>
              <p>
                If You want to take a break from gambling, We offer the option
                of suspending Your Member Account for the time You need, giving
                You some time to cool off and reflect on Your gambling
                situation. This can be actioned by contact Our customer support
                via email at info@kuberwins.com The time periods that We offer
                are 24 hours, 7 days, 1 month, 6 months, 1 year or for an
                indefinite period of time. Should You wish to close Your Member
                Account for another time period You can always contact our
                customer support who will be happy to help you with this
                request.
              </p>

              <p className="fw-bold">DO YOU HAVE A GAMBLING PROBLEM?</p>
              <p>
                Determining whether Your gambling is in the safe zone or not
                isn’t always easy. However, there are a few common warning signs
                that You should be aware of:
                <ul>
                  <li>Do you ever play for more than You intend to?</li>
                  <li>Does Your gambling impact Your work or social life?</li>
                  <li>Have You tried to cut down or stop without success?</li>
                  <li>
                    Have You ever lied or hidden signs of Your gambling to
                    family or friends?
                  </li>
                  <li>
                    Do You think a big win is the answer to Your problems?
                  </li>
                </ul>
              </p>

              <p>
                If You want help determining the impact gambling has on Your
                everyday life, You can take a self-assessment test such as this
                one. When Your gambling has become a problem the first thing to
                do when You notice that gambling has become a problem is to take
                the necessary steps to make sure You can’t gamble anymore. You
                can easily self-exclude with Us by contacting our customer
                support team. When you self-exclude You can feel safe in knowing
                that You won’t be able to log in and play again in a moment of
                weakness. For additional protection, there are also software
                products such as Betfilter and Gamban that block access to
                gambling sites from Your computer and any other device you might
                have.
              </p>
            </div>
          </div>
          <div>
            <div className="row d-flex justify-content-center align-items-center">
              <form className="col-lg-6" onSubmit={contactSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-floating mb-3">
                      <input
                        required
                        type="email"
                        className="form-control"
                        autofocus
                        id="txtEmail"
                        placeholder=" "
                        name="email"
                        value={contactData.email}
                        onChange={contactChange}
                      />
                      <label htmlFor="txtEmail">Registered Email</label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-floating mb-3">
                      <input
                        required
                        type="password"
                        className="form-control"
                        autofocus
                        id="txtPassword"
                        name="password"
                        value={contactData.password}
                        onChange={contactChange}
                        placeholder=" "
                      />
                      <label htmlFor="txtPassword">Password</label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-floating mb-3">
                      <textarea
                        required
                        className="form-control"
                        id="txtMensagem"
                        placeholder=" "
                        // style={{ height: 200 }}
                        onChange={contactChange}
                        value={contactData.Reason}
                        name="Reason"
                      ></textarea>
                      <label for="txtMensagem">
                        Reason for Account restriction
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-floating mb-3">
                      <select
                        required
                        className="form-select"
                        name="Period"
                        onChange={contactChange}
                        id="txtContact"
                        value={contactData.Period}
                      >
                        <option value="">Select</option>
                        {/* <option value="1week">1 Week</option> */}
                        <option value="3month">3 Month</option>
                        <option value="6months">6 Month</option>
                        <option value="1year">1 Year</option>
                        <option value="2year">2 Year</option>
                        <option value="3year">3 Year</option>
                        <option value="4year">4 Year</option>
                        <option value="5year">5 Year</option>
                        <option value="custom">Custom</option>
                      </select>

                      <label htmlFor="txtContact">
                        Select duration of self exclusion
                      </label>
                    </div>
                  </div>
                  <div
                    className="col-lg-12"
                    hidden={contactData.Period !== "custom"}
                  >
                    <div className="form-floating mb-3">
                      <div>
                        <div
                          onClick={() =>
                            setDisplayRangePicker(!displayDateRangePicker)
                          }
                        >
                          <CalendarMonthIcon
                            className="mt-3 bg-light"
                            style={{
                              cursor: "pointer",
                              position: "absolute",
                              zIndex: "99",
                              right: "13px",
                              fontSize: "23px",
                            }}
                          />
                          <div className="form-floating mb-3">
                            <input
                              required={contactData.Period === "custom"}
                              className="form-control"
                              value={
                                contactData.Duration_Start &&
                                moment(contactData.Duration_Start).format(
                                  "DD/MM/YYYY"
                                ) +
                                  " to " +
                                  moment(contactData.Duration_End).format(
                                    "DD/MM/YYYY"
                                  )
                              }
                              placeholder="Select from - Select to"
                              htmlFor="txtCalender"
                            />
                            <label htmlFor="txtCalender">Custom Date</label>{" "}
                          </div>
                        </div>
                        {displayDateRangePicker ? (
                          <div style={stylesDate.popover}>
                            <div
                              style={stylesDate.cover}
                              onClick={() => setDisplayRangePicker(false)}
                            />

                            <DateRange
                              minDate={new Date()}
                              className="card"
                              editableDateInputs={true}
                              onChange={handleDateRangeChange}
                              moveRangeOnFirstSelection={false}
                              ranges={customDate}
                            />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-floating mb-3">
                      <ImageCaptcha
                        setCaptchaVerified={setCaptchaVerified}
                        ref={childRef}
                      />
                    </div>
                  </div>{" "}
                  <div className="col-lg-12  mb-3">
                    <div>
                      <input
                        required
                        className="form-check-input"
                        type="checkbox"
                        defaultValue
                        id="flexCheckDefault"
                      />{" "}
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        I have read above terms and want to exclude my account.
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-12 ">
                    <button
                      className="btn btn-info rounded-0 w-100 text-white border-0 py-2"
                      disabled={loading}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer props={""} />
    </>
  );
}
