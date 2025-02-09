import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HeaderPageContainer } from "./../../component/header/header.container";
import { SidebarPageContainer } from "./../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "./../../component/footer/footer.container";
// page imports end
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// React bootstrap start
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowUpShort } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loader from "./../../component/Loader";
import TimezoneSelect from "react-timezone-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import CustomTimePicker from "../../component/DatePicker/CustomTimePicker";
import moment from "moment";
import "moment-timezone";
import "react-datepicker/dist/react-datepicker.css";
import ScrollToTop from "react-scroll-to-top";

const emptyData = {
  gameNumber: "00" + Math.floor(Math.random() * 100) + 1 + "LTL",
  gameName: "",
  gameSlogan: "",
  gameDuration: "",
  maxNumberTickets: "",
  buyTicketLimit: "",
  ticketPrice: "",
  gameCurrency: 3,
  minPrizePool: "",
  startTime: "",
  timeZone: "",
  instruction: "",
  status: 1,
  image: "",
  draw: "",
};

export default function AddLotteriesPage(props) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { createlottery, updatelottery, lotteries, isSaved, isLoading } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(emptyData);
  const [selectedImage, setSelectedImage] = useState("");
  const [on, setOn] = useState(false);
  const [ed, setEd] = useState("");
  const [min, setMin] = useState("");
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);

  function convertUTCToLocalTime(utcTime, timeZone) {
    const localDateTime = moment
      .utc(utcTime, "HH:mm")
      .tz(timeZone)
      .format("HH:mm");
    return localDateTime;
  }

  useEffect(() => {
    if (id) {
      const filterByRoleLotteries = lotteries?.filter((item) =>
        admin.role === "sub-admin"
          ? item.roleId === admin.id || item.roleId === 0
          : item
      );
      const sel = filterByRoleLotteries.filter((x) => x.id == id);
      if (sel.length > 0) {
        setSelected({
          ...sel[0],
          startTime: convertUTCToLocalTime(sel[0].startTime, sel[0].timeZone),
        });
        setEd(sel[0].instruction);
      }
      if (lotteries.length === 0) {
        navigate("/lotteries");
      }
    }
  }, [id]);

  useEffect(() => {
    const newMin = selected.maxNumberTickets * selected.ticketPrice;
    setMin(newMin);

    if (selected.minPrizePool > newMin && newMin !== 0) {
      document.getElementById("errorMsg").style.display = "block";
      document.getElementById(
        "errorMsg"
      ).innerText = `Value can't be more than ${newMin}`;
    } else {
      document.getElementById("errorMsg").style.display = "none";
    }
  }, [selected.maxNumberTickets, selected.ticketPrice, selected.minPrizePool]);

  useEffect(() => {
    if (isSaved && on) {
      setEd("");
      navigate("/lotteries");
    }
  }, [isSaved]);

  const onImageChange = (event) => {
    if (
      event &&
      event.target &&
      event.target.files &&
      event.target.files.length > 0
    )
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    setSelected({ ...selected, image: event.target.files[0] });
  };

  ClassicEditor.defaultConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "insertTable",
        "|",
        "undo",
        "redo",
      ],
    },
    image: {
      toolbar: [
        "imageStyle:full",
        "imageStyle:side",
        "|",
        "imageTextAlternative",
      ],
    },
    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    language: "en",
  };

  const handleTimePicker = (value) => {
    setSelected({
      ...selected,
      startTime: value,
    });
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
                <h1>Add Lottery</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      {/* <a href="index.html">Home</a>  */}
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active">Add Lottery</li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <Row className="row">
                  <Col lg={12} className="col-lg-12">
                    <Card className="card">
                      <Card.Body className="card-body pt-2">
                        {/* <!-- General Form Elements --> */}
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (
                              selected.gameDuration !== "" &&
                              selected.startTime !== ""
                            ) {
                              if (id) {
                                updatelottery({ ...selected, instruction: ed });
                              } else {
                                createlottery({
                                  ...selected,
                                  instruction: ed,
                                  ...(admin.role === "sub-admin"
                                    ? { roleId: admin.id }
                                    : {}),
                                });
                              }
                              setOn(true);
                            } else {
                              toast("Please Fill All the Fields", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                              });
                            }
                          }}
                        >
                          <Form.Control
                            value={0}
                            readonly="readonly"
                            onChange={(e) =>
                              setSelected({
                                ...selected,
                                sold: e.target.value,
                              })
                            }
                            type="text"
                            className="form-control formWidth"
                            style={{
                              display: "none",
                            }}
                          />
                          <Row className="row">
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Game Number
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                value={selected.gameNumber}
                                readonly="readonly"
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    gameNumber: e.target.value,
                                  })
                                }
                                type="text"
                                className="form-control formWidth"
                              />
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Game Name<span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={selected.gameName}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    gameName: e.target.value,
                                  })
                                }
                                className="form-control formWidth"
                              />
                            </Col>
                            <Col
                              lg={6}
                              md={6}
                              className="col-lg-6 col-md-6 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Game Slogan
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={selected.gameSlogan}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    gameSlogan: e.target.value,
                                  })
                                }
                                className="form-control "
                              />
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Game Start Date
                                <span className="text-danger">*</span>
                              </Form.Label>
                              {/* <ReactDatePicker /> */}
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                  components={["DatePicker", "DatePicker"]}
                                >
                                  <DatePicker
                                    required
                                    minDate={dayjs()}
                                    sx={{
                                      overflow: "hidden",
                                    }}
                                    slotProps={{
                                      textField: {
                                        size: "small",
                                        error: false,
                                      },
                                    }}
                                    defaultValue={"YYYY-MM-DD"}
                                    value={dayjs(
                                      selected.gameDuration === ""
                                        ? "YYYY-MM-DD"
                                        : selected.gameDuration
                                    )}
                                    onChange={(newValue) =>
                                      setSelected({
                                        ...selected,
                                        gameDuration:
                                          dayjs(newValue).format("YYYY-MM-DD"),
                                      })
                                    }
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Max No. Tickets
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={selected.maxNumberTickets}
                                onChange={(e) => {
                                  setSelected({
                                    ...selected,
                                    maxNumberTickets: e.target.value,
                                  });
                                }}
                                className="form-control formWidth"
                              />
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Per Person Ticket Limit
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={selected.buyTicketLimit}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    buyTicketLimit: e.target.value,
                                  })
                                }
                                className="form-control formWidth"
                              />
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Ticket Price
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                value={selected.ticketPrice}
                                onChange={(e) => {
                                  setSelected({
                                    ...selected,
                                    ticketPrice: e.target.value,
                                  });
                                }}
                                className="form-control formWidth"
                              />
                            </Col>
                            {/* <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Game Currency
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <select
                                value={selected.gameCurrency}
                                onChange={(e) =>
                                  setSelected({
                                    ...selected,
                                    gameCurrency: e.target.value,
                                  })
                                }
                                className="form-control"
                              >
                                <>
                                  <option value="">Select Currency</option>
                                </>
                                {currencies &&
                                  Array.isArray(currencies) &&
                                  currencies.map((x) => {
                                    return (
                                      <option key={x.id} value={x.id}>
                                        {x.code}
                                      </option>
                                    );
                                  })}
                              </select>
                            </Col> */}
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Minimum Prize Pool
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                type="number"
                                min="1"
                                max={min}
                                value={selected.minPrizePool}
                                onChange={(e) => {
                                  setSelected({
                                    ...selected,
                                    minPrizePool: e.target.value,
                                  });
                                }}
                                // onFocus={() => MinPrizePool}
                                className="form-control formWidth"
                              />
                              <span
                                id={"errorMsg"}
                                style={{
                                  display: "none",
                                  color: "red",
                                  fontSize: "14px",
                                }}
                              >
                                Value can't be more than {min}
                              </span>
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Start Time
                                <span
                                  className="text-danger"
                                  htmlFor="time-input"
                                >
                                  *
                                </span>
                              </Form.Label>
                              <CustomTimePicker
                                defaultValue={id ? selected.startTime : ""}
                                value={handleTimePicker}
                              />{" "}
                              <span className="input-group-addon">
                                <span className="glyphicon glyphicon-time"></span>
                              </span>
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Time Zone<span className="text-danger">*</span>
                              </Form.Label>

                              <TimezoneSelect
                                required
                                styles={{ zIndex: "9999" }}
                                value={selected.timeZone}
                                onChange={(e) => {
                                  setSelected({
                                    ...selected,
                                    timeZone: e.value,
                                  });
                                }}
                              />
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-3"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Draw Type<span className="text-danger">*</span>
                              </Form.Label>

                              <Form.Select
                                disabled={id}
                                required
                                value={selected.draw}
                                onChange={(e) => {
                                  if (id) return;
                                  setSelected({
                                    ...selected,
                                    draw: e.target.value,
                                  });
                                }}
                                className="form-control"
                              >
                                <option value="">
                                  <em>Select</em>
                                </option>
                                <option value="single-draw">Single Draw</option>
                                <option value="multi-draw">Multi Draw</option>
                              </Form.Select>
                            </Col>
                          </Row>

                          <Row className="row mb-3">
                            <Col lg={9} md={9} className="col-lg-9 col-md-9">
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Instruction
                              </Form.Label>

                              <CKEditor
                                editor={ClassicEditor}
                                data={ed}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  setEd(data);
                                }}
                              />

                              {/* <textarea
                              onChange={(e) =>
                                setSelected({
                                  ...selected,
                                  instruction: e.target.value,
                                })
                              }
                              value={selected.instruction}
                                className="form-control formWidth"
                                cols="4"
                                rows="4"
                                
                              ></textarea> */}
                            </Col>
                            <Col lg={3} md={3} className="col-lg-3 col-md-3">
                              <img
                                src={
                                  selectedImage && selectedImage != ""
                                    ? selectedImage
                                    : selected.image
                                    ? selected.image
                                    : "https://placehold.jp/150x150.png"
                                }
                                id="preview"
                                className="img-thumbnail"
                                style={{ marginTop: "36px" }}
                              />
                              <input
                                type="file"
                                name="img"
                                className="file f-img"
                                accept="image/*"
                              />
                              <div className="input-group mt-2">
                                <Form.Control
                                  required={
                                    selected.image !== "" ? false : true
                                  }
                                  type="file"
                                  className="form-control formWidthInput"
                                  placeholder="Upload File"
                                  id="file"
                                  accept="image/*"
                                  onChange={onImageChange}
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row className="row">
                            <Col lg={12} className="col-lg-12">
                              <Button
                                variant="success"
                                type="submit"
                                className="btn btn-sm px-4"
                              >
                                Save
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                        {/* <!-- End General Form Elements --> */}
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
      <ToastContainer />
    </>
  );
}
