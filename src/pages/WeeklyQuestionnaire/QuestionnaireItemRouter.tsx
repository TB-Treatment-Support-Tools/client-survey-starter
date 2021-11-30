import { QuestionnaireItem } from "fhir/r4";
import Binary from '../../components/QuestionnaireItem/Binary'
import Choice from "../../components/QuestionnaireItem/Choice";
import QuestionnaireElementProps from "../../types/questionnaire-element";

interface RouterProps {
    item: QuestionnaireItem
}

function responseHandler(linkId : string, value : any) : void {
    console.log("TODO: Handle Questionnaire Response change")
    console.log(linkId)
}

const QuestionnaireItemRouter = ({ item }: RouterProps) => {

    const passedProps : QuestionnaireElementProps = {item: item, handleResponse: responseHandler }

    if(item.type === "boolean"){
        return <Binary {...passedProps} />
    }

    if(item.type === "open-choice" || item.type === "choice"){
        return <Choice {...passedProps} />
    }

    return <></>
}

export default QuestionnaireItemRouter
