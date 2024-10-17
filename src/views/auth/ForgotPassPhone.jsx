
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";


import {
	Button,
	Checkbox,
	CircularProgress,
	IconButton,
	InputAdornment,
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	TextField
} from '@mui/material';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";

import logo from "../../assets/icons/Logo.svg";




export default function ForgotPassPhone() {
	const [mobile, setMobile] = useState("");
	const [view, setView] = useState("send");
	const [errorMessage, setErrorMessage] = useState("");
	const [codes, setCodes] = useState(["", "", "", "", "", ""]);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isUpperCase, setIsUpperCase] = useState(false);
	const [isLowerCase, setIsLowerCase] = useState(false);
	const [hasNumber, setHasNumber] = useState(false);
	const [hasMinimumLength, setHasMinimumLength] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showPassword2, setShowPassword2] = useState(false);
	const [isTimer, setIsTimer] = useState("");
	const [timer, setTimer] = useState(60);

	const navigate = useNavigate();

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	const handleTogglePassword2 = () => {
		setShowPassword2(!showPassword2);
	};

	const handlePasswordChange = (e) => {
		setErrorMessage("");
		const newPassword = e.target.value;
		setPassword(newPassword);

		setIsUpperCase(/[A-Z]/.test(newPassword));
		setIsLowerCase(/[a-z]/.test(newPassword));
		setHasNumber(/[0-9]/.test(newPassword));
		setHasMinimumLength(newPassword.length >= 8);
	};

	const handleConfirmPasswordChange = (e) => {
		setErrorMessage("");
		const newConfirmPassword = e.target.value;
		setConfirmPassword(newConfirmPassword);
	};

	const allRequirementsMet =
		isUpperCase && isLowerCase && hasNumber && hasMinimumLength;

	const handleVerifyCode = () => {
		if (password !== confirmPassword) {
			setErrorMessage("Passwords Do Not Match");
			return;
		}
		setIsLoading(true);
		const verifCode = codes.join("");

		axios
			.post(
				` https://api.mddentalstaffing.com/api/v1/reset/password?verify_token=${verifCode}&password=${password}&password_confirmation=${confirmPassword}`
			)
			.then((res) => {
				navigate("/login");
			})
			.catch((error) => {
				console.error(error);
				setErrorMessage("Sign Up Failed");
			});
		setIsLoading(false);
	};

	const handleCodeChange = (index, value) => {
		const newCodes = [...codes];
		newCodes[index] = value;

		if (value && index < 5) {
			document.getElementById(`code-input-${index + 1}`).focus();
		} else if (!value && index > 0) {
			document.getElementById(`code-input-${index - 1}`).focus();
		}

		setCodes(newCodes);
	};

	const handleMobileChange = (e) => {
		setErrorMessage("");
		setMobile(e.target.value);
	};

	const handleNext = (e) => {
		e.preventDefault();
		axios
			.post(
				`https://api.mddentalstaffing.com/api/v1/forgot/password?mobile=${mobile}`
			)
			.then((response) => {
				setView("sent");
			})
			.catch((error) => {
				setErrorMessage("Account Not Found");
			});
	};

	const handleNextAgain = () => {
		setIsTimer(true);

		axios
			.post(
				`https://api.mddentalstaffing.com/api/v1/forgot/password?mobile=${mobile}`
			)
			.then((response) => {
				alert(
					"Recovery code has been sent again. Please wait for 1 minute to send again."
				);
				startTimer();
			})
			.catch((error) => {
				console.error("Error sending POST request:", error);
			});
	};

	const startTimer = () => {
		setTimer(60);
		const interval = setInterval(() => {
			setTimer((prevTimer) => prevTimer - 1);
		}, 1000);

		setTimeout(() => {
			clearInterval(interval);
			setIsTimer(false);
		}, 60000);
	};

	return (
		<>


			{view === 'send' && (
				<>
					<Stack spacing={2}>
						<Box
							sx={{
								textAlign: 'center',
							}}
							alignItems="center"
						>
							<img className="my-3" src={logo} />
							<Typography variant="h4" gutterBottom>
								Password Recovery
							</Typography>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									p: 1,
									m: 1,
								}}
							>
								<h6 className="fw-regular text-grey mx-2"> Can't Log In? </h6>
							</Box>
							<Box
								sx={{
									// display: 'flex',
									justifyContent: 'center',
									p: 1,
									m: 1,
									// width: '200px'
								}}
							>
								<Typography variant="subtitle2" gutterBottom>
									Please enter you phone number associated with your account
								</Typography>
							</Box>
						</Box>
					</Stack>

					<Stack
						direction="column"
						justifyContent="center"
						alignItems="center"
					// spacing={2}
					>
						<form onSubmit={handleNext}>
							<Box
								sx={{
									textAlign: 'center',
								}}
								alignItems="center"
							>
								<Grid
									container
									spacing={1}
									justifyContent="center"
									alignItems="center"
								>

									<Grid
										item
										xs={12}
										sm={12}
										md={7}
									>
										<TextField
											fullWidth
											required
											name="Mobile"
											value={mobile}
											label="Phone"
											error={errorMessage !== ""}
											variant="outlined"
											sx={{
												mb: 2,
												"& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
													{ borderColor: "#FA5A16" },
											}}
											inputProps={{ minLength: 12, maxLength: 12, type: "tel" }}
											onChange={(e) => {
												setErrorMessage("");
												const inputValue = e.target.value;
												setMobile(
													inputValue.startsWith("+1") ? inputValue : `+1${inputValue}`
												);
											}}
											onInput={(e) => {
												e.target.value = e.target.value
													.replace(/[^0-9+]/g, "")
													.slice(0, 12);
											}}
										/>

										{errorMessage && (
											<div
												className='text-start'
												style={{ color: '#FA5A16', fontSize: '0.7rem' }}
											>
												{errorMessage}
											</div>
										)}

									</Grid>

									<Grid
										item
										xs={12}
										sm={12}
										md={7}
									>
										<Typography variant="subtitle2" gutterBottom>
											If you did not receive the code,
											please wait for while may be network issue.
										</Typography>
									</Grid>

									<Grid
										item
										xs={12}
										sm={12}
										md={7}
									>
										<Grid
											container
											spacing={4}
											justifyContent="center"
											alignItems="center"
										>
											<Grid
												item
												xs={12}
												sm={12}
												md={6}
											>
												<Button
													fullWidth
													variant="outlined"
													color="primary"
													sx={{
														borderRadius: "4px",
														height: "56px",
														border: "2px solid #2561B0",
														color: "#2561B0",
														boxShadow: "none",
														textTransform: "none",
														// minWidth: '250px'
													}}
													onClick={() => {
														// setView("signup");
													}}
												>
													Cancel
												</Button>
											</Grid>
											<Grid
												item
												xs={12}
												sm={12}
												md={6}
											>
												<Button
													fullWidth
													type='submit'
													variant='contained'
													color='primary'
													disabled={!mobile}
													sx={{
														width: '100%',
														borderRadius: '4px',
														height: '56px',
														background: '#2561B0',
														boxShadow: 'none',
														textTransform: 'none',
													}}
												>
													{isLoading ? (
														<CircularProgress size={24} color='inherit' />
													) : (
														'Ok'
													)}
												</Button>
											</Grid>
										</Grid>

									</Grid>

								</Grid>
							</Box>
						</form>
					</Stack>
				</>
			)}


			{view === 'sent' && (
				<>
					<Stack spacing={2}>
						<Box
							sx={{
								textAlign: 'center',
							}}
							alignItems="center"
						>
							<img className="my-3" src={logo} />
							<Typography variant="h4" gutterBottom>
								Password Recovery
							</Typography>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									p: 1,
									m: 1,
								}}
							>
								<h6 className="fw-regular text-grey mx-2"> Can't Log In? </h6>
							</Box>
							<Box
								sx={{
									// display: 'flex',
									justifyContent: 'center',
									p: 1,
									m: 1,
									// width: '200px'
								}}
							>
								<Typography variant="subtitle2" gutterBottom>
									Check your mobile. We have sent you a recovery code to{" "}
									<a href="#">{mobile}</a>.
								</Typography>
							</Box>
						</Box>
					</Stack>

					<Stack
						direction="column"
						justifyContent="center"
						alignItems="center"
					// spacing={2}
					>
						<Box
							sx={{
								textAlign: 'center',
							}}
							alignItems="center"
						>
							<Grid
								container
								spacing={1}
								justifyContent="center"
								alignItems="center"
								sx={{
									mb: 10
								}}
							>
								{codes.map((code, index) => (
									<Grid
										item
										xs={12}
										sm={12}
										md={1}
									// gap={1}
									>
										<TextField
											id={`code-input-${index}`}
											// className="form-control text-end"
											placeholder="0"
											maxLength="1"
											error={errorMessage != ""}
											value={code}
											onChange={(e) => handleCodeChange(index, e.target.value)}
											inputProps={{ style: { textAlign: 'center' }, type: 'tel' }}
										/>

									</Grid>
								))}

								{errorMessage && (
									<Grid
										item
										xs={12}
										sm={12}
										md={12}
									>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'center',
												textAlign: 'center',
											}}
										>
											<div
												className="text-start mt-2"
												style={{ color: "#FA5A16", fontSize: "0.7rem" }}
											>
												{errorMessage}
											</div>
										</Box>
									</Grid>
								)}
							</Grid>
							<Box
								sx={{
									textAlign: 'center',
									mt: 5
								}}
								alignItems="center"
							>

								<Grid
									container
									spacing={1}
									justifyContent="center"
									alignItems="center"
								>
									<Grid
										item
										xs={12}
										sm={12}
										md={2}
									// gap={1}
									>
										<Link to={'/login'} className='text-decoration-none'>
											<Button
												fullWidth
												variant='outlined'
												color='primary'
												sx={{
													// width: '100%',
													borderRadius: '4px',
													height: '56px',
													border: '2px solid #2561B0',
													color: '#2561B0',
													boxShadow: 'none',
													textTransform: 'none',
													// mb: 2,
												}}
											>
												Back
											</Button>
										</Link>
									</Grid>
									<Grid
										item
										xs={12}
										sm={12}
										md={2}
									// gap={1}
									>

										<Button
											fullWidth
											variant="contained"
											color="primary"
											sx={{
												width: "100%",
												borderRadius: "4px",
												height: "56px",
												background: "#2561B0",
												boxShadow: "none",
												textTransform: "none",
											}}
											onClick={handleNextAgain}
											disabled={isTimer}
										>
											{isTimer
												? `Resend  Code (${timer}s)`
												: "Resend  Code"}
										</Button>

									</Grid>

									<Grid
										item
										xs={12}
										sm={12}
										md={2}
									// gap={1}
									>
										<Button
											fullWidth
											variant="contained"
											color="primary"
											sx={{
												borderRadius: "4px",
												height: "56px",
												background: "#2561B0",
												boxShadow: "none",
												textTransform: "none",
											}}
											onClick={() => {
												alert("Please Enter New Passwords for verification");
												setView("createpass");
											}}
										>
											Next
										</Button>

									</Grid>
								</Grid>
							</Box>
						</Box>
					</Stack>
				</>
			)}


			{view === 'createpass' && (
				<>
					<Stack spacing={2}>
						<Box
							sx={{
								textAlign: 'center',
							}}
							alignItems="center"
						>
							<img className="my-3" src={logo} />
							<Typography variant="h4" gutterBottom>
								Create Password
							</Typography>
							<Box
								sx={{
									// display: 'flex',
									justifyContent: 'center',
									p: 1,
									m: 1,
									// width: '200px'
								}}
							>
								<Typography variant="subtitle2" gutterBottom>
									Enter the password you would like to use with your account.
								</Typography>
							</Box>
						</Box>
					</Stack>

					<Stack
						direction="column"
						justifyContent="center"
						alignItems="center"
					// spacing={2}
					>

						<Box
							sx={{
								// textAlign: 'center',
							}}
						>
							<Grid
								container
								spacing={1}
								justifyContent="center"
								alignItems="center"
							>

								<Grid
									item
									xs={12}
									sm={12}
									md={7}
								>
									<TextField
										fullWidth
										type={!showPassword ? 'password' : 'text'}
										label='Password'
										name='password'
										variant='outlined'
										error={errorMessage !== ''}
										sx={{
											'& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline':
												{ borderColor: '#FA5A16' },
										}}
										value={password}
										onChange={(e) => handlePasswordChange(e)}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														style={{ opacity: 0.6 }}
														onClick={handleTogglePassword}
														edge='end'
													>
														{showPassword ? (
															<VisibilityOutlined />
														) : (
															<VisibilityOffOutlined />
														)}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</Grid>

								<Grid
									item
									xs={12}
									sm={12}
									md={7}
								>
									<TextField
										fullWidth
										label='Confirm Password'
										name='password2'
										type={!showPassword2 ? 'password' : 'text'}
										variant='outlined'
										error={errorMessage !== ''}
										sx={{
											'& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline':
												{ borderColor: '#FA5A16' },
										}}
										value={confirmPassword}
										onChange={handleConfirmPasswordChange}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														style={{ opacity: 0.6 }}
														onClick={handleTogglePassword2}
														edge='end'
													>
														{showPassword2 ? (
															<VisibilityOutlined />
														) : (
															<VisibilityOffOutlined />
														)}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</Grid>

								<Grid
									item
									xs={12}
									sm={12}
									md={7}
								>
									{errorMessage && (
										<div
											className="text-start mt-2"
											style={{ color: "#FA5A16", fontSize: "0.7rem" }}
										>
											{errorMessage}
										</div>
									)}
								</Grid>


								<Grid
									item
									xs={12}
									sm={12}
									md={7}
								>
									<span className="text-grey mb-1 text start fw-semibold">
										Password requirements
									</span>

								</Grid>

								<Grid
									item
									xs={12}
									sm={12}
									md={7}
								>
									{isUpperCase ? (
										<CheckIcon
											style={{
												color: "green",
												fontSize: "1rem",
											}}
										/>
									) : (
										<span>&bull;</span>
									)}
									<span className="text-grey">Upper case letters (ABC)</span>

								</Grid>

								<Grid
									item
									xs={12}
									sm={12}
									md={7}
								>
									{isLowerCase ? (
										<CheckIcon
											style={{
												color: "green",
												fontSize: "1rem",
											}}
										/>
									) : (
										<span>&bull;</span>
									)}
									<span className="text-grey">Lower case letters (abc)</span>
								</Grid>

								<Grid
									item
									xs={12}
									sm={12}
									md={7}
								>
									{hasNumber ? (
										<CheckIcon
											style={{
												color: "green",
												fontSize: "1rem",
											}}
										/>
									) : (
										<span>&bull;</span>
									)}
									<span className="text-grey">Numbers (123)</span>
								</Grid>

								<Grid
									item
									xs={12}
									sm={12}
									md={7}
								>
									{hasMinimumLength ? (
										<CheckIcon
											style={{
												color: "green",
												fontSize: "1rem",
											}}
										/>
									) : (
										<span>&bull;</span>
									)}

									<span className="text-grey">Minimum characters 8</span>
								</Grid>

								<Grid
									item
									xs={12}
									sm={12}
									md={7}
								>
									<Grid
										container
										spacing={4}
										justifyContent="center"
										alignItems="center"
									>
										<Grid
											item
											xs={12}
											sm={12}
											md={6}
										>
											<Button
												fullWidth
												variant='outlined'
												color='primary'
												sx={{
													borderRadius: '4px',
													height: '56px',
													border: '2px solid #2561B0',
													color: '#2561B0',
													boxShadow: 'none',
													textTransform: 'none',
													// mb: 2,
												}}
												onClick={() => {
													setView('sent');
												}}
											>
												Back
											</Button>


										</Grid>
										<Grid
											item
											xs={12}
											sm={12}
											md={6}
										>
											<Button
												fullWidth
												variant='contained'
												color='primary'
												sx={{
													borderRadius: '4px',
													height: '56px',
													background: '#2561B0',
													boxShadow: 'none',
													textTransform: 'none',
												}}
												disabled={!allRequirementsMet}
												onClick={handleVerifyCode}
											>
												Next
											</Button>
										</Grid>
									</Grid>

								</Grid>

							</Grid>
						</Box>

					</Stack>

				</>
			)}


			{/* <Col
				xs={10}
				sm={6}
				md={5}
				lg={5}
				xxl={4}
				className="text-center mx-auto mt-3"
			>
				<Image className="mb-5 mt-3" src={logo} />

				{view === "send" && (
					<>
						<h2 className="mt-2 fw-semibold text-grey">Password Recovery</h2>
						<div className="d-flex justify-content-center align-items-center">
							<hr className="pb-2 text-secondary" style={{ width: "40px" }} />
							<h6 className="fw-regular mx-2"> Can't Log In? </h6>
							<hr className="pb-2 text-secondary" style={{ width: "40px" }} />
						</div>

						<div className="mt-4 mb-4 fs-small text-center">
							Please enter you phone number associated with your account
						</div>
						<form onSubmit={handleNext}>
							<TextField
								className="w-100"
								required
								name="Mobile"
								value={mobile}
								label="Phone"
								error={errorMessage !== ""}
								variant="outlined"
								sx={{
									mb: 2,
									"& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
										{ borderColor: "#FA5A16" },
								}}
								inputProps={{ minLength: 12, maxLength: 12, type: "tel" }}
								onChange={(e) => {
									setErrorMessage("");
									const inputValue = e.target.value;
									setMobile(
										inputValue.startsWith("+1") ? inputValue : `+1${inputValue}`
									);
								}}
								onInput={(e) => {
									e.target.value = e.target.value
										.replace(/[^0-9+]/g, "")
										.slice(0, 12);
								}}
							/>

							{errorMessage && (
								<div
									className="text-start"
									style={{ color: "#FA5A16", fontSize: "0.7rem" }}
								>
									{errorMessage}
								</div>
							)}
							<br />

							<Row>
								<Col md={6}>
									<Link to={"/login"} className="text-decoration-none">
										<Button
											variant="outlined"
											color="primary"
											sx={{
												width: "100%",
												borderRadius: "4px",
												height: "56px",
												border: "2px solid #2561B0",
												color: "#2561B0",
												boxShadow: "none",
												textTransform: "none",
											}}
										>
											Cancel
										</Button>
									</Link>
								</Col>
								<Col md={6}>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										disabled={!mobile}
										sx={{
											width: "100%",
											borderRadius: "4px",
											height: "56px",
											background: "#2561B0",
											boxShadow: "none",
											textTransform: "none",
										}}
									>
										{isLoading ? (
											<CircularProgress size={24} color="inherit" />
										) : (
											"Ok"
										)}
									</Button>
								</Col>
							</Row>
						</form>
					</>
				)}

				{view === "sent" && (
					<>
						<h2 className="mt-5 fw-semibold text-grey">Password Recovery</h2>
						<div className="d-flex justify-content-center align-items-center">
							<hr className="pb-2 text-secondary" style={{ width: "40px" }} />
							<h6 className="fw-regular mx-2"> Can't Log In? </h6>
							<hr className="pb-2 text-secondary" style={{ width: "40px" }} />
						</div>

						<div className="fs-small my-0 my-4 text-center">
							Check your mobile. We have sent you a recovery code to{" "}
							<a href="#">{mobile}</a>.
						</div>

						<Row className="text-center justify-content-center mb-3">
							{codes.map((code, index) => (
								<Col className="mx-1 p-0 text-center" key={index}>
									<TextField
										id={`code-input-${index}`}
										className="form-control text-end"
										type="text"
										maxLength="1"
										value={code}
										onChange={(e) => handleCodeChange(index, e.target.value)}
										inputProps={{ style: { textAlign: "center" } }}
									/>
								</Col>
							))}
							{errorMessage && (
								<div
									className="text-start mt-2"
									style={{ color: "#FA5A16", fontSize: "0.7rem" }}
								>
									{errorMessage}
								</div>
							)}
						</Row>

						<Row className="px-2">
							<Button
								variant="contained"
								color="primary"
								sx={{
									width: "100%",
									borderRadius: "4px",
									height: "56px",
									background: "#2561B0",
									boxShadow: "none",
									textTransform: "none",
								}}
								onClick={() => {
									alert("Please Enter New Passwords for verification");
									setView("createpass");
								}}
							>
								Next
							</Button>
						</Row>

						<Row className="pt-3">
							<Col md={6}>
								<Link to={"/login"} className="text-decoration-none">
									<Button
										variant="outlined"
										color="primary"
										sx={{
											width: "100%",
											borderRadius: "4px",
											height: "56px",
											border: "2px solid #2561B0",
											color: "#2561B0",
											boxShadow: "none",
											textTransform: "none",
										}}
									>
										Back to login
									</Button>
								</Link>
							</Col>
							<Col md={6}>
								<Button
									variant="contained"
									color="primary"
									sx={{
										width: "100%",
										borderRadius: "4px",
										height: "56px",
										background: "#2561B0",
										boxShadow: "none",
										textTransform: "none",
									}}
									onClick={handleNextAgain}
									disabled={isTimer}
								>
									{isTimer
										? `Resend Recovery Code (${timer}s)`
										: "Resend Recovery Code"}
								</Button>
							</Col>
						</Row>
					</>
				)}

				{view === "createpass" && (
					<>
						<h2 className="mt-2 fw-semibold text-grey">Create Password</h2>
						<div className="mb-4 text-grey">
							Enter the password you would like to use with your account.
						</div>
						<TextField
							className="w-100 mt-3"
							label="Password"
							name="password"
							type={showPassword ? "text" : "password"}
							variant="outlined"
							error={errorMessage !== ""}
							sx={{
								"& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
									{ borderColor: "#FA5A16" },
							}}
							value={password}
							onChange={handlePasswordChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											style={{ opacity: 0.6 }}
											onClick={handleTogglePassword}
											edge="end"
										>
											{showPassword ? (
												<VisibilityOutlined />
											) : (
												<VisibilityOffOutlined />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<TextField
							className="w-100 mt-3"
							label="Confirm Password"
							type={showPassword2 ? "text" : "password"}
							name="password 2"
							variant="outlined"
							error={errorMessage !== ""}
							sx={{
								"& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
									{ borderColor: "#FA5A16" },
							}}
							value={confirmPassword}
							onChange={handleConfirmPasswordChange}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											style={{ opacity: 0.6 }}
											onClick={handleTogglePassword2}
											edge="end"
										>
											{showPassword2 ? (
												<VisibilityOutlined />
											) : (
												<VisibilityOffOutlined />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						{errorMessage && (
							<div
								className="text-start mt-2"
								style={{ color: "#FA5A16", fontSize: "0.7rem" }}
							>
								{errorMessage}
							</div>
						)}
						<Row className="mt-3 fs-small text-start">
							<span className="text-grey mb-1 text start fw-semibold">
								Password requirements
							</span>
							<Col
								sm={"auto"}
								className="d-flex align-items-center mb-0.5 mx-auto"
							>
								{isUpperCase ? (
									<CheckIcon
										style={{
											color: "green",
											fontSize: "1rem",
										}}
									/>
								) : (
									<span>&bull;</span>
								)}
							</Col>
							<Col>
								<span className="text-grey">Upper case letters (ABC)</span>
							</Col>
						</Row>
						<Row className="mt-1 fs-small text-start">
							<Col
								sm={"auto"}
								className="d-flex align-items-center mb-0.5 mx-auto"
							>
								{isLowerCase ? (
									<CheckIcon
										style={{
											color: "green",
											fontSize: "1rem",
										}}
									/>
								) : (
									<span>&bull;</span>
								)}
							</Col>
							<Col>
								<span className="text-grey">Lower case letters (abc)</span>
							</Col>
						</Row>
						<Row className="mt-1 fs-small text-start">
							<Col
								sm={"auto"}
								className="d-flex align-items-center mb-0.5 mx-auto"
							>
								{hasNumber ? (
									<CheckIcon
										style={{
											color: "green",
											fontSize: "1rem",
										}}
									/>
								) : (
									<span>&bull;</span>
								)}
							</Col>
							<Col>
								<span className="text-grey">Numbers (123)</span>
							</Col>
						</Row>
						<Row className="mt-1 fs-small text-start">
							<Col
								sm={"auto"}
								className="d-flex align-items-center mb-0.5 mx-auto"
							>
								{hasMinimumLength ? (
									<CheckIcon
										style={{
											color: "green",
											fontSize: "1rem",
										}}
									/>
								) : (
									<span>&bull;</span>
								)}
							</Col>
							<Col>
								<span className="text-grey">Minimum characters 8</span>
							</Col>
						</Row>

						<Row className="mt-5">
							<Col md={6}>
								<Button
									variant="outlined"
									color="primary"
									sx={{
										width: "100%",
										borderRadius: "4px",
										height: "56px",
										border: "2px solid #2561B0",
										color: "#2561B0",
										boxShadow: "none",
										textTransform: "none",
										mb: 2,
									}}
									onClick={() => {
										setView("sent");
									}}
								>
									Back
								</Button>
							</Col>
							<Col md={6}>
								<Button
									variant="contained"
									color="primary"
									sx={{
										width: "100%",
										borderRadius: "4px",
										height: "56px",
										background: "#2561B0",
										boxShadow: "none",
										textTransform: "none",
									}}
									disabled={!allRequirementsMet}
									onClick={handleVerifyCode}
								>
									Next
								</Button>
							</Col>
						</Row>
					</>
				)}
			</Col> */}

		</>
	);
}
