
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";




import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { Button, CircularProgress, TextField } from "@mui/material";


import { setVerifyToken } from "../../store/slices/authSlice";
import { setAuthToken, setIsloggedin } from '../../store/slices/authSlice';
import { selectAuthToken, selectIsloggedin } from "../../store/slices/authSlice";
import { selectUser, setUser, setSignupId } from '../../store/slices/userSlice';

import CreatePassword from "../../views/auth/CreatePassword";
import SignUp from "../../views/auth/SignUp";
import VerifyEmail from "../../views/auth/VerifyEmail";
import Login from '../../views/auth/Login';

import logo from "../../assets/icons/Logo.svg";
import leftShoulder from '../../assets/images/leftShoulderLogin.jpg';
import rightShoulder from '../../assets/images/rightShoulderLogin.jpg';


// const Item = styled(Paper)(({ theme }) => ({
// 	// backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
// 	// ...theme.typography.body2,
// 	// padding: theme.spacing(1),
// 	// textAlign: 'center',
// 	// color: theme.palette.text.secondary,
// }));


// const Item = styled(Paper)(({ theme }) => ({
// 	backgroundColor: '#fff',
// 	...theme.typography.body2,
// 	padding: theme.spacing(1),
// 	textAlign: 'center',
// 	color: theme.palette.text.secondary,
// 	...theme.applyStyles('dark', {
// 		backgroundColor: '#1A2027',
// 	}),
// }));


export default function SignUpPage() {
	const navigate = useNavigate();
	const user = useSelector(selectUser);
	useEffect(() => {
		if (user && user.role_type) {
			navigate("/login");
		}
	}, []);
	const signup_id = localStorage.getItem("signup_id");
	const verify_token = localStorage.getItem("verify_token");
	const [view, setView] = useState(
		signup_id && verify_token ? "createpass" : signup_id ? "verify" : "signup"
	);
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setVerifyToken(verify_token));
		dispatch(setSignupId(signup_id));
	}, []);

	return (
		<>
			<Box
				display="flex"
				alignItems="center"
				gap={4}
				sx={{
					flexGrow: 1,
					// width: {
					// 	xs: 100,//0
					// 	sm: 200,//600
					// 	md: 300,//900
					// 	lg: 400,//1200
					// 	xl: 500,//1536
					// }
				}}
			>

				<Grid container spacing={2}>
					<Grid item xs={2}>
						<img
							style={{ height: '100vh', width: '100%' }}
							className='img-fluid'
							src={leftShoulder}
						/>
					</Grid>
					<Grid item xs={8}>

						<Stack spacing={2}>

							{view === "createpass" ? (
								<Box
									sx={{
										textAlign: 'center',
									}}
									alignItems="center"
								>
									<img
										className='my-3'
										src={logo}
									/>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'center',
											p: 1,
											m: 1,
										}}
									>
										{/* <hr className="pb-2 text-grey" style={{ width: "40px" }} /> */}

										<Typography variant="subtitle1" gutterBottom>
											Enter the password you would like to use with your account.
										</Typography>


										{/* <h4 className="fw-regular text-grey mx-2">
											Enter the password you would like to use with your account.
										</h4> */}
										{/* <hr className="pb-2 text-grey" style={{ width: "40px" }} /> */}
									</Box>
								</Box>
							) : (
								<Box
									sx={{
										textAlign: 'center',
									}}
									alignItems="center"
								>

									<img
										className='my-3'
										src={logo}
									/>

									<Typography variant="h5" gutterBottom>
										Welcome
									</Typography>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'center',
											p: 1,
											m: 1,
										}}
									>

										<h6 className="fw-regular text-grey mx-2">
											Create Account.
											{/* <Link to={"/login"} >
												<span style={{ color: "#2561B0" }}> Sign in</span>
											</Link> */}
										</h6>

									</Box>
								</Box>
							)}


						</Stack>

						<Stack
							direction="column"
							justifyContent="center"
							alignItems="center"
							spacing={2}
						>
							{view === "signup" && (
								<SignUp
									phone={phone}
									setPhone={setPhone}
									email={email}
									setEmail={setEmail}
									setView={setView}
								/>
							)}
							{view === "createpass" && (
								<CreatePassword
									setView={setView}
								/>
							)}

							{view === "verify" && (
								<VerifyEmail
									setView={setView}
									phone={phone}
									email={email}
								/>
							)}

							<Box
								sx={{
									mt: 25
								}}
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

					<Grid item xs={2}>
						<img
							style={{ height: '100vh', width: '100%' }}
							className='img-fluid'
							src={rightShoulder}
						/>
					</Grid>
				</Grid>
			</Box>

			{/* <Row className="justify-content-between p-0 m-0">
				<Col className="d-none d-md-grid p-0 m-0" md={2}>
					<Image
						style={{ height: "100vh" }}
						className="img-fluid"
						src={leftShoulder}
					/>
				</Col>

				<Col
					style={{ display: "flex", flexDirection: "column", height: "100vh" }}
					className="px-3 m-0"
					md={8}
				>
					{view === "signup" && (
						<SignUp
							phone={phone}
							setPhone={setPhone}
							email={email}
							setEmail={setEmail}
							setView={setView}
						/>
					)}

					{view === "verify" && (
						<VerifyEmail setView={setView} phone={phone} email={email} />
					)}

					{view === "createpass" && <CreatePassword setView={setView} />}

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
				</Col>

				<Col className="d-none d-md-grid p-0 m-0" md={2}>
					<Image
						style={{ height: "100vh" }}
						className="img-fluid ms-auto"
						src={rightShoulder}
					/>
				</Col>
			</Row> */}
		</>
	);
}
