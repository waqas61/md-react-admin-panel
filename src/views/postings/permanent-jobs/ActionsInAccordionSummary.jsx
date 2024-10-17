import React from 'react';
import { makeStyles } from '@mui/styles'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function ActionsInAccordionSummary() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState("")
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions1-content"
          id="additional-actions1-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onChange={(e) => setChecked(e.target.name)}
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox name="checkbox1" checked={checked === "checkbox1"} />}
            label="I acknowledge that I should stop the click event propagation"
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            The click event of the nested action will propagate up and expand the accordion unless
            you explicitly stop it.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions2-content"
          id="additional-actions2-header"
        >
          <FormControlLabel
            onChange={(e) => setChecked(e.target.name)}
            aria-label="Acknowledge"
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox name="checkbox2" checked={checked === "checkbox2"} />}
            label="I acknowledge that I should stop the focus event propagation"
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            The focus event of the nested action will propagate up and also focus the accordion
            unless you explicitly stop it.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-label="Expand"
          aria-controls="additional-actions3-content"
          id="additional-actions3-header"
        >
          <FormControlLabel
            aria-label="Acknowledge"
            onChange={(e) => setChecked(e.target.name)}
            onClick={(event) => event.stopPropagation()}
            onFocus={(event) => event.stopPropagation()}
            control={<Checkbox name="checkbox3" checked={checked === "checkbox3"} />}

            label="I acknowledge that I should provide an aria-label on each action that I add"
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="textSecondary">
            If you forget to put an aria-label on the nested action, the label of the action will
            also be included in the label of the parent button that controls the accordion
            expansion.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}