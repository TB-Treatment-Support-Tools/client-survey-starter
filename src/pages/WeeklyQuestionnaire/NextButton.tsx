import { KeyboardArrowRightRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { QuestionnaireItem } from "fhir/r4";
import { Link, useLocation } from "react-router-dom";
import classes from './styles.module.scss';

interface Props{
    disabled? : boolean
}

export default function NextButton({ disabled}: Props) {

    let skipNumber = 0;
    
    const location = useLocation();
    const split = location.pathname.split("/");
    const questionNumber = parseInt(split[split.length - 1]);


    return (<Link className={`${disabled && classes.nextButtonDisabled}`} to={`/survey/${questionNumber + 1 + skipNumber}`}>
        <IconButton className={classes.nextButton}>
            <KeyboardArrowRightRounded />
        </IconButton>
    </Link>)
}