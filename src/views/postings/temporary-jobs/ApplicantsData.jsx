import React from 'react';
import '../TemporaryJobs/PostingApplicants.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import InfoIcon from '@mui/icons-material/Info';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  makeStyles,
} from '@mui/material';
import StarRating from '../../../../components/General/StarRating';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    backgroundColor: '#ffffff',
    color: '#333333',
    display: 'flex',
    alignItems: 'center',
  },
  dialog: {
    maxWidth: '85vw',
    maxHeight: '95vh',
    width: 'auto',
    height: 'auto',
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
}));

function ApplicantData({ isOpen, onClose, selectedApplicant }) {
  const classes = useStyles();
  const [selectedCategory, setSelectedCategory] = React.useState('general');

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} classes={{ paper: classes.dialog }}>
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
            className={`${classes.categoryButton} ${
              selectedCategory === 'general' && classes.activeCategory
            }`}
            onClick={() => handleCategoryChange('general')}
          >
            General
          </button>
          <button
            className={`${classes.categoryButton} ${
              selectedCategory === 'work-experience' && classes.activeCategory
            }`}
            onClick={() => handleCategoryChange('work-experience')}
          >
            Work Experience
          </button>
          <button
            className={`${classes.categoryButton} ${
              selectedCategory === 'additional-info' && classes.activeCategory
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
                    <img
                      src={
                        selectedApplicant
                          ? selectedApplicant.profile_photo_path
                          : ''
                      }
                      alt={selectedApplicant.first_name}
                    />
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
                          <div className='data'>City</div>
                        </div>
                        <div className='dataRow'>
                          <div className='header'>Desired Hourly Rate</div>
                          <div className='data'>25</div>
                        </div>
                        <div className='dataRow'>
                          <div className='header'>Speciality</div>
                          <div className='data'>DA, RDA, RDAEF, RDAEF1</div>
                        </div>
                        <div className='dataRow'>
                          <div className='header'>Language</div>
                          <div className='data'>English, German</div>
                        </div>
                        <div className='dataRow'>
                          <div className='header'>Education</div>
                          <div className='data'>University</div>
                        </div>
                        <div className='dataRow'>
                          <div className='header'>Highest Degree Earned</div>
                          <div className='data'>
                            Vocational Training Certificate
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ratingTop" style={{display:'flex',margin : '11px 0' }}>
                      <div>
                        <h3 style={{fontSize:'18px'}}>Professional Score</h3>
                        <StarRating rating={1}/>
                      </div>
                      <div style={{display:'flex',justifyContent:'flex-end'}}>
                        <InfoIcon style={{marginLeft:'5px',color:'#595959'}}/>
                        <p style={{width:'400px',borderBottom:'1px solid #E8E8E8',position:'absolute',top:'56.5%',left:'37%'}}></p>
                        <ArrowDropDownIcon style={{position:'absolute',right:'280px',top:'54.4%',backgroundColor:'#E8E8E8',color:'#8C8C8C',borderRadius:'5px',fontSize:'18px'}}/>
                      </div>
                    </div>
                    <div className="ratingTop" style={{display:'flex',margin : '0 0 10px 0'}}>
                      <div>
                        <h3 style={{fontSize:'18px'}}>Professional Score</h3>
                        <StarRating rating={1}/>
                      </div>
                      <div style={{display:'flex',justifyContent:'flex-end'}}>
                        <InfoIcon style={{marginLeft:'5px',color:'#595959'}}/>
                        <p style={{width:'400px',borderBottom:'1px solid #E8E8E8',position:'absolute',top:'70%',left:'37%'}}></p>
                        <ArrowDropDownIcon style={{position:'absolute',right:'280px',top:'68.3%',backgroundColor:'#E8E8E8',color:'#8C8C8C',borderRadius:'5px',fontSize:'18px'}}/>
                      </div>
                    </div>
                    <div className='applicantRating'>
                      <div>
                        <span>Professionalism</span>
                        <span>
                          <StarRating rating={3} />
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
                  </div>
                </section>
                <section
                  className='categoryGeneralRight'
                  style={{
                    width: '35%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      borderLeft: '1px solid #E8E8E8',
                      paddingLeft: '10px',
                    }}
                  ></div>
                  <h4 style={{ fontSize: '18px', textAlign: 'center' }}>
                    Certificates / licenses
                  </h4>
                  <div className='certificates'>
                    <img
                      src='https://img.freepik.com/premium-vector/modern-flat-design-pdf-file-icon-web_599062-7115.jpg'
                      alt='certificate'
                    />
                    <img
                      src='https://img.freepik.com/premium-vector/modern-flat-design-pdf-file-icon-web_599062-7115.jpg'
                      alt='certificate'
                    />
                    <img
                      src='https://img.freepik.com/premium-vector/modern-flat-design-pdf-file-icon-web_599062-7115.jpg'
                      alt='certificate'
                    />
                  </div>
                </section>
              </div>
            )}
            {selectedCategory === 'work-experience' && (
              <div className='applicantWorkExperiance'>
                <div className='topSection'>
                  <div className='firstExp'>
                    <p>Years/Months experiance in the Dental field?</p>
                    <div className='yearExperiance'>
                      <div>
                        <label for='years'>Years</label>
                        <input type='text' name='years' value={1} readOnly />
                      </div>
                      <div>
                        <label for='months'>Months</label>
                        <input type='text' name='months' value={2} readOnly />
                      </div>
                    </div>
                  </div>
                  <div className='firstExp'>
                    <p>Years/Months experiance as Orthodontist?</p>
                    <div className='yearExperiance'>
                      <div>
                        <label for='years'>Years</label>
                        <input type='text' name='years' value={2} readOnly />
                      </div>
                      <div>
                        <label for='months'>Months</label>
                        <input type='text' name='months' value={5} readOnly />
                      </div>
                    </div>
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
                <div className='WorklastSection'>
                  <div>
                    <p>
                      From: 12/21/2022 <br /> TO : 12/27/2002
                    </p>
                  </div>
                  <div>
                    <p>LuccySmile Dental</p>
                  </div>
                  <div>
                    <p>
                      Treatment Coordinator,Office Manager, <br /> Patient
                      Coordinator, Financial Coordinator
                    </p>
                  </div>
                </div>
              </div>
            )}
            {selectedCategory === 'additional-info' && (
              <div className='AdditionalInfoContainer'>
                <div className='topInfo'>
                  <div>
                    Proificient with the following Digital Radiography System
                    <div className='techName'>Palnmeca</div>
                  </div>
                  <div>
                    Proificient with the following Practice Management Software
                    <div className='techName'>OpenDental</div>
                  </div>
                </div>
                <h4 className='midInfoHeading'>
                  Experiance in the following Specialities
                </h4>
                <div className='midInfo'>
                  <div>
                    <p>Pedo : </p>
                    <p>No</p>
                  </div>
                  <div>
                    <p>Perio: </p>
                    <p style={{ color: '#e8a113' }}>Some</p>
                  </div>
                  <div>
                    <p>General: </p>
                    <p>no </p>
                  </div>
                  <div>
                    <p>Implants: </p>
                    <p>No</p>
                  </div>
                  <div>
                    <p>Ortho: </p>
                    <p style={{ color: '#e8a113' }}>Some</p>
                  </div>
                  <div>
                    <p>Prostho: </p>
                    <p>No</p>
                  </div>
                  <div>
                    <p>Endo: </p>
                    <p>No</p>
                  </div>
                  <div>
                    <p>Cosmetic: </p>
                    <p style={{ color: '#4caf50' }}>Yes</p>
                  </div>
                  <div>
                    <p>Oral Surgery: </p>
                    <p>No</p>
                  </div>
                </div>
 
                <div style={{border:'1px dotted #8c8c8c', margin: '0 20px'}}></div>
                <div className='lastInfo'>
                  <div>
                    <span>Experianced in Cad-Cam (E4D or Cerec)</span>
                    <p>No</p>
                  </div>
                  <div>
                    <span>Experianced in Pano</span>
                    <p style={{ color: '#4caf50' }}>Yes</p>
                  </div>
                  <div>
                    <span>Experianced in 3D Imaging</span>
                    <p style={{ color: '#e8a113' }}>Some</p>
                  </div>
                  <div>
                    <span>Experianced in Normad Portable X-Ray</span>
                    <p>No</p>
                  </div>
                  <div>
                    <span>Experianced in Intraoral Cameras</span>
                    <p>No</p>
                  </div>
                  <div>
                    <span>Are you cross trained front to back?</span>
                    <p style={{ color: '#4caf50' }}>Yes</p>
                  </div>
                  <div>
                    <span>Experianced in Cephalometric XRay machine</span>
                    <p style={{ color: '#4caf50' }}>Yes</p>
                  </div>
                </div>
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
    </Dialog>
  );
}

export default ApplicantData;
