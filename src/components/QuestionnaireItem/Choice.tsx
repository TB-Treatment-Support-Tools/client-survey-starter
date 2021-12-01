import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/system';
import QuestionText from '../Text/QuestionText';
import QuestionnaireElementProps from '../../types/questionnaire-element';

export default function Choice({ item, handleResponse, responseItem }: QuestionnaireElementProps) {

    let reasons: string[] = []

    if (item.answerOption && item.answerOption.length > 0) {
        reasons = item.answerOption.map(answerOptionItem => { return answerOptionItem.valueCoding?.display || "" })
    }

    const checkValue = (value: string): boolean => {

        return !!responseItem?.answer?.find(answer => {
            return answer.valueCoding?.display === value
        })
    }

    return (<Box padding="1em">
        <QuestionText>{item.text || "Question Text Missing"}</QuestionText>
        <Box height="1em" />
        <FormGroup>
            {reasons.map((each, index) => {
                const handleCheck = (event: React.SyntheticEvent<Element, Event>, checked: boolean): void => {
                    let tempAnswers = [...responseItem?.answer || []]
                    let index = tempAnswers.findIndex((answer) => { return answer.valueCoding?.display === each })

                    if (index >= 0) {
                        if (!checked) {
                            tempAnswers.splice(index, 1)
                        }
                    }

                    if (checked) {
                        tempAnswers.push({ valueCoding: { display: each } })
                    }

                    handleResponse(tempAnswers, item.linkId)
                }
                return (<FormControlLabel checked={checkValue(each)} onChange={handleCheck} control={<Checkbox />} label={each} value={index} key={`adherence-reason-${index}`} />)
            })}
        </FormGroup>
    </Box>)
}