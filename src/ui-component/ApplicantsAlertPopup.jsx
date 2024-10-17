import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

const ApplicantsAlertPopup = ({ isOpen, handleOnClick, id, type }) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleOnClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          style={{
            display: "flex",
            padding: "1.2rem",
            paddingLeft: "1.5rem",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <h4
            style={{
              fontWeight: "600",
            }}
          >
            Editing
          </h4>
          <svg
            onClick={handleOnClick}
            style={{ cursor: "pointer" }}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Icon / Close">
              <path
                id="icon/navigation/close_24px"
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#8C8C8C"
              />
            </g>
          </svg>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{
            backgroundColor: "#FFF3EE",
            margin: "0 1rem 0 1rem",
            borderRadius: "8px",
          }}
        >
          <div style={{ padding: "1rem", paddingRight: "1rem" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g id="Icon / Danger">
                <path
                  id="icon/outlined/alert/warning_amber_24px"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1 21.5L12 2.5L23 21.5H1ZM19.53 19.5L12 6.49L4.47 19.5H19.53ZM11 16.5V18.5H13V16.5H11ZM11 10.5H13V14.5H11V10.5Z"
                  fill="#FA5A16"
                />
              </g>
            </svg>
          </div>
          <div>
            <DialogTitle
              style={{ color: "#E54C0B", paddingBottom: "0", paddingLeft: "0" }}
              id="alert-dialog-title"
            >
              Attention!
            </DialogTitle>
            <DialogContent style={{ paddingLeft: "0" }}>
              <DialogContentText
                style={{ color: "#E54C0B" }}
                id="alert-dialog-description"
              >
                There is an applicant(s) associated with this job posting,
                therefore only view posting mode is available.
              </DialogContentText>
            </DialogContent>
          </div>
        </div>
        <DialogActions style={{ margin: ".5rem", color: "#2561B0" }}>
          <Button
            style={{ padding: ".25rem .5rem", borderRadius: "8px" }}
            onClick={handleOnClick}
          >
            Cancel
          </Button>
          <Button
            style={{
              padding: ".25rem .5rem",
              borderRadius: "8px",
            }}
            href={`/owner/postings/view/${type}/${id}`}
            onClick={handleOnClick}
            autoFocus
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApplicantsAlertPopup;
