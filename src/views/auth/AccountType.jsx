import { Button, CircularProgress, Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Card, Col, Image, Row } from "react-bootstrap";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/Logo.svg";
import leftShoulder from "../../assets/images/leftShoulderLogin.jpg";
import practice from "../../assets/images/practiceOwnerSignup.jpg";
import professional from "../../assets/images/professionalSignUp.jpg";
import rightShoulder from "../../assets/images/rightShoulderLogin.jpg";
import { setAuthToken } from "../../store/slices/authSlice";
import { selectUser, setUser } from "../../store/slices/userSlice";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// import Grid from "@material-ui/core/Grid";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { experimentalStyled as styled } from '@mui/material/styles';


const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}));

const AccountType = () => {
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	// useEffect(() => {
	// 	if (!user.role_type) {
	// 		navigate("/login");
	// 	} else if (user.role_type === "general") {
	// 		navigate("/selectRole");
	// 	} else if (user.role_type === "owner") {
	// 		navigate("/registration/owner");
	// 	} else if (user.role_type === "professional") {
	// 		navigate("/registration/professional");
	// 	}
	// }, []);

	const [verifyExp, setVerifyExp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};


	const token = localStorage.getItem("auth_token");
	const dispatch = useDispatch();
	const handleAccType = (role_type, exp) => {
		setIsLoading(true);
		axios
			.post(
				`https://api.mddentalstaffing.com/api/v1/signup/profile/types?role_type=${role_type}&is_dental_experience=${exp}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				if (res) {
					dispatch(setUser(res.data.data));
					localStorage.setItem("user", JSON.stringify(res.data.data));
					navigate(`/registration/${res.data.data.role_type}`);
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		setIsLoading(false);
	};

	return (
		<>


			<Grid container spacing={2}>
				<Grid
					item
					xs={2}
					sx={{
						display: {
							// xs: 'none',
							// sm: 'none',
						}
					}}
				>
					<img
						style={{ height: '100%', width: '100%' }}
						className='img-fluid'
						src={leftShoulder}
					/>
				</Grid>
				<Grid
					item
					xs={8}
					sx={{
						display: {
							// xs: 'flex',
							// sm: 'flex',
						}
					}}
				>
					<Stack spacing={2}>
						<Box
							sx={{
								textAlign: 'center',
							}}
							alignItems="center"
						>
							<img className="my-3" src={logo} />
							<Typography variant="h5" gutterBottom>
								Join Mayday Dental Staffing
							</Typography>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									p: 1,
									m: 1,
								}}
							>
								<p className="text-center">
									Already have an account?{" "}
									<span
										onClick={() => {
											dispatch(setUser({}));
											dispatch(setAuthToken(""));
											localStorage.removeItem("user");
											localStorage.removeItem("auth_token");
											window.location.reload();
										}}
										style={{ color: "#2561B0", cursor: "pointer" }}
									>
										{" "}
										Sign In{" "}
									</span>
								</p>
							</Box>
						</Box>
					</Stack>

					<Stack spacing={1}>
						<Box
							sx={{ flexGrow: 1 }}
							alignItems="center"
						>
							<Grid
								container
								spacing={5}>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
								>
									<Card >
										<CardMedia
											component="img"
											// min-height="150"
											max-height="100"
											image={practice}
											// alt="green iguana"
											sx={{
												display: {
													xs: 'none',
													sm: 'none',
													md: 'block'
												}
											}}
										/>
										<CardContent
											sx={{
												textAlign: 'center',
												// height: "160px"
											}}
										>
											<Typography gutterBottom variant="h5" component="div">
												<Button
													variant="contained"
													color="primary"
													className="w-75 mx-auto fw-normal"
													sx={{
														width: "100%",
														borderRadius: "4px",
														height: "56px",
														background: "#2561B0",
														boxShadow: "none",
														textTransform: "none",
													}}
													onClick={(e) => {
														e.preventDefault();
														let role_type = "owner";
														let exp = false;
														handleAccType(role_type, exp);
													}}
												>
													{isLoading ? (
														<CircularProgress size={24} color="inherit" />
													) : (
														<span>
															I'M A{" "}
															<span style={{ textDecoration: "underline" }}>
																PRACTICE OWNER
															</span>
														</span>
													)}
												</Button>
											</Typography>
											<Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
												I want to hire temporary
												or permanent professionals
											</Typography>
										</CardContent>
									</Card>
								</Grid>
								<Grid
									item
									xs={12}
									sm={12}
									md={6}
								>
									<Card >
										<CardMedia
											component="img"
											min-height="150"
											image={professional}
											sx={{
												display: {
													xs: 'none',
													sm: 'none',
													md: 'block'
												}
											}}
										/>
										<CardContent
											sx={{
												textAlign: 'center',
												// height: "160px"
											}}
										>
											<Typography gutterBottom variant="h5" component="div">
												<Button
													variant="contained"
													color="primary"
													className="w-75 mx-auto fw-normal"
													sx={{
														width: "100%",
														borderRadius: "4px",
														height: "56px",
														background: "#2561B0",
														boxShadow: "none",
														textTransform: "none",
													}}
													onClick={(e) => {
														e.preventDefault();
														navigate(`/login`);
														// setVerifyExp(true);
													}}
												>
													<span>
														I'M A{" "}
														<span style={{ textDecoration: "underline" }}>
															PROFESSIONAL
														</span>
													</span>
												</Button>
											</Typography>
											<Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
												I'm looking for a temporary
												or permanent job
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							</Grid>
						</Box>
					</Stack>

					<Stack
						spacing={1}
						sx={{
							mt: 5
						}}
					>
						<Box
							sx={{
								flexGrow: 1,
							}}
							alignItems="center"
						>
							<Grid container spacing={1}>

								<Grid
									item
									xs={12}
									sm={12}
									md={12}
								>
									<p
										className="mt-auto text-center mx-auto text-lightgrey"
										style={{ fontSize: "0.73rem" }}
									>
										If you have any questions, please contact us at:{" "}
										<a href="https://maydaydentalstaffing.com">
											maydaydentalstaffing.com
										</a>{" "}
										<br />. Mayday Dental Staffing is a registered trademark. Copyright ©
										Mayday Dental Staffing. All rights reserved. Patent pending.
									</p>
								</Grid>
							</Grid>
						</Box>
					</Stack>

				</Grid>

				<Grid
					item
					xs={2}
					sx={{
						display: {
							// xs: 'none',
							// sm: 'none',
						}
					}}
				>
					<img
						style={{ height: '100%', width: '100%' }}
						className='img-fluid'
						src={rightShoulder}
					/>
				</Grid>
			</Grid>


			{verifyExp && (


				<Dialog
					fullScreen={fullScreen}
					open={verifyExp}
					onClose={handleClose}
					aria-labelledby="responsive-dialog-title"

				>
					<DialogTitle id="responsive-dialog-title" sx={{
						p: 4
					}}>
						{"By selecting “YES” you confirm that you have experience in the dental field."}
					</DialogTitle>
					<DialogContent>
						{/* <DialogContentText>
							Let Google help apps determine location. This means sending anonymous
							location data to Google, even when no apps are running.
						</DialogContentText> */}
					</DialogContent>
					<DialogActions
						sx={{
							p: 4
						}}

					>
						<Button autoFocus
							// onClick={handleClose}
							onClick={() => {
								setVerifyExp(false);
								// handleClose();
							}}
						>
							No
						</Button>
						<Button
							sx={{ boxShadow: "none", textTransform: "none" }}
							style={{ background: "#4CAF50", color: "white" }}
							onClick={() => {
								let role_type = "professional";
								let exp = true;
								handleAccType(role_type, exp);
								setVerifyExp(false);
							}}
						>
							{isLoading ? (
								<CircularProgress size={24} color="inherit" />
							) : (
								"Yes"
							)}
						</Button>
					</DialogActions>
				</Dialog>

				// <Modal
				// 	open={verifyExp}
				// 	onClose={() => {
				// 		setVerifyExp(false);
				// 	}}
				// 	aria-labelledby="modal-title"
				// 	aria-describedby="modal-description"
				// >
				// 	<div className="position-absolute top-50 px-0 px-md-5 pt-0 pt-md-5 pb-0 pb-md-4 text-center start-50 translate-middle bg-white rounded shadow-sm w-50">
				// 		<h4 className="text-grey pb-4" id="modal-title">
				// 			By selecting “YES” you confirm that you have experience in the
				// 			dental field.
				// 		</h4>
				// 		<p id="modal-description">
				// 			Dental experince is required to access Mayday Dental Staffing
				// 			App
				// 		</p>
				// 		<Button
				// 			sx={{ boxShadow: "none", textTransform: "none" }}
				// 			onClick={() => {
				// 				setVerifyExp(false);
				// 			}}
				// 		>
				// 			No
				// 		</Button>
				// <Button
				// 	sx={{ boxShadow: "none", textTransform: "none" }}
				// 	style={{ background: "#4CAF50", color: "white" }}
				// 	onClick={() => {
				// 		let role_type = "professional";
				// 		let exp = true;
				// 		handleAccType(role_type, exp);
				// 		setVerifyExp(false);
				// 	}}
				// >
				// 	{isLoading ? (
				// 		<CircularProgress size={24} color="inherit" />
				// 	) : (
				// 		"Yes"
				// 	)}
				// </Button>
				// 	</div>
				// </Modal>
			)}
		</>
	);
};

export default AccountType;
