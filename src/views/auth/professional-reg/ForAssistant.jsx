
import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import {
	Chip,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

export default function ForAssistant({
	setAdditionalInfo,
	additionalInfo,
	setSpecialties,
	specialties,
	setYearsAsRDA,
	yearsAsRDA,
	setYearsWorked,
	yearsWorked,
	handleKeyDownPrc,
	handleKeyDown,
	handleChipDeletePrc,
	handleChipDelete,
	practiceManagementSoftware,
	setPrcValue,
	prcValue,
	radiographySystems,
	setRinputValue,
	rinputValue,
}) {
	return (
		<>

			<Box sx={{ mt: 2 }} >

				<Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
					Questionaire
				</Typography>

				<Grid container spacing={3}>
					<Grid
						item
						xs={12}
						sm={12}
						md={6}
					>
						<Grid container spacing={1}>
							<Grid
								item
								xs={12}
								sm={12}
								md={12}
							>
								{/* <h6 style={{ color: "#595959" }}>

								</h6> */}

								<Typography variant="h6" sx={{ color: "#595959", mt: 1, mb: 1 }}>
									How many years/months did you work in dental field?*
								</Typography>

							</Grid>

							<Grid
								item
								xs={12}
								sm={12}
								md={6}
							>
								<TextField
									size="small"
									required
									className="w-100"
									label="Years"
									variant="outlined"
									sx={{ mb: 2 }}
									value={yearsWorked.years}
									onChange={(e) =>
										setYearsWorked((state) => ({
											...state,
											years: e.target.value.replace(/\D/, ""),
										}))
									}
								/>
							</Grid>

							<Grid
								item
								xs={12}
								sm={12}
								md={6}
							>
								<TextField
									required
									size="small"
									className="w-100"
									label="Months"
									variant="outlined"
									sx={{ mb: 2 }}
									value={yearsWorked.months}
									onChange={(e) => {
										let value = e.target.value.replace(/\D/, "");
										if (value > 12) value = "12";
										setYearsWorked((state) => ({
											...state,
											months: value,
										}));
									}}
								/>
							</Grid>

							<Grid
								item
								xs={12}
								sm={12}
								md={12}
							>
								{/* <h6 style={{ color: "#595959" }}>
									Proficient with the following Digital Radiography Systems{" "}
									<span className="text-lightgrey"> (Up to 50): </span>
								</h6> */}

								<Typography variant="h6" sx={{ color: "#595959", mt: 1, mb: 1 }}>
									Proficient with the following Digital Radiography Systems{" "}
									<span className="text-lightgrey"> (Up to 50): </span>
								</Typography>

							</Grid>

							<Grid
								item
								xs={12}
								sm={12}
								md={12}
							>
								<TextField
									size="small"
									required
									variant="outlined"
									sx={{
										mb: 2,
										display: "flex",
										flexWrap: "wrap",
										height: "auto",
										overflowY: "auto",
										"&::-webkit-scrollbar": {
											height: "0.3rem",
										},
										"&::-webkit-scrollbar-thumb": {
											borderRadius: "6px",
											backgroundColor: "#bfbfbf",
										},
										"&::-webkit-scrollbar-track": {
											borderRadius: "6px",
											backgroundColor: "#eee",
										},
										"&::-webkit-scrollbar-button": {
											display: "none",
										},
									}}
									value={rinputValue}
									onChange={(e) => setRinputValue(e.target.value)}
									onKeyDown={handleKeyDown}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{radiographySystems.map((system, index) => (
													<Chip
														color="primary"
														className="me-1 rounded"
														key={index}
														size="small"
														label={system}
														onDelete={() => handleChipDelete(index)} // Modified line to handle chip deletion
														deleteIcon={<CloseIcon />} // Assuming you have an icon component for the "X"
													/>
												))}
											</InputAdornment>
										),
									}}
								/>
							</Grid>

						</Grid>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={6}
					>


						<Grid container spacing={1}>
							<Grid
								item
								xs={12}
								sm={12}
								md={12}
							>
								{/* <h6 style={{ color: "#595959" }}>
									How many years/months as an RDA/DA?
								</h6> */}
								<Typography variant="h6" sx={{ color: "#595959", mt: 1, mb: 1 }}>
									How many years/months as an RDA/DA?
								</Typography>

							</Grid>

							<Grid
								item
								xs={12}
								sm={12}
								md={6}
							>
								<TextField
									size="small"
									className="w-100"
									label="Years"
									variant="outlined"
									sx={{ mb: 2 }}
									value={yearsAsRDA.years}
									onChange={(e) =>
										setYearsAsRDA((state) => ({
											...state,
											years: e.target.value.replace(/\D/, ""),
										}))
									}
								/>
							</Grid>

							<Grid
								item
								xs={12}
								sm={12}
								md={6}
							>
								<TextField
									required
									size="small"
									className="w-100"
									label="Months"
									variant="outlined"
									sx={{ mb: 2 }}
									value={yearsAsRDA.months}
									onChange={(e) => {
										let value = e.target.value.replace(/\D/, "");
										if (value > 12) value = "12";
										setYearsAsRDA((state) => ({
											...state,
											months: value,
										}));
									}}
								/>
							</Grid>

							<Grid
								item
								xs={12}
								sm={12}
								md={12}
							>
								{/* <h6 style={{ color: "#595959" }}>
									Proficient with the following Practice Management Software{" "}
									<span className="text-lightgrey"> (Up to 50): </span>
								</h6> */}
								<Typography variant="h6" sx={{ color: "#595959", mt: 1, mb: 1 }}>
									Proficient with the following Practice Management Software{" "}
									<span className="text-lightgrey"> (Up to 50): </span>
								</Typography>

							</Grid>

							<Grid
								item
								xs={12}
								sm={12}
								md={12}
							>
								<TextField
									required
									size="small"
									className="w-100"
									variant="outlined"
									sx={{
										mb: 2,
										display: "flex",
										flexWrap: "wrap",
										height: "auto",
										overflowY: "auto",
										"&::-webkit-scrollbar": {
											height: "0.3rem",
										},
										"&::-webkit-scrollbar-thumb": {
											borderRadius: "6px",
											backgroundColor: "#bfbfbf",
										},
										"&::-webkit-scrollbar-track": {
											borderRadius: "6px",
											backgroundColor: "#eee",
										},
										"&::-webkit-scrollbar-button": {
											display: "none",
										},
									}}
									value={prcValue}
									onChange={(e) => setPrcValue(e.target.value)}
									onKeyDown={handleKeyDownPrc}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{practiceManagementSoftware.map((system, index) => (
													<Chip
														size="small"
														color="primary"
														className="me-1 rounded"
														key={index}
														label={system}
														onDelete={() => handleChipDeletePrc(index)}
														deleteIcon={<CloseIcon />}
													/>
												))}
											</InputAdornment>
										),
									}}
								/>
							</Grid>


						</Grid>

					</Grid>
				</Grid>

				{/* <Typography variant="h5" component="h5" sx={{ mt: 1, mb: 1 }}>
					Experienced in the following specialties:
				</Typography> */}


				<Typography variant="h6" sx={{ color: "#595959", mt: 1, mb: 1 }}>
					Experienced in the following specialties:
				</Typography>

				<Grid container spacing={1}>
					<Grid
						item
						xs={12}
						sm={12}
						md={3}
					>
						<FormControl size="small" className="w-100">
							<InputLabel id="category-label">General</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="General"
								sx={{ mb: 2 }}
								value={specialties.general}
								onChange={(e) =>
									setSpecialties((state) => ({
										...state,
										general: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={3}
					>
						<FormControl size="small" className="w-100">
							<InputLabel id="category-label">Prostho</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Prostho"
								sx={{ mb: 2 }}
								value={specialties.prostho}
								onChange={(e) =>
									setSpecialties((state) => ({
										...state,
										prostho: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={3}
					>
						<FormControl size="small" className="w-100">
							<InputLabel id="category-label">Cosmetic</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Cosmetic"
								sx={{ mb: 2 }}
								value={specialties.cosmetic}
								onChange={(e) =>
									setSpecialties((state) => ({
										...state,
										cosmetic: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={3}
					>
						<FormControl size="small" className="w-100">
							<InputLabel id="category-label">Pedo</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Pedo"
								sx={{ mb: 2 }}
								value={specialties.pedo}
								onChange={(e) =>
									setSpecialties((state) => ({
										...state,
										pedo: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={3}
					>
						<FormControl size="small" className="w-100">
							<InputLabel id="category-label">Ortho</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Ortho"
								sx={{ mb: 2 }}
								value={specialties.ortho}
								onChange={(e) =>
									setSpecialties((state) => ({
										...state,
										ortho: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={3}
					>
						<FormControl size="small" className="w-100">
							<InputLabel id="category-label">Perio</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Perio"
								sx={{ mb: 2 }}
								value={specialties.perio}
								onChange={(e) =>
									setSpecialties((state) => ({
										...state,
										perio: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={3}
					>
						<FormControl size="small" className="w-100">
							<InputLabel id="category-label">Endo</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Endo"
								sx={{ mb: 2 }}
								value={specialties.endo}
								onChange={(e) =>
									setSpecialties((state) => ({
										...state,
										endo: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={3}
					>
						<FormControl size="small" className="w-100">
							<InputLabel id="category-label">Implants</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Implants"
								sx={{ mb: 2 }}
								value={specialties.implants}
								onChange={(e) =>
									setSpecialties((state) => ({
										...state,
										implants: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={3}
					>
						<FormControl size="small" className="w-100">
							<InputLabel id="category-label">Oral Surgery</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Oral Surgery"
								sx={{ mb: 2 }}
								value={specialties.oralSurgery}
								onChange={(e) =>
									setSpecialties((state) => ({
										...state,
										oralSurgery: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
					Additional Information
				</Typography>

				<Grid container spacing={1}>

					<Grid
						item
						xs={12}
						sm={12}
						md={6}
					>
						<FormControl size="small" fullWidth>
							<InputLabel id="category-label">
								Experienced in Cad-Cam (E4D or Cerec):
							</InputLabel>
							<Select
								fullWidth
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Experienced in Cad-Cam (E4D or Cerec):"
								sx={{ mb: 2 }}
								value={additionalInfo.cadCam}
								onChange={(e) =>
									setAdditionalInfo((state) => ({
										...state,
										cadCam: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={6}
					>
						<FormControl size="small" fullWidth>
							<InputLabel id="category-label">Experienced in Pano:</InputLabel>
							<Select
								required
								labelId="category-label"
								id="category"
								label="Experienced in Pano:"
								sx={{ mb: 2 }}
								value={additionalInfo.pano}
								onChange={(e) =>
									setAdditionalInfo((state) => ({
										...state,
										pano: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={6}
					>
						<FormControl size="small" fullWidth>
							<InputLabel id="category-label">
								Experienced in 3D Imaging:
							</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Experienced in 3D Imaging:"
								sx={{ mb: 2 }}
								value={additionalInfo.printers3D}
								onChange={(e) =>
									setAdditionalInfo((state) => ({
										...state,
										printers3D: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={6}
					>
						<FormControl size="small" fullWidth>
							<InputLabel id="category-label">
								Experienced in Nomad portable X-Ray:
							</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Experienced in Nomad portable X-Ray:"
								sx={{ mb: 2 }}
								value={additionalInfo.nomadXRay}
								onChange={(e) =>
									setAdditionalInfo((state) => ({
										...state,
										nomadXRay: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={6}
					>
						<FormControl size="small" fullWidth>
							<InputLabel id="category-label">
								Experienced in Intraoral Cameras:
							</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Experienced in Intraoral Cameras:"
								sx={{ mb: 2 }}
								value={additionalInfo.intraoralCameras}
								onChange={(e) =>
									setAdditionalInfo((state) => ({
										...state,
										intraoralCameras: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={6}
					>
						<FormControl size="small" fullWidth>
							<InputLabel id="category-label">
								Experienced in Cephalometric X-Ray machine:
							</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Experienced in Cephalometric X-Ray machine:"
								sx={{ mb: 2 }}
								value={additionalInfo.cephalometricXRay}
								onChange={(e) =>
									setAdditionalInfo((state) => ({
										...state,
										cephalometricXRay: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						item
						xs={12}
						sm={12}
						md={6}
					>
						<FormControl size="small" fullWidth>
							<InputLabel id="category-label">
								Are you cross trained front to back?
							</InputLabel>
							<Select
								required
								className="w-100"
								labelId="category-label"
								id="category"
								label="Are you cross trained front to back?"
								sx={{ mb: 2 }}
								value={additionalInfo.crossTrained}
								onChange={(e) =>
									setAdditionalInfo((state) => ({
										...state,
										crossTrained: e.target.value,
									}))
								}
							>
								<MenuItem value="Yes">Yes</MenuItem>
								<MenuItem value="Some">Some</MenuItem>
								<MenuItem value="No">No</MenuItem>
							</Select>
						</FormControl>
					</Grid>

				</Grid>

			</Box>


			{/* <Row style={{ width: "95%" }}>
				<h4
					className="m-0 p-0 my-3 ms-3 fw-semibold"
					style={{ fontSize: "1.25rem" }}
				>
					Questionaire
				</h4>
				<Row className="m-0 p-0">
					<Col className="m-0 p-0 px-3" xs={12} md={6}>
						<h6 style={{ color: "#595959" }}>
							How many years/months did you work in dental field?*
						</h6>
						<Row className="m-0 p-0 mb-3">
							<Col className="m-0 p-0 pe-0 pe-md-2" xs={12} md={6}>
								<TextField
									size="small"
									required
									className="w-100"
									label="Years"
									variant="outlined"
									sx={{ mb: 2 }}
									value={yearsWorked.years}
									onChange={(e) =>
										setYearsWorked((state) => ({
											...state,
											years: e.target.value.replace(/\D/, ""),
										}))
									}
								/>
							</Col>
							<Col className="m-0 p-0 ps-0 ps-md-2" xs={12} md={6}>
								<TextField
									required
									size="small"
									className="w-100"
									label="Months"
									variant="outlined"
									sx={{ mb: 2 }}
									value={yearsWorked.months}
									onChange={(e) => {
										let value = e.target.value.replace(/\D/, "");
										if (value > 12) value = "12";
										setYearsWorked((state) => ({
											...state,
											months: value,
										}));
									}}
								/>
							</Col>
						</Row>
						<h6 style={{ color: "#595959" }}>
							Proficient with the following Digital Radiography Systems{" "}
							<span className="text-lightgrey"> (Up to 50): </span>
						</h6>
						<Row className="m-0 p-0">
							<TextField
								size="small"
								required
								variant="outlined"
								sx={{
									mb: 2,
									display: "flex",
									flexWrap: "wrap",
									height: "auto",
									overflowY: "auto",
									"&::-webkit-scrollbar": {
										height: "0.3rem",
									},
									"&::-webkit-scrollbar-thumb": {
										borderRadius: "6px",
										backgroundColor: "#bfbfbf",
									},
									"&::-webkit-scrollbar-track": {
										borderRadius: "6px",
										backgroundColor: "#eee",
									},
									"&::-webkit-scrollbar-button": {
										display: "none",
									},
								}}
								value={rinputValue}
								onChange={(e) => setRinputValue(e.target.value)}
								onKeyDown={handleKeyDown}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											{radiographySystems.map((system, index) => (
												<Chip
													color="primary"
													className="me-1 rounded"
													key={index}
													size="small"
													label={system}
													onDelete={() => handleChipDelete(index)} // Modified line to handle chip deletion
													deleteIcon={<CloseIcon />} // Assuming you have an icon component for the "X"
												/>
											))}
										</InputAdornment>
									),
								}}
							/>
						</Row>
					</Col>
					<Col className="m-0 p-0 px-3" xs={12} md={6}>
						<h6 style={{ color: "#595959" }}>
							How many years/months as an RDA/DA?
						</h6>
						<Row className="m-0 p-0 mb-3">
							<Col className="m-0 p-0 pe-0 pe-md-2" xs={12} md={6}>
								<TextField
									size="small"
									className="w-100"
									label="Years"
									variant="outlined"
									sx={{ mb: 2 }}
									value={yearsAsRDA.years}
									onChange={(e) =>
										setYearsAsRDA((state) => ({
											...state,
											years: e.target.value.replace(/\D/, ""),
										}))
									}
								/>
							</Col>
							<Col className="m-0 p-0 ps-0 ps-md-2" xs={12} md={6}>
								<TextField
									required
									size="small"
									className="w-100"
									label="Months"
									variant="outlined"
									sx={{ mb: 2 }}
									value={yearsAsRDA.months}
									onChange={(e) => {
										let value = e.target.value.replace(/\D/, "");
										if (value > 12) value = "12";
										setYearsAsRDA((state) => ({
											...state,
											months: value,
										}));
									}}
								/>
							</Col>
						</Row>
						<h6 style={{ color: "#595959" }}>
							Proficient with the following Practice Management Software{" "}
							<span className="text-lightgrey"> (Up to 50): </span>
						</h6>
						<Row className="m-0 p-0">
							<TextField
								required
								size="small"
								className="w-100"
								variant="outlined"
								sx={{
									mb: 2,
									display: "flex",
									flexWrap: "wrap",
									height: "auto",
									overflowY: "auto",
									"&::-webkit-scrollbar": {
										height: "0.3rem",
									},
									"&::-webkit-scrollbar-thumb": {
										borderRadius: "6px",
										backgroundColor: "#bfbfbf",
									},
									"&::-webkit-scrollbar-track": {
										borderRadius: "6px",
										backgroundColor: "#eee",
									},
									"&::-webkit-scrollbar-button": {
										display: "none",
									},
								}}
								value={prcValue}
								onChange={(e) => setPrcValue(e.target.value)}
								onKeyDown={handleKeyDownPrc}
								InputProps={{
									startAdornment: (
										<InputAdornment position="start">
											{practiceManagementSoftware.map((system, index) => (
												<Chip
													size="small"
													color="primary"
													className="me-1 rounded"
													key={index}
													label={system}
													onDelete={() => handleChipDeletePrc(index)}
													deleteIcon={<CloseIcon />}
												/>
											))}
										</InputAdornment>
									),
								}}
							/>
						</Row>
					</Col>
				</Row>

				<h4
					className="m-0 p-0 my-3 ms-3 fw-semibold"
					style={{ fontSize: "1.25rem" }}
				>
					Experienced in the following specialties:
				</h4>
				<Row className="m-0 p-0">
					<Col className="m-0 p-0 px-3" xs={12} md={6}>
						<Row className="m-0 p-0 mb-1">
							<Col className="m-0 p-0 pe-0 pe-md-2" xs={12} md={6}>
								<FormControl size="small" className="w-100">
									<InputLabel id="category-label">General</InputLabel>
									<Select
										required
										className="w-100"
										labelId="category-label"
										id="category"
										label="General"
										sx={{ mb: 2 }}
										value={specialties.general}
										onChange={(e) =>
											setSpecialties((state) => ({
												...state,
												general: e.target.value,
											}))
										}
									>
										<MenuItem value="Yes">Yes</MenuItem>
										<MenuItem value="Some">Some</MenuItem>
										<MenuItem value="No">No</MenuItem>
									</Select>
								</FormControl>
							</Col>
							<Col className="m-0 p-0 ps-0 ps-md-2" xs={12} md={6}>
								<FormControl size="small" className="w-100">
									<InputLabel id="category-label">Prostho</InputLabel>
									<Select
										required
										className="w-100"
										labelId="category-label"
										id="category"
										label="Prostho"
										sx={{ mb: 2 }}
										value={specialties.prostho}
										onChange={(e) =>
											setSpecialties((state) => ({
												...state,
												prostho: e.target.value,
											}))
										}
									>
										<MenuItem value="Yes">Yes</MenuItem>
										<MenuItem value="Some">Some</MenuItem>
										<MenuItem value="No">No</MenuItem>
									</Select>
								</FormControl>
							</Col>
						</Row>
						<Row className="m-0 p-0 mb-1">
							<Col className="m-0 p-0 pe-0 pe-md-2" xs={12} md={6}>
								<FormControl size="small" className="w-100">
									<InputLabel id="category-label">Cosmetic</InputLabel>
									<Select
										required
										className="w-100"
										labelId="category-label"
										id="category"
										label="Cosmetic"
										sx={{ mb: 2 }}
										value={specialties.cosmetic}
										onChange={(e) =>
											setSpecialties((state) => ({
												...state,
												cosmetic: e.target.value,
											}))
										}
									>
										<MenuItem value="Yes">Yes</MenuItem>
										<MenuItem value="Some">Some</MenuItem>
										<MenuItem value="No">No</MenuItem>
									</Select>
								</FormControl>
							</Col>
							<Col className="m-0 p-0 ps-0 ps-md-2" xs={12} md={6}>
								<FormControl size="small" className="w-100">
									<InputLabel id="category-label">Pedo</InputLabel>
									<Select
										required
										className="w-100"
										labelId="category-label"
										id="category"
										label="Pedo"
										sx={{ mb: 2 }}
										value={specialties.pedo}
										onChange={(e) =>
											setSpecialties((state) => ({
												...state,
												pedo: e.target.value,
											}))
										}
									>
										<MenuItem value="Yes">Yes</MenuItem>
										<MenuItem value="Some">Some</MenuItem>
										<MenuItem value="No">No</MenuItem>
									</Select>
								</FormControl>
							</Col>
						</Row>
						<Row className="m-0 p-0 mb-1">
							<Col className="m-0 p-0 pe-0 pe-md-2" xs={12} md={6}>
								<FormControl size="small" className="w-100">
									<InputLabel id="category-label">Ortho</InputLabel>
									<Select
										required
										className="w-100"
										labelId="category-label"
										id="category"
										label="Ortho"
										sx={{ mb: 2 }}
										value={specialties.ortho}
										onChange={(e) =>
											setSpecialties((state) => ({
												...state,
												ortho: e.target.value,
											}))
										}
									>
										<MenuItem value="Yes">Yes</MenuItem>
										<MenuItem value="Some">Some</MenuItem>
										<MenuItem value="No">No</MenuItem>
									</Select>
								</FormControl>
							</Col>
						</Row>
					</Col>
					<Col className="m-0 p-0 px-3" xs={12} md={6}>
						<Row className="m-0 p-0 mb-1">
							<Col className="m-0 p-0 pe-0 pe-md-2" xs={12} md={6}>
								<FormControl size="small" className="w-100">
									<InputLabel id="category-label">Perio</InputLabel>
									<Select
										required
										className="w-100"
										labelId="category-label"
										id="category"
										label="Perio"
										sx={{ mb: 2 }}
										value={specialties.perio}
										onChange={(e) =>
											setSpecialties((state) => ({
												...state,
												perio: e.target.value,
											}))
										}
									>
										<MenuItem value="Yes">Yes</MenuItem>
										<MenuItem value="Some">Some</MenuItem>
										<MenuItem value="No">No</MenuItem>
									</Select>
								</FormControl>
							</Col>
							<Col className="m-0 p-0 ps-0 ps-md-2" xs={12} md={6}>
								<FormControl size="small" className="w-100">
									<InputLabel id="category-label">Endo</InputLabel>
									<Select
										required
										className="w-100"
										labelId="category-label"
										id="category"
										label="Endo"
										sx={{ mb: 2 }}
										value={specialties.endo}
										onChange={(e) =>
											setSpecialties((state) => ({
												...state,
												endo: e.target.value,
											}))
										}
									>
										<MenuItem value="Yes">Yes</MenuItem>
										<MenuItem value="Some">Some</MenuItem>
										<MenuItem value="No">No</MenuItem>
									</Select>
								</FormControl>
							</Col>
						</Row>
						<Row className="m-0 p-0 mb-3">
							<Col className="m-0 p-0 pe-0 pe-md-2" xs={12} md={6}>
								<FormControl size="small" className="w-100">
									<InputLabel id="category-label">Implants</InputLabel>
									<Select
										required
										className="w-100"
										labelId="category-label"
										id="category"
										label="Implants"
										sx={{ mb: 2 }}
										value={specialties.implants}
										onChange={(e) =>
											setSpecialties((state) => ({
												...state,
												implants: e.target.value,
											}))
										}
									>
										<MenuItem value="Yes">Yes</MenuItem>
										<MenuItem value="Some">Some</MenuItem>
										<MenuItem value="No">No</MenuItem>
									</Select>
								</FormControl>
							</Col>
							<Col className="m-0 p-0 ps-0 ps-md-2" xs={12} md={6}>
								<FormControl size="small" className="w-100">
									<InputLabel id="category-label">Oral Surgery</InputLabel>
									<Select
										required
										className="w-100"
										labelId="category-label"
										id="category"
										label="Oral Surgery"
										sx={{ mb: 2 }}
										value={specialties.oralSurgery}
										onChange={(e) =>
											setSpecialties((state) => ({
												...state,
												oralSurgery: e.target.value,
											}))
										}
									>
										<MenuItem value="Yes">Yes</MenuItem>
										<MenuItem value="Some">Some</MenuItem>
										<MenuItem value="No">No</MenuItem>
									</Select>
								</FormControl>
							</Col>
						</Row>
					</Col>
				</Row>

				<h4
					className="m-0 p-0 my-3 ms-3 fw-semibold"
					style={{ fontSize: "1.25rem" }}
				>
					Additional Information
				</h4>
				<Row className="m-0 p-0">
					<Col className="m-0 p-0 px-3" xs={12} md={6}>
						<Row className="m-0 p-0">
							<FormControl size="small">
								<InputLabel id="category-label">
									Experienced in Cad-Cam (E4D or Cerec):
								</InputLabel>
								<Select
									required
									className="w-100"
									labelId="category-label"
									id="category"
									label="Experienced in Cad-Cam (E4D or Cerec):"
									sx={{ mb: 2 }}
									value={additionalInfo.cadCam}
									onChange={(e) =>
										setAdditionalInfo((state) => ({
											...state,
											cadCam: e.target.value,
										}))
									}
								>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="Some">Some</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</Row>
						<Row className="m-0 p-0">
							<FormControl size="small">
								<InputLabel id="category-label">Experienced in Pano:</InputLabel>
								<Select
									required
									className="w-100"
									labelId="category-label"
									id="category"
									label="Experienced in Pano:"
									sx={{ mb: 2 }}
									value={additionalInfo.pano}
									onChange={(e) =>
										setAdditionalInfo((state) => ({
											...state,
											pano: e.target.value,
										}))
									}
								>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="Some">Some</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</Row>
						<Row className="m-0 p-0">
							<FormControl size="small">
								<InputLabel id="category-label">
									Experienced in 3D Imaging:
								</InputLabel>
								<Select
									required
									className="w-100"
									labelId="category-label"
									id="category"
									label="Experienced in 3D Imaging:"
									sx={{ mb: 2 }}
									value={additionalInfo.printers3D}
									onChange={(e) =>
										setAdditionalInfo((state) => ({
											...state,
											printers3D: e.target.value,
										}))
									}
								>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="Some">Some</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</Row>
						<Row className="m-0 p-0">
							<FormControl size="small">
								<InputLabel id="category-label">
									Experienced in Nomad portable X-Ray:
								</InputLabel>
								<Select
									required
									className="w-100"
									labelId="category-label"
									id="category"
									label="Experienced in Nomad portable X-Ray:"
									sx={{ mb: 2 }}
									value={additionalInfo.nomadXRay}
									onChange={(e) =>
										setAdditionalInfo((state) => ({
											...state,
											nomadXRay: e.target.value,
										}))
									}
								>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="Some">Some</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</Row>
					</Col>
					<Col className="m-0 p-0 px-3" xs={12} md={6}>
						<Row className="m-0 p-0">
							<FormControl size="small">
								<InputLabel id="category-label">
									Experienced in Intraoral Cameras:
								</InputLabel>
								<Select
									required
									className="w-100"
									labelId="category-label"
									id="category"
									label="Experienced in Intraoral Cameras:"
									sx={{ mb: 2 }}
									value={additionalInfo.intraoralCameras}
									onChange={(e) =>
										setAdditionalInfo((state) => ({
											...state,
											intraoralCameras: e.target.value,
										}))
									}
								>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="Some">Some</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</Row>
						<Row className="m-0 p-0">
							<FormControl size="small">
								<InputLabel id="category-label">
									Experienced in Cephalometric X-Ray machine:
								</InputLabel>
								<Select
									required
									className="w-100"
									labelId="category-label"
									id="category"
									label="Experienced in Cephalometric X-Ray machine:"
									sx={{ mb: 2 }}
									value={additionalInfo.cephalometricXRay}
									onChange={(e) =>
										setAdditionalInfo((state) => ({
											...state,
											cephalometricXRay: e.target.value,
										}))
									}
								>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="Some">Some</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</Row>
						<Row className="m-0 p-0">
							<FormControl size="small">
								<InputLabel id="category-label">
									Are you cross trained front to back?
								</InputLabel>
								<Select
									required
									className="w-100"
									labelId="category-label"
									id="category"
									label="Are you cross trained front to back?"
									sx={{ mb: 2 }}
									value={additionalInfo.crossTrained}
									onChange={(e) =>
										setAdditionalInfo((state) => ({
											...state,
											crossTrained: e.target.value,
										}))
									}
								>
									<MenuItem value="Yes">Yes</MenuItem>
									<MenuItem value="Some">Some</MenuItem>
									<MenuItem value="No">No</MenuItem>
								</Select>
							</FormControl>
						</Row>
					</Col>
				</Row>
			</Row> */}
		</>
	);
}
