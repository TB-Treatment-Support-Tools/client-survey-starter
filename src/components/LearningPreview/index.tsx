import { Avatar, Grid } from '@mui/material'

export default function LearningPreview() {
    return <Grid container>
       <LearningItem src={"/img/pills.png"} text="Medication" />
       <LearningItem src={"/img/symptoms.png"} text="Symptoms" />
       <LearningItem src={"/img/cost.png"} text="Paying for Treatment" />
    </Grid>
}

interface LearningItemProps{
    text: string
    src: string
}

const LearningItem = ({text,src}:LearningItemProps) => {
    return (
        <div style={{ padding: ".5em 0", marginRight: "1em" }}>
            <div  style={{borderRadius: "50%", padding: "2px", width: "fit-content", border: "solid 2px lightgreen" }}>
            <Avatar sx={{ width: 56, height: 56 }} src={src} /> 
            </div>
            <span style={{ paddingTop: ".5em", display: "block", textAlign: "center", maxWidth: "56px", overflow: "wrap", fontSize: ".75em" }}>{text}</span>
        </div>
    )
}