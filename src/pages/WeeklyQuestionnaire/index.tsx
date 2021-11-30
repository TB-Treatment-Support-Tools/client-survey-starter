import { Cancel } from "@mui/icons-material";
import { Fade, Grid, IconButton } from '@mui/material'
import { Link, useLocation, useHistory } from "react-router-dom";
import classes from './styles.module.scss';
import QuestionList from "./QuestionList";
import LinearProgress from '@mui/material/LinearProgress';
import Left from '@mui/icons-material/KeyboardArrowLeft'
import { Questionnaire, QuestionnaireItem } from 'fhir/r4';
import QuestionnaireItemRouter from "./QuestionnaireItemRouter";
import NextButton from "./NextButton";

interface Props {
    questionnaire: Questionnaire
}

export default function WeeklyQuestionnaire({ questionnaire }: Props) {

    let questions: QuestionnaireItem[] = [];
    if (questionnaire.item && questionnaire.item.length > 0) {
        questions = questionnaire.item
    }


    const location = useLocation();

    const split = location.pathname.split("/");
    const questionNumber = parseInt(split[split.length - 1]);

    const progress = (questionNumber / QuestionList.length) * 100;

    return (
        <Fade in appear timeout={1000}>
            <div className={classes.container}>
                <TopText progress={progress} />
                <QuestionnaireItemRouter item={questions[questionNumber - 1]} />
                <NextButton />
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
                <IconButton className={classes.backButton} onClick={history.goBack}>
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