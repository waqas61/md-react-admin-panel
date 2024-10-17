
import axios from "axios";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Autocomplete,
  TextField,
} from "@mui/material";


import { selectUser, setRoleType, setUser } from "../../../store/slices/userSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


//Step 1
export default function PersonalDetails({ setActiveStep }) {
  const user = useSelector(selectUser);
  const [title, setTitle] = useState(user && user.title ? user.title : "");
  const [zip, setZip] = useState(user && user.zip ? user.zip : "");
  const [state, setState] = useState(
    user && user.state_id ? user.state_id : ""
  );
  const [firstName, setFirstName] = useState(
    user && user.first_name ? user.first_name : ""
  );
  const [street, setStreet] = useState(user && user.street ? user.street : "");
  const [lastName, setLastName] = useState(
    user && user.last_name ? user.last_name : ""
  );
  const [city, setCity] = useState(user && user.city_id ? user.city_id : "");
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [cityQuery, setCityQuery] = useState("");
  const [cityPage, setCityPage] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [terms, setTerms] = useState(false);

  const [stateValue, setStateValue] = useState({});
  const [cityValue, setCityValue] = useState('');
  const [loader, setLoader] = React.useState(false);
  const [validZip, setValidZip] = React.useState(false);
  const [timeZoneOptions, setTimeZoneOptions] = useState([]);
  const [timeZoneId, setTimeZoneId] = useState(null);
  const [timeZone, setTimeZone] = useState(null);
  useEffect(() => {
    if (user && user.state_id) {
      setStateValue(
        stateOptions.find((option) => option.value === user.state_id)
      );
    }
  }, [user, stateOptions]);

  useEffect(() => {
    if (user && user.city_id) {
      setCityValue(
        cityOptions.find((option) => option.value === parseInt(user.city_id))
      );
    }
  }, [user]);

  const handleClose = () => {
    setTerms(false);
  };

  const getCities = async () => {
    try {
      const cityRes = await axios.get(
        `https://api.mddentalstaffing.com/api/v1/cities?name=${cityQuery}&page=${cityPage}`
      );

      const citiesArray = Object.values(cityRes.data.data).map((city) => ({
        value: city.id,
        label: city.name,
      }));

      if (cityPage === 1) {
        setCityOptions(citiesArray);
      } else {
        setCityOptions((prevOptions) => [...prevOptions, ...citiesArray]);
      }

      if (user.city_id) {
        setCityValue(
          citiesArray.find((option) => option.value === parseInt(user.city_id))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStates = async () => {
    try {
      const stateRes = await axios.get(
        "https://api.mddentalstaffing.com/api/v1/states"
      );

      const statesArray = Object.values(stateRes.data.data).map((state) => ({
        value: state.id,
        label: state.name,
      }));
      setStateOptions(statesArray);
      setStateValue(
        statesArray.find((option) => option.value === user.state_id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getTimeZones = async () => {
    try {
      const timeZoneRes = await axios.get(
        'https://api.mddentalstaffing.com/api/v1/zones'
      );

      const timeZoneArray = Object.values(timeZoneRes.data.data).map(
        (timeZone) => ({
          id: timeZone.id,
          label: timeZone.zone_name,
        })
      );
      setTimeZoneOptions(timeZoneArray);
    } catch (error) { }
  };

  const getCityStateByZip = async (zip) => {
    try {
      setLoader(true);
      const response = await axios.get(
        `https://api.mddentalstaffing.com/api/v1/get-city-state/${zip}`
      );

      const { state_city, status, lat_lon, formatted_address } = response.data.data.data;

      if (status === "OK") {
        const statesArray = [{
          value: state_city.id,
          label: state_city.name,
        }];

        const citiesArray = Object.values(state_city.cities).map((city) => ({
          value: city.id,
          label: city.name,
        }));

        setStateOptions(statesArray);
        setCityOptions(citiesArray);
        setStateValue(statesArray[0]);
        setCityValue(citiesArray[0]);
        setState(statesArray[0].value);
        setCity(citiesArray[0].value);
        // setLongitude(lat_lon.longitude);
        // setLatitude(lat_lon.latitude);
        setStreet(formatted_address);
        setValidZip(true);
        setLoader(false);
        // setOpenState(true);
        // setOpenCity(true);
      } else {
        setStateOptions([]);
        setCityOptions([]);
        setLoader(false);
        setValidZip(false);
        // handleClick();
        console.error('No results found for the given ZIP code');
      }
    } catch (error) {
      // Handle error from the API request
      console.error('Error fetching data from Google Maps API:', error);
    }
  };

  const handleZipCodeChange = async (e) => {
    const newZip = e.target.value;
    setZip(e.target.value)
    setValidZip(false);
    if (/(^\d{4}$)|(^\d{5}$)|(^\d{5}-\d{4}$)/.test(e.target.value)) {
      await getCityStateByZip(newZip);
    }
  };

  useEffect(() => {
    getTimeZones();
  }, []);

  useEffect(() => {
    // getCities();
  }, [cityQuery, cityPage]);

  const handleCityInputChange = (event, newInputValue) => {
    setCityQuery(newInputValue);
    setCityPage(1);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleStreetChange = (event) => {
    setStreet(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const token = localStorage.getItem("auth_token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = async (e) => {

    e.preventDefault();
    setIsLoading(true);
    const data = {
      title,
      first_name: firstName,
      last_name: lastName,
      zip,
      street,
      city_id: city,
      state_id: state,
      steps_completed: 1,
      time_zone_id: timeZoneId,
    };

    console.log('Save ===data', data);

    await axios
      .post(
        `https://api.mddentalstaffing.com/api/v1/signup/profile/personal-details`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res) {
          dispatch(setUser(res.data.data));
          localStorage.setItem('user', JSON.stringify(res.data.data));
          setActiveStep(2);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setIsLoading(false);
  };

  return (
    <>
      <Modal
        open={terms}
        onClose={() => {
          setTerms(false);
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          className="position-absolute top-50 px-0 px-md-5 pt-0 pt-md-5 pb-0 pb-md-4 text-start start-50 translate-middle bg-white rounded shadow-sm w-75"
          style={{ fontSize: "0.8rem" }}
        >
          <h4 className="font-weight-bold text-black mb-4">
            Terms and Conditions
          </h4>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh magnis
            gravida nunc sagittis, odio egestas. Neque risus id varius et
            mattis. Eget gravida urna pellentesque non lobortis bibendum
            consequat. Nisl cursus in euismod tellus ut sapien non. Sed amet
            nec, nunc eget. Dictum quam ipsum nunc, amet. Habitasse egestas
            fermentum nunc scelerisque cursus convallis in aliquam. Integer cras
            rhoncus, nibh dui tellus est et diam. Sit lectus id id sagittis
            turpis. Sit sit donec tellus lorem. Quam viverra dictum amet, arcu.
            Vulputate tellus pellentesque nam eget sagittis urna scelerisque.
            Amet elit justo, praesent et sed in cursus turpis arcu. Quisque
            justo, pretium ullamcorper in sem fermentum. Sit faucibus blandit
            tortor lorem ac ac massa sit mattis. Tempus varius faucibus maecenas
            est, sed risus, tellus egestas. Nunc egestas bibendum adipiscing
            consectetur malesuada nunc vel commodo. Accumsan, suspendisse
            fringilla a gravida sit aliquam enim eu massa. Ac diam felis
            elementum nisi, massa ut ut nisi. Interdum tempus velit id diam
            volutpat. <br /> <br /> Velit sit tellus urna semper enim urna amet
            dictumst nullam. Sed pellentesque egestas pharetra et ultricies
            feugiat pulvinar. Neque mauris elementum gravida scelerisque magna
            mi. Duis molestie arcu, ut scelerisque volutpat. Tortor sed sapien
            turpis sem praesent morbi est sit. Ornare etiam aliquet at sed in.
            Luctus vitae consectetur nulla sed consectetur tempus, tempor. Arcu,
            nec, convallis et orci nisl. Scelerisque diam varius sollicitudin
            non sit. Fusce vitae vel lectus vulputate orci. Eget ornare aliquet
            turpis massa tortor, platea blandit elementum commodo. A, amet sed
            tortor a, ac ridiculus dictum amet. Maecenas nulla mi volutpat
            tellus tellus amet, ac aenean ligula. Urna, ipsum pretium, id turpis
            ultrices lacus, congue. Convallis metus purus dolor accumsan tortor.
            In orci turpis interdum molestie adipiscing dictumst. Aliquam
            malesuada enim arcu egestas elit. Mi purus, mi fusce eget. Tellus
            arcu, diam pharetra vitae urna mauris, parturient nibh neque.
          </p>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="mx-2" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Ok
            </Button>
          </div>
        </div>
      </Modal>
      <Typography
        variant="h5"
        sx={{ mt: 1, mb: 2 }}
      >
        Personal Details
      </Typography>
      {/* <Typography variant="h3">Responsive h3</Typography>
      <Typography variant="h4">Responsive h4</Typography>
      <Typography variant="h5">Responsive h5</Typography> */}

      <form onSubmit={handleNext}>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <TextField
                fullWidth
                required
                size="small"
                label="Title"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <TextField
                fullWidth
                required
                size="small"
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <TextField
                fullWidth
                required
                size="small"
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <TextField
                fullWidth
                required
                label="ZIP"
                size="small"
                variant="outlined"
                value={zip}
                onChange={handleZipCodeChange}
                // onChange={(e) => setZip(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <>
                      <InputAdornment position="right">
                        {loader ? (
                          <CircularProgress size='1rem' />
                        ) : (
                          <>
                            {validZip ? (
                              <CheckIcon />
                            ) : (
                              <>
                                {zip.length >= 5 ? (
                                  <ClearIcon onClick={(e) => {

                                  }} />
                                ) : (
                                  <></>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </InputAdornment>
                    </>
                  ),
                  pattern: "^\\d{5}$",
                  title: "ZIP code can be only 5-digit",
                  minLength: 5,
                  maxLength: 5
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <Autocomplete
                fullWidth
                size='small'
                options={stateOptions ? stateOptions : []}
                getOptionLabel={(option) => (option.label ? option.label : '')}
                value={stateValue}
                onChange={(event, newValue) => {
                  setState(newValue ? newValue.value : '');
                  setStateValue(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="State"
                    required
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <Autocomplete
                fullWidth
                size='small'
                options={cityOptions ? cityOptions : []}
                getOptionLabel={(option) => (option.label ? option.label : '')}
                value={cityValue ? cityValue : ''}
                onChange={(event, newValue) => {
                  setCity(newValue ? newValue.value : '');
                  setCityValue(newValue);
                }}
                onInputChange={handleCityInputChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    label="City"
                    variant="outlined"
                  />
                )}
                MenuProps={{
                  onScroll: (e) => {
                    const target = e.target;
                    if (
                      target.scrollHeight - target.scrollTop ===
                      target.clientHeight
                    ) {
                      setCityPage((page) => page + 1);
                    }
                  },
                }}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <TextField
                fullWidth
                required
                className="w-100"
                label="Street"
                size="small"
                variant="outlined"
                value={street}
                InputProps={{
                  style: {
                    borderColor: "#BFBFBF",
                  },
                }}
                onChange={handleStreetChange}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <Autocomplete
                required
                size='small'
                options={timeZoneOptions ? timeZoneOptions : []}
                getOptionLabel={(option) => (option.label ? option.label : '')}
                value={timeZone}
                // onChange={(e) => setTimeZoneId(e.target.value)}
                onChange={(event, newValue) => {
                  setTimeZoneId(newValue.id);
                  setTimeZone(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Time Zone"
                    required
                    variant="outlined"
                  />
                )}
              />
            </Grid>

          </Grid>
        </Box>

        {user && user.role_type === "professional" && (
          <Box sx={{ mt: 4 }} >
            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    // <span>
                    //   By creating a Mayday Dental Staffing Account, you agree to
                    //   Mayday Dental Staffing's{" "}
                    // <span
                    //   onClick={() => {
                    //     setTerms(true);
                    //   }}
                    //   className="text-underline"
                    //   style={{ textDecoration: "underline", color: "#2561B0" }}
                    // >
                    //   Terms And Conditions
                    // </span>
                    // </span>



                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      sx={{ mt: 1, mb: 2 }}
                    >
                      By creating a Mayday Dental Staffing Account, you agree to
                      Mayday Dental Staffing's{" "}

                      <span
                        onClick={() => {
                          setTerms(true);
                        }}
                        className="text-underline"
                        style={{ textDecoration: "underline", color: "#2561B0" }}
                      >
                        Terms And Conditions
                      </span>

                    </Typography>








                  }
                />
              </Grid>
            </Grid>
          </Box>
        )}

        <Box sx={{ mt: 4 }} >
          <Grid container spacing={3}>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <Button
                variant="outlined"
                color="primary"
                style={{ height: "2.5rem", width: "100%" }}
                sx={{
                  borderRadius: "4px",
                  color: "#2561B0",
                  textTransform: "none",
                }}
                onClick={() => {
                  dispatch(setRoleType("general"));
                  navigate("/selectRole");
                }}
              >
                Back
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={4}
            >
              <Button
                type="submit"
                variant="contained"
                style={{ height: "2.5rem", width: "100%" }}
                color="primary"
                sx={{
                  borderRadius: "4px",
                  background: "#2561B0",
                  textTransform: "none",
                }}
                disabled={
                  (user && user.role_type === "professional" && !isChecked) ||
                  !zip ||
                  !city ||
                  !state ||
                  !firstName ||
                  !lastName ||
                  !street ||
                  !cityValue
                }
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Next Step"
                )}
              </Button>
            </Grid>

          </Grid>
        </Box>


      </form>
    </>
  );
}
