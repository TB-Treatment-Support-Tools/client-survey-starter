import { CarePlan, Patient } from "fhir/r4";
import { useEffect, useState } from "react";
import { getCarePlans } from "../../api/patient";

interface Props{
    patient : Patient
}

export default function CarePlanInfo({patient}: Props){


    const [carePlan,setCarePlan] = useState<CarePlan | null>(null);
    const [loaded,setLoaded] = useState<boolean>(false);

    const fetchCarePlans = async () => {
        if(patient && patient.id){
           let carePlans = await getCarePlans(patient.id)
           setCarePlan(carePlans[0])
        }
    }

    useEffect(()=>{
        fetchCarePlans();
    },[])

    return(
        <div>
            <p>CarePlan</p>
            {carePlan && <>
            <p>ID: {carePlan?.id}</p>
            {console.log(carePlan.activity)}
            </>}
        </div>
    )

    
}