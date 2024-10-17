import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

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
  Box,
  Grid,
  Typography,
  Card,
  Badge,
  Radio,
  RadioGroup,
  Switch,
  FormGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';

import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import CloseIcon from '@mui/icons-material/Close';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InfoIcon from '@mui/icons-material/Info';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import StarRating from './StarRating';
import { download } from './DownloadFile';
import Certificates from './Certificates';
import Vaccines from './Vaccines';


import { gridSpacing } from '../store/constant';


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="top" />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 320,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    dialogTitle: {
      backgroundColor: '#ffffff',
      color: '#333333',
      display: 'flex',
      alignItems: 'center',
    },
    dialog: {
      maxWidth: '70vw',
      maxHeight: '80vh',
      width: '100%',
      height: '100%',
    },
    categoryButtons: {
      display: 'flex',
      marginBottom: theme.spacing(2),
    },
    categoryButton: {
      padding: theme.spacing(1),
      backgroundColor: '#FAFAFA',
      color: '#333333',
      cursor: 'pointer',
      border: '1px solid #D8D8D8',
      marginLeft: '3px',
    },
    activeCategory: {
      backgroundColor: '#ffffff',
      color: '#2561B0',
      borderBottom: 'none',
    },
    content: {
      fontSize: '16px',
      lineHeight: '1.6',
    },
  }

});

function ApplicantPopup({ isOpen, onClose, selectedApplicant }) {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [showProfessionalScoreFields, setShowProfessionalScoreFields] = useState(true);
  const [user, setUser] = useState([]);
  const [questionnaire, setQuestionnaire] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [vaccinations, setVaccinations] = useState([]);
  const [rating, setRating] = useState([]);
  const [review, setreview] = useState(null);
  const [userLocations, setUserLocations] = useState([]);
  const [userCurrentLocation, setUserCurrentLocation] = useState(null);

  const getApplicant = async (selectedApplicant) => {
    axios.get(`https://api.mddentalstaffing.com/api/v1/owner/application-profile/${selectedApplicant.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    }).then((response) => {
      setUser(response.data.data);
      setQuestionnaire(JSON.parse(response.data.data.questionnaire_answers));
      let test = JSON.parse(response.data.data.questionnaire_answers);
      setCertificates(response.data.data.certificates);
      setVaccinations(response.data.data.vaccinations);
      setUserLocations(response.data.data.user_locations);
      setUserCurrentLocation(() => {
        return response.data.data.user_locations.find(location => location.is_current == true);
      })
      calculatereview(response.data.data);
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const toggleAdditionalFields = () => {
    setShowAdditionalFields(!showAdditionalFields);
  };

  const toggleProfessionalScoreFields = () => {
    setShowProfessionalScoreFields(!showProfessionalScoreFields);
  };

  const calculatereview = ((userRe) => {
    let ac_review = {
      professionalism: 0,
      punctuality: 0,
      appearance: 0,
      communication: 0,
      work_quality: 0,
    };
    userRe.professional_review.map((review, index) => {
      ac_review.professionalism = ac_review.professionalism + review.professionalism;
      ac_review.punctuality = ac_review.punctuality + review.punctuality;
      ac_review.appearance = ac_review.appearance + review.appearance;
      ac_review.communication = ac_review.communication + review.communication;
      ac_review.work_quality = ac_review.work_quality + review.work_quality;
    });
    ac_review.professionalism = ac_review.professionalism / userRe.professional_review.length;
    ac_review.punctuality = ac_review.punctuality / userRe.professional_review.length;
    ac_review.appearance = ac_review.appearance / userRe.professional_review.length;
    ac_review.communication = ac_review.communication / userRe.professional_review.length;
    ac_review.work_quality = ac_review.work_quality / userRe.professional_review.length;
    setRating(ac_review);
  });

  const downloadfile = ((fileId, type) => {

    const url = 'https://api.mddentalstaffing.com/api/v1/owner/download';
    const requestheader = {
      responseType: 'blob',
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
    };
    if (type == 'vaccination') {
      var vaccination = vaccinations.find(vaccination => vaccination.id === fileId);
      vaccination.model = 'UserVaccine';
      axios.post(`${url}`, vaccination, requestheader).then((response) => {
        download(response.data, `${vaccination.type}.${vaccination.file_extension}`);
      }).catch((e) => {
        console.log(e);
      });
    } else {
      var certificate = certificates.find(certificate => certificate.id === fileId);
      certificate.model = 'UserCertificate';
      axios.post(`${url}`, certificate, requestheader).then((response) => {
        download(response.data, `${certificate.document_title}.${certificate.file_extension}`);
      }).catch((e) => {
        console.log(e);
      });
    }
  });

  useEffect(() => {
    if (selectedApplicant) {
      getApplicant(selectedApplicant);
    }
  }, [selectedApplicant]);

  useEffect(() => {
  }, [userCurrentLocation]);




  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose();
        setShowAdditionalFields(false);
        setShowProfessionalScoreFields(false);
        setSelectedCategory('general');
      }}
      classes={{ paper: classes.dialog }}
    >
      <DialogTitle className={classes.dialogTitle}>
        Professional Profile
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          <CloseIcon onClick={onClose} />
        </div>
      </DialogTitle>
      <DialogContent>
        <div className={classes.categoryButtons}>
          <button
            className={`${classes.categoryButton} ${selectedCategory === 'general' && classes.activeCategory
              }`}
            onClick={() => handleCategoryChange('general')}
          >
            General
          </button>
          <button
            className={`${classes.categoryButton} ${selectedCategory === 'work-experience' && classes.activeCategory
              }`}
            onClick={() => handleCategoryChange('work-experience')}
          >
            Work Experience
          </button>
          <button
            className={`${classes.categoryButton} ${selectedCategory === 'additional-info' && classes.activeCategory
              }`}
            onClick={() => handleCategoryChange('additional-info')}
          >
            Additional Information
          </button>
        </div>
        {selectedApplicant ? (
          <div className={classes.content}>
            {selectedCategory === 'general' && (
              <div
                className='generalCategoryContent'
                style={{ display: 'flex' }}
              >
                <section className='categoryGeneralLeft'>
                  <div className='imgContent'>
                    {selectedApplicant ? (
                      <Avatar alt="Remy Sharp"
                        src={`https://api.mddentalstaffing.com/api/v1/assets/${selectedApplicant?.avatar}`}
                        sx={{ width: 125, height: 125 }}
                      />
                    ) : (
                      <AccountCircle style={{ fontSize: '125px' }} />
                    )}

                    <h3 style={{ paddingTop: '5px' }}>
                      {selectedApplicant.first_name}{' '}
                      {selectedApplicant.last_name}
                    </h3>
                  </div>
                  <div className='generalInfo'>
                    <h2 className='generalInfoHeading'>General Information</h2>
                    <div className='ApplicantWork-data-table'>
                      <div className='ApplicantWork-top'>
                        <div className='dataRow'>
                          <div className='header'>Location</div>
                          <div className='data'>{user.city ? user.city.name : ''} </div>
                        </div>
                        <div className='dataRow'>
                          <div className='header'>Desired Hourly Rate</div>
                          <div className='data'>{userCurrentLocation ? userCurrentLocation.desired_rate : 0}</div>
                        </div>
                        <div className='dataRow'>
                          <div className='header'>Speciality</div>
                          <div className='data'>
                            {user.user_sub_categories && user.user_sub_categories.map((sub, index) => (
                              <span key={sub.sub_category.id}>
                                {sub.sub_category.name}
                                {index < user.user_sub_categories.length - 1 ? ', ' : ''}
                              </span>
                            ))
                            }
                          </div>
                        </div>
                        <div className='dataRow'>
                          <div className='header'>Language</div>
                          <div className='data'>
                            {user.user_languages && user.user_languages.map((sub, index) => (
                              <span>
                                {sub}
                                {index < user.user_languages.length - 1 ? ', ' : ''}
                              </span>
                            ))}

                          </div>
                        </div>
                        <div className='dataRow'>
                          <div className='header'>Education</div>
                          <div className='data'>{user.education ? user.education.name : ''} </div>
                        </div>
                        <div className='dataRow'>
                          <div className='header'>Highest Degree Earned</div>
                          <div className='data'>
                            {user.degree ? user.degree.name : ''}
                          </div>
                        </div>
                      </div>
                    </div>



                    <div
                      className='ratingTop'
                      style={{ display: 'flex', margin: '40px 0px 20px 0' }}
                    >
                      <div>
                        <h3 style={{ fontSize: '12px' }}>Professional Score</h3>
                        {/* <StarRating rating={1} /> */}
                      </div>
                      <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >


                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              <Typography color="inherit">Please Note</Typography>
                              {"The average score of a professional is cumulative  from all previously worked offices."}
                            </React.Fragment>
                          }
                        >
                          <InfoIcon
                            style={{
                              marginLeft: '5px',
                              color: '#595959',
                              fontSize: 18,
                            }}
                          />
                        </HtmlTooltip>
                        <p
                          style={{
                            position: 'relative',
                            width: '250px',
                            borderBottom: '1px solid #E8E8E8',
                            bottom: '46%',
                            left: '10%',
                          }}
                        ></p>
                        {/* <ArrowDropDownIcon
                          style={{
                            position: 'relative',
                            left: '80px',
                            top: '4%',
                            backgroundColor: '#E8E8E8',
                            color: '#8C8C8C',
                            borderRadius: '5px',
                            fontSize: '18px',
                          }}
                          onClick={toggleProfessionalScoreFields}
                        /> */}
                      </div>
                    </div>


                    <div className='applicantRating'>
                      {showProfessionalScoreFields && (
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <span>Professionalism</span>
                              <span>
                                <StarRating rating={rating.professionalism ? rating.professionalism : 0} />
                              </span>
                            </div>
                            <div>
                              <span>Communication</span>
                              <span>
                                <StarRating rating={rating.communication ? rating.communication : 0} />
                              </span>
                            </div>
                            <div>
                              <span>Work Quality</span>
                              <span>
                                <StarRating rating={rating.work_quality ? rating.work_quality : 0} />
                              </span>
                            </div>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <span>Punctuality</span>
                              <span>
                                <StarRating rating={rating.punctuality ? rating.punctuality : 0} />
                              </span>
                            </div>
                            <div>
                              <span>Appearance</span>
                              <span>
                                <StarRating rating={rating.appearance ? rating.appearance : 0} />

                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div
                      className='ratingTop'
                      style={{ display: 'flex', margin: '20px 0 10px 0' }}
                    >
                      <div>
                        <h3 style={{ fontSize: '12px' }}>Average Score</h3>

                        <StarRating rating={user.average_score ? user.average_score : 0} />
                      </div>
                      <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                      >
                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              <Typography color="inherit">Please Note</Typography>
                              {"The average score of a professional is cumulative  from all previously worked offices."}
                            </React.Fragment>
                          }
                        >
                          <InfoIcon
                            style={{
                              marginLeft: '5px',
                              color: '#595959',
                              fontSize: 18,
                            }}
                          />
                        </HtmlTooltip>
                        <p
                          style={{
                            width: '280px',
                            borderBottom: '1px solid #E8E8E8',
                            position: 'relative',
                            bottom: '42%',
                            left: '8%',
                          }}
                        ></p>
                        {/* <ArrowDropDownIcon
                          style={{
                            position: 'relative',
                            left: '76px',
                            top: '10%',
                            backgroundColor: '#E8E8E8',
                            color: '#8C8C8C',
                            borderRadius: '5px',
                            fontSize: '18px',
                            cursor: 'pointer',
                          }}
                          onClick={toggleAdditionalFields}
                        /> */}
                      </div>
                    </div>
                    {/* <div className='applicantRating'>
                      {showAdditionalFields && (
                        <div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <span>Professionalism</span>
                              <span>
                                <StarRating rating={1} />
                              </span>
                            </div>
                            <div>
                              <span>Communication</span>
                              <span>
                                <StarRating rating={2} />
                              </span>
                            </div>
                            <div>
                              <span>Work Quality</span>
                              <span>
                                <StarRating rating={2} />
                              </span>
                            </div>
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                            }}
                          >
                            <div>
                              <span>Punctuality</span>
                              <span>
                                <StarRating rating={3} />
                              </span>
                            </div>
                            <div>
                              <span>Appearance</span>
                              <span>
                                <StarRating rating={2} />
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div> */}
                  </div>
                </section>
                <p
                  style={{
                    width: '1px',
                    height: '340px',
                    borderRight: '1px solid #E8E8E8',
                    position: 'absolute',
                    top: '26%',
                    right: '28%',
                  }}
                ></p>
                <section
                  className='categoryGeneralRight'
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '40%',
                  }}
                >
                  <div
                    style={{
                      borderLeft: '1px solid #E8E8E8',
                      paddingLeft: '10px',
                    }}
                  ></div>
                  <h4 style={{ fontSize: '14px' }}>Certificates / licenses</h4>
                  <div className='certificates'>
                    {certificates.map((file, index) => {
                      return (
                        <>
                          <img
                            src={Certificates(file.document_title)}
                            alt='certificate'
                            onClick={() => downloadfile(file.id, 'certificates')}
                            style={imageHover}
                          />


                          {/* {
                            file.file_extension == 'csv' ? (
                              <img
                                src='https://img.freepik.com/premium-vector/modern-flat-design-csv-file-icon-web_599062-6526.jpg'
                                alt='certificate'
                                onClick={() => downloadfile(file.id, 'certificates')}
                                style={imageHover}
                              />
                            ) : file.file_extension == 'pdf' ? (
                              <img
                                src='https://img.freepik.com/premium-vector/modern-flat-design-pdf-file-icon-web_599062-7115.jpg'
                                alt='certificate'
                                onClick={() => downloadfile(file.id, 'certificates')}
                                style={imageHover}
                              />
                            ) : file.file_extension == 'png' ? (
                              <img
                                src='https://blog.idrsolutions.com/app/uploads/2017/03/PNG.png'
                                alt='certificate'
                                onClick={() => downloadfile(file.id, 'certificates')}
                                style={imageHover}
                              />
                            ) : (
                              <img
                                src='https://cdn-icons-png.flaticon.com/512/7959/7959549.png'
                                alt='certificate'
                                onClick={() => downloadfile(file.id, 'vaccination')}
                                style={imageHover}
                              />
                            )
                          } */}
                        </>
                      )
                    })}
                  </div>
                  <br />
                  <h4 style={{ fontSize: '14px' }}>Vaccinations</h4>
                  <div className='certificates'>
                    {vaccinations.map((file, index) => {
                      console.log('file G', file);



                      return (
                        <>
                          <img
                            src={Vaccines(file.type.toUpperCase())}
                            alt='certificate'
                            onClick={() => downloadfile(file.id, 'vaccination')}
                            style={imageHover}
                          />




                          {/* {
                            file.file_extension == 'csv' ? (
                              <img
                                src='https://img.freepik.com/premium-vector/modern-flat-design-csv-file-icon-web_599062-6526.jpg'
                                alt='certificate'
                                onClick={() => downloadfile(file.id, 'vaccination')}
                                style={imageHover}
                              />
                            ) : file.file_extension == 'pdf' ? (
                              <img
                                src='https://img.freepik.com/premium-vector/modern-flat-design-pdf-file-icon-web_599062-7115.jpg'
                                alt='certificate'
                                onClick={() => downloadfile(file.id, 'vaccination')}
                                style={imageHover}
                              />
                            ) : file.file_extension == 'png' ? (
                              <img
                                src='https://blog.idrsolutions.com/app/uploads/2017/03/PNG.png'
                                alt='certificate'
                                onClick={() => downloadfile(file.id, 'vaccination')}
                                style={imageHover}
                              />
                            ) : (
                              <img
                                src='https://cdn-icons-png.flaticon.com/512/7959/7959549.png'
                                alt='certificate'
                                onClick={() => downloadfile(file.id, 'vaccination')}
                                style={imageHover}
                              />
                            )
                          } */}
                        </>
                      )



                    })}
                  </div>
                </section>
              </div>
            )}
            {selectedCategory === 'work-experience' && (
              <div className='applicantWorkExperiance'>
                <div className='topSection'>
                  <div className='firstExp'>
                    <p>Years/Months experience in the Dental field?</p>
                    <div className='yearExperiance'>
                      <div>
                        <label for='years'>Years</label>
                        <input type='text' name='years' value={questionnaire.years_worked.years} readOnly />
                      </div>
                      <div>
                        <label for='months'>Months</label>
                        <input type='text' name='months' value={questionnaire.years_worked.months} readOnly />
                      </div>
                    </div>
                  </div>
                  <div className='firstExp'>

                    {user.category_id == 1 ? (
                      <>
                        <p>How many years/months as an RDA/DA?</p>
                        <div className='yearExperiance'>
                          <div>
                            <label for='years'>Years</label>
                            <input type='text' name='years' value={questionnaire.years_as_rda.years} readOnly />
                          </div>
                          <div>
                            <label for='months'>Months</label>
                            <input type='text' name='months' value={questionnaire.years_as_rda.months} readOnly />
                          </div>
                        </div>
                      </>
                    ) : user.category_id == 2 ? (
                      <>
                        <p>How many years/months as an RDH?</p>
                        <div className='yearExperiance'>
                          <div>
                            <label for='years'>Years</label>
                            <input type='text' name='years' value={questionnaire.years_as_rdh.years} readOnly />
                          </div>
                          <div>
                            <label for='months'>Months</label>
                            <input type='text' name='months' value={questionnaire.years_as_rdh.months} readOnly />
                          </div>
                        </div>
                      </>
                    ) : user.category_id == 3 ? (
                      <>
                        <p>How many years/months as an Treatment Coordinator?</p>
                        <div className='yearExperiance'>
                          <div>
                            <label for='years'>Years</label>
                            <input type='text' name='years' value={questionnaire.years_as_treatment_coord.years} readOnly />
                          </div>
                          <div>
                            <label for='months'>Months</label>
                            <input type='text' name='months' value={questionnaire.years_as_treatment_coord.months} readOnly />
                          </div>
                        </div>
                      </>
                    ) : user.category_id == 4 ? (
                      <>
                        <p> How many years/months as an DDS?</p>
                        <div className='yearExperiance'>
                          <div>
                            <label for='years'>Years</label>
                            <input type='text' name='years' value={questionnaire.years_as_dds.years} readOnly />
                          </div>
                          <div>
                            <label for='months'>Months</label>
                            <input type='text' name='months' value={questionnaire.years_as_dds.months} readOnly />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                  </div>
                </div>
                <div className='bottomSection'>
                  <div>
                    <i>
                      <ArrowDownwardIcon />
                    </i>
                    Time Period
                  </div>
                  <div>
                    <i>
                      <ArrowDownwardIcon />
                    </i>
                    Company Name
                  </div>
                  <div>
                    <i>
                      <ArrowDownwardIcon />
                    </i>
                    Function Performed
                  </div>
                </div>
                {/* <pre>{JSON.stringify(user.user_experiences)}</pre> */}
                {user.user_experiences && user.user_experiences.map((exp, index) => {
                  return (
                    <div className='WorklastSection'>
                      <div>
                        <p>
                          From: {exp.start_date} <br /> TO : {exp.end_date}
                        </p>
                      </div>
                      <div>
                        <p>{exp.company_name}</p>
                      </div>
                      <div style={{ width: "250px" }}>
                        <p>
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  )
                })}

              </div>
            )}
            {selectedCategory === 'additional-info' && (
              <div className='AdditionalInfoContainer'>
                <div className='topInfo'>
                  <div>
                    Proificient with the following Digital Radiography System
                    <div className='techName'>
                      {questionnaire.practice_management_software && questionnaire.practice_management_software.map((ques, index) => (
                        <span>
                          {ques}
                          {index < questionnaire.practice_management_software.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    Proificient with the following Practice Management Software
                    <div className='techName'>
                      {questionnaire.radiography_systems && questionnaire.radiography_systems.map((ques, index) => (
                        <span>
                          {ques}
                          {index < questionnaire.radiography_systems.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <h4 className='midInfoHeading'>
                  Experience in the following Specialities
                </h4>

                {user.category_id == 1 ? (
                  <>
                    <div className='midInfo'>
                      <div>
                        <p>General : </p>
                        <p>{questionnaire.specialties.general}</p>
                      </div>
                      <div>
                        <p>Prostho: </p>
                        <p style={{ color: '#e8a113' }}>{questionnaire.specialties.prostho}</p>
                      </div>
                      <div>
                        <p>Cosmetic: </p>
                        <p>{questionnaire.specialties.cosmetic} </p>
                      </div>
                      <div>
                        <p>Pedo: </p>
                        <p>{questionnaire.specialties.pedo}</p>
                      </div>
                      <div>
                        <p>Ortho: </p>
                        <p style={{ color: '#e8a113' }}>{questionnaire.specialties.ortho}</p>
                      </div>
                      <div>
                        <p>Perio: </p>
                        <p>{questionnaire.specialties.perio}</p>
                      </div>
                      <div>
                        <p>Endo: </p>
                        <p>{questionnaire.specialties.endo}</p>
                      </div>
                      <div>
                        <p>Implants: </p>
                        <p style={{ color: '#4caf50' }}>{questionnaire.specialties.implants}</p>
                      </div>
                      <div>
                        <p>Oral Surgery: </p>
                        <p>{questionnaire.specialties.oralSurgery}</p>
                      </div>
                    </div>
                  </>
                ) : user.category_id == 2 ? (
                  <>
                    <div className='midInfo'>
                      <div>
                        <p>General: </p>
                        <p>{questionnaire.specialties.general} </p>
                      </div>
                      <div>
                        <p>Pedo : </p>
                        <p>{questionnaire.specialties.pedo}</p>
                      </div>
                      <div>
                        <p>Perio: </p>
                        <p style={{ color: '#e8a113' }}>{questionnaire.specialties.perio}</p>
                      </div>
                    </div>
                  </>
                ) : user.category_id == 3 ? (
                  <>
                    <div className='midInfo'>
                      <div>
                        <p>General: </p>
                        <p>{questionnaire.specialties.general} </p>
                      </div>

                      <div>
                        <p>Prostho : </p>
                        <p>{questionnaire.specialties.prostho}</p>
                      </div>
                      <div>
                        <p>Pedo: </p>
                        <p style={{ color: '#e8a113' }}>{questionnaire.specialties.pedo}</p>
                      </div>

                      <div>
                        <p>Cosmetic: </p>
                        <p>{questionnaire.specialties.cosmetic}</p>
                      </div>
                      <div>
                        <p>Ortho: </p>
                        <p style={{ color: '#e8a113' }}>{questionnaire.specialties.ortho}</p>
                      </div>
                      <div>
                        <p>Perio: </p>
                        <p>{questionnaire.specialties.perio}</p>
                      </div>
                      <div>
                        <p>Endo: </p>
                        <p>{questionnaire.specialties.endo}</p>
                      </div>
                      <div>
                        <p>Implants: </p>
                        <p style={{ color: '#4caf50' }}>{questionnaire.specialties.implants}</p>
                      </div>
                      <div>
                        <p>Oral Surgery: </p>
                        <p>{questionnaire.specialties.oralSurgery}</p>
                      </div>
                    </div>
                  </>
                ) : user.category_id == 4 ? (
                  <>

                    <div className='midInfo'>
                      <div>
                        <p>General: </p>
                        <p>{questionnaire.specialties.general} </p>
                      </div>
                      <div>
                        <p>Prostho: </p>
                        <p>{questionnaire.specialties.prostho}</p>
                      </div>
                      <div>
                        <p>Cosmetic: </p>
                        <p style={{ color: '#4caf50' }}>{questionnaire.specialties.cosmetic}</p>
                      </div>
                      <div>
                        <p>Pedo : </p>
                        <p>{questionnaire.specialties.pedo}</p>
                      </div>
                      <div>
                        <p>Ortho: </p>
                        <p style={{ color: '#e8a113' }}>{questionnaire.specialties.ortho}</p>
                      </div>
                      <div>
                        <p>Perio: </p>
                        <p style={{ color: '#e8a113' }}>{questionnaire.specialties.perio}</p>
                      </div>
                      <div>
                        <p>Endo: </p>
                        <p>{questionnaire.specialties.endo}</p>
                      </div>
                      <div>
                        <p>Implants: </p>
                        <p>{questionnaire.specialties.implants}</p>
                      </div>
                      <div>
                        <p>Oral Surgery: </p>
                        <p>{questionnaire.specialties.oralSurgery}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}


                {/* <div className='midInfo'>
                  <div>
                    <p>Pedo : </p>
                    <p>{questionnaire.specialties.pedo}</p>
                  </div>
                  <div>
                    <p>Perio: </p>
                    <p style={{ color: '#e8a113' }}>{questionnaire.specialties.perio}</p>
                  </div>
                  <div>
                    <p>General: </p>
                    <p>{questionnaire.specialties.general} </p>
                  </div>
                  <div>
                    <p>Implants: </p>
                    <p>{questionnaire.specialties.implants}</p>
                  </div>
                  <div>
                    <p>Ortho: </p>
                    <p style={{ color: '#e8a113' }}>{questionnaire.specialties.ortho}</p>
                  </div>
                  <div>
                    <p>Prostho: </p>
                    <p>{questionnaire.specialties.prostho}</p>
                  </div>
                  <div>
                    <p>Endo: </p>
                    <p>{questionnaire.specialties.endo}</p>
                  </div>
                  <div>
                    <p>Cosmetic: </p>
                    <p style={{ color: '#4caf50' }}>{questionnaire.specialties.cosmetic}</p>
                  </div>
                  <div>
                    <p>Oral Surgery: </p>
                    <p>{questionnaire.specialties.oralSurgery}</p>
                  </div>
                </div> */}

                <div style={{ border: '1px dotted #8c8c8c', margin: '0 20px' }}></div>

                {user.category_id == 1 ? (
                  <>
                    <div className='lastInfo'>
                      <div>
                        <span>Experienced in Cad-Cam (E4D or Cerec)</span>
                        <p> {questionnaire.additional_info.cadCam}</p>
                      </div>
                      <div>
                        <span>Experienced in Pano</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.additional_info.pano}</p>
                      </div>
                      <div>
                        <span>Experienced in 3D Imaging</span>
                        <p style={{ color: '#e8a113' }}>{questionnaire.additional_info.printers3D}</p>
                      </div>
                      <div>
                        <span>Experienced in Normad Portable X-Ray</span>
                        <p>{questionnaire.additional_info.nomadXRay}</p>
                      </div>
                      <div>
                        <span>Experienced in Intraoral Cameras</span>
                        <p>{questionnaire.additional_info.intraoralCameras}</p>
                      </div>
                      <div>
                        <span>Are you cross trained front to back?</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.additional_info.crossTrained}</p>
                      </div>
                      <div>
                        <span>Experienced in Cephalometric XRay machine</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.additional_info.cephalometricXRay}</p>
                      </div>
                    </div>
                  </>
                ) : user.category_id == 2 ? (
                  <>
                    <div className='lastInfo'>
                      <div>
                        <span>Do you feel comfortable working with Nitrous Oxide?</span>
                        <p> {questionnaire.additional_info.nitrousOxide}</p>
                      </div>
                      <div>
                        <span>Experienced in Pano</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.additional_info.pano}</p>
                      </div>
                      <div>
                        <span>Do you feel comfortable applying Arestin and other anti-microbials</span>
                        <p style={{ color: '#e8a113' }}>{questionnaire.additional_info.applyingAntiMicrobials}</p>
                      </div>
                      <div>
                        <span>Can you anesthetize by yourself?</span>
                        <p>{questionnaire.additional_info.anesthesizeSelf}</p>
                      </div>
                      <div>
                        <span>Experienced in Intraoral Cameras</span>
                        <p>{questionnaire.additional_info.intraoralCameras}</p>
                      </div>
                    </div>
                  </>
                ) : user.category_id == 3 ? (
                  <>

                    <div className='lastInfo'>
                      <div>
                        <span>Insurance billing</span>
                        <p> {questionnaire.responsibilities.insBilling}</p>
                      </div>
                      <div>
                        <span>Accounts Receivables/Payables</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.responsibilities.payables}</p>
                      </div>
                      <div>
                        <span>Posting</span>
                        <p style={{ color: '#e8a113' }}>{questionnaire.responsibilities.Posting}</p>
                      </div>
                      <div>
                        <span>Marketing/Social Media Integration</span>
                        <p>{questionnaire.responsibilities.marketing}</p>
                      </div>
                      <div>
                        <span>Treatment Presentation</span>
                        <p>{questionnaire.responsibilities.trPresentation}</p>
                      </div>
                      <div>
                        <span>Eligibility Verification?</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.responsibilities.elegVerification}</p>
                      </div>
                      <div>
                        <span>Claim Submission</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.responsibilities.clSubmission}</p>
                      </div>





                      <div>
                        <span>Office Management</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.responsibilities.officeManagement}</p>
                      </div>
                      <div>
                        <span>Patient coordination</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.responsibilities.patCoordination}</p>
                      </div>
                      <div>
                        <span>Financial Coordination</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.responsibilities.finCoordination}</p>
                      </div>
                      <div>
                        <span>Treatment Planning</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.responsibilities.trPlanning}</p>
                      </div>
                      <div>
                        <span>Collections</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.responsibilities.collections}</p>
                      </div>
                      <div>
                        <span>Patient Scheduling</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.responsibilities.patScheduling}</p>
                      </div>

                      <div>
                        <span>Insurance Payment Collection</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.responsibilities.insPaymentCollection}</p>
                      </div>
                      <div>
                        <span>Hygiene Recall</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.responsibilities.hygieneRecall}</p>
                      </div>

                      <div>
                        <span>Payroll</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.responsibilities.payroll}</p>
                      </div>

                    </div>
                  </>
                ) : user.category_id == 4 ? (
                  <>

                    <div className='lastInfo'>
                      <div>
                        <span>Experienced in Cad-Cam (E4D or Cerec)</span>
                        <p> {questionnaire.additional_info.cadCam}</p>
                      </div>
                      <div>
                        <span>Experienced in Pano</span>
                        <p style={{ color: '#4caf50' }}>{questionnaire.additional_info.pano}</p>
                      </div>

                      <div>
                        <span>Experienced in Intraoral Cameras</span>
                        <p>{questionnaire.additional_info.intraoralCameras}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {/* <div className='lastInfo'>
                  <div>
                    <span>Experienced in Cad-Cam (E4D or Cerec)</span>
                    <p> {questionnaire.additional_info.cadCam}</p>
                  </div>
                  <div>
                    <span>Experienced in Pano</span>
                    <p style={{ color: '#4caf50' }}>{questionnaire.additional_info.cadCam}</p>
                  </div>
                  <div>
                    <span>Experienced in 3D Imaging</span>
                    <p style={{ color: '#e8a113' }}>{questionnaire.additional_info.pano}</p>
                  </div>
                  <div>
                    <span>Experienced in Normad Portable X-Ray</span>
                    <p>{questionnaire.additional_info.nomadXRay}</p>
                  </div>
                  <div>
                    <span>Experienced in Intraoral Cameras</span>
                    <p>{questionnaire.additional_info.intraoralCameras}</p>
                  </div>
                  <div>
                    <span>Are you cross trained front to back?</span>
                    <p style={{ color: '#4caf50' }}>{questionnaire.additional_info.crossTrained}</p>
                  </div>
                  <div>
                    <span>Experienced in Cephalometric XRay machine</span>
                    <p style={{ color: '#4caf50' }}>{questionnaire.additional_info.cephalometricXRay}</p>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        ) : (
          ''
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog >
  );
}

export default ApplicantPopup;


const imageHover = {
  cursor: 'pointer',
  border: '2px solid #333',
  boxShadow: '0px 0px 20px 0 rgba(255, 255, 255, .5)'
};