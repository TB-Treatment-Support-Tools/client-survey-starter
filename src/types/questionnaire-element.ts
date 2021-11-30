import { QuestionnaireItem, QuestionnaireItemAnswerOption, QuestionnaireResponseItemAnswer } from "fhir/r4";

let john: QuestionnaireItem;

interface QuestionnaireElementProps {
    item: QuestionnaireItem,
    handleResponse: (answers : QuestionnaireResponseItemAnswer[], linkId : string ) => void
}

export default QuestionnaireElementProps;