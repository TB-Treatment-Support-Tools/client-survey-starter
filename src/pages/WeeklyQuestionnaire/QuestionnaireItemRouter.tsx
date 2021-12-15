import { QuestionnaireItem, QuestionnaireResponseItem, QuestionnaireResponseItemAnswer } from "fhir/r4";
import Binary from '../../components/QuestionnaireItem/Binary'
import Choice from "../../components/QuestionnaireItem/Choice";
import FeelingGroup from "../../components/QuestionnaireItem/FeelingGroup";
import PhotoCapture from "../../components/QuestionnaireItem/PhotoCapture";
import QuestionnaireElementProps from "../../types/questionnaire-element";

interface RouterProps {
    item: QuestionnaireItem,
    handleResponse: (answers : QuestionnaireResponseItemAnswer[], linkId : string) => void,
    responses: QuestionnaireResponseItem[],
    handleGroupResponse: (items : QuestionnaireResponseItem[], linkId : string) => void,
}

//@TODO - Use a switch and clone so you dont have to reapeat ...passedprops for each one
const QuestionnaireItemRouter = ({ item, handleResponse, responses, handleGroupResponse }: RouterProps) => {

    const responseItem = responses.find( each => {return each.linkId === item.linkId}) || null;
    const passedProps : QuestionnaireElementProps = {item: item, handleResponse: handleResponse, responseItem: responseItem, allResponses: responses, handleGroupResponse: handleGroupResponse }

    if(item.type === "boolean"){
        return <Binary {...passedProps} />
    }

    if(item.type === "open-choice" || item.type === "choice"){
        return <Choice {...passedProps} />
    }

    if(item.type === "url" && item.linkId === "test-photo"){
        return <PhotoCapture {...passedProps} />
    }

    if(item.type === "group" && item.code && item.code[0].code === "feeling"){
        return <FeelingGroup {...passedProps} />
    }

    return <p style={{padding: "1em"}}>There was an error displaying this survey question, please contact support. 
    <br /> <br />Question Code: {item.linkId}
    <br /> <br />Question Type: {item.type}
    </p>
}

export default QuestionnaireItemRouter
