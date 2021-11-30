import { QuestionnaireItem } from "fhir/r4";

let john: QuestionnaireItem;


interface QuestionnaireElementProps {
    item: QuestionnaireItem,
    handleResponse: (linkId: string, value: any) => void
}

export default QuestionnaireElementProps;