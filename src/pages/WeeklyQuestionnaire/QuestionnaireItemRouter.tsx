import { QuestionnaireItem, QuestionnaireResponseItem, QuestionnaireResponseItemAnswer } from "fhir/r4";
import Binary from '../../components/QuestionnaireItem/Binary'
import Choice from "../../components/QuestionnaireItem/Choice";
import QuestionnaireElementProps from "../../types/questionnaire-element";

interface RouterProps {
    item: QuestionnaireItem,
    handleResponse: (answers : QuestionnaireResponseItemAnswer[], linkId : string) => void,
    responses: QuestionnaireResponseItem[]
}

const QuestionnaireItemRouter = ({ item, handleResponse, responses }: RouterProps) => {

    const passedProps : QuestionnaireElementProps = {item: item, handleResponse: handleResponse }

    if(item.type === "boolean"){
        return <Binary {...passedProps} />
    }

    if(item.type === "open-choice" || item.type === "choice"){
        return <Choice {...passedProps} />
    }

    return <></>
}

export default QuestionnaireItemRouter
