import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import QuestionText from '../../components/Text/QuestionText';
import NextButton from './NextButton';

import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import classes from './styles.module.scss'

export default function Feeling() {
    return (<div style={{ padding: "2em" }}>
        <QuestionText>How are you feeling today?</QuestionText>
        <RadioGroupRating />
        {/* <DiscreteSliderMarks /> */}
        <NextButton />
    </div>)
}

const marks = [
    {
        value: 0,
        label: <img width="20px" src="https://static.thenounproject.com/png/2790305-200.png" />,
    },
    {
        value: 20,
        label: '20°C',
    },
    {
        value: 37,
        label: <img width="20px" src="https://static.thenounproject.com/png/2790305-200.png" />,
    },
    {
        value: 100,
        label: '100°C',
    },
];

function valuetext(value: number) {
    return `${value}°C`;
}

function DiscreteSliderMarks() {
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                aria-label="Custom marks"
                defaultValue={20}
                getAriaValueText={valuetext}
                step={10}
                valueLabelDisplay="auto"
                marks={marks}
            />
        </Box>
    );
}


const customIcons: {
    [index: string]: {
        icon: React.ReactElement;
        label: string;
    };
} = {
    1: {
        icon: <SentimentVeryDissatisfiedIcon />,
        label: 'Very Dissatisfied',
    },
    2: {
        icon: <SentimentDissatisfiedIcon />,
        label: 'Dissatisfied',
    },
    3: {
        icon: <SentimentSatisfiedIcon />,
        label: 'Neutral',
    },
    4: {
        icon: <SentimentSatisfiedAltIcon />,
        label: 'Satisfied',
    },
    5: {
        icon: <SentimentVerySatisfiedIcon />,
        label: 'Very Satisfied',
    },
};

function IconContainer(props: IconContainerProps) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
}

function RadioGroupRating() {
    return (
        <Rating
            classes={{icon: classes.ratingItem}}
            name="highlight-selected-only"
            defaultValue={2}
            IconContainerComponent={IconContainer}
            highlightSelectedOnly
        />
    );
}