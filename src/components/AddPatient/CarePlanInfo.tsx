import NextButton from "./NextButton";

interface Props {
    goToNext?: () => void
}

export default function CarePlanInfo({goToNext}: Props){
    return(
        <div>
            <p>TODO: In the future you can pick</p>
            <p>How often to report medication</p>
            <p>How often to complete survey / test </p>
            <NextButton onClick={goToNext} />
        </div>
    )

}