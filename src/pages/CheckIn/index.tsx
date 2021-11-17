import { Cancel } from "@mui/icons-material";
import { Fade, Grid } from '@mui/material'
import { Link, useLocation } from "react-router-dom";
import classes from './styles.module.scss';
import QuestionList from "./QuestionList";

export default function CheckIn() {
    const location = useLocation();
    const split = location.pathname.split("/");
    const questionNumber = parseInt(split[split.length - 1]);

    return (
        <Fade in appear timeout={1000}>
            <div className={classes.container}>
                <TopText />
                {QuestionList[questionNumber - 1]}
            </div>
        </Fade>
    )
}

const TopText = () => {
    return (<Grid container >
        <Link className={classes.exit} to="/home">
            <Cancel />
        </Link>
    </Grid>)
}