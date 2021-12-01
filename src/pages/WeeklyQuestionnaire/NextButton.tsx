import { KeyboardArrowRightRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { QuestionnaireItem, QuestionnaireResponseItem } from "fhir/r4";
import { Link, useLocation } from "react-router-dom";
import classes from './styles.module.scss';

interface Props {
    disabled?: boolean,
    skipNumber?: number,
    questions: QuestionnaireItem[],
    responses: QuestionnaireResponseItem[]

}

export default function NextButton({ disabled, skipNumber, questions, responses }: Props) {

    const location = useLocation();
    const split = location.pathname.split("/");
    const questionNumber = parseInt(split[split.length - 1]);

    const nextQuestion = questions[questionNumber];

    let skip = 0;

    if (nextQuestion.enableWhen) {
        nextQuestion.enableWhen.forEach(each => {
            let disabled = responses.find(res => { return res.linkId === each.question && (res.answer && res.answer[0] && res.answer[0].valueBoolean === false) })
            if (!!disabled) {
                skip = 1
            }
        })
    }

    console.log(`/survey/${questionNumber + 1 + skip}`)

    return (<Link className={`${disabled && classes.nextButtonDisabled}`} to={`/survey/${questionNumber + 1 + skip}`}>
        <IconButton className={classes.nextButton}>
            <KeyboardArrowRightRounded />
        </IconButton>
    </Link>)
}