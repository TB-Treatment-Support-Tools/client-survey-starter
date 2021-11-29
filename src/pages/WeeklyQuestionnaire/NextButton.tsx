import { KeyboardArrowRightRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import classes from './styles.module.scss';

interface Props{
    disabled? : boolean,
    skipNumber?: number
}

export default function NextButton({disabled,skipNumber = 0}: Props) {

    const location = useLocation();
    const split = location.pathname.split("/");
    const questionNumber = parseInt(split[split.length - 1]);

    return (<Link className={`${disabled && classes.nextButtonDisabled}`} to={`/survey/${questionNumber + 1 + skipNumber}`}>
        <IconButton className={classes.nextButton}>
            <KeyboardArrowRightRounded />
        </IconButton>
    </Link>)
}