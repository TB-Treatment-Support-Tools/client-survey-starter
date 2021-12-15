import { QuestionnaireItem, QuestionnaireItemAnswerOption, QuestionnaireResponseItem, QuestionnaireResponseItemAnswer } from "fhir/r4";

interface QuestionnaireElementProps {
    item: QuestionnaireItem,
    handleResponse: (answers : QuestionnaireResponseItemAnswer[], linkId : string ) => void,
    responseItem: QuestionnaireResponseItem | null,
    allResponses: QuestionnaireResponseItem[],
    handleGroupResponse: (answers : QuestionnaireResponseItem[], linkId : string) => void,
}

export default QuestionnaireElementProps;