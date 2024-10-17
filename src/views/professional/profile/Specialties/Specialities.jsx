import { useCallback, useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import Layout from "../../../../components/Layout"
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { AddSpeciality } from "./AddSpeciality";
import { DeleteSpeciality } from "./DeleteSpeciality";
import { GetSpecialities, PostSpecialities } from "./SpecialitiesApis";
import { SpecialityQuestionnaire } from "./SpecialityQuestionnaire";
import { selectUser, selectQuestionnaireAnswers } from "../../../../redux/slices/userSlice";
import { useSelector, useDispatch } from 'react-redux';

export const Specialities = () => {
    let dispatch = useDispatch();
    let questionnaireAns = useSelector(selectQuestionnaireAnswers);
    const User = useSelector(selectUser);
    const [isclicked, setisclicked] = useState(false);
    const [Index, setIndex] = useState(-1)
    const [Category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [states, setStates] = useState([]);

    const [selectedsubcategeory, setselectedsubcategeory] = useState([]);
    const [selectedsubcategeoryId, setselectedsubcategeoryId] = useState([]);

    const [selectedsubcategeorytemp, setselectedsubcategeorytemp] = useState([]);
    const [selectedsubcategeoryIdtemp, setselectedsubcategeoryIdtemp] = useState([]);

    const [run, setRun] = useState(false);
    const [specialitiesdata, setSpecialitiesData] = useState([])

    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleDeleteOpen = () => { setDeleteOpen(true); };
    const handleDeleteClose = () => { setDeleteOpen(false); };

    const [specialityOpen, setSpecialityOpen] = useState(false);
    const handleSpecialityOpen = () => { setSpecialityOpen(true); };
    const handleSpecialityClose = () => { setSpecialityOpen(false); };

    const [editassistant, setEditAssistant] = useState(false);
    const [edithyginist, setEditHyginist] = useState(false);
    const [editoffice, setEditOffice] = useState(false);
    const [editdentist, setEditDestist] = useState(false);

    const [questionnaireData, setQuestionnaireData] = useState([]);

    useEffect(() => {
        const JSONquestionnaire = JSON.parse(questionnaireAns)
        setAdditionalInfo(JSONquestionnaire.additional_info);
        setPracticeManagementSoftware(JSONquestionnaire.practice_management_software);
        setRadiographySystems(JSONquestionnaire.radiography_systems);
        setResponsibilities(JSONquestionnaire.responsibilities);
        setSpecialties(JSONquestionnaire.specialties);
        setYearsAsDDS(JSONquestionnaire.years_as_dds);
        setYearsAsRDA(JSONquestionnaire.years_as_rda);
        setYearsAsRDH(JSONquestionnaire.years_as_rdh);
        setYearsAsTreatmentCoord(JSONquestionnaire.years_as_treatment_coord);
        setYearsWorked(JSONquestionnaire.years_worked);
        setQuestionnaireData(JSONquestionnaire)
    }, [])
    const getSpecialties = useCallback(async () => {
        const API_BASE_URL = "https://api.mddentalstaffing.com/api/v1";
        await axios.get(`${API_BASE_URL}/specialties`, {
            headers: {
                method: "GET",
                Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
        }).then((res) => { setSpecialitiesData(res.data.data) });
    }, [])
    useEffect(() => {
        getSpecialties();
    }, [run])

    const [data, setData] = useState([])

    useEffect(() => {
        const API_BASE_URL = "https://api.mddentalstaffing.com/api/v1";
        try {
            axios
                .get(
                    `${API_BASE_URL}/categories`,
                    {
                        headers: {
                            method: "PUT",
                            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                        },
                    }
                )
                .then((res) => setCategory(res.data.data))
                .catch((err) => {
                    throw new Error(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, [])
    useEffect(() => {
        const API_BASE_URL = "https://api.mddentalstaffing.com/api/v1";
        try {
            axios
                .get(
                    `${API_BASE_URL}/subCategories`,
                    {
                        params: {
                            name: User?.category_id === 1 ? 'Assistant' :
                                User?.category_id === 2 ? 'Hygienist' :
                                    User?.category_id === 3 ? 'Front Office' :
                                        'Dentist/Specialists',
                        },
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                        },
                    }
                )
                .then((res) => setSubCategory(res.data.data))
                .catch((err) => {
                    throw new Error(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handlesubcatgeories = (data) => {
        let temp = [];
        data.map((arr) => {
            if (arr.category_id === User.category_id) {
                temp.push(arr);
            }
        })
        setSubCategory(temp);
    }
    const [selectedcategeory, setselectedcategeory] = useState(Category[User.category_id - 1]?.name);

    useEffect(() => {
        if (specialitiesdata.length) {
            let temp = [];
            let temp1 = [];
            specialitiesdata.map((arr) => {
                temp.push(
                    arr.sub_category?.name);
                temp1.push(arr.sub_category.id);
            })
            setselectedsubcategeory(temp);
            setselectedsubcategeoryId(temp1);
            setselectedsubcategeorytemp(temp);
            setselectedsubcategeoryIdtemp(temp1);
            handleAddSpeciality(temp);
        }
    }, [specialitiesdata])
    useEffect(() => {
        const API_BASE_URL = "https://api.mddentalstaffing.com/api/v1";
        try {
            axios
                .get(
                    `${API_BASE_URL}/states`,
                    {
                        headers: {
                            method: "PUT",
                            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
                        },
                    }
                )
                .then((res) => setStates(res.data.data))
                .catch((err) => {
                    throw new Error(err);
                });
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleconfirmdelete = () => {
        let temp = [...data];
        temp.splice(Index, 1);
        setData(temp);
        setIndex(-1);
        setisclicked(false);
        handleDeleteClose();

        temp = [...selectedsubcategeorytemp];
        temp.splice(Index, 1);
        setselectedsubcategeorytemp(temp);

        temp = [...selectedsubcategeoryIdtemp];
        temp.splice(Index, 1);
        setselectedsubcategeoryIdtemp(temp);

        handlefinalsubmission(temp);
    }

    const [isLoading, setIsLoading] = useState(false);

    const [yearsWorked, setYearsWorked] = useState({
        years: "",
        months: "",
    });

    const [radiographySystems, setRadiographySystems] = useState([]);

    const [yearsAsRDA, setYearsAsRDA] = useState({
        years: "",
        months: "",
    });

    const [yearsAsRDH, setYearsAsRDH] = useState({
        years: "",
        months: "",
    });

    const [yearsAsTreatmentCoord, setYearsAsTreatmentCoord] = useState({
        years: "",
        months: "",
    });

    const [yearsAsDDS, setYearsAsDDS] = useState({
        years: "",
        months: "",
    });

    const [practiceManagementSoftware, setPracticeManagementSoftware] = useState(
        []
    );

    const [specialties, setSpecialties] = useState({
        general: "",
        prostho: "",
        cosmetic: "",
        pedo: "",
        ortho: "",
        perio: "",
        endo: "",
        implants: "",
        oralSurgery: "",
    });

    const [additionalInfo, setAdditionalInfo] = useState({
        cadCam: "",
        pano: "",
        imaging3D: "",
        nomadXRay: "",
        intraoralCameras: "",
        cephalometricXRay: "",
        crossTrained: "",
        nitrousOxide: "",
        anesthesizeSelf: "",
        applyingAntiMicrobials: "",
    });

    const [responsibilities, setResponsibilities] = useState({
        insBilling: "",
        trPresentation: "",
        patCoordination: "",
        patScheduling: "",
        payables: "",
        elegVerification: "",
        finCoordination: "",
        posting: "",
        clSubmission: "",
        trPlanning: "",
        marketing: "",
        officeManagement: "",
        collections: "",
        insPaymentCollection: "",
        hygieneRecall: "",
        payroll: "",
    });
    const [rinputValue, setRinputValue] = useState("");
    const [prcValue, setPrcValue] = useState("");
    const [error, setError] = useState(false);

    const handleChipDelete = (index) => {
        setRadiographySystems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleChipDeletePrc = (index) => {
        setPracticeManagementSoftware((prev) => prev.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && rinputValue.trim() !== "") {
            setRadiographySystems((prev) => [...prev, rinputValue]);
            setRinputValue("");
        } else if (
            e.key === "Backspace" &&
            rinputValue === "" &&
            radiographySystems.length > 0
        ) {
            setRadiographySystems((prev) => prev.slice(0, prev.length - 1));
        }
    };

    const handleKeyDownPrc = (e) => {
        if (e.key === "Enter" && prcValue.trim() !== "") {
            setPracticeManagementSoftware((prev) => [...prev, prcValue]);
            setPrcValue("");
        } else if (
            e.key === "Backspace" &&
            prcValue === "" &&
            practiceManagementSoftware.length > 0
        ) {
            setPracticeManagementSoftware((prev) => prev.slice(0, prev.length - 1));
        }
    };
    const handleAddSpeciality = (selectedCategories) => {
        let temp = [];
        selectedCategories.map((arr) => {
            temp.push({
                Category: selectedcategeory,
                SubCategory: arr,
                status: 'Approved'
            })
        })
        setData(temp);
    }
    useEffect(() => {
        handleAddSpeciality(selectedsubcategeory);
    }, [User, selectedsubcategeory])

    const handlefinalsubmission = async (selectedcategoriesid) => {
        console.log(selectedcategoriesid);
        await PostSpecialities(User.id, selectedcategoriesid);
        setRun(!run);
    }
    return (
        <Layout>
            <Grid
                sx={{
                    px: 3,
                    borderBottom: "1px solid #D9D9D9",
                    width: "auto",
                    color: "#8C8C8C",
                    fontSize: "0.9rem",
                }}
            >
                <PermIdentityIcon sx={{ py: 0.2, my: 0.2, mr: 0.9 }} />
                My Account
            </Grid>
            {
                data.length !== 0 && <div
                    className='d-flex'
                    style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid #D9D9D9",
                    }}
                >
                    <Grid
                        sx={{
                            px: 3,
                            pt: 1,
                            mb: 1,
                            mt: 1,
                            width: "auto",
                        }}
                    >
                        <h4 className='pb-0 mb-1' style={{ color: "#262626" }}>
                            My Account
                        </h4>
                        <p style={{ color: "#8C8C8C", fontSize: "0.8rem" }}>
                            Add / Edit Specialties
                        </p>
                    </Grid>
                </div>
            }
            <div style={{ padding: "0px 20px 0px 20px" }}>
                <SpecialityQuestionnaire
                    setEditAssistant={setEditAssistant}
                    setEditHyginist={setEditHyginist}
                    setEditOffice={setEditOffice}
                    setEditDestist={setEditDestist}
                    editassistant={editassistant}
                    edithyginist={edithyginist}
                    editoffice={editoffice}
                    editdentist={editdentist}
                    setAdditionalInfo={setAdditionalInfo}
                    additionalInfo={additionalInfo}
                    setSpecialties={setSpecialties}
                    setYearsAsRDA={setYearsAsRDA}
                    yearsAsRDA={yearsAsRDA}
                    specialties={specialties}
                    setYearsWorked={setYearsWorked}
                    yearsWorked={yearsWorked}
                    handleKeyDownPrc={handleKeyDownPrc}
                    handleKeyDown={handleKeyDown}
                    handleChipDeletePrc={handleChipDeletePrc}
                    handleChipDelete={handleChipDelete}
                    practiceManagementSoftware={practiceManagementSoftware}
                    prcValue={prcValue}
                    setPrcValue={setPrcValue}
                    radiographySystems={radiographySystems}
                    setRinputValue={setRinputValue}
                    rinputValue={rinputValue}
                    setYearsAsRDH={setYearsAsRDH}
                    yearsAsRDH={yearsAsRDH}
                    setYearsAsTreatmentCoord={setYearsAsTreatmentCoord}
                    yearsAsTreatmentCoord={yearsAsTreatmentCoord}
                    setYearsAsDDS={setYearsAsDDS}
                    yearsAsDDS={yearsAsDDS}
                    setResponsibilities={setResponsibilities}
                    responsibilities={responsibilities}
                />
            </div>
            {
                !(editassistant || editdentist || edithyginist || editoffice) && Category.length !== 0 && <>
                    <AddSpeciality
                        handleSpecialityOpen={handleSpecialityOpen}
                        handleDeleteOpen={handleDeleteOpen}
                        isclicked={isclicked}
                        setisclicked={setisclicked}
                        Index={Index}
                        setIndex={setIndex}
                        data={data}
                        setEditAssistant={setEditAssistant}
                        setEditHyginist={setEditHyginist}
                        setEditOffice={setEditOffice}
                        setEditDestist={setEditDestist}
                        Category={Category}
                    />
                    {
                        <DeleteSpeciality
                            deleteOpen={deleteOpen}
                            handleDeleteClose={handleDeleteClose}
                            handleconfirmdelete={handleconfirmdelete}
                        />
                    }
                    {
                        <Dialog
                            open={specialityOpen}
                            onClose={handleSpecialityClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                            maxWidth={10}
                        >
                            <DialogTitle id="alert-dialog-title" style={{ fontWeight: 'bold', maxWidth: '800px' }}>
                                {"Add Speciality"}
                            </DialogTitle>
                            <div style={{ padding: '20px' }}>
                                <div style={{ display: "flex" }}>
                                    <Box
                                        style={{ margin: "10px 20px 20px 0", width: "250px" }}
                                    >
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label" required={true}> {Category[User.category_id - 1].name} </InputLabel>
                                            <TextField
                                                id='outlined-text-input'
                                                disabled={true}
                                                required={false}
                                            />
                                        </FormControl>
                                        <FormControl fullWidth style={{ marginTop: "20px" }}>
                                            <InputLabel id="demo-simple-select-label" required={true}>Sub Category</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Sub Category"
                                                value={subCategory[subCategory.length - 1] ?? ""}
                                            >
                                                {
                                                    subCategory && subCategory.map((arr) => (
                                                        !selectedsubcategeorytemp.includes(arr?.name) && <MenuItem onClick={() => {
                                                            let temp = [...selectedsubcategeorytemp];
                                                            temp.push(arr?.name);
                                                            setselectedsubcategeorytemp(temp);
                                                            let temp1 = [...selectedsubcategeoryIdtemp];
                                                            temp1.push(arr?.id);
                                                            setselectedsubcategeoryIdtemp(temp1);
                                                        }} value={Math.floor(Math.random() * 10000)}>{arr?.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <div style={{ marginLeft: '10px', marginRight: '10px', backgroundColor: '#FFF8E1', padding: '20px', borderRadius: '6px', display: 'flex', width: '380px' }}>
                                        <InfoOutlinedIcon style={{ color: '#FFC400', marginRight: '20px' }} />
                                        <div>
                                            <h1 style={{ color: '#B28900', fontSize: '14px', fontWeight: '500', fontFamily: 'Roboto' }}>Attention!</h1>
                                            <p style={{ fontSize: '12px', lineHeight: '20px', fontFamily: 'Roboto', color: '#B28900' }}>Please Select subcategories that you feel comfortable working within. <br /> <strong>Ex: RDAEF click on the RDA and DA instead of just RDAEF</strong></p>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {
                                        selectedsubcategeorytemp.length !== 0 && (selectedsubcategeorytemp.map((arr, index) => (
                                            <button style={{ border: '1px solid #2561B0', backgroundColor: '#2561B0', padding: "1px 8px 1px 8px", borderRadius: '16px', gap: "5px", fontSize: "12px", fontWeight: '400', color: '#fff', fontFamily: 'Roboto', display: 'flex', flexWrap: 'wrap', marginTop: '10px', justifyContent: 'center', alignItems: 'center', marginRight: '7px' }}>{arr} <CloseOutlinedIcon onClick={() => {
                                                let temp = [...selectedsubcategeorytemp];
                                                temp.splice(index, 1);
                                                setselectedsubcategeorytemp(temp);
                                                let temp1 = [...selectedsubcategeoryIdtemp];
                                                temp1.splice(index, 1);
                                                setselectedsubcategeoryIdtemp(temp1);
                                            }} style={{ color: 'hsl(0, 0%, 50%)', padding: '1px', borderRadius: '50%', backgroundColor: '#D9D9D9', fontSize: '15px' }} /> </button>)
                                        ))
                                    }
                                </div>
                                <FormGroup style={{ maxwidth: '560px', minWidth: '300px', width: '560px', marginTop: '20px' }}>
                                    <FormControlLabel
                                        style={{ fontSize: "0.9rem" }}
                                        control={<Checkbox />}
                                        label='I verify I am fully certified to practice in the following states and have no violations or restrictions against my license'
                                    />
                                </FormGroup>

                                <FormControl fullWidth style={{ marginTop: "20px", width: '250px' }}>
                                    <InputLabel id="demo-simple-select-label" required={true}> States</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="States"
                                    >
                                        {
                                            states && states.map((arr) => (
                                                <MenuItem onClick={() => {
                                                }} value={Math.floor(Math.random() * 10000)}>{arr?.name}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                <div style={{ marginTop: '20px', backgroundColor: '#FFF8E1', padding: '20px', borderRadius: '6px', display: 'flex', width: '660px' }}>
                                    <InfoOutlinedIcon style={{ color: '#FFC400', marginRight: '20px' }} />
                                    <div>
                                        <h1 style={{ color: '#B28900', fontSize: '14px', fontWeight: '500', fontFamily: 'Roboto' }}>Attention!</h1>
                                        <p style={{ fontSize: '12px', lineHeight: '20px', fontFamily: 'Roboto', color: '#B28900' }}> <strong>Please visit Add/Edit Certificates section to upload licenses/certificates. Your status will be pending review by Mayday Dental
                                        </strong></p>
                                    </div>
                                </div>
                            </div>
                            <DialogActions>
                                <Button style={{ background: 'none', border: 'none', color: '#2561B0', fontWeight: '500', fontSize: '16px' }} onClick={handleSpecialityClose}>Cancel</Button>
                                <Button style={{ background: 'none', border: 'none', color: '#2561B0', fontWeight: '500', fontSize: '16px' }} disabled={selectedsubcategeory.length === 0} onClick={() => { handleAddSpeciality(selectedsubcategeorytemp); handlefinalsubmission(selectedsubcategeoryIdtemp); handleSpecialityClose(); }} autoFocus>
                                    CONFIRM
                                </Button>
                            </DialogActions>
                        </Dialog>
                    }
                </>
            }
        </Layout>
    )
}