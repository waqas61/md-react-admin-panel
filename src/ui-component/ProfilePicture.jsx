
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import CropIcon from '@mui/icons-material/Crop';
import LoadingButton from '@mui/lab/LoadingButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import axios from 'axios';
// import SuccessModal from '../components/General/SuccessModal';
import InputMask from 'react-input-mask';
import {
  Stack,
  OutlinedInput,
  Chip,
  Autocomplete,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import moment from 'moment';
import { setUserTimeZoneGlobally } from "../utils/helper";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Webcam from "react-webcam";



import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../store/slices/userSlice';




const dataUrlToFile = (url, fileName) => {
  const [mediaType, data] = url.split(",");
  const mime = mediaType.match(/:(.*?);/)?.[0];
  var n = data.length;
  const arr = new Uint8Array(n);
  while (n--) {
    arr[n] = data.charCodeAt(n);
  }
  return new File([arr], fileName, { type: mime });
};

const dataUrlToFileUsingFetch = async (
  url,
  fileName,
  mimeType
) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  return new File([buffer], fileName, { type: mimeType });
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ProfilePicture = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('md');
  const [finalSubmission, setFinalSubmission] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openCam, setOpenCam] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState();
  const inputRef = useRef(null);
  const webcamRef = useRef(null);
  const [img, setImg] = useState(null);
  const videoConstraints = {
    width: 390,
    height: 390,
    facingMode: "user",
    // facingMode: { exact: "environment" }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setImg(imageSrc);
  }, [webcamRef]);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setCropData(null);
    setCropper(null);
    setImage(null);
    setOpenCam(false);
  };

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const editCrop = () => {
    setCropData(null);
  };

  const cancelImageEdit = () => {
    handleClose();
    setCropData(null);
    setCropper(null);
    setImage(null);
    setOpenCam(false);
  };

  const handleSubmitPicture = (e) => {

    e.preventDefault();
    // console.log('upload === >', cropData);
    setCropData(null);
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);

    // if (e.target.files && e.target.files.length > 0) {
    //   const file = e.target.files[0];
    //   setUploadFile(file);
    // }
  }

  const handleUpload = async (url) => {
    /**
     * You can also use this async method in place of dataUrlToFile(url) method.
     * const file = await dataUrlToFileUsingFetch(url, 'output.png', 'image/png')
     */
    const file = dataUrlToFile(url, "output.png");
    console.log(
      `We have File "${file.name}", now we can upload it wherever we want!`
    );
    /**
     * Now that we have a File object, we can upload it to S3 (or anywhere else you want)
     *
     * const params = {
     *   Bucket: "BUCKET_NAME"
     *   Key: "randomId" + .png // You can use nanoid here if you want. This becomes the filename (or key) in S3.
     *   Body: file
     * }
     *
     * // Handle errors with try-catch block...
     * const data = await s3.upload(params)
     * console.log(`File uploaded successfully. ${data.Location}`);
     */
  };

  const handlefinalsubmit = async () => {
    setIsSaved(true);
    const API_BASE_URL = 'https://api.mddentalstaffing.com/api/v1';
    const formData = new FormData();
    // const file = dataUrlToFile(cropData, "output.png");
    const file = await dataUrlToFileUsingFetch(cropData, 'output.png', 'image/png');
    if (file) formData.append('upload_file', file);
    // if (uploadFile) formData.append('upload_file', uploadFile);
    if (user.role_type == 'owner') {
      try {
        axios
          .post(`https://api.mddentalstaffing.com/api/v1/owner/profile`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            dispatch(setUser(res.data.data));
            localStorage.setItem('user', JSON.stringify(res.data.data));
            setImage(null);
            setFinalSubmission(true);
            setIsSaved(false);
            handleClose();
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        axios
          .post(`${API_BASE_URL}/profile`, formData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            dispatch(setUser(res.data.data));
            localStorage.setItem('user', JSON.stringify(res.data.data));
            setImage(null);
            setFinalSubmission(true);
            setIsSaved(false);
            handleClose();
          })
          .catch((err) => {
            setIsSaved(false);
            throw new Error(err);
          });
      } catch (error) {
        console.log(error);
      }
    }

  }

  // useEffect(() => {
  //   console.log('user', user.role_type);
  // }, []);

  // useEffect(() => {
  //   console.log('image', image);
  // }, [image, openDialog]);

  // useEffect(() => {
  //   console.log('cropData', cropData);
  // }, [cropData, openDialog]);

  return (
    <>
      <div style={{ width: '30%', backgroundColor: '#fff' }}>
        <div
          style={{
            margin: '10px 2px',
            padding: '20px 10px',
            backgroundColor: '#f4f4f4',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: '6px',
          }}
        >
          {cropData ? (
            <>
              <img
                style={{
                  borderRadius: '50%',
                  height: '150px',
                  width: '150px',
                  objectFit: 'cover',
                }}
                src={cropData}
                alt=''
                srcset=''
              />
            </>
          ) : user.avatar ? (
            <>
              <img
                style={{
                  borderRadius: '50%',
                  height: '150px',
                  width: '150px',
                  objectFit: 'cover',
                }}
                src={
                  `https://api.mddentalstaffing.com/api/v1/assets/${user.avatar}`
                }
                alt=''
                srcset=''
              />
            </>
          ) : (
            <>
              <div
                className="img-preview"
                style={{
                  borderRadius: '50%',
                  overflow: 'hidden',
                  height: '150px',
                  width: '150px',
                  objectFit: 'cover',
                }}
              />
            </>

          )}

          <Grid
            sx={{
              pt: 3,
              pb: 1,
              width: 'auto',
              color: '#8C8C8C',
              fontSize: '1rem',
            }}
          >
            My Profile Photo
          </Grid>
          <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
            A square image 400x400px is recommended
          </p>


          <Button
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgb(37, 97, 176)',
              marginTop: '20px',
              color: 'rgb(37, 97, 176)',
              textTransform: 'none',
              borderRadius: '20px',
            }}
            component='label'
            variant='contained'
            startIcon={<UploadOutlinedIcon />}
            onClick={(event) => {
              handleClickOpen();
            }}
          >
            Upload New Photo
          </Button>
        </div>
      </div>
      <Dialog
        // fullScreen={fullScreen}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Profile photo"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>

            <Box
              sx={{ width: '100%' }}
              style={{
                margin: '10px 2px',
                padding: '20px 10px',
                backgroundColor: '#f4f4f4',
                borderRadius: '6px',
              }}
            >
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid
                  item
                  xs={12}
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"

                >
                  {user.avatar && image == null && !openCam ? (
                    <>
                      <img
                        style={{
                          borderRadius: '50%',
                          height: '150px',
                          width: '150px',
                          objectFit: 'cover',
                        }}
                        src={
                          `https://api.mddentalstaffing.com/api/v1/assets/${user.avatar}`
                        }
                        alt=''
                        srcset=''
                      />
                    </>
                  ) : cropData ? (
                    <>
                      <img
                        style={{
                          borderRadius: '50%',
                          height: '150px',
                          width: '150px',
                          objectFit: 'cover',
                        }}
                        src={cropData}
                        alt=''
                        srcset=''
                      />
                    </>
                  ) : cropData ? (
                    <>
                      <div
                        className="img-preview"
                        style={{
                          borderRadius: '50%',
                          overflow: 'hidden',
                          height: '150px',
                          width: '150px',
                          objectFit: 'cover',
                        }}
                      />
                    </>
                  ) : ''}

                  {image && cropData == null ? (
                    <>

                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}

                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Cropper
                            style={{ height: '40%', width: "100%" }}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                            onInitialized={(instance) => {
                              setCropper(instance);
                            }}
                            guides={true}
                          />
                        </Grid>
                      </Grid>

                      <Grid container
                        rowSpacing={1}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid item xs={12}>
                          <Button style={{
                            // float: "right",
                            backgroundColor: 'transparent',
                            border: '1px solid rgb(37, 97, 176)',
                            marginTop: '20px',
                            color: 'rgb(37, 97, 176)',
                            textTransform: 'none',
                            borderRadius: '20px',
                          }}
                            component='label'
                            variant='contained'
                            startIcon={<CropIcon />}
                            onClick={getCropData}
                          >
                            Crop Image
                          </Button>

                          {/* <Button style={{
                            // float: "right",
                            backgroundColor: 'transparent',
                            border: '1px solid rgb(37, 97, 176)',
                            marginTop: '20px',
                            color: 'rgb(37, 97, 176)',
                            textTransform: 'none',
                            borderRadius: '20px',
                          }}
                            onClick={() => {
                              setImg(null);
                              setCropData(null);
                              setImage(null);
                            }}
                          >
                            Recapture
                          </Button> */}
                        </Grid>
                      </Grid>
                    </>
                  ) : ''}


                  {openCam && image == null ? (
                    <>
                      <Grid container
                        rowSpacing={1}
                      // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                      >
                        <Grid
                          style={{
                            backgroundColor: '#0e0e0e'
                          }}
                        // item
                        // xs={12}
                        // direction="row"
                        // justifyContent="center"
                        // alignItems="center"
                        >
                          <Webcam
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            audio={false}
                            height={400}
                            width={800}
                            ref={webcamRef}
                            mirrored={true}
                          />
                        </Grid>
                      </Grid>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                          <Button
                            style={{
                              // float: "right",
                              backgroundColor: 'transparent',
                              border: '1px solid rgb(37, 97, 176)',
                              marginTop: '20px',
                              color: 'rgb(37, 97, 176)',
                              textTransform: 'none',
                              borderRadius: '20px',
                            }}
                            component='label'
                            variant='contained'
                            startIcon={<CenterFocusWeakIcon />}
                            onClick={capture}
                          >
                            Capture photo
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                          {/* <Button onClick={() => {
                          setImg(null);
                          setCropData(null);
                          setImage(null);
                        }}>Recapture</Button> */}
                        </Grid>
                      </Grid>
                    </>
                  )}

                  {/* <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
                  we require members to use their real identities, so take or upload a photo of yourself. Then crop, filter, and adjust it to perfection.
                </p> */}
                </Grid>

                <Grid item xs={12} sx={{ mt: 5 }}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >


                  <Box
                    sx={{ width: '100%' }}
                    style={{
                      margin: '0px 30px',
                      // padding: '10px 10px',
                      // backgroundColor: '#f4f4f4',
                      borderRadius: '6px',
                    }}
                  >
                    <p style={{ color: '#8C8C8C', fontSize: '0.8rem' }}>
                      we require members to use their real identities, so take or upload a photo of yourself. Then crop, filter, and adjust it to perfection.
                    </p>
                  </Box>
                </Grid>
              </Grid>
            </Box>

          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <Box sx={{ flexGrow: 1 }} p={4}>
            <Grid container spacing={0}>
              <Grid
                item
                xs={6}
                // item
                spacing={1}
                gap={1}
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Button
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid rgb(37, 97, 176)',
                    // marginTop: '20px',
                    color: 'rgb(37, 97, 176)',
                    textTransform: 'none',
                    borderRadius: '20px',
                  }}
                  component='label'
                  variant='contained'
                  startIcon={<UploadOutlinedIcon />}
                  onChange={(event) => {
                    setImage(null);
                    setCropData(null);
                    handleSubmitPicture(event);
                  }}
                >
                  Upload New Photo
                  <VisuallyHiddenInput type='file' />
                </Button>

                <Button
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid rgb(37, 97, 176)',
                    // marginTop: '20px',
                    color: 'rgb(37, 97, 176)',
                    textTransform: 'none',
                    borderRadius: '20px',
                  }}
                  component='label'
                  variant='contained'
                  startIcon={<PhotoCameraIcon />}
                  onClick={() => {
                    setOpenCam(true);
                    setImage(null);
                    setCropData(null);
                  }}
                  autoFocus
                >
                  Use Camra
                </Button>
              </Grid>



              <Grid
                item
                xs={6}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
                spacing={1}
                gap={1}
              >


                {cropData || openCam || image ? (
                  <>
                    <Button
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid rgb(37, 97, 176)',
                        // marginTop: '20px',
                        color: 'rgb(37, 97, 176)',
                        textTransform: 'none',
                        borderRadius: '20px',
                      }}
                      component='label'
                      variant='contained'
                      startIcon={<ClearIcon />}
                      onClick={() => {
                        cancelImageEdit();
                      }}
                      autoFocus
                    >
                      Cancel
                    </Button>
                  </>
                ) : (<></>)}



                {cropData ? (
                  <>
                    <Button
                      style={{
                        backgroundColor: 'transparent',
                        border: '1px solid rgb(37, 97, 176)',
                        // marginTop: '20px',
                        color: 'rgb(37, 97, 176)',
                        textTransform: 'none',
                        borderRadius: '20px',
                      }}
                      component='label'
                      variant='contained'
                      startIcon={<EditIcon />}
                      onClick={() => {
                        editCrop();
                      }}
                      autoFocus
                    >
                      Edit

                    </Button>
                  </>
                ) : (<></>)}

                {cropData ? (
                  <>




                    {isSaved ? (
                      <>
                        <LoadingButton
                          loading
                          loadingPosition="start"
                          style={{
                            backgroundColor: 'transparent',
                            border: '1px solid rgb(37, 97, 176)',
                            // marginTop: '20px',
                            color: 'rgb(37, 97, 176)',
                            textTransform: 'none',
                            borderRadius: '20px',
                          }}
                          component='label'
                          variant='contained'
                          startIcon={<SaveIcon />}
                        >
                          Save
                        </LoadingButton>
                      </>
                    ) : (
                      <>
                        <Button
                          style={{
                            backgroundColor: 'transparent',
                            border: '1px solid rgb(37, 97, 176)',
                            // marginTop: '20px',
                            color: 'rgb(37, 97, 176)',
                            textTransform: 'none',
                            borderRadius: '20px',
                          }}
                          component='label'
                          variant='contained'
                          startIcon={<SaveIcon />}
                          onClick={() => {
                            handlefinalsubmit();
                          }}
                          autoFocus
                        >
                          Save.
                        </Button>
                      </>
                    )}

                  </>

                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Box>
        </DialogActions>
      </Dialog >
    </>
  );
};

export default ProfilePicture;
