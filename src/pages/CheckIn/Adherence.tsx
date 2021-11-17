import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import QuestionText from "../../components/Text/QuestionText";
import YesNoSelection from "../../components/YesNoSelection";
import NextButton from "./NextButton";

export default function Adherence() {
    return(
        <Box padding="0 1em"> 
            <QuestionText>Have you been taking your medication every day?</QuestionText>
            <p>It's okay if you have missed a few days, but let us know so we can assist you better</p>
           <YesNoSelection />
           <NextButton />
        </Box>
    )
}