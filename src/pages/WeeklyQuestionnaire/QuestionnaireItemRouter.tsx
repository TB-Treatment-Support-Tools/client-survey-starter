import { QuestionnaireItem } from "fhir/r4"
import Adherence from "./Adherence";

interface RouterProps {
    item: QuestionnaireItem
}

const QuestionnaireItemRouter = ({ item }: RouterProps) => {

    if(item.type === "boolean"){
        return <Adherence />
    }

    return <></>

    // return <div>
    //     <p>{item.text}</p>
    //     {bottomText && <p>{bottomText}</p>}
    // </div>
}

export default QuestionnaireItemRouter
