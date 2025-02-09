import React, {useState, useEffect} from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Sidebar from "../navbar/Sidebar";
import {updateUserDetail, otpVerification, sendOTP} from "../../utils/index";
import ProgressBar from "@ramonak/react-progress-bar";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux";
import {fetchCountries, fetchState, fetchUser} from "../../features/apiSlice";

export default function ProfilePage({props}) {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const userId = localStorage.getItem("userId");
  const [otp, setOtp] = useState("");
  const [image, setImage] = useState("");
  const [emailVarify, setEmailVarify] = useState(false);
  const [otpSendSuccess, setOTPSendSuccess] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobileNo: "",
    address: "",
    state: "",
    city: "",
    country: "",
    zip: "",
    image: "",
    notifications: "",
    notificationsTime: "",
  });
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
    dispatch(fetchCountries());
  }, [dispatch, userId, refresh]);

  const user = useSelector((state) => state.api.user);
  const countriesData = useSelector((state) => state.api.countriesData);
  const stateData = useSelector((state) => state.api.stateData);

  useEffect(() => {
    if (user) {
      setFormData(user);
      setEmailVarify(user.emailVerified ?? "");
      setMobileVerified(user.sms_verify ?? "");
      setImage(user.image ?? "");
    }
  }, [user]);

  useEffect(() => {
    if (countriesData.length) {
      setCountries(countriesData);
    }
    if (stateData.length) {
      setStates(stateData);
    }
  }, [countriesData, stateData, formData]);

  useEffect(() => {
    if (countries.length && formData.country) {
      const selectedCountry = countries.find(
        (c) => c.name === formData.country
      );
      dispatch(fetchState(selectedCountry.id));
    }
  }, [dispatch, formData.country, countries]);

  useEffect(() => {
    if (states.length && formData.state) {
      const selectedState = states.find((c) => c.stateName === formData.state);
      if (selectedState) {
        setCities(
          selectedState.Cities.length
            ? selectedState.Cities
            : [{cityName: selectedState.stateName}]
        );
      }
    }
  }, [dispatch, formData.state, states]);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async () => {
    const body = {
      fname: formData.fname,
      lname: formData.lname,
      email: formData.email,
      mobileNo: formData.mobileNo,
      address: formData.address,
      state: formData.state,
      city: formData.city,
      country: formData.country,
      zip: formData.zip,
      image: formData.image,
      notifications: formData.notifications,
    };
    const response = updateUserDetail(
      body,
      {"Content-Type": "application/json"},
      userId
    );
    toast.promise(Promise.resolve(response), {
      duration: 4000,
      loading: "Updating...",
      success: "Profile updated successfully",
      error: "Something went wrong",
    });
    if (typeof image === "object") {
      var formdata = new FormData();
      formdata.append("email", formData.email);
      formdata.append("image", image[0], image[0].name);
      updateUserDetail(formdata, {"Content-Type": "application/json"}, userId);
    }
  };

  const filteredData = {
    fname: user?.fname,
    lname: user?.lname,
    email: user?.email,
    mobileNo: user?.mobileNo,
    address: user?.address,
    state: user?.state,
    city: user?.city,
    country: user?.country,
    zip: user?.zip,
    image: user?.image,
    sms_verify: user?.sms_verify,
    emailVerified: user?.emailVerified,
  };

  function isEmptyOrFalseOrZero(value) {
    return (
      value === "" ||
      value === false ||
      value === 0 ||
      value === null ||
      value === undefined
    );
  }

  let countEmptyOrFalseOrZero = 0;
  let totalFields = 0;

  for (const key in filteredData) {
    if (filteredData.hasOwnProperty(key)) {
      totalFields++;
      if (isEmptyOrFalseOrZero(filteredData[key])) {
        countEmptyOrFalseOrZero++;
      }
    }
  }

  const filledPercentage =
    ((totalFields - countEmptyOrFalseOrZero) / totalFields) * 100;

  const handleOTPVerification = async () => {
    if (otp?.length === 6) {
      const res = await otpVerification({
        mobileNumber: formData.mobileNo,
        otp: otp,
        id: userId,
      });

      if (res.message) {
        setRefresh((prev) => !prev);
        toast.success("Mobile Verification Sucessfully", {
          duration: 3000,
          id: "clipboard",
        });
        window.location.reload();
      } else {
        toast.error("Invalid Otp", {
          duration: 3000,
          id: "clipboard",
        });
      }
    } else {
      toast.error("Please Enter 6 digit OTP Number", {
        duration: 3000,
        id: "clipboard",
      });
    }
  };
  return (
    <>
      <title>Profile - Kuber Wins</title>

      <Navbar props={{mainPage: "dashboard", subPage: ""}} />

      <section className="sec-dashbaord" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container-fluid">
          <div className="row">
            <Sidebar props={"profile"} />

            <div className="col-lg-9 col-sm col-12 dash-right-side ps-lg-5 pe-lg-5 py-4">
              <div className="row">
                <div className="col-lg-12 bg-white">
                  <div className="px-lg-5 p-lg-4">
                    <div className="profilepic">
                      <label htmlFor="profile">
                        <img
                          className="profilepic__image img-fluid"
                          src={
                            image && typeof image !== "object"
                              ? image
                              : image
                              ? URL.createObjectURL(image[0])
                              : "https://miro.medium.com/v2/resize:fit:250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg"
                          }
                          width={150}
                          height={150}
                          alt="Profibild"
                        />
                        <div className="profilepic__content">
                          <span className="profilepic__icon">
                            <i className="fas fa-camera" />
                          </span>
                          <span className="profilepic__text">Edit Profile</span>
                        </div>
                      </label>
                    </div>
                    <input
                      type="file"
                      id="profile"
                      name="image"
                      className="file f-img"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files)}
                      hidden
                    />
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <h4 className="mb-lg-4 fw-bold pt-3">Edit Profile</h4>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <div className="d-flex justify-content-end">
                          <div className="mb-lg-4 pt-3 d-flex">
                            <p className="me-3 p-0">Profile Status</p>

                            <ProgressBar
                              bgColor="#4e5fed"
                              completed={parseInt(filledPercentage)}
                              maxCompleted={100}
                              width="150px"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div action="" className="profile-form">
                      <div className="row">
                        <div className="col-6 mb-3">
                          <label>First Name</label>
                          <input
                            className="form-control"
                            placeholder=""
                            name="fname"
                            value={formData.fname}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-6 mb-3">
                          <label>Last Name</label>
                          <input
                            className="form-control"
                            placeholder=""
                            name="lname"
                            value={formData.lname}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-lg-6 col-md-6 mb-3">
                          <label>E-mail ID</label>

                          <>
                            <input
                              className={`form-control  ${
                                emailVarify ? `is-valid` : `is-invalid `
                              }`}
                              placeholder=""
                              name="email"
                              value={formData.email}
                              onChange={(e) => {
                                if (!emailVarify) handleInputChange(e);
                              }}
                              readOnly={emailVarify ? true : false}
                            />
                          </>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-3 ">
                          <label>Mobile No.</label>{" "}
                          <input
                            className={`form-control  ${
                              mobileVerified ? `is-valid` : `is-invalid `
                            }`}
                            placeholder=""
                            name="mobileNo"
                            value={formData.mobileNo}
                            onChange={(e) => {
                              if (!mobileVerified) handleInputChange(e);
                            }}
                            readOnly={mobileVerified}
                          />
                          <div
                            style={{
                              textAlign: "right",
                              display: "flex",
                              justifyContent: "right",
                            }}
                            className={`mt-1 ${mobileVerified ? `d-none` : ``}`}
                          >
                            <div
                              className={`d-flex ${
                                otpSendSuccess ? `` : `d-none`
                              }`}
                            >
                              <input
                                style={{width: "120px", height: "20px"}}
                                className="form-control me-1"
                                value={otp}
                                type="number"
                                maxLength={"6"}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="6 digit otp"
                              />
                              <button
                                type="button"
                                className="btn btn-primary btn-sm me-1"
                                onClick={handleOTPVerification}
                              >
                                Submit
                              </button>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                onClick={async () => {
                                  if (user.mobile !== formData.mobileNo) {
                                    updateUserDetail(
                                      {
                                        email: formData.email,
                                        mobileNo: formData.mobileNo,
                                      },
                                      {"Content-Type": "application/json"},
                                      userId
                                    );
                                  }
                                  const res = await sendOTP({
                                    mobileNumber: formData.mobileNo,
                                    userId: userId,
                                  });
                                  if (
                                    res?.message === "OTP sent successfully!"
                                  ) {
                                    toast.success("OTP sent successfully!", {
                                      duration: 3000,
                                      id: "clipboard",
                                    });

                                    setOTPSendSuccess(true);
                                  } else {
                                    toast.error(res.error, {
                                      duration: 5000,
                                      id: "clipboard",
                                    });
                                  }
                                }}
                              >
                                {otpSendSuccess ? "Send Again" : "Send OTP"}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 mb-3">
                          <label>Address</label>
                          <input
                            className="form-control"
                            placeholder=""
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-6 mb-3">
                          <label>Country</label>
                          <select
                            className="form-control form-select  "
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                          >
                            <option defaultValue="">Select</option>
                            {countries.length > 0 &&
                              countries.map((c, i) => (
                                <option key={i} value={c.name}>
                                  {c.name}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="col-6 mb-3">
                          <label>State</label>
                          <select
                            className="form-control form-select "
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                          >
                            <option defaultValue="" value={""}>
                              Select
                            </option>
                            {states.length > 0 &&
                              states.map((c, i) => (
                                <option key={i} value={c?.stateName}>
                                  {c?.stateName}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="col-6 mb-3">
                          <label>City</label>
                          <select
                            className="form-control form-select "
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                          >
                            <option defaultValue="" value={""}>
                              Select
                            </option>
                            {cities.length > 0 &&
                              cities.map((c, i) => (
                                <option key={i} value={c?.cityName}>
                                  {c?.cityName}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="col-6 mb-3">
                          <label>Zip Code</label>
                          <input
                            className="form-control"
                            name="zip"
                            value={formData.zip}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <h4 className="mb-4 fw-bold pt-3 mt-lg-4">
                        Email Notification
                      </h4>
                      <div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="notifications"
                            id="None"
                            checked={formData.notifications === "None"}
                            value="None"
                            onChange={() => {
                              // handleInputChange,
                              setFormData({
                                ...formData,
                                notificationsTime: "None",
                                notifications: "None",
                              });
                            }}
                          />
                          <label className="form-check-label" htmlFor="none">
                            None
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="notifications"
                            id="daily"
                            checked={formData.notifications === "Daily"}
                            value="Daily"
                            onChange={() => {
                              // handleInputChange,
                              setFormData({
                                ...formData,
                                notificationsTime: "Daily",
                                notifications: "Daily",
                              });
                            }}
                          />
                          <label className="form-check-label" htmlFor="daily">
                            Daily
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="notifications"
                            id="weekly"
                            value="Weekly"
                            checked={formData.notifications === "Weekly"}
                            onChange={() => {
                              // handleInputChange,
                              setFormData({
                                ...formData,
                                notificationsTime: "Monday",
                                notifications: "Weekly",
                              });
                            }}
                          />
                          <label className="form-check-label" htmlFor="weekly">
                            Weekly
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="notifications"
                            id="monthly"
                            value="Monthly"
                            checked={formData.notifications === "Monthly"}
                            onChange={() => {
                              // handleInputChange,
                              setFormData({
                                ...formData,
                                notificationsTime: "1",
                                notifications: "Monthly",
                              });
                            }}
                          />
                          <label className="form-check-label" htmlFor="monthly">
                            Monthly
                          </label>
                        </div>
                      </div>

                      <div className="row mt-3 d-flex justify-content-center align-items-center">
                        <div className="d-flex justify-content-center">
                          <button
                            className="btn btn-info w-50 py-2 text-white"
                            onClick={(e) => handleSubmit()}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer props={""} />
    </>
  );
}
