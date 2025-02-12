import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import Loader from "./../../component/Loader";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";

export default function ScratchListPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);
  const navigate = useNavigate();
  const {
    fetchScratchCard,
    updateScratchCard,
    scratchcard,
    isLoading,
    subAdminById,
    fetchSubAdminById,
  } = props;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredScratchCard, setFilteredScratchCard] = useState([]);
  const [statusChange, setStatusChange] = useState([]);

  useEffect(() => {
    fetchScratchCard();
    admin.role === "sub-admin" && fetchSubAdminById(admin.id);
  }, [statusChange]);

  const definePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;

  const filterByRole = scratchcard?.filter((item) =>
    admin.role === "sub-admin"
      ? item.roleId === admin.id || item.roleId === 0
      : item
  );

  const currentScratchCard = filterByRole.slice(startIndex, endIndex);
  const card_count = currentScratchCard.length;

  useEffect(() => {
    const fetchingCard = async () => {
      const updatedArray = await Promise.all(
        currentScratchCard.map(async (object) => {
          try {
            const response = await axios
              .get(
                `http://159.223.51.198:5500/api/transaction/count/${object.id}`
              )
              .then((res) => {
                return res.data;
              })
              .catch((err) => {
                return err.response.data;
              });
            const cardWonCount = response?.count?.Card_WonCount;
            return { ...object, totalPayout: cardWonCount };
          } catch (error) {
            return object;
          }
        })
      );
      if (searchTerm === "") {
        setFilteredScratchCard(updatedArray);
      } else {
        const filtered = updatedArray.filter((card) =>
          card.card_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredScratchCard(filtered);
      }
    };
    fetchingCard();
  }, [searchTerm, scratchcard, currentPage, limit, statusChange]);

  useEffect(() => {
    const fetchingCard = async () => {
      const updatedArray = await Promise.all(
        filteredScratchCard.map(async (object) => {
          try {
            const response = await axios
              .get(
                `http://159.223.51.198:5500/api/transaction/count/${object.id}`
              )
              .then((res) => {
                return res.data;
              })
              .catch((err) => {
                return err.response.data;
              });
            const cardWonCount = response?.count?.Card_WonCount;
            return { ...object, totalPayout: cardWonCount };
          } catch (error) {
            return object;
          }
        })
      );
    };
    fetchingCard();
  }, [filteredScratchCard]);

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
                <h1>Scratch Cards</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Scratch Cards</li>
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
                          All Scratch Cards
                          <Link
                            onClick={() => localStorage.removeItem("fromData")}
                            to="/add-scratch"
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
                              title="10"
                            >
                              <Dropdown.Item
                                variant
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLimit(10);
                                  setCurrentPage(1);
                                }}
                              >
                                10
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLimit(25);
                                  setCurrentPage(1);
                                }}
                              >
                                25
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLimit(50);
                                  setCurrentPage(1);
                                }}
                              >
                                50
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setLimit(100);
                                  setCurrentPage(1);
                                }}
                              >
                                100
                              </Dropdown.Item>
                            </DropdownButton>{" "}
                            &nbsp;entries
                          </h6>
                          <div className="d-flex align-items-center">
                            <span>Search : &nbsp;</span>
                            <Form>
                              <Form.Group>
                                <Form.Control
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  type="text"
                                  placeholder="ScratchCard Name"
                                />
                              </Form.Group>
                            </Form>
                          </div>
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
                                  S.N.
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Scratch Card{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Price{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Frequency{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Total Payout{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>{" "}
                                {/* <th className="text-center">
                                  Total Sold{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th> */}
                                {/* <th className="text-center">
                                  Card Type{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th> */}
                                <th>
                                  Created By{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th>
                                  Status{" "}
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                                <th className="text-center">
                                  Action
                                  <BsArrowDownUp className="updownArrow" />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredScratchCard &&
                                Array.isArray(filteredScratchCard) &&
                                filteredScratchCard?.map((row, index) => {
                                  return (
                                    <tr key={row?.id}>
                                      <td>
                                        {(currentPage - 1) * limit + 1 + index}
                                      </td>
                                      <td>
                                        <img
                                          src={row?.image}
                                          alt={row?.card_name}
                                        />
                                        &nbsp;
                                        {row?.card_name}
                                      </td>
                                      <td>
                                        Rs.{row?.ticketPrize?.toLocaleString()}
                                      </td>
                                      <td>
                                        {row?.card_type === "single-scratch"
                                          ? "One Time Scratcher"
                                          : (() => {
                                              try {
                                                const parsedData = JSON.parse(
                                                  row.frequency
                                                );
                                                return (
                                                  parsedData?.[0].schedule
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                  parsedData?.[0].schedule.slice(
                                                    1
                                                  )
                                                );
                                              } catch (error) {}
                                            })()}{" "}
                                      </td>{" "}
                                      <td>
                                        Rs.
                                        {row?.totalPayout?.toLocaleString() ??
                                          0}
                                      </td>
                                      {/* <td className="text-center">
                                        {row?.scratchDrawCount ?? 0}
                                      </td> */}
                                      {/* {row.card_type.replace("-", " ")} */}
                                      {/* <td className="text-capitalize">
                                        {row?.card_type?.replace("-", " ")}
                                      </td> */}
                                      <td>
                                        {row?.roleId
                                          ? row?.SubAdmin?.firstName +
                                            " " +
                                            row?.SubAdmin?.lastName
                                          : "Super Admin"}
                                      </td>
                                      <td className="text-center">
                                        {row?.status == 1 ? (
                                          <span className="badge rounded-pill bg-success">
                                            Active
                                          </span>
                                        ) : (
                                          <span className="badge rounded-pill bg-danger">
                                            Inactive
                                          </span>
                                        )}
                                      </td>
                                      <td className="text-center">
                                        {row?.status == 0 ? (
                                          <button
                                            disabled={
                                              admin.role === "sub-admin"
                                                ? !subAdminById
                                                    .manage_scratchCard
                                                    .add_scratchCard
                                                : admin.role !== "admin"
                                            }
                                            onClick={async () => {
                                              const res = updateScratchCard({
                                                status: 1,
                                                id: row.id,
                                              });
                                              res?.then((resolvedValue) => {
                                                setStatusChange(resolvedValue);
                                              });
                                            }}
                                            className="btn btn-outline-success mx-1 rounded-pill btn-sm"
                                          >
                                            Active
                                          </button>
                                        ) : (
                                          <button
                                            disabled={
                                              admin.role === "sub-admin"
                                                ? !subAdminById
                                                    .manage_scratchCard
                                                    .add_scratchCard
                                                : admin.role !== "admin"
                                            }
                                            onClick={async () => {
                                              const res = updateScratchCard({
                                                status: 0,
                                                id: row.id,
                                              });
                                              res.then((resolvedValue) => {
                                                setStatusChange(resolvedValue);
                                              });
                                            }}
                                            className="btn btn-outline-danger mx-1 rounded-pill btn-sm"
                                          >
                                            Inactive
                                          </button>
                                        )}
                                        <button
                                          disabled={
                                            admin.role === "sub-admin"
                                              ? !subAdminById.manage_scratchCard
                                                  .add_scratchCard
                                              : admin.role !== "admin"
                                          }
                                          className="btn btn-outline-primary mx-1 rounded-pill btn-sm"
                                          onClick={() =>
                                            navigate(`/add-scratch/${row.id}`)
                                          }
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() =>
                                            navigate(`/view-scratch/${row.id}`)
                                          }
                                          className="btn btn-outline-dark mx-1 rounded-pill btn-sm"
                                        >
                                          View
                                        </button>
                                        {/* <button
                                          onClick={() => handeDelete(row.id)}
                                          className="btn btn-outline-danger mx-1 rounded-pill btn-sm"
                                        >
                                          Delete
                                        </button> */}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        </div>
                        <div className="tableBottomEntries">
                          <h6>
                            Showing {(currentPage - 1) * limit + 1} to{" "}
                            {card_count > currentPage * limit
                              ? currentPage * limit
                              : card_count}{" "}
                            of {card_count} entries
                          </h6>
                          <div>
                            <span
                              style={
                                currentPage > 1 ? { cursor: "pointer" } : {}
                              }
                              onClick={() => {
                                if (currentPage > 1) {
                                  definePage(currentPage - 1);
                                }
                              }}
                            >
                              Previous
                            </span>
                            &nbsp;&nbsp;
                            <Button variant="outline-dark">{page}</Button>
                            &nbsp;&nbsp;
                            <span
                              style={
                                card_count > currentPage * limit
                                  ? { cursor: "pointer" }
                                  : {}
                              }
                              onClick={() => {
                                if (card_count > currentPage * limit) {
                                  definePage(currentPage + 1);
                                }
                              }}
                            >
                              Next
                            </span>
                            &nbsp;&nbsp;
                          </div>
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
