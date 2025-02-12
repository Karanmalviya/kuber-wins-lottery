import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { HeaderPageContainer } from "./../../component/header/header.container";
import { SidebarPageContainer } from "./../../component/sidebar/sidebar.container";
import { FooterPageContainer } from "./../../component/footer/footer.container";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowUpShort } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import { MultiSelect } from "react-multi-select-component";

import Loader from "./../../component/Loader";
import ScrollToTop from "react-scroll-to-top";
const emptyData = {
  gameInformationId: "",
  game: "",
  gameData: JSON.stringify({}),
  status: "",
};

const emptyCounter = {
  frequency: "",
  schedules: [],
  eligible: "",
  odds_of_win: "",
  table: [
    {
      odds_of_price: "",
      prize: "",
    },
  ],
  prize: "",
  winners: "",
  odds_winner: "",
  odds_out_of_winner: "",
  winningAmount: "",
  showStatus: 0,
};

export default function AddLotteryPhasePage(props) {
  const {
    createlotteryphase,
    updatelotteryphase,
    lotteryPhase,
    isSaved,
    fetchlotteryphase,
    fetchlottery,
    lotteries,
    isLoading,
  } = props;
  const { id } = useParams();
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(emptyData);
  const [on, setOn] = useState(false);
  const [counter, setCounter] = useState([emptyCounter]);
  const [checkPhaseStatus, setCheckPhaseStatus] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [index, setIndex] = useState([]);
  const [selectedLotteryPhase, setSelectedLotteryPhase] = useState("");
  const adminData = localStorage.getItem("user");
  const admin = adminData && JSON.parse(adminData);

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
    { label: "01", value: "01" },
    { label: "02", value: "02" },
    { label: "03", value: "03" },
    { label: "04", value: "04" },
    { label: "05", value: "05" },
    { label: "06", value: "06" },
    { label: "07", value: "07" },
    { label: "08", value: "08" },
    { label: "09", value: "09" },
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
  const addInput = () => {
    setCounter(counter.concat([emptyCounter]));
  };
  const deleteInput = (index) => {
    setCounter((counter) => counter.filter((x, i) => i !== index));
  };
  const [popup, setPopup] = useState("");

  // const addCounter = (idx) => {
  //   setCounter((prevCounter) => {
  //     const updatedCounter = [...prevCounter];
  //     const updateCounter2 = [...updatedCounter[idx].table];
  //     updateCounter2.push({
  //       odds_of_price: "",
  //       prize: "",
  //     });

  //     updatedCounter[idx].table = updateCounter2;
  //     return updatedCounter;
  //   });
  // };

  // const removeCounter = (idx, tableIndexToRemove) => {
  //   setCounter((prevCounter) => {
  //     const updatedCounter = [...prevCounter];
  //     const updatedTable = [...updatedCounter[idx].table];
  //     updatedTable.splice(tableIndexToRemove, 1);
  //     updatedCounter[idx].table = updatedTable;
  //     return updatedCounter;
  //   });
  // };

  const updateCounter = (i, v, t, arr, tidx) => {
    if (t === "frequency") {
      setCounter(
        counter.map((item, index) =>
          i == index
            ? {
                ...item,
                frequency: v,
                schedules: [],
                table: [
                  {
                    odds_of_price: "",
                    prize: "",
                  },
                ],
              }
            : item
        )
      );
    } else if (t === "table") {
      const { name, value } = v.target;
      if (name === "prize" && parseFloat(value) === 0) {
        return;
      }
      setCounter((prevCounter) => {
        const updatedCounter = [...prevCounter];
        updatedCounter[i] = {
          ...updatedCounter[i],
          table: updatedCounter[i].table.map((tableItem, index) =>
            index === tidx ? { ...tableItem, [name]: value } : tableItem
          ),
        };
        return updatedCounter;
      });
    } else {
      setCounter(
        counter.map((item, index) => (i == index ? { ...item, [t]: v } : item))
      );
    }
  };
  useEffect(() => {
    if (id) {
      const filterByRoleLotteryPhase = lotteryPhase?.filter((item) =>
        admin.role === "sub-admin"
          ? item.roleId === admin.id || item.roleId === 0
          : item
      );
      const sel = filterByRoleLotteryPhase.filter((x) => x.id == id);
      if (sel.length > 0) {
        setSelected(sel[0]);
        setCounter(
          sel[0].gameData == null ? [""] : JSON.parse(sel[0].gameData)
        );
        const selDate =
          sel[0].gameData == null ? [""] : JSON.parse(sel[0].gameData);

        selDate.map((item, idx) => {
          if (!index.includes(idx)) {
            setIndex((prevIndex) => [...prevIndex, idx]);
          }
          setSelectedDates((prevItem) => {
            const updated = [...prevItem];
            updated[idx] = item.schedules;
            return updated;
          });
        });

        var array = [];
        counter.forEach((item) => {
          array.push(item?.winners);
        });
      }
      if (lotteryPhase.length === 0) {
        navigate("/lottery-phases");
      }
    }
    // if (lotteryPhase.length === 0) {
    //   navigate("/lottery-phases");
    // }
    fetchlottery();
  }, [id, lotteryPhase]);

  useEffect(() => {
    fetchlotteryphase();
  }, []);

  useEffect(() => {
    if (lotteryPhase && selectedLotteryPhase !== "") {
      setCounter(
        lotteryPhase[selectedLotteryPhase].gameData == "undefined"
          ? [""]
          : JSON.parse(lotteryPhase[selectedLotteryPhase].gameData)
      );
    }
  }, [lotteryPhase, selectedLotteryPhase]);

  useEffect(() => {
    if (isSaved && on) {
      navigate("/lottery-phases");
    }
  }, [isSaved]);

  const setGame = (x) => {
    const y = lotteries.filter((z) => z.id == x);
    setSelected({
      ...selected,
      gameInformationId: x,
      game: y[0].gameNumber + "00" + Math.floor(Math.random() * 100) + 1,
    });
    let checkPhase = [0];
    let currPhase = [];
    lotteryPhase.forEach((item) => {
      if (item.gameInformationId === Number(x)) {
        checkPhase.push(item.status);
        currPhase.push(item.game);
      }
    });
    setCheckPhaseStatus(checkPhase);
  };

  const rowsDate = Array.from(
    { length: Math.ceil(optionsMonth.length / 5) },
    (_, index) => optionsMonth.slice(index * 5, index * 5 + 5)
  );
  const handleDateClick = (item, idx) => {
    if (!index.includes(idx)) {
      setIndex((prevIndex) => [...prevIndex, idx]);
    }
    const isItemSelected = selectedDates?.[idx]?.some(
      (date) => date.value === item.value
    );
    const isAlreadySelectedExist = index.some((date) => date === idx);

    if (isItemSelected) {
      const updatedDates = selectedDates?.[idx]?.filter(
        (date) => date.value !== item.value
      );
      setSelectedDates((prevSelectedDates) => {
        const updated = [...prevSelectedDates];
        updated[idx] = updatedDates;
        return updated;
      });

      updateCounter(idx, updatedDates, "schedules");
    } else {
      if (isAlreadySelectedExist) {
        setSelectedDates((prevSelectedDates) => {
          const updated = [...prevSelectedDates];
          updated[idx].push(item);
          return updated;
        });
        const newSelectedDates = selectedDates[idx];
        if (newSelectedDates && newSelectedDates.length > 0) {
          updateCounter(idx, newSelectedDates, "schedules");
        }
      } else {
        setSelectedDates((prevSelectedDates) => {
          const updated = [...prevSelectedDates];
          updated[idx] = [item];
          updateCounter(idx, updated[idx], "schedules");
          return updated;
        });
        const newSelectedDates = selectedDates[idx];
        if (newSelectedDates && newSelectedDates.length > 0) {
          updateCounter(idx, newSelectedDates, "schedules");
        }
      }
    }
  };

  useEffect(() => {}, [counter]);

  const CurrentLottery =
    lotteries.length &&
    lotteries.find((item) => item.id === +selected.gameInformationId);

  const CurrentLotteryPhase =
    lotteryPhase.length &&
    lotteryPhase.filter(
      (item) => item.gameInformation?.draw === CurrentLottery?.draw
    );

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
                <h1>Add Lottery Phases</h1>
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      {/* <a href="index.html">Home</a> */}
                      <Link to={"/"}>Home</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Add Lottery Phases
                    </li>
                  </ol>
                </nav>
              </div>
              {/* <!-- End Page Title --> */}

              <section className="section">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body pt-2">
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            const arr = (counter || []).map((item, index) => ({
                              index,
                              count: item.table.reduce(
                                (sum, item) =>
                                  sum + parseFloat(item.odds_of_price),
                                0
                              ),
                            }));

                            const isValid = true;
                            const obj = checkPhaseStatus.find(
                              (val) => val === 1
                            );
                            const filteredGameData = lotteryPhase.filter(
                              (game) =>
                                game.gameInformationId ===
                                selected.gameInformationId
                            );
                            const filteredPhase = filteredGameData.filter(
                              (game) => game.status === 1
                            );
                            const isValidSchedule = true;

                            if (id) {
                              if (obj) {
                                toast.error(
                                  `Phase ${
                                    filteredPhase[0]?.game || ""
                                  } is active already for ${popup}`,
                                  {
                                    position: "top-center",
                                    autoClose: 1000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                  }
                                );
                              } else if (isValid && isValidSchedule) {
                                updatelotteryphase({
                                  ...selected,
                                  gameData: JSON.stringify(counter),
                                });
                              } else {
                                if (!isValidSchedule) {
                                  toast.error(
                                    `Schedule is not allowed to be empty`,
                                    {
                                      position: "top-center",
                                      autoClose: 1000,
                                      hideProgressBar: true,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "colored",
                                    }
                                  );
                                } else {
                                  toast.error(
                                    `Odds of price must be equal to 100`,
                                    {
                                      position: "top-center",
                                      autoClose: 1000,
                                      hideProgressBar: true,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "colored",
                                    }
                                  );
                                }
                              }
                            } else {
                              if (obj) {
                                toast.error(
                                  `Phase ${
                                    filteredPhase[0]?.game || ""
                                  } is active already for ${popup}`,
                                  {
                                    position: "top-center",
                                    autoClose: 1000,
                                    hideProgressBar: true,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "colored",
                                  }
                                );
                              } else if (isValid && isValidSchedule) {
                                createlotteryphase({
                                  ...selected,
                                  gameData: JSON.stringify(counter),
                                  ...(admin.role === "sub-admin"
                                    ? { roleId: admin.id }
                                    : {}),
                                });
                              } else {
                                if (!isValidSchedule) {
                                  console.log("gggggggggggg");
                                  toast.error(
                                    `Schedule is not allowed to be empty`,
                                    {
                                      position: "top-center",
                                      autoClose: 1000,
                                      hideProgressBar: true,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "colored",
                                    }
                                  );
                                } else {
                                  toast.error(
                                    `Odds of price must be equal to 100`,
                                    {
                                      position: "top-center",
                                      autoClose: 1000,
                                      hideProgressBar: true,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      theme: "colored",
                                    }
                                  );
                                }
                              }
                            }

                            setOn(true);
                          }}
                        >
                          <div className="row">
                            <div className="col-lg-4 col-md-4 mb-3">
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Select Lottery{" "}
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <Form.Select
                                disabled={id}
                                required
                                className="form-select"
                                name="gameInformationId"
                                value={selected.gameInformationId}
                                onChange={(e) => {
                                  if (id) return;
                                  setCounter([emptyCounter]);
                                  setGame(e.target.value);
                                  setPopup(
                                    e.target.options[e.target.selectedIndex]
                                      .text
                                  );
                                }}
                              >
                                <option value="">-- Select --</option>
                                {Array.isArray(lotteries) &&
                                  lotteries
                                    ?.filter((item) =>
                                      admin.role === "sub-admin"
                                        ? item.roleId === admin.id ||
                                          item.roleId === 0
                                        : item
                                    )
                                    .map((x) => {
                                      return (
                                        <option
                                          value={x.id}
                                          key={x.id}
                                          onChange={(e) => setPopup(x.gameName)}
                                        >
                                          {x.gameName}
                                        </option>
                                      );
                                    })}
                              </Form.Select>
                            </div>
                            <div className="col-lg-4 col-md-4 mb-3">
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                {" "}
                                Phase No.{" "}
                              </Form.Label>
                              <span className="text-danger">*</span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Game"
                                name="game"
                                value={selected.game}
                              />
                            </div>
                            {/* <div className="col-lg-4 col-md-4 mb-3">
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                Phase Template{" "}
                              </Form.Label>
                              <Form.Select
                                className="form-select"
                                name="gameInformationId"
                                value={selectedLotteryPhase}
                                onChange={(e) =>
                                  setSelectedLotteryPhase(e.target.value)
                                }
                              >
                                <option value="">-- Select --</option>
                                {Array.isArray(CurrentLotteryPhase) &&
                                  CurrentLotteryPhase?.filter((item) =>
                                    admin.role === "sub-admin"
                                      ? item.roleId === admin.id ||
                                        item.roleId === 0
                                      : item
                                  ).map((x, i) => {
                                    return (
                                      <option value={i} key={x.id}>
                                        {x.gameInformation?.gameName} | {x.game}
                                      </option>
                                    );
                                  })}
                              </Form.Select>
                            </div> */}
                            <div className="col-lg-4 col-md-4 mb-3">
                              <Form.Label
                                for="inputText"
                                className="col-form-label"
                              >
                                {" "}
                                Winning Amount{" "}
                                <span className="text-danger">*</span>
                              </Form.Label>
                              <div className="input-group">
                                <input
                                  type="number"
                                  required
                                  className="form-control"
                                  value={selected?.winningAmount}
                                  onChange={(e) =>
                                    setSelected({
                                      ...selected,
                                      winningAmount: e.target.value,
                                    })
                                  }
                                />
                                <span
                                  className="input-group-text"
                                  id="basic-addon2"
                                >
                                  Rs.
                                </span>
                              </div>
                            </div>
                            <div className="col-lg-12 mb-3">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckDefault"
                                  checked={selected?.showStatus}
                                  onChange={(e) =>
                                    setSelected({
                                      ...selected,
                                      showStatus: e.target.checked ? 1 : 0,
                                    })
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexSwitchCheckDefault"
                                >
                                  Visible on Frontend
                                </label>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-3">
                                Set Games <br />
                                <a
                                  hidden={
                                    CurrentLottery?.draw === "single-draw"
                                  }
                                  href="javascript:void(0);"
                                  onClick={() => addInput()}
                                  className="add_button"
                                  title="Add field"
                                >
                                  +
                                </a>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12">
                                {counter.map(
                                  (item, idx) =>
                                    item && (
                                      <div
                                        key={idx}
                                        id={`id-${idx}`}
                                        className="card border border-light"
                                      >
                                        <div className="card-body mt-3">
                                          <div className="row d-flex align-items-center justify-content-center">
                                            <div className="col-lg-12 border-end border-light">
                                              <div className="row">
                                                <div className="col-lg-3 mb-3">
                                                  <Form.Label
                                                    for="inputText"
                                                    className="col-form-label"
                                                  >
                                                    {" "}
                                                    Frequency{" "}
                                                    <span className="text-danger">
                                                      *
                                                    </span>
                                                  </Form.Label>
                                                  <Form.Select
                                                    value={
                                                      counter[idx].frequency
                                                    }
                                                    onChange={(e) => {
                                                      updateCounter(
                                                        idx,
                                                        e.target.value,
                                                        "frequency"
                                                      );
                                                    }}
                                                    className="form-select"
                                                    required
                                                  >
                                                    <option value="">
                                                      -- Select --
                                                    </option>
                                                    <option value="1">
                                                      Daily
                                                    </option>
                                                    <option
                                                      value="2"
                                                      onChange={(e) => {
                                                        updateCounter(
                                                          idx,
                                                          [],
                                                          "schedules"
                                                        );
                                                      }}
                                                    >
                                                      Weekly
                                                    </option>
                                                    <option
                                                      value="3"
                                                      onChange={(e) => {
                                                        updateCounter(
                                                          idx,
                                                          [],
                                                          "schedules"
                                                        );
                                                        setSelectedDates(
                                                          (
                                                            prevSelectedDates
                                                          ) => {
                                                            const updated = [
                                                              ...prevSelectedDates,
                                                            ];
                                                            updated[idx] = [];
                                                            return updated;
                                                          }
                                                        );
                                                      }}
                                                    >
                                                      Monthly
                                                    </option>
                                                  </Form.Select>
                                                </div>
                                                <div
                                                  className="col-lg-4 mb-3"
                                                  hidden={
                                                    item.frequency == 1
                                                      ? true
                                                      : false
                                                  }
                                                >
                                                  <Form.Label
                                                    for="inputText"
                                                    className="col-form-label"
                                                  >
                                                    {" "}
                                                    Schedule{" "}
                                                    <span className="text-danger">
                                                      *
                                                    </span>
                                                  </Form.Label>

                                                  <MultiSelect
                                                    className={`${
                                                      item.frequency == 3 &&
                                                      `d-none`
                                                    }`}
                                                    options={
                                                      item.frequency == 2
                                                        ? optionsWeek
                                                        : item.frequency == 3
                                                        ? optionsMonth
                                                        : []
                                                    }
                                                    value={
                                                      counter[idx].schedules
                                                    }
                                                    onChange={(e) => {
                                                      updateCounter(
                                                        idx,
                                                        e,
                                                        "schedules"
                                                      );
                                                    }}
                                                    labelledBy={`Select${idx}`}
                                                  />

                                                  <input
                                                    hidden={
                                                      item.frequency == 3
                                                        ? false
                                                        : true
                                                    }
                                                    readOnly
                                                    required
                                                    value={
                                                      selectedDates?.[idx]
                                                        ?.length > 0
                                                        ? selectedDates?.[idx]
                                                            ?.map(
                                                              (date) =>
                                                                date.value
                                                            )
                                                            ?.join(",")
                                                        : ""
                                                    }
                                                    style={{ cursor: "unset" }}
                                                    className="form-select"
                                                    type="text"
                                                    data-bs-toggle={
                                                      item.frequency == 3 &&
                                                      "dropdown"
                                                    }
                                                    aria-expanded="false"
                                                    placeholder="Select..."
                                                  />

                                                  <div className="dropdown">
                                                    <ul className="dropdown-menu">
                                                      <table className="table">
                                                        {rowsDate.map(
                                                          (date) => (
                                                            <tbody>
                                                              <tr
                                                                style={{
                                                                  border:
                                                                    "1px solid #ccc",
                                                                  marginTop:
                                                                    "30px",
                                                                }}
                                                              >
                                                                {date.map(
                                                                  (item) => (
                                                                    <td
                                                                      key={
                                                                        item.value
                                                                      }
                                                                      onClick={() =>
                                                                        handleDateClick(
                                                                          item,
                                                                          idx
                                                                        )
                                                                      }
                                                                      className={`text-center ${
                                                                        selectedDates?.[
                                                                          idx
                                                                        ]?.some(
                                                                          (
                                                                            date
                                                                          ) =>
                                                                            date.value ===
                                                                            item.value
                                                                        )
                                                                          ? "date-label-active"
                                                                          : "date-label"
                                                                      }`}
                                                                    >
                                                                      {
                                                                        item.label
                                                                      }
                                                                    </td>
                                                                  )
                                                                )}
                                                              </tr>
                                                            </tbody>
                                                          )
                                                        )}
                                                      </table>
                                                    </ul>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="text-end">
                                                <a
                                                  hidden={
                                                    CurrentLottery?.draw ===
                                                    "single-draw"
                                                  }
                                                  onClick={() =>
                                                    deleteInput(idx)
                                                  }
                                                  className="btn btn-danger btn-sm rounded-0"
                                                  type="button"
                                                  data-toggle="tooltip"
                                                  data-placement="top"
                                                  title="Delete"
                                                >
                                                  {/* <AiFillDelete /> */}

                                                  <i
                                                    className="bi bi-trash3-fill"
                                                    title="Delete"
                                                  ></i>
                                                </a>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                )}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 mb-3 text-end">
                                <a
                                  hidden={
                                    CurrentLottery?.draw === "single-draw"
                                  }
                                  href="javascript:void(0);"
                                  onClick={() => addInput()}
                                  className="add_button"
                                  title="Add field"
                                >
                                  +
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12">
                              <Button
                                type="submit"
                                className="btn btn-success btn-sm px-4"
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
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
      <ToastContainer limit={1} />
    </>
  );
}
