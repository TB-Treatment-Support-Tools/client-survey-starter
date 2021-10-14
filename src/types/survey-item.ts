type SurveyItem = {
    item?: SurveyItem[]
    code?: CodeSystem[]
    linkId: string
    required: false
    text: string
    type: string

}

type CodeSystem = {
    code: string
    display: string
    system: string
}

export default SurveyItem;