import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HeaderPageContainer } from "./../../component/header/header.container";
import { SidebarPageContainer } from "./../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "./../../component/footer/footer.container";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowDownUp } from "react-icons/bs";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
// React bootstrap end
import Loader from "./../../component/Loader";
import { toast, ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";

const emptyData = {
  gameInformationId: "",
  game: "",
  gameData: "",
  status: 1,
};
export default function LotteryPhasePage(props) {
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

  const {
    deletelotteryphase,
    lotteryPhase,
    fetchlotteryphase,
    updatelotteryphase,
    isLoading,
  } = props;
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);

  useEffect(() => {
    fetchlotteryphase({
      offset: (page - 1) * limit,
      limit: limit,
    });
  }, []);

  const definePage = (p) => {
    setPage(p);
    fetchlotteryphase({
      offset: (p - 1) * limit,
      limit: limit,
    });
  };

  const defineLimit = (l) => {
    setLimit(l);
    fetchlotteryphase({
      offset: (page - 1) * l,
      limit: l,
    });
  };

  const defineSearch = (s) => {
    setSearch(s);
    if (s.trim().length > 0) {
      fetchlotteryphase({
        offset: (page - 1) * limit,
        limit: limit,
        search: s.trim(),
      });
    } else {
      fetchlotteryphase({
        offset: (page - 1) * limit,
        limit: limit,
      });
    }
  };
  const [currentPhase, setCurrentPhase] = useState([]);

  const changeStatus = (data, val) => {
    const updateData = { id: data.id, status: val };
    const gameName = data.gameInformation.gameName;
    if (val === 1) {
      const filteredGameData = lotteryPhase.filter(
        (game) => game.gameInformation.gameName === gameName
      );
      const filteredGamePhaseStatus = filteredGameData.filter(
        (game) => game.status === 0
      );
      const filteredPhase = filteredGameData.filter(
        (game) => game.status === 1
      );
      if (filteredGameData.length === filteredGamePhaseStatus.length) {
        updatelotteryphase(updateData);
        setTimeout(() => {
          fetchlotteryphase();
        }, 3000);
      } else {
        toast.error(
          `Game Phase ${filteredPhase[0].game} is already in progress`,
          {
            position: "top-center",
            autoClose: 900,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    } else {
      updatelotteryphase(updateData);
      setTimeout(() => {
        fetchlotteryphase();
      }, 3000);
    }
  };

  const { lotteries } = props;
  const { id } = useParams();

  const [selected, setSelected] = useState("");
  const [selectedPhase, setSelectedPhase] = useState("");
  const count = selectedPhase.length;

  useEffect(() => {
    if (id) {
      const sel = lotteries.filter((x) => x.id == id);
      if (sel.length > 0) {
        setSelected(sel[0]);
      }
    }
  }, [id, lotteries]);

  useEffect(() => {
    if (admin.role === "sub-admin") {
      const filterByRole = lotteryPhase?.filter((item) =>
        admin.role === "sub-admin"
          ? item.roleId === admin.id || item.roleId === 0
          : item
      );
      setSelectedPhase(filterByRole);
    } else {
      setSelectedPhase(lotteryPhase);
    }
  }, [lotteryPhase]); 

  return (
    <>
      <ToastContainer limit={1} />
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
                <h1>Lottery Phases</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Lottery Phases</li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title">
                          All Lottery Phases
                          <Link
                            to="/lottery-phase"
                            className="btn btn-outline-dark btn-sm float-end"
                          >
                            Add New
                          </Link>
                        </h5>
                        <div className="showentriesDiv">
                          <h6>
                            Show &nbsp;{" "}
                            <DropdownButton
                              variant="outline-dark"
                              id="dropdown-basic-button"
                              title={limit}
                            >
                              <Dropdown.Item
                                variant
                                onClick={(e) => {
                                  e.preventDefault();
                                  defineLimit(10);
                                }}
                              >
                                10
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  defineLimit(25);
                                }}
                              >
                                25
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  defineLimit(50);
                                }}
                              >
                                50
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  defineLimit(100);
                                }}
                              >
                                100
                              </Dropdown.Item>
                            </DropdownButton>{" "}
                            &nbsp;entries
                          </h6>
                          <p>
                            Search : &nbsp;
                            <Form>
                              <Form.Group>
                                <Form.Control
                                  onChange={(e) => defineSearch(e.target.value)}
                                  type="text"
                                />
                              </Form.Group>
                            </Form>
                          </p>
                        </div>
                        {/* <!-- Default Table --> */}
                        <div className="table-responsive">
                          <Table
                            id="basic-6"
                            className="display tbl-ltr lotteriesTable"
                          >
                            <thead className="lotteriesTableHead">
                              <tr className="tableTd">
                                <th>
                                  S.N. <BsArrowDownUp className="updownArrow" />
                                </th>
                                {/* <th>
                                  Image{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th> */}
                                <th>
                                  Lottery Name | Phase Number{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Ticket Qty {selected}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                {/* <th>
                                  Sold Tickets | Remaining Qty{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Start Date | Draw Date
                                  <BsArrowDownUp className="updownArrow" />
                                </th> */}
                                {/* <th>
                                  Draw Status | Draw Type
                                  <BsArrowDownUp className="updownArrow" />
                                </th> */}
                                <th>
                                  CreatedBy{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Status{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Action{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedPhase &&
                                Array.isArray(selectedPhase) &&
                                selectedPhase.map((row, i) => {
                                  return (
                                    <tr key={row.id} className="tableTd">
                                      <td>{i + 1}</td>
                                      <td>
                                        {row?.gameInformation?.gameName}|
                                        {row?.game}
                                      </td>
                                      <td>
                                        {row?.gameInformation?.maxNumberTickets}
                                      </td>
                                      <td>
                                        {" "}
                                        {row?.roleId
                                          ? row?.SubAdmin?.firstName +
                                            " " +
                                            row?.SubAdmin?.lastName
                                          : "Super Admin"}
                                      </td>
                                      <td>
                                        {row.status == 0 ? (
                                          <span class="badge rounded-pill bg-danger">
                                            Inactive
                                          </span>
                                        ) : (
                                          <span class="badge rounded-pill bg-success">
                                            Active
                                          </span>
                                        )}
                                      </td>
                                      <td>
                                        {row.status == 0 ? (
                                          <button
                                            onClick={() => changeStatus(row, 1)}
                                            class="btn btn-outline-success mx-1 rounded-pill btn-sm"
                                          >
                                            Active
                                          </button>
                                        ) : (
                                          <button
                                            onClick={() => changeStatus(row, 0)}
                                            class="btn btn-outline-danger mx-1 rounded-pill btn-sm"
                                          >
                                            Inactive
                                          </button>
                                        )}

                                        <button
                                          onClick={() =>
                                            navigate(`/lottery-phase/${row.id}`)
                                          }
                                          class="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() =>
                                            navigate(
                                              `/view-lottery-phase/${row.id}`
                                            )
                                          }
                                          class="btn btn-outline-dark mx-1 rounded-pill btn-sm"
                                        >
                                          View
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </div>
                        <div className="tableBottomEntries">
                          <h6>
                            Showing {(page - 1) * limit + 1} to{" "}
                            {count > page * limit ? page * limit : count} of{" "}
                            {count} entries
                          </h6>
                          <p>
                            <span
                              style={page > 1 ? { cursor: "pointer" } : {}}
                              onClick={() => {
                                if (page > 1) {
                                  definePage(page - 1);
                                }
                              }}
                            >
                              Previous
                            </span>
                            &nbsp;&nbsp;{" "}
                            <Button variant="outline-dark">{page}</Button>{" "}
                            &nbsp;&nbsp;
                            <span
                              style={
                                count > page * limit
                                  ? { cursor: "pointer" }
                                  : {}
                              }
                              onClick={() => {
                                if (count > page * limit) {
                                  definePage(page + 1);
                                }
                              }}
                            >
                              Next
                            </span>
                            &nbsp;&nbsp;
                          </p>
                        </div>
                        {/* <!-- End Default Table Example --> */}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </section>
            </main>
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
