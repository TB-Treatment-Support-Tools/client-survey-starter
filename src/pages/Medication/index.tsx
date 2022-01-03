import { Add, PlusOne } from "@mui/icons-material";
import { Dialog, FormControl, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Medication } from "fhir/r4";
import { useEffect, useState } from "react"
import { getMedications } from "../../api/practitioner"
import OptionButton from "../../components/Buttons/OptionButton"
import AddMedication from "./AddMedication"

export default function Medications() {

    const [medications, setMedications] = useState<Medication[]>([])
    const [open, setOpen] = useState(false)


    const fetchMeds = async () => {
        const tempMeds = await getMedications()
        setMedications(tempMeds)
    }

    useEffect(() => { fetchMeds() }, [])


    return (
        <Box padding="1em">
            <ul>
                {medications.map((m, index) => <li key={`med-${index}`}>{m.code?.text}</li>)}
            </ul>
            <OptionButton onClick={() => { setOpen(!open) }}>
                <Add />
                <Typography>Add Medication</Typography>
            </OptionButton>
            <AddMedication close={()=>{setOpen(false)}} open={open} />
        </Box>)
}