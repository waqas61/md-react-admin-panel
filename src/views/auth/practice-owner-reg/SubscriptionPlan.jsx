import {
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
} from '@mui/material';
import React from "react";

const SubscriptionPlan = ({ plan, selectedValue, handleChange }) => {
	return (
		<div
			// className="mt-3"
			style={{
				border: "none",
				borderRadius: "0.5rem",
				padding: "10px",
			}}
		>
			{plan.subscription_plans.map((plan) => (
				<Grid
					key={plan.id}
					container
					spacing={2}
					className={"border border-2 rounded mb-3"}
				>
					<Grid item xs={1} className="p-3">
						<FormControl component="fieldset">
							<RadioGroup
								aria-label={`${plan.id}_${plan.plan_id}`}
								name={`${plan.id}_${plan.plan_id}`}
								value={selectedValue}
								onChange={handleChange}
							>
								<FormControlLabel
									value={`${plan.id}_${plan.plan_id}`}
									control={<Radio color="primary" />}
								/>
							</RadioGroup>
						</FormControl>
					</Grid>

					<Grid className="d-flex ms-3 align-items-center" item xs={6}>
						<div className="text-start">
							<label
								className="text-start"
								htmlFor={`${plan.id}_${plan.plan_id}`}
							>
								{plan.cycle}{" "}
								{plan.cycle_type === "Monthly" ? "Month Plan" : null}{" "}
								<br />{" "}
								<span className="fw-semibold"> ${plan.amount}</span>
							</label>
						</div>
					</Grid>
				</Grid>
			))}
		</div>
	);
};

export default SubscriptionPlan;
