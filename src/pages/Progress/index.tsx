import { MedicationAdministration } from "fhir/r4";
import { useEffect, useState } from "react";
import { getMedcationAdministration } from "../../api/patient";
import MedAdminCalendar from "../../components/MedAdminCalendar";
import {DateTime} from 'luxon';

type BoolMap = Map<string,boolean>;

export default function Progress() {

    const [map,setMap] = useState<BoolMap>(new Map<string,boolean>());

    async function getMedAdmins(){
       let medAdmins = await getMedcationAdministration("1")
       let tempMap = new Map<string,boolean>();
       for(let medAdmin of medAdmins){
           if(medAdmin.effectiveDateTime){
            const date = DateTime.fromISO(medAdmin.effectiveDateTime).toISODate();
            tempMap.set(date, medAdmin.status === "completed");
           }
       }
       setMap(tempMap)
    }

    useEffect(()=>{
        getMedAdmins();
    },[])

    return (<div>
        <MedAdminCalendar valueMap={map}  />
    </div>)
}