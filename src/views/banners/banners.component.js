import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderPageContainer } from "../../component/header/header.container";
import { SidebarPageContainer } from "../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "../../component/footer/footer.container";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowDownUp } from "react-icons/bs";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Loader from "../../component/Loader";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";

export default function BannersPage(props) {
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
              .get(`https://kuberwins.com/api/transaction/count/${object.id}`)
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
              .get(`https://kuberwins.com/api/transaction/count/${object.id}`)
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
                <h1>Manage Frontend</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Manage Frontend</li>
                    <li className="breadcrumb-item active">Banners</li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={12}>
                    <Card className="card">
                      <Card.Body className="card-body">
                        <h5 className="card-title">Banners</h5>
                       
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
