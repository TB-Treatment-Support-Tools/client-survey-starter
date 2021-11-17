import { ButtonBase } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Box } from '@mui/system'
import classes from './style.module.scss'

interface Props{
    handleChange : (value : boolean) => void
    value : boolean | null
}

export default function YesNoSelection({handleChange, value}: Props){
    return(
        <Grid justifyContent="space-around" className={classes.container} container>
          <ButtonBase className={`${value === true && classes.selectedYes }`} onClick={()=>{handleChange(true)}}>
              Yes
          </ButtonBase>
          <Box width="1em" />
          <ButtonBase className={`${value === false && classes.selectedNo }`} onClick={()=>{handleChange(false)}}>
              No
          </ButtonBase>
        </Grid>
    )
}