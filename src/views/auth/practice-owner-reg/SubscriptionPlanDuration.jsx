import {
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
} from '@mui/material';

import React from "react";
import Box from '@mui/material/Box';

const SubscriptionPlanDuration = ({ plan, selectedValue, handleChange }) => {
	return (
		<>
			{plan.subscription_plans.map((plan) => (
				<Box
					sx={{ flexGrow: 1, mt: 0.5, p: 2 }}
					className="hoverRadioNoBorder"
				>
					<Grid
						container
						spacing={1}
						direction="row"
						justifyContent="center"
						alignItems="center"
					>
						<Grid
							item
							xs={12}
							sm={12}
							md={3}
							justifyContent="center"
							alignItems="center"
						>
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

						<Grid
							item
							xs={12}
							sm={12}
							md={9}
						>
							<Box>
								<label
									className="text-start"
									htmlFor={`${plan.id}_${plan.plan_id}`}
								>
									{plan.cycle}{" "}
									{plan.cycle_type === "Monthly" ? "Month Plan" : null}{" "}
								</label>
							</Box>
							<Box>
								<label
									className="text-start"
									htmlFor={`${plan.id}_${plan.plan_id}`}
								>
									<span className="fw-semibold"> ${plan.amount}</span>
								</label>
							</Box>
						</Grid>
					</Grid>
				</Box>
			))}
		</>
	);
};

export default SubscriptionPlanDuration;
