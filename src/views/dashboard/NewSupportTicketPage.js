import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";

import LoadingSpinner from "../components/LoadingSpinner";
import {CreateSupportTicket} from "../../utils/index";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "../../features/apiSlice";

export default function NewSupportTicketPage({props}) {
  const dispatch = useDispatch();
  const [fname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("");
  const [message, setMessage] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const userId = localStorage.getItem("userId");
  const [loader, setLoader] = useState(false);
  const [lottery, setLottery] = useState("");
  const [isOtherSelected, setIsOtherSelected] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch]);

  const user = useSelector((state) => state.api.user);

  useEffect(() => {
    if (user) {
      setFirstName(user?.fname);
      setEmail(user?.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var formdata = new FormData();
    for (let i = 0; i < imageFiles.length; i++) {
      formdata.append("images", imageFiles[i]);
    }
    formdata.append("name", fname);
    formdata.append("email", email);
    formdata.append("subject", subject);
    formdata.append("priority", priority);
    formdata.append("message", message);
    formdata.append("UserId", userId);
    setLoader(true);

    const response1 = await CreateSupportTicket(formdata, {
      "content-type": imageFiles.type,
      "content-length": `${imageFiles.size}`, // 👈 Headers need to be a string
    });
    if (response1.data) {
      setLoader(false);
      navigate("/support-ticket");
    }
  };
  const onImageChange = (e) => {
    let files = e.target.files;
    setImageFiles([...imageFiles, ...files]);
  };

  return (
    <>
      {loader && <LoadingSpinner />}
      <title>Support Ticket - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"newsupportticket"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="col-lg-12 bg-white">
                  <div className="px-5 p-4">
                    <h4 className="mb-4 fw-bold pt-3 ">
                      Create Support Ticket{" "}
                      <Link
                        to={"/support-ticket"}
                        className="text-yellow  btn btn-info text-white px-4 float-end"
                      >
                        My Support Tickets
                      </Link>
                    </h4>

                    <form className="profile-form" onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 mb-3" required>
                          <label>Your Queries</label>
                          <select
                            name=""
                            id=""
                            className="form-control"
                            required
                            onChange={(e) => {
                              if (e.target.value === "Others") {
                                setIsOtherSelected(true);
                              } else {
                                setIsOtherSelected(false);
                                setLottery(e.target.value);
                              }
                            }}
                          >
                            <option value="">-- Select --</option>
                            <option value="Lottery Purchased">
                              Lottery Purchased
                            </option>
                            <option value="Payment Issue">Payment Issue</option>
                            <option value="Lottery Withdrawl">
                              Lottery Withdrawl
                            </option>
                            <option value="Lottery Winning">
                              Lottery Winning
                            </option>
                            <option value="Transactions Issue">
                              Transactions Issue
                            </option>
                            <option value="Others">Others</option>
                          </select>
                        </div>

                        {isOtherSelected && (
                          <div className="col-lg-6 col-md-6 mb-3" required>
                            <label>Please specify your query:</label>
                            <input
                              type="text"
                              name=""
                              id=""
                              className="form-control"
                              required
                              onChange={(e) => setLottery(e.target.value)}
                            />
                          </div>
                        )}

                        <div className="col-lg-6 col-md-6 mb-3">
                          <label>Name</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={fname}
                            onChange={(e) => setFirstName(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 mb-3">
                          <label>E-mail ID</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 mb-3">
                          <label>Subject</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                          />
                        </div>

                        <div className="col-lg-6 col-md-6 mb-3">
                          <label>Priority</label>
                          <select
                            name=""
                            id=""
                            className="form-control"
                            onChange={(e) => setPriority(e.target.value)}
                            required
                          >
                            <option value="" required>
                              Select
                            </option>
                            <option value="3">High</option>
                            <option value="2">Medium</option>
                            <option value="1">Low</option>
                          </select>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-3">
                          <label htmlFor="fileInput">Attachments</label>

                          <input
                            type="file"
                            name="img"
                            className="file f-img form-control"
                            accept="image/jpg image/jpeg image/png"
                            id="fileInput"
                            multiple
                            onChange={onImageChange}
                          />
                          <div className="font-sm text-muted">
                            Allowed Files: .jpg, .jpeg, .png, .pdf, .doc, .docx
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-6 mb-3">
                          <label htmlFor for="">
                            Message
                          </label>
                          <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="5"
                            className="form-control"
                            placeholder="Start typing..."
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="row mt-3 d-flex justify-content-center align-items-center">
                        <div className="col-lg-6">
                          <button
                            className="btn btn-info w-75 py-2 text-white"
                            // onClick={(e) => handleSubmit()}
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer props={""} />
      {/* <ToastContainer /> */}
    </>
  );
}
