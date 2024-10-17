import { useTheme } from "@emotion/react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import Position from "../../../components/CreatePosting/Position";
import SideDrawer from "../../../components/Navbar/Drawer";
import NavbarOwner from "../../../components/Navbar/NavbarOwner";
import DirectBooking from "../../../components/CreatePosting/DirectBooking";
import PostingDates from "../../../components/CreatePosting/PostingDates";
import Locationcandidate from "../../../components/CreatePosting/Locationcandidate";

export default function CreatePostings() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  return (
    <div>
      <div style={{ zIndex: 2001 }}>
        <NavbarOwner
          setIsSidebarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
      <div className="d-flex">
        <SideDrawer
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isMobile={isMobile}
        />

        <Grid
          sx={{
            width: isMobile ? "100vw" : "calc(100vw - 256px)",
          }}
        >
          <Grid
            sx={{
              px: 3,
              borderBottom: "1px solid #D9D9D9",
              width: "auto",
              color: "#8C8C8C",
              fontSize: "0.9rem",
            }}
          >
            <WorkOutlineIcon sx={{ py: 0.5, my: 0.2, mr: 0.9 }} />
            Postings / <span style={{ color: "#595959" }}> Temporary Job </span>
          </Grid>

          <Grid
            sx={{
              px: 3,
              pt: 2,
              pb: 1,
              borderBottom: "1px solid #D9D9D9",
              width: "auto",
            }}
          >
            <h4 className="pb-0 mb-1" style={{ color: "#262626" }}>
              Create Posting
            </h4>
            <p style={{ color: "#8C8C8C", fontSize: "0.8rem" }}>Assistants</p>
          </Grid>

          <Grid
            sx={{
              px: 3,
              pt: 2,
              pb: 1,
              borderBottom: "1px solid #D9D9D9",
              width: "auto",
            }}
          >
            <p
              className="pb-0 mb-0"
              style={{ color: "#595959", fontSize: "0.8rem" }}
            >
              Posting Title
            </p>
            <p style={{ color: "#000000" }}>DA, RDAEF1</p>
            <p
              className="pb-0 mb-0"
              style={{ color: "#595959", fontSize: "0.8rem" }}
            >
              Location
            </p>
            <p style={{ color: "#000000" }}>-</p>
          </Grid>

          <Position />
          <DirectBooking />
          <Locationcandidate />
          <PostingDates />
          <div className="ms-2">
            <Button
              variant="outlined"
              sx={{
                borderColor: "#2561B0",
                boxShadow: "none",
                my: 2,
                ml: 2,
                textTransform: "none",
              }}
            >
              <Typography sx={{ fontWeight: "400" }}> Close </Typography>
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2561B0",
                boxShadow: "none",
                my: 2,
                ml: 2,
              }}
            >
              <Typography sx={{ fontWeight: "400", px: 2 }}> SAVE</Typography>
            </Button>
          </div>
        </Grid>
      </div>
    </div>
  );
}
