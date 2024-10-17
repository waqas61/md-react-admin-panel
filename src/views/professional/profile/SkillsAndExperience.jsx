
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from 'axios';
import { useFormik } from "formik";
import { Formik, Form, FieldArray, FormikProvider } from "formik";
import isEmailValidator from 'validator/lib/isEmail';
import { TagsInput } from "react-tag-input-component";
import { useFormikContext, getIn } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Typography,
  FormControl,
  FormHelperText,
  TextareaAutosize,
  TextField,
} from "@mui/material";

import {
  Stack,
  OutlinedInput,
  Chip,
  Autocomplete,
} from "@mui/material";

import { DialogContent, DialogTitle, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxIcon from '@mui/icons-material/AddBox';

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import AddIcon from '@mui/icons-material/Add';


import SubCard from '../../../ui-component/cards/SubCard';
import MainCard from '../../../ui-component/cards/MainCard';
import PanelCard from '../../../ui-component/cards/PanelCard';
import SecondaryAction from '../../../ui-component/cards/CardSecondaryAction';

import SuccessModal from '../../../ui-component/SuccessModal';
import ErrorModal from '../../../ui-component/ErrorModal';
import CustomDatePicker from "../../../ui-component/create-posting/CustomDatePicker";

import { selectUser, setUser } from '../../../store/slices/userSlice';
import { gridSpacing } from '../../../store/constant';


import ExperienceInputs from "./ExperienceInputs";




const langs = [
  {
    "name": "one",
    "id": 1
  },
  {
    "name": "two",
    "id": 2
  },
  {
    "name": "three",
    "id": 3
  }
];

const SkillsAndExperience = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [progressValue, setProgressValue] = useState(0);
  const [progressColor, setProgressColor] = useState("#FA5A16");
  const [submission, setSubmission] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openFailModal, setOpenFailModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [universityName, setUniversityName] = useState(user.university_name);
  const [degreeName, setDegreeName] = useState(user.degree_name);
  const [degreeOptions, setDegreeOptions] = useState([]);
  const [educationOptions, setEducationOptions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [userSkills, setUserSkills] = useState(() => {
    let user_skills = [];
    if (Array.isArray(user.user_skills)) {
      user.user_skills.map((value, index) => {
        user_skills.push(value);
      });
    }
    return user_skills;
  });

  const [experiences, setExperiences] = useState(() => {
    let experiences = [];
    if (Array.isArray(user.user_experiences)) {
      user.user_experiences.map((list) => {
        experiences.push({
          company_name: list.company_name,
          start_date: list.start_date,
          end_date: list.end_date,
          description: list.description,
          contact_email: list.contact_email,
          contact_name: list.contact_name,
          contact_phone: list.contact_phone,
        });
      });
    }

    if (user.user_experiences.length == 0) {
      experiences.push({
        company_name: "",
        start_date: "",
        end_date: "",
        description: "",
        contact_email: "",
        contact_name: "",
        contact_phone: "",
      });
    }
    return experiences;
  });

  const [userLanguages, setUserLanguages] = useState(() => {
    let user_languages = [];
    if (Array.isArray(user.user_languages)) {
      user.user_languages.map((value, index) => {
        user_languages.push(value);
      });
    }
    return user_languages;
  });

  const schema = Yup.object().shape({
    university_name: Yup.string().required("Educataion is required"),
    // degree_name: Yup.string().required("Highest Degree is required"),
    // user_languages: Yup.string().required("Language is required"),
    user_languages: Yup.array().min(1, "Days of the week are required").required("required"),
    // user_skills: Yup.string().required("Skills are required"),
    user_skills: Yup.array().min(1, "At least one skill").required("required"),
    // contact_email: Yup.string().email("Email Format is not correct"),
    user_experiences: Yup.array().of(
      Yup.object().shape({
        company_name: Yup.string().required("Enter Company Name"),
        start_date: Yup.string().required("Select Start Date"),
        end_date: Yup.string().required("Select End Date"),
        description: Yup.string().required("Enter Description"),
        contact_email: Yup.string().email("Email Format is not correct")
          .required("Enter Email ID")
          .test("is-valid", (message) => `Email is invalid`, (value) => value ? isEmailValidator(value) : new Yup.ValidationError("Invalid value")),
        contact_name: Yup.string().required("Enter Name"),
        contact_phone: Yup.string().required("Enter Phone Number")
      })
    )
  });

  const getEducation = async () => {
    try {
      const eduRes = await axios.get(
        'https://api.mddentalstaffing.com/api/v1/educations'
      );

      const eduArray = Object.values(eduRes.data.data).map((edu) => ({
        id: edu.id,
        name: edu.name,
      }));
      setEducationOptions(eduArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getDegree = async () => {
    try {
      const degreeRes = await axios.get(
        'https://api.mddentalstaffing.com/api/v1/degrees'
      );

      const degreeArray = Object.values(degreeRes.data.data).map((degree) => ({
        id: degree.id,
        name: degree.name,
      }));
      setDegreeOptions(degreeArray);
    } catch (error) {
      console.error(error);
    }
  };

  const getLanguages = async () => {
    axios
      .get('https://api.mddentalstaffing.com/api/v1/languages')
      .then((response) => {
        setLanguages(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching languages:', error);
      });
  }

  // let experiences = [];
  // useEffect(() => {
  //   user.user_experiences.map((list) => {
  //     experiences.push({
  //       company_name: list.company_name,
  //       start_date: list.start_date,
  //       end_date: list.end_date,
  //       description: list.description,
  //       contact_email: list.contact_email,
  //       contact_name: list.contact_name,
  //       contact_phone: list.contact_phone,
  //     });
  //   });
  // }, [experiences]);

  const formik = useFormik({
    initialValues: {
      university_name: universityName,
      user_languages: userLanguages,
      degree_name: degreeName,
      user_skills: userSkills,
      user_experiences: experiences
    },

    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      handleSave(values);
    },
  });

  const handleSave = async (data) => {
    setIsLoading(true);
    const API_BASE_URL = 'https://api.mddentalstaffing.com/api/v1';
    await axios.put(
      `${API_BASE_URL}/profile/basic-info`,
      data,
      {
        headers: {
          method: 'PUT',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      }
    )
      .then((res) => {
        const updatedUser = {
          ...user,
          university_name: formik.values.university_name,
          user_skills: res.data.data.user_skills,
          user_experiences: res.data.data.user_experiences,
          user_languages: res.data.data.user_languages,
        };

        dispatch(setUser(updatedUser));
        // console.log("user ", user);
        // dispatch(setUser(res.data.data));
        localStorage.setItem('user', JSON.stringify(res.data.data));
        setSubmission(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(`Error!`);
        setIsLoading(false);
        setOpenFailModal(true);
      });
  };

  const addExperiences = (values, setValues) => {
    const user_experiences = [...values.user_experiences];
    user_experiences.push({
      company_name: "",
      start_date: "",
      end_date: "",
      description: "",
      contact_email: "",
      contact_name: "",
      contact_phone: "",
    });
    setValues({ ...values, user_experiences });
  };

  const updateUserExperiences = (values, setValues) => {
    const user_experiences = [...values.user_experiences];
    user.user_experiences.map((list) => {
      user_experiences.push({
        company_name: list.company_name,
        start_date: list.start_date,
        end_date: list.end_date,
        description: list.description,
        contact_email: list.contact_email,
        contact_name: list.contact_name,
        contact_phone: list.contact_phone,
      });
    });
    setValues({ ...values, user_experiences });
  };

  const removeExperience = (i, values, setValues) => {
    const user_experiences = [...values.user_experiences];
    user_experiences.splice(i, 1);
    setValues({ ...values, user_experiences });
  };

  const progress = () => {
    const group1Completed = !!formik.values.university_name && !!formik.values.user_languages && !!formik.values.degree_name;
    const group2Completed = !!formik.values.user_skills;
    const group3Completed = !!formik.values.user_experiences;
    const totalGroups = 3;
    const completedGroups = [
      group1Completed,
      group2Completed,
      group3Completed,
    ].filter(Boolean).length;

    const newProgress = (completedGroups / totalGroups) * 100;
    setProgressValue(Math.ceil(newProgress));

    if (newProgress === 75) setProgressColor("#FFCF33");
    if (group2Completed && !group1Completed && !group3Completed)
      setProgressColor("#FFCF33");
    else if (group1Completed && group3Completed && !group2Completed)
      setProgressColor("#FFCF33");
    else if ((group1Completed || group3Completed) && !group2Completed)
      setProgressColor("#FA5A16");
    else if (group1Completed && group2Completed && group3Completed)
      setProgressColor("#4CAF50");
  };

  useEffect(() => {
    progress();
    getEducation();
    getDegree();
    getLanguages();
  }, []);


  return (
    <>
      <MainCard
        title="My Account"
        darkTitle="Skills and Experience"
      >
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>

            <Grid
              sx={{
                px: 3,
                pt: 2,
                pb: 1,
                mb: 3,
                mt: 1,
                width: "auto",
              }}
            >


              {/* <form onSubmit={formik.handleSubmit}> */}
              <FormikProvider value={formik}>
                <form >
                  <Grid container marginTop={6}>
                    <Grid md={8.3}>
                      <Typography fontSize={"16px"} fontWeight={"semi-bold"}>
                        Basic Information
                      </Typography>

                      <Grid sm={11} mt={2}>
                        <Grid
                          container
                          gap={1}
                          sm={12}
                          justifyContent={"space-between"}
                        >
                          <Grid sm={12} lg={12}>
                            {" "}
                            <FormControl
                              sx={{ p: 0 }}
                              size="small"
                              variant="outlined"
                              className="my-form-control"
                              required
                              fullWidth
                            >
                              <InputLabel id="demo-simple-select-label">
                                Education
                              </InputLabel>


                              <Select
                                labelId="demo-simple-select-label"
                                id="university_name"
                                name="university_name"
                                value={formik.values.university_name}
                                defaultValue={formik.values.university_name}
                                label="university_name"
                                required
                                {...formik.getFieldProps("university_name")}
                              >
                                {educationOptions.map((list) => {
                                  return (
                                    <MenuItem
                                      key={list.id}
                                      value={list.id}
                                    >
                                      {list.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>

                              {formik.errors.university_name && formik.touched.university_name && (
                                <FormHelperText style={{ color: "#FA5A16" }}>
                                  Please choose an option
                                </FormHelperText>
                              )}
                            </FormControl>

                          </Grid>

                          <Grid xs={12} >

                            <FormControl
                              sx={{ p: 0, mt: 2 }}
                              size="small"
                              variant="outlined"
                              className="my-form-control"
                              required
                              fullWidth
                            >
                              <Autocomplete
                                multiple
                                id="user_languages"
                                options={languages.map((option) => option.language_name)}
                                defaultValue={userLanguages}
                                disableCloseOnSelect
                                required
                                // {...formik.getFieldProps("user_languages")}
                                onChange={(event, value) => {
                                  setUserLanguages(value);
                                  formik.setFieldValue('user_languages', userLanguages)
                                }}
                                renderOption={(props, option, { selected }) => {
                                  return (
                                    <MenuItem
                                      key={option}
                                      value={option}
                                      sx={{ justifyContent: "space-between" }}
                                      {...props}
                                    >
                                      {option}
                                      {selected ? <CheckIcon color="info" /> : null}
                                    </MenuItem>
                                  )

                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Languages"
                                    placeholder="Languages"
                                  />
                                )}
                              />

                              {formik.errors.user_languages && formik.touched.user_languages && (
                                <FormHelperText style={{ color: "#FA5A16" }}>
                                  Please Select Language.
                                </FormHelperText>
                              )}
                            </FormControl>

                          </Grid>



                          <br />
                          <Grid xs={12}>

                            <FormControl
                              sx={{ p: 0 }}
                              size="small"
                              variant="outlined"
                              className="my-form-control"
                              required
                              fullWidth
                            >


                              <Typography fontSize={"16px"} fontWeight={"semi-bold"}>
                                Your Key Skills
                              </Typography>
                              <Typography fontSize={"10px"} fontWeight={"semi-bold"}>
                                Please press "Enter" after each skill
                              </Typography>

                              <TagsInput
                                value={userSkills}
                                onChange={(user_skills) => {
                                  setUserSkills(user_skills);
                                  formik.setFieldValue('user_skills', userSkills)
                                }}
                                name="user_skills"
                                id="user_skills"
                                placeHolder="Enter Skills"
                              />
                              {formik.errors.user_skills && formik.touched.user_skills && (
                                <FormHelperText style={{ color: "#FA5A16" }}>
                                  Please Enter Skills.
                                </FormHelperText>
                              )}
                            </FormControl>

                          </Grid>
                        </Grid>
                      </Grid>

                      <Typography mt={3} fontSize={"16px"} fontWeight={"semi-bold"}>
                        <div
                          style={{
                            gap: '470px',
                            width: '100%',
                            // display: 'flex',
                            // justifyContent: 'flex-start',
                            // alignItems: 'center',
                          }}
                        >
                          <div>
                            Work Experience (Latest 3 Jobs)
                          </div>
                          <div>
                            {formik.values.user_experiences.length < 3 ? (
                              <>

                                <button
                                  onClick={(e) => addExperiences(formik.values, formik.setValues)}
                                  style={{
                                    backgroundColor: '#2561B0',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '3px 10px',
                                  }}
                                >
                                  <AddIcon
                                    style={{
                                      border: '1px solid #fff',
                                      color: '#fff',
                                      padding: '0',
                                      fontSize: '16px',
                                      marginRight: '5px',
                                      fontWeight: 'bold',
                                    }}
                                  />
                                  Add
                                </button>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </Typography>

                      {formik.values.user_experiences.map((object, index) => {
                        let id_input = 'company_name_' + index;
                        return (
                          <>
                            <Grid
                              sm={11}
                              mt={2}
                              mb={5}
                              px={3}
                              py={3}
                              container
                              style={{
                                boxShadow: "0px 4px 12px 0px #00000026",
                                borderRadius: "3px",
                              }}
                            >
                              <Typography fontSize={"14px"} fontWeight={"semi-bold"}>
                                Work Experience  {(index + 1)}
                              </Typography>

                              {formik.values.user_experiences.length > 1 && (

                                <>
                                  <IconButton
                                    sx={{
                                      // position: "absolute",
                                      top: "-40px",
                                      right: "-600px",
                                      // not necessary, just added this coz it looks weird
                                      background: "red"
                                    }}
                                    color="error"
                                    aria-label="add to shopping cart"
                                    onClick={() => removeExperience(index, formik.values, formik.setValues)}
                                  >
                                    <CloseIcon sx={{
                                      color: 'white'
                                    }} />

                                  </IconButton>
                                </>
                              )}

                              <Grid
                                container
                                gap={1}
                                sm={12}
                                justifyContent={"space-between"}
                                mt={1}
                              >
                                <Grid sm={5.5} lg={3.5} mt={0.9}>
                                  <ExperienceInputs
                                    name={`user_experiences.${index}.company_name`}
                                    placeholder="Company Name"
                                    type="text"
                                  />
                                </Grid>

                                {/* <Grid sm={5.5} lg={3.5}>
                                  <ExperienceInputs
                                    label={"Start Date"}
                                    name={`user_experiences.${index}.start_date`}
                                    placeholder="Select Date"
                                    type="date"
                                    value={object.start_date}
                                    onChange={(date) => {
                                      formik.setFieldValue(`user_experiences.${index}.start_date`, date)
                                    }}
                                  />
                                </Grid>*/}

                                {/* <Grid sm={5.5} lg={3.5}>
                                  <ExperienceInputs
                                    label={"End Date"}
                                    name={`user_experiences.${index}.end_date`}
                                    placeholder="Select Date"
                                    type="date"
                                    value={object.end_date}
                                    onChange={(date) => {
                                      formik.setFieldValue(`user_experiences.${index}.end_date`, date)
                                    }}
                                  />
                                </Grid> */}



                                <Grid sm={12}>
                                  {" "}
                                  <FormControl
                                    sx={{ p: 0, mt: 2 }}
                                    size="small"
                                    variant="outlined"
                                    className="my-form-control"
                                    required
                                    fullWidth
                                  >
                                    <Typography fontSize={"16px"} fontWeight={"semi-bold"}>
                                      Functions Performed
                                    </Typography>
                                    <ExperienceInputs
                                      name={`user_experiences.${index}.description`}
                                      placeholder="Description"
                                      type="textarea"
                                      value={object.description}
                                    />
                                  </FormControl>
                                </Grid>

                                <Typography
                                  mt={2}
                                  fontSize={"14px"}
                                  fontWeight={"semi-bold"}
                                >
                                  Contact Information of Employer
                                </Typography>

                                <Grid
                                  container
                                  gap={1}
                                  sm={12}
                                  justifyContent={"space-between"}
                                >
                                  <Grid sm={5.5} lg={3.5} mt={0.9}>
                                    <ExperienceInputs
                                      name={`user_experiences.${index}.contact_name`}
                                      placeholder="Name"
                                      type="text"
                                    />
                                  </Grid>
                                  <Grid sm={5.5} lg={3.5} mt={0.9}>
                                    <ExperienceInputs
                                      name={`user_experiences.${index}.contact_email`}
                                      placeholder="Email"
                                      type="email"
                                    />
                                  </Grid>
                                  <Grid sm={5.5} lg={3.5} mt={0.9}>
                                    <ExperienceInputs
                                      name={`user_experiences.${index}.contact_phone`}
                                      placeholder="Phone"
                                      type="phone"
                                      value={object.contact_phone}
                                    />
                                  </Grid>
                                </Grid>

                              </Grid>

                            </Grid>
                          </>
                        )
                      })}

                    </Grid>

                    <Grid md={3.6} display={"flex"} justifyContent={"end"}>
                      <Grid
                        item
                        px={3}
                        py={2.4}
                        sx={{
                          background: "#E8E8E8",
                          borderRadius: "5px",
                          fontSize: "2px",
                        }}
                        width={"92%"}
                        border={"1px solid #E8E8E8"}
                        height={"min-content"}
                      >
                        <Grid container>
                          <Grid
                            fontSize="14px"
                            color="#4CAF50"
                            fontWeight={"semi-bold"}
                          >
                            25%
                          </Grid>
                          <Grid fontSize="14px">
                            &nbsp;&nbsp;Add Basic Information
                          </Grid>
                        </Grid>

                        <Grid container mt={1}>
                          <Grid
                            fontSize="14px"
                            color="#4CAF50"
                            fontWeight={"semi-bold"}
                          >
                            50%
                          </Grid>
                          <Grid fontSize="14px">&nbsp;&nbsp;Add Work Experience</Grid>
                        </Grid>

                        <Grid container mt={1}>
                          <Grid
                            fontSize="14px"
                            color="#4CAF50"
                            fontWeight={"semi-bold"}
                          >
                            25%
                          </Grid>
                          <Grid fontSize="14px">
                            &nbsp;&nbsp;Information of your last employers
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid mt={5}>
                    <Grid>
                      <Button
                        variant="outline-primary"
                        type="submit"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "1px solid #2561B0",
                          borderRadius: "6px",
                          color: "#2561B0",
                          width: "160px",
                          whiteSpace: "nowrap",
                          fontSize: "bold",
                          height: "40px",
                        }}
                        onClick={formik.handleSubmit}
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}

                      </Button>
                    </Grid>
                  </Grid>

                </form>
              </FormikProvider>

            </Grid>


            {submission && (
              <SuccessModal
                open={submission}
                handleClose={() => setSubmission(false)}
                successMessage={'Experiences And Skills Updated Successfully'}
              />
            )}
            {openFailModal && (
              <ErrorModal
                open={openFailModal}
                handleClose={() => setOpenFailModal(false)}
                errorMessage={errorMessage}
              />
            )}

          </Grid>
        </Grid>
      </MainCard >
    </>
  );

};

export default SkillsAndExperience;
