import React from "react";
// import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function AboutPage({ props }) {
  return (
    <div style={{ backgroundColor: "#f5f6ff" }}>
      <title>About Us - Kuber Wins</title>

      <Navbar props={{ mainPage: "about", subPage: "" }} />

      <div>
        <section className="container py-lg-5">
          <div className="row sm-screen">
            <div className="col-lg-6 py-lg-5">
              <h3 className="mb-0 sec-heading fs-3">
                About{" "}
                <em className="text-uppercase" style={{ color: "#F73BB1" }}>
                  Kuber Wins
                </em>
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
                accusamus id. Laudantium voluptatem deserunt, officia nobis
                incidunt eos eius obcaecati voluptatibus sequi ipsa repellat.
                Illo quo impedit itaque repellendus exercitationem vero et
                pariatur perferendis, modi ab officia aperiam iure culpa.
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                et eaque, consequatur est iure quo reprehenderit accusamus
                voluptate mollitia cum unde sequi! Assumenda nisi explicabo,
                sunt maiores iusto officia necessitatibus nihil vel rem
                doloribus itaque sed?
              </p>
            </div>
            <div className="col-lg-1" />
            <div className="col-lg-5 mt-2">
              <img
                src="./assets/images/lottery-about.jpg"
                alt="lottery-about"
                width="100%"
                height="100%"
                className="rounded-2 "
                style={{ border: "2px solid #FFEF9D" }}
              />
            </div>
          </div>
        </section>
        <section className="container service-section py-lg-5">
          <div className="text-center">
            <h2 className="mb-4 sec-heading">Trusting Our Services</h2>
          </div>
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-lg-4 mb-3">
              <div
                className="withdrawal-card"
                style={{ backgroundColor: "#fff" }}
              >
                <div className="card-header">
                  <img
                    src="assets/images/card-header.png"
                    alt="card-header"
                    className="card-header-img"
                  />
                  <div className="header-content">
                    <div className="display-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="65"
                        height="65"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M15.56 4.174A6.008 6.008 0 0 0 12 6.682a6.008 6.008 0 0 0-3.56-2.508a4 4 0 0 1 7.12 0ZM4.057 14.042a8.004 8.004 0 0 1 6.985-6.985a5 5 0 1 0-6.986 6.986Zm15.886 0a5 5 0 1 0-6.986-6.986a8.004 8.004 0 0 1 6.986 6.986ZM12 22a7 7 0 1 0 0-14a7 7 0 0 0 0 14Zm-2.5-8.75a.75.75 0 0 1 .75-.75h4.25a.75.75 0 0 1 .495 1.313v.001l-.013.011l-.053.05a9.548 9.548 0 0 0-.925 1.048c-.557.731-1.188 1.77-1.53 3.024a.75.75 0 1 1-1.448-.394c.408-1.496 1.152-2.707 1.783-3.538L12.82 14h-2.57a.75.75 0 0 1-.75-.75Z"
                        />
                      </svg>
                    </div>

                    <h5 className="ps-3 mb-0">Best Lottery Platform</h5>
                  </div>
                </div>
                <div className="card-body text-center p-4">
                  <p className="mb-0">
                    One of the top lottery service providers in the country
                    where fans can play and win games online. We do not charge
                    any commission from the winners.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div
                className="withdrawal-card"
                style={{ backgroundColor: "#fff" }}
              >
                <div className="card-header">
                  <img
                    src="assets/images/card-header.png"
                    alt="card-header"
                    className="card-header-img"
                  />
                  <div className="header-content">
                    <div className="display-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="65"
                        height="65"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M19.668 4.108a.5.5 0 0 0-.705.08L14.36 10h-2.551l5.587-7.054a2.5 2.5 0 0 1 3.522-.4l5.147 4.123a2.5 2.5 0 0 1 .522 3.33h-2.614l.907-1.052a.5.5 0 0 0-.066-.717L22.31 6.224L19.342 10h-2.544l3.95-5.026l-1.08-.866ZM6 7a3 3 0 0 0-3 3v14.5A4.5 4.5 0 0 0 7.5 29h17a4.5 4.5 0 0 0 4.5-4.5v-9a4.5 4.5 0 0 0-4.5-4.5H6a1 1 0 1 1 0-2h4.58l1.596-2H6Zm15 12h3a1 1 0 1 1 0 2h-3a1 1 0 1 1 0-2Z"
                        />
                      </svg>
                    </div>
                    <iconify-icon icon="fluent:wallet-credit-card-32-filled" />
                    <h5 className="ps-3 mb-0">Quick Deposit</h5>
                  </div>
                </div>
                <div className="card-body text-center p-4">
                  <p className="mb-0">
                    We have a seamless process of depositing amount that you can
                    do with any method. We accept payments via Visa, Maestry,
                    American Express, and other popular payment methods.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-3">
              <div
                className="withdrawal-card"
                style={{ backgroundColor: "#fff" }}
              >
                <div className="card-header">
                  <img
                    src="./assets/images/card-header.png"
                    alt="card-header"
                    className="card-header-img"
                  />
                  <div className="header-content">
                    <img
                      draggable="false"
                      style={{ userSelect: "none" }}
                      src="./assets/images/withdraw.png"
                      alt="withdraw"
                      className="border-0 "
                    />
                    <h5 className="ps-3 mb-0">Quick Withdraw</h5>
                  </div>
                </div>
                <div className="card-body text-center p-4">
                  <p className="mb-0">
                    We know you can’t wait to withdraw the prize amount after
                    winning and we won’t keep you waiting. Our withdrawal
                    process is quick and safe so that you leave happily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Recent Winners */}
        {/* <section className="sec-four">
          <div className="container pb-5">
            <h2 className="mt-5 mb-0 sec-heading">Recent Winners</h2>
            <div className="row">
              <div
                className="col-lg-4 second-w mt-lg-5"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-easing="ease"
                data-aos-delay={100}
              >
                <div
                  className="card"
                  style={{
                    backgroundImage: 'url("assets/images/second-bg.png")',
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 win-div justify-content-center align-items-center d-flex">
                        <img
                          className="fa-solid_crown"
                          src="assets/images/fa-solid_crown.png"
                        />
                        <img
                          className="p-b-14"
                          src="assets/images/p-b-14.png"
                        />
                        <img
                          className="pro-m-pic"
                          src="assets/images/Ellipse-13.png"
                        />
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-lg-12 text-center">
                        <h4>Aditya Vaishnav</h4>
                        <h5>10 August 2022</h5>
                        <h1>10000USD</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 first-w mt-5 pt-5"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-easing="ease"
                data-aos-delay={200}
              >
                <div
                  className="card"
                  style={{
                    backgroundImage: 'url("assets/images/first-bg.png")',
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 win-div justify-content-center align-items-center d-flex">
                        <img
                          className="fa-solid_crown"
                          src="assets/images/fa-solid_crown.png"
                        />
                        <img
                          className="p-b-14"
                          src="assets/images/p-b-14.png"
                        />
                        <img
                          className="pro-m-pic"
                          src="assets/images/Ellipse-14.png"
                        />
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-lg-12 text-center">
                        <h4>Nitesh Malviya</h4>
                        <h5>10 August 2022</h5>
                        <h1>1000000000USD</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-4 third-w mt-5"
                data-aos="fade-up"
                data-aos-easing="ease"
                data-aos-delay={300}
              >
                <div
                  className="card"
                  style={{
                    backgroundImage: 'url("assets/images/third-bg.png")',
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 win-div justify-content-center align-items-center d-flex">
                        <img
                          className="fa-solid_crown"
                          src="assets/images/fa-solid_crown.png"
                        />
                        <img
                          className="p-b-14"
                          src="assets/images/p-b-14.png"
                        />
                        <img
                          className="pro-m-pic"
                          src="assets/images/Ellipse-15.png"
                        />
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col-lg-12 text-center">
                        <h4>Ayushi Singh</h4>
                        <h5>10 August 2022</h5>
                        <h1>1000USD</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Recent Statistics * /}
        <section className="sec-three mt-5">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-6 col-md-6 mb-4">
                <div className="card">
                  <div
                    className="card-header"
                    style={{
                      backgroundImage: 'url("assets/images/toppng-4.png")',
                    }}
                  >
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-lg-3 col-sm col-3">
                        <img
                          src="assets/images/Ellipse-22.png"
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-lg-9 col-sm col-9">
                        <h3>Weekly Lottery</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <h6>
                          <img
                            src="assets/images/Vector-6.png"
                            className="img-fluid"
                          />
                          Winners :<span>5052</span>
                        </h6>
                      </div>
                    </div>
                    <div className="row row-total">
                      <div className="col-lg-6 col-sm col-6">
                        <h6>
                          <img
                            src="assets/images/Bet-Icon-1.png"
                            className="img-fluid"
                          />
                          Total Bet :<span>0</span>
                        </h6>
                      </div>
                      <div className="col-lg-6 col-sm col-6">
                        <h6>
                          <img
                            src="assets/images/Vector-7.png"
                            className="img-fluid"
                          />
                          Date :<span>21-06-22</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 mb-4">
                <div className="card">
                  <div
                    className="card-header"
                    style={{
                      backgroundImage: 'url("assets/images/toppng-4.png")',
                    }}
                  >
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-lg-3 col-sm col-3">
                        <img
                          src="assets/images/Ellipse-22.png"
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-lg-9 col-sm col-9">
                        <h3>Gold</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        <h6>
                          <img
                            src="assets/images/Vector-6.png"
                            className="img-fluid"
                          />
                          Winners :<span>21</span>
                        </h6>
                      </div>
                    </div>
                    <div className="row row-total">
                      <div className="col-lg-6 col-sm col-6">
                        <h6>
                          <img
                            src="assets/images/Bet-Icon-1.png"
                            className="img-fluid"
                          />
                          Total Bet :<span>10</span>
                        </h6>
                      </div>
                      <div className="col-lg-6 col-sm col-6">
                        <h6>
                          <img
                            src="assets/images/Vector-7.png"
                            className="img-fluid"
                          />
                          Date :<span>30-06-22</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 mb-4">
                <div className="card">
                  <div
                    className="card-header"
                    style={{
                      backgroundImage: 'url("assets/images/toppng-4.png")',
                    }}
                  >
                    <div className="row d-flex justify-content-center align-items-center">
                      <div className="col-lg-3 col-sm col-3">
                        <img
                          src="assets/images/Ellipse-22.png"
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-lg-9 col-sm col-9">
                        <h3>Jackpot</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 col-sm col-12">
                        <h6>
                          <img
                            src="assets/images/Vector-6.png"
                            className="img-fluid"
                          />
                          Winners :<span>2</span>
                        </h6>
                      </div>
                    </div>
                    <div className="row row-total">
                      <div className="col-lg-6 col-sm col-6">
                        <h6>
                          <img
                            src="assets/images/Bet-Icon-1.png"
                            className="img-fluid"
                          />
                          Total Bet :<span>150</span>
                        </h6>
                      </div>
                      <div className="col-lg-6 col-sm col-6">
                        <h6>
                          <img
                            src="assets/images/Vector-7.png"
                            className="img-fluid"
                          />
                          Date :<span>02-06-22</span>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What User Say About Us */}
        <section className="sec-five">
          <div className="container pt-5 pb-5">
            <h2 className="sec-heading text-center">What Sets Us Apart</h2>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-7">
                <p className="text-center p-sub">
                  Traditional lotteries payout 25% of the prize pool with the
                  bulk going to governments in the form of taxes. They punish
                  players for taking immediate payouts. Our model rewards
                  players with thousands of draws and 100% prize payouts.
                </p>
              </div>
            </div>
            <div className="row pt-3">
              <div className="col-lg-12">
                <OwlCarousel
                  className="owl-theme"
                  loop
                  margin={10}
                  items={3}
                  autoplay={true}
                  nav={false}
                  dots={false}
                >
                  <div className="item">
                    <div className="card">
                      <div className="card-body shadow">
                        <div className="row">
                          <div className="col-lg-12 text-center">
                            <p>
                              At Kuber Wins, a portion of ticket sales go
                              immediately to the prize pool to be paid out.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card">
                      <div className="card-body shadow">
                        <div className="row">
                          <div className="col-lg-12 text-center">
                            <p>
                              The remainder is placed in top performing hedge
                              funds that contain traditional and digital assets
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <div className="card">
                      <div className="card-body shadow">
                        <div className="row">
                          <div className="col-lg-12 text-center">
                            <p>
                              Every quarter the returns from the funds are used
                              as prizes for the next quarter.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </OwlCarousel>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer props={""} />
    </div>
  );
}
