
import { Box } from "@mui/system";
import { useState } from "react";
import QuestionText from "../../components/Text/QuestionText";
import YesNoSelection from "../../components/YesNoSelection";
import NextButton from "../../pages/WeeklyQuestionnaire/NextButton";
import QuestionnaireElementProps from "../../types/questionnaire-element";

 const Binary = ({ item, handleResponse }: QuestionnaireElementProps) => {

    let bottomText;
    if (item.item && item.item.length > 0) {
        bottomText = item.item?.find(each => { return each.type === "display" })?.text
    }

    const [taken, setTaken] = useState<boolean | null>(null);

    const handleChange = (value: boolean) => {
        setTaken(value)
        handleResponse([{valueBoolean: value}],item.linkId)
    }

    return (
        <Box padding="0 1em">
            <QuestionText>{item.text || ""}</QuestionText>
            {bottomText && <p>{bottomText}</p>}
            <YesNoSelection value={taken} handleChange={handleChange} />
        </Box>
    )
}

export default Binary;