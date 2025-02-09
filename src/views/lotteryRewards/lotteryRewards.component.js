import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import Loader from "../../component/Loader";
import ScrollToTop from "react-scroll-to-top";

export default function LotteryRewardsPage(props) {
  const {
    isLoading,
    createLotteryRewards,
    updateLotteryRewards,
    fetchLotteryRewards,
    lotteryRewards,
    updateLotteryRewardsStatus,
  } = props;
  const [openSidebar, setOpenSidebar] = useState(false);
  const [data, setData] = useState({
    purchase_limit: "",
    free_lottery_ticket: "",
    purchase_limit_level: "",
  });

  useEffect(() => {
    fetchLotteryRewards();
  }, []);

  useEffect(() => {
    if (lotteryRewards) {
      setData({ ...data, ...lotteryRewards });
    }
  }, [lotteryRewards]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.purchase_limit !== "" &&
      data.purchase_limit_level !== "" &&
      data.free_lottery_ticket !== ""
    ) {
      if (lotteryRewards) {
        updateLotteryRewards(data);
      } else {
        createLotteryRewards(data);
      }
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^[1-9][0-9]*$/.test(+value) || value === "") {
      setData({
        ...data,
        [e.target.name]: value === "" ? "" : +value,
      });
    }
  };
  return (
    <>
      <Loader loading={isLoading} />
      <Container fluid className="containerFluMainDiv">
        <Row className="containerFluMainDivRow">
          <Col lg={12}>
            <HeaderPageContainer setOpenSidebar={setOpenSidebar} />
          </Col>
        </Row>
      </Container>
      <Container
        fluid
        className={`containerFluMainDiv ${openSidebar && `mdbody`}`}
      >
        <Row className="containerFluMainDivRow">
          <Col lg={3} md={3} className="sibebarWidth">
            <SidebarPageContainer openSidebar={openSidebar} />
          </Col>
          <Col lg={9} md={9} sm={12} className="mainContantWidth">
            <main id="main" className="main">
              <div className="pagetitle">
                <h1>Manage Referral</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Manage Referral</li>
                    <li className="breadcrumb-item active">
                      Referal Lottery Commission
                    </li>
                  </ol>
                </nav>
              </div>

              <section className="section">
                <Row className="row">
                  <Col lg={4} className="col-lg-5">
                    <Card className="card" style={{ borderColor: "#5263ef" }}>
                      <Card.Header
                        className="text-white"
                        style={{
                          backgroundColor: "#5263ef",
                          fontWeight: "bold",
                        }}
                      >
                        <div className="row">
                          <div className="col-8">
                            Referal Lottery Commission
                          </div>
                          <div className="col-4 text-end">
                            {lotteryRewards?.status === 1 && (
                              <Button
                                size="sm"
                                className="btn-danger"
                                onClick={() => updateLotteryRewardsStatus()}
                              >
                                Disable
                              </Button>
                            )}
                            {lotteryRewards?.status === 0 && (
                              <Button
                                size="sm"
                                className="btn-success"
                                onClick={() => updateLotteryRewardsStatus()}
                              >
                                Enable
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card.Header>
                      <Card.Body className="card-body pt-2">
                        <form onSubmit={handleSubmit}>
                          <Row className="mt-3">
                            <Col lg={12}>
                              <Form.Label className="mb-0">
                                Minimum Purchase Limit
                              </Form.Label>
                              <Form.Control
                                type="number"
                                className="form-control"
                                placeholder="Enter Minimux Purchase Limit"
                                value={data.purchase_limit}
                                name="purchase_limit"
                                required
                                onChange={handleChange}
                              />
                            </Col>
                            <Col lg={12} className="mt-2">
                              <Form.Label className="mb-0">
                                Free Lottery Tickets
                              </Form.Label>
                              <Form.Control
                                type="number"
                                className="form-control"
                                placeholder="Enter Free Lottery Tickets"
                                value={data.free_lottery_ticket}
                                name="free_lottery_ticket"
                                required
                                onChange={handleChange}
                              />
                            </Col>
                            <Col lg={12} className="mt-2">
                              <Form.Label className="mb-0">
                                Purchase Limit Level
                              </Form.Label>
                              <Form.Control
                                type="number"
                                className="form-control"
                                placeholder="Enter Purchase Limit Level"
                                value={data.purchase_limit_level}
                                name="purchase_limit_level"
                                required
                                onChange={handleChange}
                              />
                            </Col>
                            <Col lg={12} md={12} sm={12} className="text-end">
                              <Button
                                size="sm"
                                type="submit"
                                className="btn-success mt-3"
                              >
                                Update
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>
            </main>
            {/* <!-- End #main --> */}
            <FooterPageContainer />
            <ScrollToTop
              smooth
              className="back-to-top"
              component={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="currentColor"
                  className="bi bi-arrow-up "
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
                  />
                </svg>
              }
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
