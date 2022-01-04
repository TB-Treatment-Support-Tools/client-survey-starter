import { useContext } from "react";
import MedAdminCalendar from "../../components/MedAdminCalendar";
import UserContext from "../../context/user-context";
import Grid from '@mui/material/Grid'
import { IconButton } from "@mui/material";
import { Refresh } from "@mui/icons-material";

export default function Progress() {

    const { medicationDates, updateMedicationDates } = useContext(UserContext);

    return (<div>
        <Grid justifyContent="flex-end" container>
          <IconButton onClick={updateMedicationDates}>
              <Refresh />
          </IconButton>
        </Grid>
        {medicationDates && <MedAdminCalendar valueMap={medicationDates} />}
    </div>)
}