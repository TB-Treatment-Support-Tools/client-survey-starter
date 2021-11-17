import { Box } from "@mui/system";
import { useState } from "react";
import { Link } from "react-router-dom";
import QuestionText from "../../components/Text/QuestionText";
import YesNoSelection from "../../components/YesNoSelection";
import NextButton from "./NextButton";

export default function Adherence() {

    const [taken,setTaken] = useState<boolean | null>(null);

    const handleChange = (value : boolean) => {
        setTaken(value);
    }

    return(
        <Box padding="0 1em"> 
            <QuestionText>Have you been taking your medication every day?</QuestionText>
            <p>It's okay if you have missed a few days, but let us know so we can assist you better</p>
           <YesNoSelection value={taken} handleChange={handleChange} />
           <NextButton disabled={taken === null} />
        </Box>
    )
}