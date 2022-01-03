import {Grid,Button} from '@mui/material'

interface Props{
    onClick?: () => void | Promise<void> | React.MouseEventHandler<HTMLButtonElement> ,
    disabled? : boolean
}

export default function NextButton({onClick,disabled} : Props){
    return(
        <Grid justifyContent="flex-end" container>
        <Button disabled={disabled} disableElevation style={{textTransform: "capitalize"}} variant="contained" onClick={onClick}>Next</Button>
    </Grid>
    )
}