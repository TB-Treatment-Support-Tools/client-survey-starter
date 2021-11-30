import { QuestionnaireItem, QuestionnaireItemAnswerOption, QuestionnaireResponseItem, QuestionnaireResponseItemAnswer } from "fhir/r4";

let john: QuestionnaireItem;

interface QuestionnaireElementProps {
    item: QuestionnaireItem,
    handleResponse: (answers : QuestionnaireResponseItemAnswer[], linkId : string ) => void,
    responseItem: QuestionnaireResponseItem | null
}

export default QuestionnaireElementProps;