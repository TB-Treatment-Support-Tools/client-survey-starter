import { KeyboardArrowRightRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { QuestionnaireItem, QuestionnaireResponseItem } from "fhir/r4";
import { Link, useLocation } from "react-router-dom";
import classes from './styles.module.scss';

interface Props {
    questions: QuestionnaireItem[],
    responses: QuestionnaireResponseItem[]
}

export default function NextButton({ questions, responses }: Props) {

    let disabled = false;

    const location = useLocation();
    const split = location.pathname.split("/");
    const questionNumber = parseInt(split[split.length - 1]);

    const currentQuestion = questions[questionNumber -1];
    const currentAnswer = responses.find( each => { return each.linkId === currentQuestion.linkId})

    if(currentQuestion.required && !currentAnswer || !currentAnswer?.answer || currentAnswer.answer.length === 0 ){
        disabled = true;
    }

    let skip = 0;

    if (questionNumber < questions.length) {
        const nextQuestion = questions[questionNumber];

        //@TODO - make this more broadly applicable to different enabled senarios
        if (nextQuestion.enableWhen) {
            nextQuestion.enableWhen.forEach(each => {
                let disabled = responses.find(res => { return res.linkId === each.question && (res.answer && res.answer[0] && res.answer[0].valueBoolean === false) })
                if (!!!disabled) {
                    skip = 1
                }
            })
        }
    }

    return (<Link to={`/survey/${questionNumber + 1 + skip}`}>
        <IconButton className={`${classes.nextButton} ${disabled && classes.nextButtonDisabled}`}>
            <KeyboardArrowRightRounded />
        </IconButton>
    </Link>)
}