import React, {useEffect, useRef, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import {getCountries, getCountryCode} from "../../utils";
import {useAuth} from "../../utils/auth";
import {FormSchema} from "../schema/FormSchema";
import validator from "validator";
import "../../index.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import LoadingSpinner from "../components/LoadingSpinner";
import Tooltip from "@mui/material/Tooltip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {CalendarMonth} from "@mui/icons-material";

export default function RegistrationPage({props}) {
  const auth = useAuth();
  const datePickerRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [countries, setCountriesList] = useState([]);
  const {
    firstName,
    lastName,
    country,
    phone,
    username,
    email,
    password,
    confirmPassword,
    dob,
  } = FormSchema;
  const location = useLocation();
  const [referal, setReferal] = useState("");
  const loc = location.pathname.split("/").reverse()[0];
  const [countryCode, setCountryCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await getCountries();
      if (res) {
        setCountriesList(res.data.countries);
      }
    };
    fetchCountries();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    mode: "onChange",
    defaultValues: {
      [firstName.key]: "",
      [lastName.key]: "",
      [country.key]: "",
      [phone.key]: "",
      [username.key]: "",
      [email.key]: "",
      [password.key]: "",
      [confirmPassword.key]: "",
      [dob.key]: "",
    },
  });
  const onSubmit = async (data) => {
    setLoading(true);
    const body = {
      fname: data.firstName,
      lname: data.lastName,
      country: data.country,
      mobileNo: `+${data.phone.replace(/[^\d+]/g, "")}`,
      userName: data.username,
      email: data.email,
      password: data.password,
      dob: data.dob,
      refer_by: loc === "registration" ? referal : loc,
    };
    const res = await auth.register(body, setLoading);
    if (res) {
      setLoading(false);
    }
  };

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("Strong Password");
    } else {
      setErrorMessage("Is Not Strong Password");
    }
  };
  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const country_data = await getCountryCode();
        setCountryCode(country_data.countryCode.toLowerCase());
      } catch (error) {}
    };
    fetchCountryCode();
  }, []);

  return (
    <>
      <title>Registration - Kuber Wins</title>
      {loading && <LoadingSpinner />}
      <section className="sec-login" style={{backgroundColor: "#f5f6ff"}}>
        <div className="container">
          <div
            className="row d-flex align-items-center justify-content-center"
            style={{height: "100vh"}}
          >
            <div className="col-lg-12">
              <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="row">
                  {/* <div
                    className="col-lg-4 col-md-4 d-none d-lg-block pe-0 lgn-img"
                    style={{
                      backgroundImage:
                        "url(assets/images/login-left-bg_withname.png)",
                    }}
                  ></div> */}
                  <div className="col-lg-12 col-md-12 bg-white">
                    <div className="px-5 pb-4 pt-3">
                      <h4 className="mb-4">Register</h4>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 mb-0">
                          <label>First Name</label>
                          <span className="text-danger">*</span>
                          <input
                            className="form-control"
                            name={firstName.key}
                            placeholder={firstName.placeholderText}
                            {...register(firstName.key, firstName.options)}
                            id={firstName.key}
                            autoComplete="false"
                          />
                          <div
                            className="error-msg"
                            aria-live="polite"
                            role="alert"
                          >
                            {errors.firstName ? (
                              <>{errors.firstName.message}</>
                            ) : (
                              <>&nbsp;</>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-0">
                          <label>Last Name</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            className="form-control"
                            name={lastName.key}
                            placeholder={lastName.placeholderText}
                            {...register(lastName.key, firstName.options)}
                            id={lastName.key}
                            autoComplete="false"
                          />
                          <div
                            className="error-msg"
                            aria-live="polite"
                            role="alert"
                          >
                            {errors.lastName ? (
                              <>{errors.lastName.message}</>
                            ) : (
                              <>&nbsp;</>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-0">
                          <label>Country</label>{" "}
                          <span className="text-danger">*</span>
                          <select
                            type="country"
                            className="form-select"
                            name={country.key}
                            id={country.key}
                            placeholder={country.placeholderText}
                            {...register(country.key, country.options)}
                          >
                            <option selected>Select Country</option>
                            {countries.map((country) => {
                              return <option>{country.name}</option>;
                            })}
                          </select>
                          <div
                            className="error-msg"
                            aria-live="polite"
                            role="alert"
                          >
                            {errors.country ? (
                              <>{errors.country.message}</>
                            ) : (
                              <>&nbsp;</>
                            )}
                          </div>
                        </div>

                        <div className="col-lg-6 col-md-6 mb-0">
                          <label>Mobile No.</label>
                          <PhoneInput
                            countryCodeEditable={false}
                            enableSearch={true}
                            country={countryCode}
                            placeholder={phone.placeholderText}
                            value={watch(phone.key)}
                            onChange={(value) => {
                              setValue(phone.key, value);
                            }}
                          />
                          <div
                            className="error-msg"
                            aria-live="polite"
                            role="alert"
                          >
                            {errors.phone ? (
                              <>{errors.phone.message}</>
                            ) : (
                              <>&nbsp;</>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-0">
                          <label>Username</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            className="form-control"
                            name={username.key}
                            placeholder={username.placeholderText}
                            {...register(username.key, username.options)}
                            id={username.key}
                            autoComplete="false"
                          />
                          <div
                            className="error-msg"
                            aria-live="polite"
                            role="alert"
                          >
                            {errors.username ? (
                              <>{errors.username.message}</>
                            ) : (
                              <>&nbsp;</>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-0">
                          <label>E-mail ID</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            className="form-control"
                            name={email.key}
                            placeholder={email.placeholderText}
                            {...register(email.key, email.options)}
                            id={email.key}
                            autoComplete="false"
                          />
                          <div
                            className="error-msg"
                            aria-live="polite"
                            role="alert"
                          >
                            {errors.email ? (
                              <>{errors.email.message}</>
                            ) : (
                              <>&nbsp;</>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-0">
                          <label>Date of birth</label>{" "}
                          <span className="text-danger">*</span>
                          <DatePicker
                            ref={datePickerRef}
                            className="form-control"
                            showIcon
                            // selected={startDate}
                            name={dob.key}
                            id={dob.key}
                            placeholderText={dob.placeholderText}
                            autoComplete="false"
                            showYearDropdown
                            showMonthDropdown
                            // showYearPicker
                            dropdownMode="select"
                            isClearable
                            // fixedHeight
                            icon={
                              <CalendarMonth
                                sx={{height: 8, width: 8, right: 0}}
                                onClick={() =>
                                  datePickerRef.current.setOpen(true)
                                }
                              />
                            }
                            value={watch(dob.key)}
                            onChange={(value) => {
                              setValue(
                                dob.key,
                                moment(value).format("DD/MM/YYYY")
                              );
                            }}
                          />
                          {/* <input
                            className="form-control"
                            name={dob.key}
                            placeholder={dob.placeholderText}
                            {...register(dob.key, dob.options)}
                            id={dob.key}
                            autoComplete="false"
                          /> */}
                          <div
                            className="error-msg"
                            aria-live="polite"
                            role="alert"
                          >
                            {dob.email ? (
                              <>{errors.dob.message}</>
                            ) : (
                              <>&nbsp;</>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-0">
                          <label>Password</label>{" "}
                          <span className="text-danger">*</span>
                          <div className="input-group">
                            <input
                              type={password.type}
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              title="Must Contain '@#$!%&', numeric and Uppercase"
                              className="form-control"
                              id={password.key}
                              name={password.key}
                              placeholder={password.placeholderText}
                              {...register(password.key, password.options)}
                              // id={password.key}
                              autoComplete="false"
                              onChange={(e) => validate(e.target.value)}
                              style={{
                                borderTopRightRadius: "2px",
                                borderBottomRightRadius: "2px",
                              }}
                            />{" "}
                            <span className="input-group-append bg-white border-left-0">
                              <span
                                className=""
                                style={{
                                  position: "absolute",
                                  top: "9px",
                                }}
                              >
                                {errorMessage == "Strong Password" ? (
                                  <i
                                    className="fa fa-check text-success"
                                    style={{marginLeft: "-20px"}}
                                  />
                                ) : (
                                  <Tooltip title="Must Contain '@#$!%&', numeric and Uppercase">
                                    <i
                                      style={{cursor: "pointer"}}
                                      className="fa fa-info-circle "
                                    />
                                  </Tooltip>
                                )}
                              </span>
                            </span>
                          </div>
                          {errorMessage === "" ? null : (
                            <span
                              className={`${
                                errorMessage === "Strong Password"
                                  ? "text-success"
                                  : "error-msg"
                              }`}
                              style={{
                                fontSize: "13px",
                              }}
                            >
                              {errorMessage}
                            </span>
                          )}
                          <div
                            className="error-msg"
                            aria-live="polite"
                            role="alert"
                          >
                            {errors.password ? (
                              <>{errors.password.message}</>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-0">
                          <label>Confirm Password</label>{" "}
                          <span className="text-danger">*</span>
                          <input
                            type={confirmPassword.type}
                            className="form-control"
                            name={confirmPassword.key}
                            placeholder="confirm password"
                            {...register(confirmPassword.key, {
                              required: "Enter confirm password",
                              validate: (value) =>
                                value ===
                                  document.getElementById(password.key).value ||
                                "The passwords do not match",
                            })}
                            id={confirmPassword.key}
                            autoComplete="false"
                          />
                          <div
                            className="error-msg"
                            aria-live="polite"
                            role="alert"
                            style={{fontSize: "13px"}}
                          >
                            {errors.confirmPassword ? (
                              <>{errors.confirmPassword.message}</>
                            ) : (
                              <>&nbsp;</>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-0">
                          <label>Refer By</label>
                          <input
                            type="text"
                            value={loc === "registration" ? referal : loc}
                            className="form-control"
                            placeholder="No referal"
                            autoComplete="true"
                            onChange={(e) => setReferal(e.target.value)}
                          />
                        </div>
                        <div className="col-lg-12 mb-2 mt-0">
                          <div className="d-flex mt-2">
                            <input
                              type="checkbox"
                              className="me-2"
                              style={{cursor: "pointer"}}
                              required
                            />
                            <p className="p-0 m-0 pull-left ">
                              I agree with{" "}
                              <Link
                                to={"/general-terms-and-conditions"}
                                target="_blank"
                                style={{textDecorationLine: "underline"}}
                              >
                                General Terms & Conditions
                              </Link>
                              ,{" "}
                              <Link
                                to={"/privacy-policy"}
                                target="_blank"
                                style={{textDecorationLine: "underline"}}
                              >
                                Privacy Policy
                              </Link>
                            </p>{" "}
                            &nbsp;
                            <span className="text-danger">*</span>
                          </div>
                          <p className="p-0 m-0 pull-right">
                            Already have an account?{" "}
                            <Link to={"/login"}>Login Here</Link>
                          </p>
                        </div>
                      </div>
                      <div className="row mt-3 mb-2 d-flex justify-content-center align-items-center">
                        <div className="col-lg-6">
                          <button
                            disabled={!isValid}
                            type="submit"
                            variant="login-signup-btn"
                            className="btn btn-info w-100"
                            id="myButton"
                            // onClick={disablebutton}
                          >
                            Register Now
                          </button>
                        </div>
                      </div>
                      <div className="row mt-3 d-flex justify-content-center align-items-center">
                        <div className="col-lg-6 text-center">
                          <Link to={"/"}>
                            <i className="fa fa-arrow-left"></i> Back to Home
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
