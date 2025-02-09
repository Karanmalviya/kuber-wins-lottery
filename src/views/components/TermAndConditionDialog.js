import React, {forwardRef, useImperativeHandle, useState} from "react";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {updateUserDetail} from "../../api/api";
import {fetchUser} from "../../features/apiSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import MiniLoader from "./MiniLoader";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const TermAndConditionDialog = forwardRef(({}, ref) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => ({
    handleClickOpen,
    handleClose,
  }));

  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId]);

  const user = useSelector((state) => state.api.user);
  const handleSubmit = async () => {
    if (term) {
      setLoading(true);
      const response = await updateUserDetail(
        {email: user.email, term_condition: term},
        {"Content-Type": "application/json"},
        userId
      );
      if (response) {
        setLoading(false);
        dispatch(fetchUser(userId));
        handleClose();
      }
    } else {
      handleClose();
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        // fullWidth={true}
        sx={{height: "70%", top: "15%"}}
        className="px-2"
      >
        <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
          Important Update: Terms and Conditions
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom sx={{fontSize: "15px"}}>
            Dear User,
          </Typography>
          <Typography
            gutterBottom
            sx={{fontSize: "15px", textAlign: "justify"}}
          >
            We hope this message finds you well. We've recently updated our
            Terms and Conditions to enhance your experience with our lottery
            system. Before proceeding with your purchase, we kindly ask you to
            review and agree to the updated{" "}
            <Link to={"/general-terms-and-conditions"}>Terms & Conditions</Link>
            .
          </Typography>
          <Typography
            gutterBottom
            className="mt-3"
            sx={{fontSize: "15px", textAlign: "justify"}}
          >
            If you Choose to Agree: You can make your purchases on this
            platform. Please take a moment to read through our updated Terms and
            Conditions. If you agree and continued use of our platform then it
            implies your acceptance of the revised terms.
          </Typography>
          <Typography
            gutterBottom
            className="mt-3"
            sx={{fontSize: "15px", textAlign: "justify"}}
          >
            If you choose not to agree: Your account will be prohibited from
            participating in lotteries and scratchers. You won't be able to make
            new purchases, but you can still withdraw your existing funds.
          </Typography>
          <Typography gutterBottom className="mt-3" sx={{fontSize: "15px"}}>
            Thank you for your understanding and cooperation.
          </Typography>
          <Typography gutterBottom className="mt-3" sx={{fontSize: "15px"}}>
            Best regards,
          </Typography>
          <Typography gutterBottom sx={{fontSize: "15px"}}>
            {" "}
            Team Kuber Wins.
          </Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="male"
              control={<Radio onChange={() => setTerm(true)} />}
              label="I agree"
            />
            <FormControlLabel
              value="other"
              control={<Radio onChange={() => setTerm(false)} />}
              label=" I do not agree"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions sx={{right: 0}}>
          <Button
            autoFocus
            variant="contained"
            onClick={handleSubmit}
            className="btn btn-info text-white btn-sm ms-lg-5 ms-2 px-3"
          >
            {loading ? <MiniLoader /> : "Submit"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
});
export default TermAndConditionDialog;
