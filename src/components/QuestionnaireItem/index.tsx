import { Coding, QuestionnaireItem } from "fhir/r4";
import { ReactElement, useState } from "react";
import questionnaireItem from "../../types/survey-item";
import CapturePhoto from "./CapturePhoto";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface Props {
    questionnaireItem: QuestionnaireItem
    handleResponse(value: any, code: string): void
}

function InputComponent(props: Props): ReactElement {
    const { questionnaireItem, handleResponse } = props

    if (questionnaireItem.code && questionnaireItem.code[0] && questionnaireItem.code[0].code) {
        const code = questionnaireItem.code[0].code;
        const type = questionnaireItem.type
        //TODO - just clone and add handleResponse + code to all elements
        if (code === "photo" && type === "url") return <CapturePhoto {...props} />
        if (type === "boolean") return <BooleanButtons {...props} />
        return <p>Unsupported code: {code}</p>
    }

    return <p>Survey questionnaireItem did not have system code</p>
}

function Item({ questionnaireItem, handleResponse }: Props): ReactElement {
    let children;

    const isGroup = questionnaireItem.type === "group";

    if (isGroup && questionnaireItem.item) {
        children = <div style={{ marginLeft: "1em" }}>{questionnaireItem.item.map(each => <Item handleResponse={handleResponse} questionnaireItem={each} />)}</div>
    }
    return (<div>
        <p>{questionnaireItem.text}</p>
        {!isGroup && <InputComponent handleResponse={handleResponse} questionnaireItem={questionnaireItem} />}
        {children}
    </div>)
}

function BooleanButtons(props: Props) {
    const { questionnaireItem, handleResponse } = props

    const [selection,setSelection] = useState("true");

    const handleChange = (event : React.ChangeEvent<HTMLInputElement> ) => {
        setSelection(event.target.value);
        handleResponse(event.target.value, questionnaireItem.linkId)
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{questionnaireItem.text}</FormLabel>
            <RadioGroup
                onChange={handleChange}
                aria-label="medication"
                value={selection}
                name={`radio-buttons-group-${questionnaireItem.linkId}`}>
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
        </FormControl>
    );
}

export default Item;

