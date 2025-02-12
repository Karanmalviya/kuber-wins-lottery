import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HeaderPageContainer } from "./../../component/header/header.container";
import { SidebarPageContainer } from "./../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "./../../component/footer/footer.container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TimezoneSelect from "react-timezone-select";
import Loader from "./../../component/Loader";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import CustomTimePicker from "../../component/DatePicker/CustomTimePicker";
import "../../style/DatePicker.css";
import moment from "moment";
import "moment-timezone";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Papa from "papaparse";
import { ChromePicker } from "react-color";
import reactCSS from "reactcss";
import ColorPicker, { useColorPicker } from "react-best-gradient-color-picker";
import ScrollToTop from "react-scroll-to-top";

const optionsWeek = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];
const optionsMonth = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
  { label: "13", value: "13" },
  { label: "14", value: "14" },
  { label: "15", value: "15" },
  { label: "16", value: "16" },
  { label: "17", value: "17" },
  { label: "18", value: "18" },
  { label: "19", value: "19" },
  { label: "20", value: "20" },
  { label: "21", value: "21" },
  { label: "22", value: "22" },
  { label: "23", value: "23" },
  { label: "24", value: "24" },
  { label: "25", value: "25" },
  { label: "26", value: "26" },
  { label: "27", value: "27" },
  { label: "28", value: "28" },
  { label: "29", value: "29" },
  { label: "30", value: "30" },
  { label: "31", value: "31" },
];
const emptyData = {
  card_name: "",
  topPrize: "",
  endDate: "",
  startTime: "",
  topPrize: "",
  odds_of_win: "",
  odds_of_loss: "",
  frequency: "",
  unmatchedMessage: "",
  status: 1,
  game_Features: "",
  game_slogan: "",
  discountTicket: "",
  matchMessage: "",
  buyTicketLimit: "",
  timeZone: "",
  fontColor: "#ffffff",
  circle_bg: "",
};

export default function AddScratchPage(props) {
  const {
    createScratchCard,
    updateScratchCard,
    createScratchCardTable,
    updateScratchCardTable,
    fetchScratchCard,
    scratchcard,
    isSaved,
    isLoading,
  } = props;
  const [openSidebar, setOpenSidebar] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(emptyData);
  const [on, setOn] = useState(false);
  const [error, setError] = useState(false);
  const [frequencySchedule, setFrequencySchedule] = useState("");
  const [frequencies, setFrequencies] = useState("");
  const [updateItems, setUpdateItems] = useState([]);
  const [totalsum, setTotalsum] = useState("");
  const [csvFile, setCsvFile] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);
  const [fileError, setFileError] = useState("");
  const [counter, setCounter] = useState([
    {
      odds_of_price: "",
      price: "",
    },
  ]);
  const [counterError, setCounterError] = useState([{ index: "", value: "" }]);
  const [discount, setDiscount] = useState([
    {
      discountPercent: "",
      discountTicket: "",
    },
  ]);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [displayGradientPicker, setDisplayGradientPicker] = useState(false);
  const [color, setColor] = useState("");
  const { setGradient } = useColorPicker(color, setColor);
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);

  useEffect(() => {
    if (color) {
      setSelected((prevSelected) => ({
        ...prevSelected,
        circle_bg: color,
      }));
    }
  }, [color]);

  const styles = reactCSS({
    default: {
      color: {
        width: "30px",
        height: "18px",
        borderRadius: "2px",
        background: `${selected.fontColor}`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  const stylesBg = reactCSS({
    default: {
      color: {
        width: "40px",
        height: "26px",
        borderRadius: "2px",
        background: `${selected.circle_bg}`,
      },
      swatch: {
        padding: "5px",
        background: "#fff",
        borderRadius: "1px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
        display: "inline-block",
        cursor: "pointer",
      },
      popover: {
        position: "absolute",
        zIndex: "2",
      },
      cover: {
        position: "fixed",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
      },
    },
  });

  useEffect(() => {
    fetchScratchCard();
  }, []);

  function convertUTCToLocalTime(utcTime, timeZone) {
    const localDateTime = moment
      .utc(utcTime, "HH:mm")
      .tz(timeZone)
      .format("HH:mm");
    return localDateTime;
  }

  useEffect(() => {
    if (selected.odds_of_win) {
      setSelected({
        ...selected,
        odds_of_loss: (100 - +selected.odds_of_win).toString(),
      });
    }
  }, [selected.odds_of_win]);

  useEffect(() => {
    setGradient();
    if (id) {
      const filterByRoleScratchcard = scratchcard?.filter((item) =>
        admin.role === "sub-admin"
          ? item.roleId === admin.id || item.roleId === 0
          : item
      );

      const sel = filterByRoleScratchcard.filter((x) => x.id == id);
      if (sel.length > 0) {
        setSelected({
          ...sel[0],
          startTime: convertUTCToLocalTime(sel[0].startTime, sel[0].timeZone),
        });
        setCounter(sel[0].options == null ? [""] : JSON.parse(sel[0].options));
      }
      if (scratchcard.length === 0) {
        navigate("/scratch-list");
      }
    }
  }, [id, isLoading]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedInputs = [...counter];
    if (name === "price") {
      const existingItem = updatedInputs.find((item) => item.price === value);
      if (existingItem) {
        setCounterError([...counterError, { index, value }]);
      }
    }
    if (counterError) {
      const val = counterError.map((item) => {
        updatedInputs.map(
          (item1) =>
            +item1.price === +item.value &&
            counterError.splice(
              counterError.findIndex((a) => +a.value === +item1.price),
              1
            )
        );
      });
    }
    updatedInputs[index] = { ...updatedInputs[index], [name]: value };
    setCounter(updatedInputs);
  };

  const addInputNew = () => {
    setCounter([
      ...counter,
      {
        odds_of_price: "",
        price: "",
      },
    ]);
  };

  const removeInput = (index) => {
    const updatedInputs = [...counter];
    updatedInputs.splice(index, 1);
    setCounter(updatedInputs);
  };

  const handleInputDiscountChange = (index, event) => {
    const { name, value } = event.target;
    const updatedInputs = [...discount];
    updatedInputs[index] = { ...updatedInputs[index], [name]: value };
    setDiscount(updatedInputs);
  };

  const addInputDiscount = () => {
    setDiscount([
      ...discount,
      {
        discountPercent: "",
        discountTicket: "",
      },
    ]);
  };
  const removeInputDiscount = (index) => {
    const updatedInputs = [...discount];
    updatedInputs.splice(index, 1);
    setDiscount(updatedInputs);
  };

  useEffect(() => {
    if (discount.length > 0) {
      setSelected((prevSelected) => ({
        ...prevSelected,
        discountTicket: JSON.stringify(discount),
      }));
    }
  }, [discount]);

  useEffect(() => {
    if (id && selected.discountTicket) {
      try {
        const array = JSON.parse(selected.discountTicket);
        setDiscount(array);
      } catch (error) {
        setDiscount([]);
      }
    }
  }, [id, selected.discountTicket]);

  const onImageChange = (event) => {
    const { name, value } = event.target;
    if (
      event &&
      event.target &&
      event.target.files &&
      event.target.files.length > 0
    )
      setSelected({ ...selected, [name]: event.target.files[0] });
  };
  const handleChangeFrequency = (e) => {
    const frequency = [
      {
        frequency: frequencies,
        schedule: e,
      },
    ];
    setSelected({
      ...selected,
      frequency: JSON.stringify(frequency),
    });
  };

  useEffect(() => {
    if (isSaved && on) {
      navigate("/scratch-list");
    }
  }, [isSaved]);

  useEffect(() => {
    if (id && selected.frequency) {
      try {
        const parsedData = JSON.parse(selected.frequency);
        setFrequencies(parsedData?.[0].frequency);
        setFrequencySchedule(parsedData?.[0].schedule);
      } catch (error) {}
    }
  }, [id, selected.frequency]);

  const handleSubmit = async (scratchCardId = null) => {
    if (id) {
      const updateCounter = counter.map((item) => {
        return { ...item, scratchCardId: id };
      });
      updateScratchCardTable(updateCounter);
    } else {
      const updateCounter = counter.map((item) => {
        return { ...item, scratchCardId };
      });

      createScratchCardTable(updateCounter);
    }
  };

  useEffect(() => {
    setUpdateItems(updateItems);
  }, [updateItems]);

  useEffect(() => {
    if (id && selected.ScratchTables) {
      const nextList = selected?.ScratchTables;
      setCounter(nextList);
    }
  }, [id, selected.ScratchTables]);

  useEffect(() => {
    let sum = 0;
    counter.forEach((item) => {
      const value = +item["odds_of_price"];
      sum += parseFloat(value);
    });
    setTotalsum(sum);
  }, [counter]);

  const handleTimePicker = (value) => {
    setSelected({
      ...selected,
      startTime: value,
    });
  };

  const rowsDate = Array.from(
    { length: Math.ceil(optionsMonth.length / 5) },
    (_, index) => optionsMonth.slice(index * 5, index * 5 + 5)
  );
  // useEffect(() => {
  //   if (!Object.values(selected).some((value) => value === ""))
  //     localStorage.setItem(
  //       "fromData",
  //       JSON.stringify({
  //         ...selected,
  //         ScratchTables: counter,
  //       })
  //     );
  // }, [selected, counter]);

  // useEffect(() => {
  //   const localStorageFormdata = JSON.parse(localStorage.getItem("fromData"));
  //   if (localStorageFormdata) {
  //     setSelected(localStorageFormdata);
  //     setDiscount(
  //       selected.discountTicket !== "" &&
  //         JSON.parse(localStorageFormdata.discountTicket)
  //     );
  //     const parsedFrequency = JSON.parse(localStorageFormdata.frequency);
  //     setFrequencies(parsedFrequency?.[0].frequency);
  //     setFrequencySchedule(parsedFrequency?.[0].schedule);
  //     setCounter(localStorageFormdata.ScratchTables);
  //   }
  // }, []);

  useEffect(() => {
    if (csvFile.length) {
      fetchAndFormatCSVData(csvFile[0]);
    }
  }, [csvFile]);

  useEffect(() => {
    if (counter.length > 0) {
      const customHeader = ["Prize", "Odds of prize"];
      const csvData = [
        customHeader,
        ...counter.map((item) => [item.price, item.odds_of_price]),
      ];
      const csv = Papa.unparse(csvData);
      if (csv) {
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        setDownloadLink(url);
      }
    }
  }, [counter]);

  const fetchAndFormatCSVData = (file) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const formattedData = results.data
            .filter((row) => {
              const oddsOfPrice = row["Odds of prize"];
              const price = row["Prize"];
              return (
                oddsOfPrice !== null &&
                !isNaN(oddsOfPrice) &&
                price !== null &&
                !isNaN(price)
              );
            })
            .map((row) => ({
              odds_of_price: row["Odds of prize"].toString(),
              price: row["Prize"].toString(),
            }));

          setCounter(formattedData);
          setFileError("");
        } catch (error) {
          setFileError("Something is wrong with your CSV file");
        }
      },
      error: (error) => {},
    });
  };

  const repeatedPrices = Object.entries(
    counter.reduce((acc, item) => {
      acc[item.price] = (acc[item.price] || 0) + 1;
      return acc;
    }, {})
  )
    .filter(([price, count]) => count > 1)
    .map(([price]) => Number(price));

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
                <h1>{id ? "Edit" : "Add"} Scratch Cards</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      {/* <a href="index.html">Home</a> */}
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      {id ? "Edit" : "Add"} Scratch Cards
                    </li>
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
                          onSubmit={async (e) => {
                            e.preventDefault();
                            if (
                              selected.startTime !== "" &&
                              selected.frequency !== "" &&
                              selected.image !== "" &&
                              selected.game_Features !== ""
                            ) {
                              setError(false);
                              if (totalsum === 100) {
                                if (counter.length >= 9) {
                                  if (!repeatedPrices.length) {
                                    if (id) {
                                      const res = updateScratchCard(selected);
                                      handleSubmit();
                                    } else {
                                      setError(false);
                                      const res = await createScratchCard({
                                        ...selected,
                                        ...(admin.role === "sub-admin"
                                          ? { roleId: admin.id }
                                          : {}),
                                      });
                                      if (res?.data?.id) {
                                        handleSubmit(res?.data?.id);
                                      }
                                    }
                                  } else {
                                    toast("price repetition is not allowed", {
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
                                } else {
                                  toast(
                                    "number of rows of price and odds of price must be 9 or greater",
                                    {
                                      position: "top-right",
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "light",
                                    }
                                  );
                                }
                              } else {
                                setError(true);

                                toast("Sum of odds of prices must be 100%", {
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
                              setError(true);
                            }
                          }}
                        >
                          {error && (
                            <div
                              className="alert alert-danger"
                              role="alert"
                              id="error"
                            >
                              Please Fill out all the required fields!
                            </div>
                          )}
                          <Row className="row">
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-1"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Card Name
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Control
                                required
                                value={selected.card_name || ""}
                                onChange={(e) => {
                                  setSelected({
                                    ...selected,
                                    card_name: e.target.value,
                                  });
                                }}
                                type="text"
                                className="form-control formWidth"
                              />
                            </Col>
                            
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-1"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Scratch Card Price
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup className="mb-1">
                                <InputGroup.Text>Rs.</InputGroup.Text>

                                <Form.Control
                                  type="number"
                                  required
                                  value={selected.ticketPrize || ""}
                                  onChange={(e) => {
                                    setSelected({
                                      ...selected,
                                      ticketPrize: e.target.value,
                                    });
                                  }}
                                  className="formWidth formCHeight"
                                />
                              </InputGroup>
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-1"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                End Date
                                {/* <span className="text-danger">*</span> */}
                              </Form.Label>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                  components={["DatePicker", "DatePicker"]}
                                >
                                  <DatePicker
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
                                      selected.endDate === "0"
                                        ? "YYYY-MM-DD"
                                        : selected.endDate
                                    )}
                                    onChange={(newValue) =>
                                      setSelected({
                                        ...selected,
                                        endDate:
                                          dayjs(newValue).format("YYYY-MM-DD"),
                                      })
                                    }
                                    renderInput={(params) => (
                                      <TextField {...params} size="large" />
                                    )}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>{" "}
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-1"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Start Time
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <CustomTimePicker
                                // defaultValue={id ? selected.startTime : ""}
                                defaultValue={selected.startTime}
                                value={handleTimePicker}
                              />{" "}
                            </Col>
                          </Row>
                          <Row className="row">
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-1"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Top Prize
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup className="mb-1">
                                {" "}
                                <InputGroup.Text>Rs.</InputGroup.Text>
                                <Form.Control
                                  required
                                  type="number"
                                  className="formWidth formCHeight"
                                  aria-label="Amount (to the nearest dollar)"
                                  value={
                                    selected.topPrize.toLocaleString() || ""
                                  }
                                  onChange={(e) => {
                                    setSelected({
                                      ...selected,
                                      topPrize: e.target.value,
                                    });
                                  }}
                                />
                              </InputGroup>
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-1"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Frequency
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Select
                                required
                                value={frequencies || ""}
                                onChange={(e) => {
                                  setFrequencies(e.target.value);
                                }}
                                className="form-control"
                              >
                                <option value="">
                                  <em>Select</em>
                                </option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Daily">Daily</option>
                              </Form.Select>
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-1"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Schedule
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Select
                                required={
                                  frequencies !== "Monthly" ? true : false
                                }
                                hidden={
                                  frequencies !== "Monthly" ? false : true
                                }
                                value={frequencySchedule || ""}
                                onChange={(e) => {
                                  setFrequencySchedule(e.target.value);
                                  handleChangeFrequency(e.target.value);
                                }}
                                className={`form-control ${
                                  frequencies === "Monthly" && `dropdown-toggle`
                                } `}
                                type="button"
                              >
                                <option value="">Select</option>

                                {frequencies === "Daily" && (
                                  <option value="Daily">Daily</option>
                                )}
                                {frequencies === "Weekly" &&
                                  optionsWeek.map((item) => (
                                    <option value={item.value}>
                                      {item.label}
                                    </option>
                                  ))}
                              </Form.Select>
                              <input
                                onClick={() => {
                                  if (window.scrollY === 0) {
                                    window.scrollBy(0, 200);
                                  }
                                }}
                                required={
                                  frequencies === "Monthly" ? true : false
                                }
                                hidden={
                                  frequencies === "Monthly" ? false : true
                                }
                                value={
                                  optionsMonth.some(
                                    (option) =>
                                      option.value === frequencySchedule
                                  ) && frequencies === "Monthly"
                                    ? frequencySchedule
                                    : "Select"
                                }
                                readOnly
                                className="form-select"
                                style={{ cursor: "pointer" }}
                                data-bs-toggle={
                                  frequencies === "Monthly" && "dropdown"
                                }
                                aria-expanded="false"
                              />

                              <div className="dropdown">
                                <ul className="dropdown-menu">
                                  <table className="table">
                                    {rowsDate.map((date) => (
                                      <tbody>
                                        <tr
                                          style={{
                                            border: "1px solid #ccc",
                                            marginTop: "30px",
                                          }}
                                        >
                                          {date.map((item) => (
                                            <td
                                              key={item.value}
                                              onClick={() => {
                                                setFrequencySchedule(
                                                  item.value
                                                );
                                                handleChangeFrequency(
                                                  item.value
                                                );
                                              }}
                                              className={`text-center ${
                                                frequencySchedule === item.value
                                                  ? `date-label-active`
                                                  : `date-label`
                                              }`}
                                            >
                                              {item.label}
                                            </td>
                                          ))}
                                        </tr>
                                      </tbody>
                                    ))}
                                  </table>
                                </ul>
                              </div>
                            </Col>{" "}
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-1"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Per Person Buy Limit
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup className="mb-1">
                                <Form.Control
                                  type="number"
                                  required
                                  value={selected.buyTicketLimit}
                                  onChange={(e) => {
                                    setSelected({
                                      ...selected,
                                      buyTicketLimit: e.target.value,
                                    });
                                  }}
                                  className="formWidth formCHeight"
                                />
                              </InputGroup>
                            </Col>{" "}
                          </Row>

                          <Row className="row">
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-1"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Time Zone
                                <span className="text-danger">*</span>
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
                              className="col-lg-3 col-md-3 mb-1"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Game Slogan
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <InputGroup className="mb-1">
                                <Form.Control
                                  required
                                  value={selected.game_slogan}
                                  onChange={(e) => {
                                    setSelected({
                                      ...selected,
                                      game_slogan: e.target.value,
                                    });
                                  }}
                                  className="formWidth formCHeight"
                                />
                              </InputGroup>
                            </Col>{" "}
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-1"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Matched Massage
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Congratulations!!"
                                value={selected.matchMessage}
                                onChange={(e) => {
                                  setSelected({
                                    ...selected,
                                    matchMessage: e.target.value,
                                  });
                                }}
                                className="form-control formWidth"
                              />
                            </Col>
                            <Col
                              lg={3}
                              md={3}
                              className="col-lg-3 col-md-3 mb-1"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Unmatched Massage
                              </Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Better Luck Next Time!!"
                                value={selected.unmatchedMessage}
                                onChange={(e) => {
                                  setSelected({
                                    ...selected,
                                    unmatchedMessage: e.target.value,
                                  });
                                }}
                                className="form-control formWidth"
                              />
                            </Col>
                          </Row>

                          <Row className="row mb-4">
                            <Col
                              lg={12}
                              md={12}
                              className="col-lg-12 col-md-12"
                            >
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Game Features
                              </Form.Label>
                              <span className="text-danger">*</span>
                              <div className="App">
                                <CKEditor
                                  style={{ height: "300px" }}
                                  config={{
                                    image: {
                                      toolbar: [
                                        "toggleImageCaption",
                                        "imageTextAlternative",
                                        "imageStyle:inline",
                                        "imageStyle:block",
                                        "imageStyle:side",
                                      ],
                                    },
                                  }}
                                  editor={ClassicEditor}
                                  data={selected.game_Features}
                                  onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setSelected({
                                      ...selected,
                                      game_Features: data,
                                    });
                                  }}
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row className="row mb-4">
                            <Col lg={4} md={4} className="col-lg-4 col-md-4">
                              <Form.Label
                                htmlFor="preview"
                                className="col-form-label"
                              >
                                <div>
                                  Scratch Card Image{" "}
                                  <span className="text-danger">*</span>
                                </div>

                                <img
                                  src={
                                    selected.id &&
                                    typeof selected.image !== "object"
                                      ? selected.image
                                      : selected.image
                                      ? URL.createObjectURL(selected.image)
                                      : "https://miro.medium.com/v2/resize:fit:250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg"
                                  }
                                  width={"100px"}
                                  height={"100px"}
                                  style={{ cursor: "pointer" }}
                                />
                              </Form.Label>{" "}
                              <Form.Control
                                required={selected.image !== "" ? false : true}
                                type="file"
                                name="image"
                                accept="image/png, image/jpg, image/jpeg"
                                className="form-control formWidthInput"
                                placeholder="Upload File"
                                id="preview"
                                onChange={onImageChange}
                              />
                            </Col>

                            <Col lg={4} md={4} className="col-lg-4 col-md-4">
                              <div>Scratcher Cover Image</div>
                              <span
                                style={{
                                  position: "absolute",
                                  marginLeft: "83px",
                                  marginTop: "5px",
                                  cursor: "pointer",
                                }}
                              >
                                {selected.image1 !== "null" &&
                                  selected.image1 !== null && (
                                    <i
                                      class="bi bi-x-circle-fill text-danger rounded-circle"
                                      onClick={() => {
                                        setSelected({
                                          ...selected,
                                          image1: null,
                                        });
                                      }}
                                    />
                                  )}
                              </span>
                              <Form.Label
                                htmlFor="preview1"
                                className="col-form-label"
                              >
                                <img
                                  src={
                                    selected.id &&
                                    selected.image1 &&
                                    !(selected.image1 instanceof Blob) &&
                                    selected.image1 !== "null" &&
                                    selected.image1 !== null
                                      ? selected.image1
                                      : selected.image1 instanceof Blob
                                      ? URL.createObjectURL(selected.image1)
                                      : "https://miro.medium.com/v2/resize:fit:250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg"
                                  }
                                  width={"100px"}
                                  height={"100px"}
                                  style={{ cursor: "pointer" }}
                                />
                              </Form.Label>{" "}
                              <Form.Control
                                required={selected.image1 !== "" ? false : true}
                                type="file"
                                name="image1"
                                accept="image/png, image/jpg, image/jpeg"
                                className="form-control formWidthInput"
                                placeholder="Upload File"
                                id="preview1"
                                onChange={onImageChange}
                                onClick={(e) => (e.target.value = null)}
                              />
                            </Col>
                            <Col lg={4} md={4} className="col-lg-4 col-md-4">
                              <div>Scratcher Background Image</div>
                              <span
                                style={{
                                  position: "absolute",
                                  marginLeft: "83px",
                                  marginTop: "5px",
                                  cursor: "pointer",
                                }}
                              >
                                {selected.image2 !== "null" &&
                                  selected.image2 !== null && (
                                    <i
                                      class="bi bi-x-circle-fill text-danger rounded-circle"
                                      onClick={() => {
                                        setSelected({
                                          ...selected,
                                          image2: null,
                                        });
                                      }}
                                    />
                                  )}
                              </span>
                              <Form.Label
                                htmlFor="preview2"
                                className="col-form-label"
                              >
                                <img
                                  src={
                                    selected.id &&
                                    selected.image2 &&
                                    !(selected.image2 instanceof Blob) &&
                                    selected.image2 !== "null" &&
                                    selected.image2 !== null
                                      ? selected.image2
                                      : selected.image2 instanceof Blob
                                      ? URL.createObjectURL(selected.image2)
                                      : "https://miro.medium.com/v2/resize:fit:250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg"
                                  }
                                  width={"100px"}
                                  height={"100px"}
                                  style={{ cursor: "pointer" }}
                                />
                              </Form.Label>{" "}
                              <Form.Control
                                required={selected.image2 !== "" ? false : true}
                                type="file"
                                name="image2"
                                accept="image/png, image/jpg, image/jpeg"
                                className="form-control formWidthInput"
                                placeholder="Upload File"
                                id="preview2"
                                onChange={onImageChange}
                                onClick={(e) => (e.target.value = null)}
                              />
                            </Col>
                          </Row>
                          <Row className="row">
                            <Card>
                              <Card.Body>
                                <Row className="row">
                                  <table class="table">
                                    <thead>
                                      <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Discount Percent </th>
                                        <th scope="col">Discount Tickets </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {discount &&
                                        discount.map((item, index) => {
                                          return (
                                            <>
                                              <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                  <InputGroup>
                                                    <Form.Control
                                                      type="number"
                                                      name="discountPercent"
                                                      value={
                                                        item.discountPercent
                                                      }
                                                      onChange={(event) =>
                                                        handleInputDiscountChange(
                                                          index,
                                                          event
                                                        )
                                                      }
                                                      className="form-control formWidth"
                                                    />
                                                    <InputGroup.Text>
                                                      %
                                                    </InputGroup.Text>
                                                  </InputGroup>
                                                </td>{" "}
                                                <td>
                                                  <InputGroup>
                                                    <Form.Control
                                                      type="number"
                                                      name="discountTicket"
                                                      value={
                                                        item.discountTicket
                                                      }
                                                      onChange={(event) =>
                                                        handleInputDiscountChange(
                                                          index,
                                                          event
                                                        )
                                                      }
                                                      className="form-control formWidth"
                                                    />
                                                  </InputGroup>
                                                </td>
                                                <td>
                                                  {" "}
                                                  {index !== 0 && (
                                                    <Button
                                                      variant="danger"
                                                      onClick={() =>
                                                        removeInputDiscount(
                                                          index
                                                        )
                                                      }
                                                      title="Remove field"
                                                    >
                                                      -
                                                    </Button>
                                                  )}
                                                </td>
                                                <td>
                                                  {index ===
                                                    discount.length - 1 && (
                                                    <Button
                                                      variant="success"
                                                      onClick={addInputDiscount}
                                                    >
                                                      +
                                                    </Button>
                                                  )}
                                                </td>
                                              </tr>
                                            </>
                                          );
                                        })}
                                    </tbody>
                                  </table>
                                </Row>{" "}
                              </Card.Body>
                            </Card>
                          </Row>
                          <Row className="row">
                            <Card>
                              <Card.Body>
                                <Row className="row">
                                  <Row className="row">
                                    <Col
                                      lg={2}
                                      md={2}
                                      className="col-lg-2 col-md-2 mb-1"
                                    >
                                      <Form.Label
                                        for="inputText"
                                        className="col-form-label"
                                      >
                                        Odds of Wins
                                        <span className="text-danger">*</span>
                                      </Form.Label>
                                      <Form.Control
                                        required
                                        type="number"
                                        max={"100"}
                                        min={"0"}
                                        className="formWidth formCHeight"
                                        aria-label="Amount (to the nearest dollar)"
                                        value={selected.odds_of_win}
                                        onChange={(e) => {
                                          const inputValue = Math.min(
                                            Math.max(e.target.value),
                                            100
                                          );

                                          setSelected({
                                            ...selected,
                                            odds_of_win: inputValue.toString(),
                                          });
                                        }}
                                      />
                                    </Col>
                                    <Col
                                      lg={2}
                                      md={2}
                                      className="col-lg-2 col-md-2 mb-1"
                                    >
                                      <Form.Label
                                        for="inputText"
                                        className="col-form-label"
                                      >
                                        Odds of loss
                                        <span className="text-danger">*</span>
                                      </Form.Label>
                                      <Form.Control
                                        className="formWidth formCHeight"
                                        aria-label="Amount (to the nearest dollar)"
                                        value={
                                          selected.odds_of_win === ""
                                            ? ""
                                            : 100 - Number(selected.odds_of_win)
                                        }
                                        readOnly
                                      />
                                    </Col>{" "}
                                    <Col
                                      lg={4}
                                      md={4}
                                      className="col-lg-4 col-md-4 mb-1"
                                    >
                                      <Form.Label
                                        for="inputText"
                                        className="col-form-label"
                                      >
                                        Upload CSV
                                      </Form.Label>
                                      <div>
                                        <fieldset>
                                          <Form.Control
                                            type="file"
                                            accept=".csv"
                                            className="formWidth formCHeight"
                                            aria-label="Amount (to the nearest dollar)"
                                            onChange={(e) => {
                                              setCsvFile(e.target.files);
                                            }}
                                            onClick={(e) =>
                                              (e.target.value = null)
                                            }
                                          />
                                        </fieldset>
                                      </div>
                                      {fileError && (
                                        <span
                                          className="text-danger"
                                          style={{ fontSize: "13px" }}
                                        >
                                          {fileError}
                                        </span>
                                      )}
                                    </Col>{" "}
                                    <Col
                                      lg={2}
                                      md={2}
                                      className="col-lg-2 col-md-2 mb-1"
                                    >
                                      <Form.Label
                                        for="inputText"
                                        className="col-form-label"
                                      >
                                        Circle Bg Color
                                      </Form.Label>
                                      <div
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title={selected.circle_bg}
                                        style={stylesBg.swatch}
                                        onClick={() =>
                                          setDisplayGradientPicker(
                                            !displayGradientPicker
                                          )
                                        }
                                      >
                                        <div style={stylesBg.color} />
                                      </div>
                                      {displayGradientPicker ? (
                                        <div style={stylesBg.popover}>
                                          <div
                                            style={stylesBg.cover}
                                            onClick={() =>
                                              setDisplayGradientPicker(false)
                                            }
                                          />
                                          <div className="p-2 bg-light card shadow">
                                            <ColorPicker
                                              height={150}
                                              width={250}
                                              value={color}
                                              onChange={setColor}
                                              hidePresets={true}
                                              // hideControls={true}
                                              // hideOpacity={true}
                                              // hideEyeDrop={true}
                                              // hideAdvancedSliders={true}
                                              hideInputType={true}
                                              // hideColorTypeBtns={true}
                                              hideGradientAngle={true}
                                              hideGradientStop={true}
                                            />
                                          </div>
                                        </div>
                                      ) : null}
                                      <span className="ms-1"></span>
                                    </Col>
                                    <Col
                                      lg={2}
                                      md={2}
                                      className="col-lg-2 col-md-2 mb-1"
                                    >
                                      <Form.Label
                                        for="inputText"
                                        className="col-form-label"
                                      >
                                        Font Color
                                      </Form.Label>

                                      <div className="form-control d-flex p-1 pe-2">
                                        <div
                                          style={styles.swatch}
                                          onClick={() =>
                                            setDisplayColorPicker(
                                              !displayColorPicker
                                            )
                                          }
                                        >
                                          <div style={styles.color} />
                                        </div>
                                        {displayColorPicker ? (
                                          <div style={styles.popover}>
                                            <div
                                              style={styles.cover}
                                              onClick={() =>
                                                setDisplayColorPicker(false)
                                              }
                                            />

                                            <ChromePicker
                                              color={selected.fontColor}
                                              onChange={(e) => {
                                                setSelected((prevSelected) => ({
                                                  ...prevSelected,
                                                  fontColor: e.hex,
                                                }));
                                              }}
                                            />
                                          </div>
                                        ) : null}
                                        <span className="ms-1">
                                          {selected.fontColor}
                                        </span>
                                      </div>
                                    </Col>{" "}
                                  </Row>

                                  <div style={{ fontSize: "13px" }}>
                                    Note
                                    <span className="text-danger">*</span>: The
                                    csv file header should be <b>Prize</b> and{" "}
                                    <b>Odds of prize</b> naming convetion
                                  </div>

                                  <table class="table">
                                    <thead>
                                      <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">
                                          prize{" "}
                                          <span className="text-danger">*</span>{" "}
                                        </th>
                                        <th scope="col">
                                          Odds of prize{" "}
                                          <span className="text-danger">*</span>
                                        </th>
                                        <th scope="col" colSpan={2}>
                                          <a
                                            className="btn btn-outline-dark mx-1 rounded-pill btn-sm "
                                            style={{ fontSize: "10px" }}
                                            download={`${selected.card_name} scratch table .csv`}
                                            href={downloadLink}
                                          >
                                            Export as template
                                          </a>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {counter.map((item, index) => {
                                        return (
                                          <>
                                            <tr key={index}>
                                              <th scope="row">{index + 1}</th>
                                              <td>
                                                {" "}
                                                <InputGroup>
                                                  <InputGroup.Text>
                                                    $
                                                  </InputGroup.Text>

                                                  <Form.Control
                                                    required
                                                    type="number"
                                                    name="price"
                                                    value={
                                                      item?.price != null
                                                        ? item.price.toLocaleString()
                                                        : 0
                                                    }
                                                    onChange={(event) =>
                                                      handleInputChange(
                                                        index,
                                                        event
                                                      )
                                                    }
                                                    className="form-control formWidth"
                                                  />
                                                </InputGroup>
                                                {repeatedPrices.map((i) =>
                                                  i
                                                    ? i === +item.price && (
                                                        <Form.Text className="text-danger">
                                                          {i} is already
                                                          declared
                                                        </Form.Text>
                                                      )
                                                    : null
                                                )}
                                              </td>{" "}
                                              <td>
                                                <InputGroup>
                                                  <Form.Control
                                                    required
                                                    type="number"
                                                    name="odds_of_price"
                                                    value={item.odds_of_price}
                                                    onChange={(event) =>
                                                      handleInputChange(
                                                        index,
                                                        event
                                                      )
                                                    }
                                                    className="form-control formWidth"
                                                  />
                                                  <InputGroup.Text>
                                                    %
                                                  </InputGroup.Text>
                                                </InputGroup>
                                              </td>
                                              <td>
                                                {" "}
                                                {index !== 0 && (
                                                  <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                      removeInput(index)
                                                    }
                                                    title="Remove field"
                                                  >
                                                    -
                                                  </Button>
                                                )}
                                              </td>
                                              <td>
                                                {index ===
                                                  counter.length - 1 && (
                                                  <Button
                                                    variant="success"
                                                    onClick={addInputNew}
                                                  >
                                                    +
                                                  </Button>
                                                )}
                                              </td>
                                            </tr>
                                          </>
                                        );
                                      })}
                                      <tr>
                                        <td colSpan={2}>
                                          <div className="">
                                            <div
                                              style={{ fontSize: "13px" }}
                                              id="prize-error"
                                              className="text-danger"
                                            ></div>
                                          </div>
                                        </td>
                                        <td>
                                          <InputGroup>
                                            <Form.Control
                                              value={+(+totalsum).toFixed(2)}
                                              className="form-control formWidth"
                                              disabled
                                            />
                                            <InputGroup.Text>%</InputGroup.Text>
                                          </InputGroup>
                                          <div style={{ fontSize: "13px" }}>
                                            Note
                                            <span className="text-danger">
                                              *
                                            </span>{" "}
                                            Total sum of Odds of prize must be
                                            100%
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </Row>{" "}
                              </Card.Body>
                            </Card>
                          </Row>
                          <Row>
                            <Col lg={12} className="col-lg-12">
                              <Button
                                variant="success"
                                type="submit"
                                className="btn btn-sm px-4"
                              >
                                Post
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                        {/* <!-- End   Form Elements --> */}
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
