import { Cancel } from "@mui/icons-material";
import { Fade, Grid, IconButton } from '@mui/material'
import { Link, useLocation, useHistory } from "react-router-dom";
import classes from './styles.module.scss';
import QuestionList from "./QuestionList";
import LinearProgress from '@mui/material/LinearProgress';
import Left from '@mui/icons-material/KeyboardArrowLeft'

export default function CheckIn() {
    const location = useLocation();

    const split = location.pathname.split("/");
    const questionNumber = parseInt(split[split.length - 1]);

    const progress = (questionNumber / QuestionList.length) * 100;

    return (
        <Fade in appear timeout={1000}>
            <div className={classes.container}>
                <TopText progress={progress} />
                {QuestionList[questionNumber - 1]}
            </div>
        </Fade>
    )
}

interface TopTextProps {
    progress: number
}

const TopText = ({ progress }: TopTextProps) => {
    const history = useHistory();
    return (
        <div>
            <Grid justifyContent="space-between" alignItems="center" container >

                <IconButton className={classes.exit} onClick={history.goBack}>
                    <Left />
                </IconButton>
                <Link className={classes.exit} to="/home">
                    <Cancel />
                </Link>
            </Grid>
            <div style={{ flexGrow: 1, padding: "1em" }}>
                <LinearProgress variant="determinate" value={progress} />
            </div>
        </div>
    )
}