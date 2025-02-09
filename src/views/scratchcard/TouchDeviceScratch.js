import {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ScratchCard from "react-scratchcard-v4";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const TouchDeviceScratch = forwardRef(({ props, play }, ref) => {
  const refS = useRef(null);
  const refS2 = useRef(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [canvasHeight, setCanvasHeight] = useState(0);
  const [canvasWidth, setCanvasWidth] = useState(0);

  useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose,
  }));

  useEffect(() => {
    function updateCanvasDimensions() {
      const canvas = refS.current;
      const canvasP = refS2.current;
      if (canvas && canvasP) {
        const newCanvasWidth = canvasP.clientWidth;
        const newCanvasHeight = canvasP.clientHeight;
        setCanvasWidth(newCanvasWidth);
        setCanvasHeight(newCanvasHeight);
      }
    }
    updateCanvasDimensions();
    window.addEventListener("resize", updateCanvasDimensions);
    return () => {
      window.removeEventListener("resize", updateCanvasDimensions);
      // setOnReset((prev) => !prev);
      // flagRef.current = false;
    };
  }, []);

  return (
    <div
    // style={{ overscrollBehavior: "none", overflow: "hidden" }}
    >
      {/* <Button onClick={handleOpen}>Open modal</Button> <div>x</div> */}
      <Dialog
        // sx={{ overflow: "hidden" }}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle> */}
        {/* <DialogContent> */}
        <div
          className="card card-img card-play"
          ref={refS2}
          // onClick={!isVisible && !autoPlay ? handleStartSScratching : null}
          // onTouchMove={
          //   !isVisible && !autoPlay ? handleStartSScratching : null
          // }
          // onTouchStart={handleTouchEvent}
        >
          <ScratchCard
            key={canvasWidth || canvasHeight}
            ref={refS}
            width={canvasWidth}
            height={canvasHeight}
            image="../assets/img/scratch-cards-scratch.png"
            finishPercent={70}
            fadeOutOnComplete
            onComplete={() => alert("scratchED")}
          >
            <div
              className={`card card-scratch p-0 position-relative d-flex align-items-center text-center`}
              style={{
                backgroundImage: `url(${"../assets/img/bg-card-img.png"})`,
              }}
            >
              <div className={`card-body px-0 pt-2 `}>
                <div>132sssssss</div>
                <div>132ssss</div>
                <div>132</div>
                <div>132</div>
                <div>132sssss</div>
                <div>132</div>
                <div>132sssssss</div>
                <div>132ssssssss</div>
                {/* <div className="row">
                  {playCard.length > 0 &&
                    playCard?.map((item) => {
                      const itemOccurrences = playCard.filter(
                        (x) => x === item
                      ).length;
                      const isHighlighted =
                        scratchedCard.win && itemOccurrences >= 3;

                      return (
                        <div
                          key={uuidv4() + generateTransactionId()}
                          className={`col-4 d-flex justify-content-center align-items-center ${
                            isHighlighted
                              ? highlightedGreen
                                ? "beats"
                                : ""
                              : ""
                          }`}
                        >
                          <div
                            className="dv-bg"
                            style={{
                              border: "4px solid",
                              borderColor:
                                isHighlighted &&
                                highlightedGreen &&
                                scratchedCardDetail.fontColor
                                  ? "transparent"
                                  : scratchedCardDetail.fontColor,
                              background:
                                isHighlighted && highlightedGreen
                                  ? 'url("../assets/img/nn-2.png")'
                                  : scratchedCardDetail.circle_bg,
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <span
                              className={`scratch-btn ${
                                isHighlighted
                                  ? highlightedGreen && "active"
                                  : ""
                              }`}
                            >
                              <div
                                style={
                                  itemOccurrences >= 3 && highlightedGreen
                                    ? { zIndex: "0" }
                                    : {
                                        zIndex: "0",
                                        color: scratchedCardDetail.fontColor,
                                      }
                                }
                              >
                                $&nbsp;
                                {Number.isInteger(item)
                                  ? item.toLocaleString()
                                  : item.toFixed(2)}
                              </div>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div> */}
              </div>{" "}
              {/* {isBlur && !highlighted && (
                <div className="overlay-after">
                  <p className="p-0 m-0 better-luck-text">
                    {(scratchedCardDetail?.unmatchedMessage !== null ||
                      scratchedCardDetail?.unmatchedMessage !== "null") &&
                      `${scratchedCardDetail?.unmatchedMessage}`}
                  </p>
                  <img
                    src="../assets/img/lose.svg"
                    style={{ height: "70px", width: "70px" }}
                  />
                </div>
              )} */}
            </div>
          </ScratchCard>
        </div>
        {/* </DialogContent> */}
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});
export default TouchDeviceScratch;
