import { Dialog, FormControl, TextField, Typography, Box, IconButton } from "@mui/material"
import OptionButton from "../../components/Buttons/OptionButton"
import classes from './styles.module.scss'
import Grid from '@mui/material/Grid'
import { useState } from "react"
import { Medication } from "fhir/r4"
import getNested from "../../utility/get-nested-object"
import { Close } from "@mui/icons-material"


interface Props{
    open: boolean,
    close: () => void
}

export default function AddMedication({ open, close }: Props) {

    const [newMedication,setNewMedication] = useState<Medication>({ resourceType: "Medication"})



    return (
        <Dialog open={open}>
            <Grid container>
              <IconButton onClick={close}>
                  <Close />
              </IconButton>
            </Grid>
            <Box padding="2em" className={classes.dialog}>
                <Typography style={{ fontSize: "1.25em" }} variant="h2">Add Medication</Typography>
                <Box height="1em" />
                <FormControl className={classes.form}>
                    <TextField label="Name" />
                    <Box height=".5em" />
                    <TextField label="Amount" />
                    <Box height=".5em" />
                    <Typography variant="body1">Snomed</Typography>
                    <TextField label="Snomed Code" />
                    <TextField label="Snomed Text" />
                </FormControl>
                <Grid justifyContent="flex-end" className={classes.bottom} container>
                    <OptionButton>
                        Add
                    </OptionButton>
                </Grid>
            </Box>
        </Dialog>
    )
}