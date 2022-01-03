import { CircularProgress, Grid } from "@mui/material"

export default function Loading() {
    return (<Grid justifyContent="center" alignItems="center" container>
        <CircularProgress variant="indeterminate" />
    </Grid>)
}