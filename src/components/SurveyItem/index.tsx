import { Coding, QuestionnaireItem } from "fhir/r4";
import { ReactElement } from "react";
import SurveyItem from "../../types/survey-item";
import CapturePhoto from "./CapturePhoto";

interface Props {
    surveyItem: QuestionnaireItem
    handleResponse(value: any, code: string): void
}

interface DisplayComponentProps {
    item: QuestionnaireItem
}
function InputComponent({ item }: DisplayComponentProps): ReactElement {
    if (item.code && item.code[0] && item.code[0].code) {
        const code = item.code[0].code;
        const type = item.type

        if (code === "photo" && type === "url") return <CapturePhoto />
        if (type === "boolean") return <div>
            <p><input type="radio" value="yes"/> Yes</p>
            <p><input type="radio" value="no" />No</p>
        </div>
        return <p>Unsupported code: {code}</p>
    }

    return <p>Survey item did not have system code</p>
}

function Item({ surveyItem, handleResponse }: Props): ReactElement {
    let children;

    const isGroup = surveyItem.type === "group";

    if (isGroup && surveyItem.item) {
        children = <div style={{ marginLeft: "1em" }}>{surveyItem.item.map(each => <Item handleResponse={handleResponse} surveyItem={each} />)}</div>
    }
    return (<div>
        <p>{surveyItem.text}</p>
        {!isGroup && <InputComponent item={surveyItem} />}
        {children}
    </div>)
}

export default Item;

