import { ButtonBase } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import classes from './style.module.scss'

export default function YesNoSelection(){
    return(
        <Grid justifyContent="space-around" className={classes.container} container>
          <ButtonBase>
              Yes
          </ButtonBase>
          <Box width="1em" />
          <ButtonBase>
              No
          </ButtonBase>
        </Grid>
    )
}