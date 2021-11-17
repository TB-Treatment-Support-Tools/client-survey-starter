import { ButtonBase } from '@mui/material'
import Grid from '@mui/material/Grid'
import classes from './style.module.scss'
export default function YesNoSelection(){
    return(
        <Grid justifyContent="space-around" className={classes.container} container>
          <ButtonBase>
              Yes
          </ButtonBase>
          <ButtonBase>
              No
          </ButtonBase>
        </Grid>
    )
}