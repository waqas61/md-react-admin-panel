import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';



import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Grid
} from "@mui/material";


import SubCard from '../../../../ui-component/cards/SubCard';
import MainCard from '../../../../ui-component/cards/MainCard';
import PanelCard from '../../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../../ui-component/cards/CardSecondaryAction';

import CalendarIcon from "../../../../assets/icons/calendar2.svg";
import FilterIcon from "../../../../assets/icons/filter.svg";
import RefreshIcon from "../../../../assets/icons/arrow-clockwise.svg";

import ProposalFilterSidebar from "./ProposalFilterSidebar";
import ProposalsDataGrid from './ProposalsDataGrid';
import ProposalModal from './ProposalModal';
import SuccessModal from '../../../../ui-component/SuccessModal';

import { gridSpacing } from '../../../../store/constant';
import { selectUser } from '../../../../store/slices/userSlice';

const PermanentJobProposal = () => {


  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const authToken = localStorage.getItem("auth_token");
  const url = window.location.href;
  const posting_id = url.substring(url.lastIndexOf('/') + 1);

  const [proposals, setProposals] = useState([]);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFiltersSidebarOpen, setIsFiltersSidebarOpen] = useState(false);
  const [viewHiddenJobs, setViewHiddenJobs] = useState(0);
  const [gridWidth, setGridWidth] = useState();
  const [jobDetails, setJobDetails] = useState({});
  const [interviewDetailsOpen, setInterviewDetailsOpen] = useState(false);
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);
  const [hiringRate, setHiringRate] = useState([]);
  const [proposalDate, setProposalDate] = useState('');
  const [selectStatus, setSelectStatus] = useState([]);



  const fetchJobDetails = () => {
    axios
      .get(`https://api.mddentalstaffing.com/api/v1/postings/${posting_id}`, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((res) => {
        setJobDetails(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  const fetchPropsals = (page, limit) => {

    let endpoint = `https://api.mddentalstaffing.com/api/v1/proposals?posting_type=permanent&page=${page}&limit=${limit}&posting_id=${posting_id}`;

    if (selectStatus && selectStatus != null && selectStatus != '') {
      endpoint += `&proposal_status=${selectStatus}`;
    }

    if (hiringRate != null && hiringRate != '') {
      endpoint += `&hiringRate=${hiringRate}`;
    }

    if (proposalDate && proposalDate != null && proposalDate != '') {
      endpoint += `&from=${proposalDate}`;
    }

    axios
      .get(endpoint, {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      })
      .then((response) => {
        setProposals(response.data);
      })
      .catch((e) => {
        console.log(e);
      });




  };

  const columns = [
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'hiring_rate', headerName: 'Hiring Rate($/h)', width: 150 },
    // { field: 'rate', headerName: 'Rate($/h)', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'days', headerName: 'Days', width: 150 },
    { field: 'applicants_count', headerName: '', width: 150 },
  ];


  const closeFilterHandler = () => {
    setHiringRate([]);
    setSelectStatus([]);
    setProposalDate(null);
    fetchPropsals(1, 10);
  };


  useEffect(() => {
    const handleResize = () => {
      setGridWidth(window.innerWidth < 800 ? true : false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, [window.innerWidth]);


  useEffect(() => {
    fetchJobDetails();
    fetchPropsals(1, 10);
  }, [viewHiddenJobs]);


  return (
    <>
      <MainCard
        title="Proposal"
        darkTitle={jobDetails.title}
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            <div
              className="d-flex justify-content-between"
              style={{
                backgroundColor: "#F5F5F5",
                padding: "12px 20px",
                borderBottom: "1px solid #D9D9D9",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  style={{
                    border: selectedItem !== null ? "1px solid #2561B0" : "1px solid #D9D9D9",
                    color: selectedItem !== null ? "#595959" : "#BFBFBF",
                    backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
                    display: `${gridWidth ? 'none' : ''}`
                  }}
                  onClick={() => {
                    setIsProposalDialogOpen(true);
                  }}
                >
                  View Proposal
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    border:
                      selectedItem !== null
                        ? "1px solid #2561B0"
                        : "1px solid #D9D9D9",
                    color: selectedItem !== null ? "#595959" : "#BFBFBF",
                    backgroundColor: selectedItem != null ? "#fff" : "#F5F5F5",
                    display: `${gridWidth ? 'none' : ''}`
                  }}
                  disabled={selectedItem === null}
                  onClick={() => setSelectedItem(null)}
                >
                  Cancel
                </Button>

                <div
                  style={{
                    borderLeft: "1px solid #D9D9D9",
                    height: "100%",
                    display: `${gridWidth ? 'none' : ''}`
                  }}
                ></div>

              </div>
              <div
                style={{
                  display: "flex",
                  gap: 20,
                }}
              >
                <Button
                  style={{
                    border: "1px solid #2561B0",
                    color: "#fff",
                    backgroundColor: "#2561B0",
                  }}
                  onClick={() => navigate("/professional/jobs/calendar")}
                >
                  <img src={CalendarIcon} alt="" />
                </Button>
                <div
                  style={{
                    borderLeft: "1px solid #D9D9D9",
                    height: "100%",
                    display: `${gridWidth ? 'none' : ''}`
                  }}
                ></div>
                <Button
                  style={{
                    border: "1px solid #2561B0",
                    color: "#595959",
                    backgroundColor: "#2561B0",
                  }}
                  onClick={() => setIsFiltersSidebarOpen(true)}
                >
                  <img src={FilterIcon} alt="" />
                </Button>
                <Button
                  style={{
                    border: "1px solid #2561B0",
                    color: "#595959",
                    backgroundColor: "#fff",
                  }}
                  onClick={() => fetchPropsals(1, 10)}
                >
                  <img src={RefreshIcon} alt="" />
                </Button>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 20,
              }}
            >
              <div
                style={{
                  border: '1px solid #D9D9D9',
                  borderRadius: '10px',
                  width: '100%',
                }}
              >
                {proposals && proposals.data && (
                  <ProposalsDataGrid
                    columns={columns}
                    rows={proposals.data}
                    paging={proposals.paging}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    fetchApplicants={fetchPropsals}
                    postingId={posting_id}
                    setInterviewDetailsOpen={setInterviewDetailsOpen}
                  />
                )}
              </div>
            </div>

            {isFiltersSidebarOpen && (
              <ProposalFilterSidebar
                fetchProposal={() => {
                  fetchPropsals(1, 10);
                }}
                resetFilter={closeFilterHandler}

                isSidebarOpen={isFiltersSidebarOpen}
                setIsSidebarOpen={setIsFiltersSidebarOpen}

                hiringRate={hiringRate}
                setHiringRate={setHiringRate}
                selectStatus={selectStatus}

                setSelectStatus={setSelectStatus}
                proposalDate={proposalDate}
                setProposalDate={setProposalDate}
              />
            )}

            {isProposalDialogOpen && selectedItem && (
              <ProposalModal
                isOpen={isProposalDialogOpen}
                onClose={() => setIsProposalDialogOpen(false)}
                item={selectedItem}
                setOpenSuccessModal={setOpenSuccessModal}
                setSuccessMessage={setSuccessMessage}
                fetchData={fetchPropsals}
              />
            )}

            {openSuccessModal && (
              <SuccessModal
                open={openSuccessModal}
                handleClose={() => setOpenSuccessModal(false)}
                successMessage={successMessage}
              />
            )}
          </Grid>
        </Grid>
      </MainCard >
    </>
  );



  return (
    <>
      <MainCard
        title="Proposal"
        darkTitle={jobDetails.title}
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>


          </Grid>
        </Grid>
      </MainCard >
    </>
  );


};

export default PermanentJobProposal;
