import PropTypes from 'prop-types';
import { memo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { IconQrcode } from '@tabler/icons-react';
// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, ...others }) {
  return (
    <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
      <Grid item>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" sx={{ color: 'primary.800' }}>
              Progress
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="inherit">{`${Math.round(value)}%`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <LinearProgress
          aria-label="progress of theme"
          variant="determinate"
          value={value}
          {...others}
          sx={{
            height: 10,
            borderRadius: 30,
            [`&.${linearProgressClasses.colorPrimary}`]: {
              bgcolor: 'background.paper'
            },
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
              bgcolor: 'primary.dark'
            }
          }}
        />
      </Grid>
    </Grid>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number
};

// ==============================|| SIDEBAR - MENU CARD ||============================== //

const MenuCard = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        bgcolor: 'inherit',
        mb: 2.75,
        mt: 5,
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 157,
          height: 157,
          // bgcolor: 'primary.200',
          borderRadius: '50%',
          top: -105,
          right: -96
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        <List disablePadding sx={{ m: 0 }} alignItems="center">
          <ListItemButton alignItems="center" sx={{ pt: 0, pb: 0, borderRadius: 1, bgcolor: '#ffcf33' }} disableGutters disablePadding>
            <ListItemAvatar sx={{ alignItems: "center", minWidth: 76 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    justifyContent: 'center',
                    ...theme.typography.commonAvatar,
                    ...theme.typography.largeAvatar,
                    color: 'black',
                    border: 'none',
                    // borderColor: 'primary.main',
                    bgcolor: '#ffcf33'
                  }}
                >
                  <IconQrcode storke={1} />
                </Avatar>
              </Box>
            </ListItemAvatar>
            <ListItemText
              sx={{ mt: 1 }}
              primary={
                <Typography variant="button" sx={{ color: 'black' }}>
                  Check-In
                </Typography>
              }
            />
          </ListItemButton>
        </List>

        {/* <LinearProgressWithLabel value={80} /> */}
      </Box>
    </Card >
  );
};

export default memo(MenuCard);
