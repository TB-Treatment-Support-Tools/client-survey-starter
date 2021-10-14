import { ReactElement } from "react";
import SurveyItem from "../../types/survey-item";
import CapturePhoto from "./CapturePhoto";

interface Props {
    surveyItem: SurveyItem
    handleResponse(value: any, code: string) : void
  }

function Item({ surveyItem, handleResponse } : Props) : ReactElement {
    let children;

    const isPhoto = surveyItem.code && surveyItem.code[0].code === "72170-4"


    if (surveyItem.type === "group" && surveyItem.item) {
        children = <div style={{marginLeft: "1em"}}>{surveyItem.item.map(each => <Item handleResponse={handleResponse} surveyItem={each} />)}</div>
    }
    return (<div>
        <p>Title: {surveyItem.text}</p>
        <p>Link: {surveyItem.linkId} </p>
        {isPhoto && <CapturePhoto />}
        {children}
    </div>)
}

export default Item;

