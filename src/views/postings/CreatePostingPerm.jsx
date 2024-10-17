import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import { Button, Grid, Typography } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// project imports
import SubCard from '../../ui-component/cards/SubCard';
import MainCard from '../../ui-component/cards/MainCard';
import SecondaryAction from '../../ui-component/cards/CardSecondaryAction';
import CustomDataGrid from '../../ui-component/CustomDataGrid';
import Position from '../../ui-component/create-posting/Position';
import DirectBooking from '../../ui-component/create-posting/DirectBooking';
import PostingDates from '../../ui-component/create-posting/PostingDates';

import { convertDataArray, convertTo24Hour } from '../../utils/helper';

//Store
import { gridSpacing } from '../../store/constant';


export default function CreatePostingPerm() {
  const [editMode, setEditMode] = useState(false);
  const [cloneMode, setCloneMode] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [postingData, setPostingData] = useState({});
  const authToken = localStorage.getItem("auth_token");
  const jobType = "permanent";
  const navigate = useNavigate();

  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    if (url.includes("edit")) {
      setEditMode(true);
    } else if (url.includes("clone")) {
      setCloneMode(true);
    } else if (url.includes("view")) {
      setViewMode(true);
    }
  }, [url]);

  // Error States
  const [positionError, setPositionError] = useState(false);
  const [dirBookingError, setDirBookingError] = useState(false);
  const [datesError, setDatesError] = useState(false);

  // Success States
  const [positionSuccess, setPositionSuccess] = useState(false);
  const [dirBookingSuccess, setDirBookingSuccess] = useState(false);
  const [datesSuccess, setDatesSuccess] = useState(false);

  // Position
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [comments, setComments] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  // Direct Booking
  const [selectedPros, setSelectedPros] = useState([]);
  const [applicantsExist, setApplicantsExist] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");

  // Posting Dates
  const [tzone, setTzone] = useState("");
  const [postingSchedules, setPostingSchedules] = useState({
    type: "simple",
    startDate: "",
    endDate: "",
    days: {
      sunday: {
        isActive: false,
        startHours: 0,
        endHours: 0,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "AM",
      },
      monday: {
        isActive: false,
        startHours: 0,
        endHours: 0,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "AM",
      },
      tuesday: {
        isActive: false,
        startHours: 0,
        endHours: 0,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "AM",
      },
      wednesday: {
        isActive: false,
        startHours: 0,
        endHours: 0,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "AM",
      },
      thursday: {
        isActive: false,
        startHours: 0,
        endHours: 0,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "AM",
      },
      friday: {
        isActive: false,
        startHours: 0,
        endHours: 0,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "AM",
      },
      saturday: {
        isActive: false,
        startHours: 0,
        endHours: 0,
        startMinutes: 0,
        endMinutes: 0,
        startPeriod: "AM",
        endPeriod: "AM",
      },
    },
  });

  useEffect(() => {
    if (postingSchedules.days.sunday.startHours === 0) {
      setPostingSchedules({
        ...postingSchedules,
        days: {
          ...postingSchedules.days,
          sunday: {
            ...postingSchedules.days.sunday,
            startHours: 9,
            endHours: 5,
            endPeriod: "PM",
          },
        },
      });
    } else if (postingSchedules.days.monday.startHours === 0) {
      setPostingSchedules({
        ...postingSchedules,
        days: {
          ...postingSchedules.days,
          monday: {
            ...postingSchedules.days.monday,
            startHours: 9,
            endHours: 5,
            endPeriod: "PM",
          },
        },
      });
    } else if (postingSchedules.days.tuesday.startHours === 0) {
      setPostingSchedules({
        ...postingSchedules,
        days: {
          ...postingSchedules.days,
          tuesday: {
            ...postingSchedules.days.tuesday,
            startHours: 9,
            endHours: 5,
            endPeriod: "PM",
          },
        },
      });
    } else if (postingSchedules.days.wednesday.startHours === 0) {
      setPostingSchedules({
        ...postingSchedules,
        days: {
          ...postingSchedules.days,
          wednesday: {
            ...postingSchedules.days.wednesday,
            startHours: 9,
            endHours: 5,
            endPeriod: "PM",
          },
        },
      });
    } else if (postingSchedules.days.thursday.startHours === 0) {
      setPostingSchedules({
        ...postingSchedules,
        days: {
          ...postingSchedules.days,
          thursday: {
            ...postingSchedules.days.thursday,
            startHours: 9,
            endHours: 5,
            endPeriod: "PM",
          },
        },
      });
    } else if (postingSchedules.days.friday.startHours === 0) {
      setPostingSchedules({
        ...postingSchedules,
        days: {
          ...postingSchedules.days,
          friday: {
            ...postingSchedules.days.friday,
            startHours: 9,
            endHours: 5,
            endPeriod: "PM",
          },
        },
      });
    } else if (postingSchedules.days.saturday.startHours === 0) {
      setPostingSchedules({
        ...postingSchedules,
        days: {
          ...postingSchedules.days,
          saturday: {
            ...postingSchedules.days.saturday,
            startHours: 9,
            endHours: 5,
            endPeriod: "PM",
          },
        },
      });
    }
  }, [postingSchedules]);

  const generateSchedules = (postingSchedules) => {
    const resultArray = [];
    for (const day in postingSchedules.days) {
      if (postingSchedules.days.hasOwnProperty(day)) {
        const scheduleDate = postingSchedules.startDate;
        const scheduleDay = day;
        const startTime = convertTo24Hour(
          postingSchedules.days[day].startHours,
          postingSchedules.days[day].startMinutes,
          postingSchedules.days[day].startPeriod
        );
        const isWorking = postingSchedules.days[day].isActive;
        const endTime = convertTo24Hour(
          postingSchedules.days[day].endHours,
          postingSchedules.days[day].endMinutes,
          postingSchedules.days[day].endPeriod
        );
        if (isWorking) {
          resultArray.push({
            schedule_date: scheduleDate,
            schedule_day: scheduleDay,
            start_time: startTime,
            is_working: isWorking,
            end_time: endTime,
          });
        }
      }
    }

    return resultArray;
  };

  useEffect(() => {
    if (url.includes("edit") || url.includes("clone") || url.includes("view")) {
      axios
        .get(`https://api.mddentalstaffing.com/api/v1/owner/postings/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((res) => {
          setPostingData(res.data.data);
          setTitle(res.data.data.title);
          setSelectedCategory(res.data.data.category_id);
          setSelectedSubCategories(
            res.data.data.posting_sub_categories.map((sub) => {
              return {
                id: sub.sub_category_id,
                is_active: sub.is_active,
                category_id: res.data.data.category_id,
                deleted_at: null,
              };
            })
          );
          setComments(res.data.data.comments);
          setTzone(res.data.data.time_zone_id);
          const postingSchedules = convertDataArray(
            res.data.data.posting_schedules,
            res.data.data.posting_schedule
          );
          postingSchedules.startDate = res.data.data.start_date;
          postingSchedules.endDate = res.data.data.end_date;
          postingSchedules.type = res.data.data.posting_schedule;
          setPostingSchedules(postingSchedules);
          const languages = res.data.data.post_languages.split(/,\s*|,/);

          const selectedLanguages = languages.map((lang) => {
            return {
              language_name: lang,
            };
          });
          setSelectedLanguages(selectedLanguages);
          setSelectedPros(
            res.data.data.posting_direct_bookings.map((pro) => pro.user)
          );
          const location = res.data.data.user_location;
          setSelectedLocation(location);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [authToken, id, url]);

  useEffect(() => {
    if (url.includes("view") || postingData.applicants_count > 0) {
      setViewMode(true);
    }
  }, [applicantsExist, setApplicantsExist, url, postingData.applicants_count]);

  const handleSavePosting = () => {
    let firstErrorElement = null;
    if (!selectedCategory || !selectedLanguages) {
      setPositionError(true);
      setPositionSuccess(false);
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector("#position");
      }
    } else if (selectedCategory && selectedLanguages) {
      setPositionSuccess(true);
      setPositionError(false);
    }

    if (title === "") {
      setPositionError(true);
      setPositionSuccess(false);
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector("#position");
      }
    } else if (title !== "") {
      setPositionSuccess(true);
      setPositionError(false);
    }

    if (postingSchedules.startDate === "" || selectedLocation === "") {
      setDatesError(true);
      setDatesSuccess(false);
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector("#postingDates");
      }
    } else if (postingSchedules.startDate !== "" || selectedLocation !== "") {
      setDatesError(false);
      setDatesSuccess(true);
    }

    if (tzone === "") {
      setDatesError(true);
      setDatesSuccess(false);
      if (!firstErrorElement) {
        firstErrorElement = document.querySelector("#postingDates");
      }
    } else if (tzone !== "") {
      setDatesError(false);
      setDatesSuccess(true);
    }

    if (
      selectedCategory &&
      selectedLanguages &&
      (postingSchedules.startDate !== "" || selectedLocation !== "") &&
      title !== "" &&
      tzone !== ""
    ) {
      handleSubmit();
    } else {
      firstErrorElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    const languages = selectedLanguages
      .map((lang) => lang.language_name)
      .join(", ");
    const booking_type = selectedPros.length > 0 ? "direct" : "all";
    const posting_status = "new";
    const professionalIds = selectedPros.map((professional) => professional.id);
    const generatedSchedules = generateSchedules(postingSchedules);

    const sundayLength = generatedSchedules.filter(
      (schedule) => schedule.schedule_day === "sunday"
    ).length;

    const saturdayLength = generatedSchedules.filter(
      (schedule) => schedule.schedule_day === "saturday"
    ).length;

    const data = {
      title: title,
      posting_type: "permanent",
      category_id: selectedCategory,
      post_languages: languages,
      user_location_id: selectedLocation.id,
      booking_type: booking_type,
      posting_meta: {
        end_time: "15:30:00",
        start_time: "09:30:00",
        saturday_include: saturdayLength,
        sunday_included: sundayLength,
      },
      // direct_booking_conformation_hours: confirmationHours,
      // on_refuses_extendable: extendable,
      // on_refuses_deletable: deleteable,
      start_date: postingSchedules.startDate,
      end_date: postingSchedules.endDate,
      time_zone_id: tzone,
      posting_status: posting_status,
      posting_schedules: generatedSchedules,
      posting_schedule: postingSchedules.type,
    };

    if (booking_type === "direct") {
      data.direct_booking_user_ids = professionalIds;
    }

    if (editMode) {
      data.id = postingData.id;
      data.sub_category_ids = selectedSubCategories.map((sub) => sub.id);
    } else {
      data.sub_categories_ids = selectedSubCategories.map((sub) => sub.id);
    }

    if (editMode) {
      handleEditPosting({ data, id });
    } else if (cloneMode) {
      handleCreatePosting({ data });
    } else {
      handleCreatePosting({ data });
    }
  };

  const handleCreatePosting = async ({ data }) => {
    try {
      const response = await axios.post(
        "https://api.mddentalstaffing.com/api/v1/owner/postings",
        JSON.stringify(data),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        let successMessage = "";
        if (cloneMode) {
          successMessage = "Your posting has been successfully cloned!";
        } else {
          successMessage = "Your posting has been successfully created!";
        }
        navigate("/posting/permanent-job", {
          state: { successMessage },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPosting = async ({ data, id }) => {
    try {
      const response = await axios.put(
        `https://api.mddentalstaffing.com/api/v1/owner/postings/${id}`,
        JSON.stringify(data),
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const successMessage = "Your posting has been successfully edited!";
        navigate("/posting/permanent-job", {
          state: { successMessage },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <MainCard
        title="Create postings"
        secondary={
          <SecondaryAction
            link="/posting/permanent-job"
            icon={<CloseOutlinedIcon
              sx={{
                color: "#000",
                fontSize: "42px",
                borderRadius: "50%",
                border: "1px solid #ccc",
                padding: "8px",
                backgroundColor: "#fff",
              }}
            />}
          />
        }
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            <Grid
              sx={{
                px: 3,
                pt: 2,
                pb: 1,
                borderBottom: "1px solid #D9D9D9",
                width: "auto",
              }}
            >
              {/* <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <h4 className="pb-0 mb-1" style={{ color: "#262626" }}>
                  {editMode
                    ? "Edit Posting"
                    : cloneMode
                      ? "Clone Posting"
                      : viewMode
                        ? "View Posting"
                        : "Create Posting"}
                </h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/posting/permanent-job")}
                >
                  <p style={{ marginRight: "10px", color: "#808080" }}>Close</p>
                  <CloseOutlinedIcon
                    sx={{
                      color: "#000",
                      fontSize: "42px",
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      padding: "8px",
                      backgroundColor: "#fff",
                    }}
                  />
                </div>
              </Grid> */}


              <p style={{ color: "#8C8C8C", fontSize: "0.8rem" }}>
                {selectedCategory === 1
                  ? "Assistants"
                  : selectedCategory === 2
                    ? "Hygienist"
                    : selectedCategory === 3
                      ? "Front Office"
                      : selectedCategory === 4
                        ? "Dentist/Specialists"
                        : "-"}
              </p>
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
              <p style={{ color: "#000000" }}>{title.length > 0 ? title : "-"}</p>
              <p
                className="pb-0 mb-0"
                style={{ color: "#595959", fontSize: "0.8rem" }}
              >
                Location
              </p>
              <p style={{ color: "#000000" }}>
                {selectedLocation.place_name ? selectedLocation.place_name : "-"}
              </p>
            </Grid>

            <Position
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              title={title}
              setTitle={setTitle}
              selectedLanguages={selectedLanguages}
              setSelectedLanguages={setSelectedLanguages}
              comments={comments}
              setComments={setComments}
              errorState={positionError}
              setErrorState={setPositionError}
              successState={positionSuccess}
              jobType={jobType}
              setSelectedSubCategories={setSelectedSubCategories}
              selectedSubCategories={selectedSubCategories}
              editMode={editMode}
              viewMode={viewMode}
            />

            <DirectBooking
              selectedSubCategories={selectedSubCategories}
              selectedCategory={selectedCategory}
              selectedPros={selectedPros}
              setSelectedPros={setSelectedPros}
              errorState={dirBookingError}
              setErrorState={setDirBookingError}
              successState={dirBookingSuccess}
              jobType={jobType}
              viewMode={viewMode}
              applicantsExist={setApplicantsExist}
            />

            <PostingDates
              postingSchedules={postingSchedules}
              setPostingSchedules={setPostingSchedules}
              tzone={tzone}
              setTzone={setTzone}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              errorState={datesError}
              successState={datesSuccess}
              setErrorState={setPositionError}
              jobType={jobType}
              viewMode={viewMode}
            />
            <div className="ms-2">
              <Button
                onClick={() => {
                  navigate("/posting/permanent-job");
                }}
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
              {!viewMode && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSavePosting();
                  }}
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
              )}
            </div>

          </Grid>
        </Grid>
      </MainCard >
    </>
  );

  // return (
  //   <Layout
  //     items={[
  //       {
  //         name: "Postings",
  //         link: "/",
  //       },
  //       {
  //         name: "Permanent Job",
  //         link: "/owner/postings/permanent",
  //       },
  //     ]}
  //   >


  //   </Layout>
  // );
}
