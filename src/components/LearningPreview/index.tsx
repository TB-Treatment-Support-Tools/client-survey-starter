import { Avatar, Grid } from '@mui/material'
import classes from './styles.module.scss'

export default function LearningPreview() {
    return <Grid className={classes.container} wrap="nowrap" container>
       <LearningItem src={"/img/pills.png"} text="Medication" />
       <LearningItem src={"/img/symptoms.png"} text="Symptoms" />
       <LearningItem src={"/img/cost.png"} text="Paying for Treatment" />
       <LearningItem src={"/img/pills.png"} text="Medication" />
       <LearningItem src={"/img/symptoms.png"} text="Symptoms" />
       <LearningItem src={"/img/cost.png"} text="Programs" />
    </Grid>
}

interface LearningItemProps{
    text: string
    src: string
}

const LearningItem = ({text,src}:LearningItemProps) => {
    return (
        <div className={classes.learningStory}>
            <div className={classes.circleContainer}>
            <Avatar className={classes.avatar} src={src} /> 
            </div>
            <span className={classes.text}>{text}</span>
        </div>
    )
}