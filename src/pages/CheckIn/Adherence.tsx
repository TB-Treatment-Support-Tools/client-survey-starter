import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import QuestionText from "../../components/Text/QuestionText";
import YesNoSelection from "../../components/YesNoSelection";

export default function Adherence() {
    return(
        <Box padding="0 1em"> 
            <QuestionText>Have you been taking your medication every day?</QuestionText>
           <YesNoSelection />
            <Link to="/survey/2">Next</Link>
        </Box>
    )
}