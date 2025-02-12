import React, { useState } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserDetail } from "../../utils";

export default function Payment() {
  const location = useLocation();
  const [data, setData] = useState({});
  const [userDetail, setUserDetail] = useState([]);
  const userId = localStorage.getItem("userId");

  const payment_url = location.pathname.split("&")[2].split("=")[1];

  useEffect(() => {
    if (location?.state !== "") {
      setData(location?.state);
    }
  }, [location]);

  useEffect(() => {
    if (userId) {
      const fetchDefaultData = async () => {
        const response = await getUserDetail({}, userId);
        if (response?.data) {
          setUserDetail(response.data);
        }
      };
      fetchDefaultData();
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#f5f6ff" }}>
      <title>Payment - Kuber Wins</title>

      <Navbar props={{ mainPage: "about", subPage: "" }} />

      <section className="container-fluid py-lg-2 my-5">
        <div className="d-flex justify-content-around">
          {payment_url === "success" ? (
            <div
              className="card p-4 ticket"
              style={{ boxSizing: "content-box" }}
            >
              <div className="d-flex justify-content-center">
                <svg
                  style={{ position: "absolute" }}
                  width="150"
                  height="150"
                  viewBox="0 0 150 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle opacity="0.5" cx="75" cy="75" r="75" fill="#22AA00" />
                </svg>
                <svg
                  style={{
                    position: "absolute",
                    marginLeft: "3px",
                    marginTop: "24px",
                  }}
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="50" fill="#22AA00" />
                </svg>
                <svg
                  style={{
                    position: "absolute",
                    marginLeft: "5px",
                    marginTop: "50px",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <path
                    d="M42 1.5L14.1 32.175L6 26.025H1.5L14.1 46.5L46.5 1.5H42Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <div className="text-center">
                  {/* <img
                  src="../assets/images/success.gif"
                  style={{ height: "100px", width: "100px" }}
                /> */}

                  <div style={{ position: "relative", marginTop: "160px" }}>
                    <h2
                      style={{
                        color: "#2A0",
                        fontWeight: "700",
                      }}
                    >
                      Transaction{" "}
                    </h2>
                    <h2 style={{ color: "#2A0", fontWeight: "700" }}>
                      Completed
                    </h2>
                  </div>
                  <p className="text-secondary m-0 p-0">
                    You have successfully Purchased {data?.tickets}{" "}
                    {data?.type === "lottery" ? "Lottery Ticket" : "Scratches"}
                  </p>
                  <p className="text-secondary m-0 p-0">
                    of {data?.gameName}{" "}
                    {data?.type === "lottery" ? "Lottery" : "Scratch Card"}
                  </p>
                  <div className="d-flex justify-content-center">
                    <hr className="payment-line" />
                  </div>
                  <h5 className="fw-bolder mt-4">
                    Rs.{userDetail?.balance?.toLocaleString()}
                  </h5>
                  <p className="text-secondary">Available Wallet Amount</p>

                  <Link
                    to={
                      data?.type === "lottery" ? "/dashboard" : "/scratch-list"
                    }
                    className="btn btn-outline-info px-5 "
                  >
                    View{" "}
                    {data?.type === "lottery"
                      ? "Lottery List"
                      : "Scratch Card List"}
                  </Link>
                </div>{" "}
              </div>
            </div>
          ) : (
            <div
              className="card p-4 ticket-failed"
              style={{ boxSizing: "content-box" }}
            >
              <div className="d-flex justify-content-center"></div>
              <div>
                <div className="text-center">
                  <img
                    src="../assets/images/error.png"
                    style={{ height: "100px", width: "100px" }}
                  />

                  <div>
                    <h2
                      style={{
                        color: "#ee5253",
                        fontWeight: "700",
                      }}
                    >
                      Transaction{" "}
                    </h2>
                    <h2 style={{ color: "#ee5253", fontWeight: "700" }}>
                      Failed
                    </h2>
                  </div>
                  {/* <p className="text-secondary m-0 p-0">
                    You have Failed to Purchased {data?.tickets}{" "}
                    {data?.type === "lottery" ? "Lottery Ticket" : "Scratches"}
                  </p> */}
                  {/* <p className="text-secondary m-0 p-0">
                    of {data?.gameName}{" "}
                    {data?.type === "lottery" ? "Lottery" : "Scratch Card"}
                  </p> */}
                  <div className="d-flex justify-content-center">
                    <hr className="payment-line" />
                  </div>
                  <h5 className="fw-bolder mt-4">
                    Rs.{userDetail?.balance?.toLocaleString()}
                  </h5>
                  <p className="text-secondary">Available Wallet Amount</p>

                  <Link to={"/"} className="btn btn-outline-info px-5 ">
                    Back to home
                  </Link>
                </div>{" "}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer props={""} />
    </div>
  );
}
