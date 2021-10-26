import { Coding, QuestionnaireItem } from "fhir/r4";
import { ReactElement, useState } from "react";
import SurveyItem from "../../types/survey-item";
import CapturePhoto from "./CapturePhoto";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface Props {
    surveyItem: QuestionnaireItem
    handleResponse(value: any, code: string): void
}

function InputComponent({ surveyItem, handleResponse }: Props): ReactElement {
    if (surveyItem.code && surveyItem.code[0] && surveyItem.code[0].code) {
        const code = surveyItem.code[0].code;
        const type = surveyItem.type
        //TODO - just clone and add handleResponse + code to all elements
        if (code === "photo" && type === "url") return <CapturePhoto code={code} handleResponse={handleResponse} />
        if (type === "boolean") return <BooleanButtons handleResponse={handleResponse} code={code} title={surveyItem.text || ""} value={"true"} />
        return <p>Unsupported code: {code}</p>
    }

    return <p>Survey surveyItem did not have system code</p>
}

function Item({ surveyItem, handleResponse }: Props): ReactElement {
    let children;

    const isGroup = surveyItem.type === "group";

    if (isGroup && surveyItem.item) {
        children = <div style={{ marginLeft: "1em" }}>{surveyItem.item.map(each => <Item handleResponse={handleResponse} surveyItem={each} />)}</div>
    }
    return (<div>
        <p>{surveyItem.text}</p>
        {!isGroup && <InputComponent handleResponse={handleResponse} surveyItem={surveyItem} />}
        {children}
    </div>)
}

type BooleanButtonProps = {
    title: string,
    value: string,
    code: string,
    handleResponse(value: any, code: string): void
}

function BooleanButtons({ title, value, code, handleResponse }: BooleanButtonProps) {
    const [selection,setSelection] = useState(value);

    const handleChange = (event : React.ChangeEvent<HTMLInputElement> ) => {
        setSelection(event.target.value);
        handleResponse(event.target.value, code)
    }

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{title}</FormLabel>
            <RadioGroup
                onChange={handleChange}
                aria-label="medication"
                value={selection}
                name={`radio-buttons-group-${code}`}>
                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
        </FormControl>
    );
}

export default Item;

