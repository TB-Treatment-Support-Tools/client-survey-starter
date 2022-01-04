import { Avatar, Grid } from '@mui/material'
import { useState } from 'react';
import Stories from 'react-insta-stories';
import { Renderer, Story, StoryProps } from 'react-insta-stories/dist/interfaces';
import classes from './styles.module.scss'


const stories: Story[] = [
    {url: "/img/prep-story-images/1.jpeg"},
    {url: "/img/prep-story-images/2.jpeg"},
    {url: "/img/prep-story-images/3.jpeg"},
    {url: "/img/prep-story-images/4.jpeg"}
    ]

export default function LearningPreview() {

    const [open, setOpen] = useState<boolean>(false)

    const T = () => {
        return <Grid container>
            <button onClick={() => { setOpen(false) }}>Close</button>
        </Grid>
    }


    return (
        <>
            {open && <div style={{ top: 0, right: 0, display: 'fixed', position: "fixed", zIndex: 5 }}>
                <Stories
                    header={T}
                    stories={stories}
                    defaultInterval={3000}
                    width={'100vw'}
                    height={'100vh'}
                    onAllStoriesEnd={() => { setOpen(false) }}
                />
            </div>
            }
            <Grid className={classes.container} wrap="nowrap" container>
                <LearningItem setOpen={() => { setOpen(true) }} src={"/img/pills.png"} text="PrEP Intro" />
                <LearningItem src={"/img/symptoms.png"} text="Symptoms" />
                <LearningItem src={"/img/cost.png"} text="Paying for Treatment" />
                <LearningItem src={"/img/pills.png"} text="Medication" />
                <LearningItem src={"/img/symptoms.png"} text="Symptoms" />
                <LearningItem src={"/img/cost.png"} text="Programs" />
            </Grid>
        </>
    )
}

interface LearningItemProps {
    text: string
    src: string,
    setOpen?: () => void
}

const LearningItem = ({ text, src, setOpen }: LearningItemProps) => {
    return (
        <div onClick={setOpen} className={classes.learningStory}>
            <div className={classes.circleContainer}>
                <Avatar className={classes.avatar} src={src} />
            </div>
            <span className={classes.text}>{text}</span>
        </div>
    )
}