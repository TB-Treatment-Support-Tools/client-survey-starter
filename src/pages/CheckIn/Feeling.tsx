import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Link } from 'react-router-dom';
import QuestionText from '../../components/Text/QuestionText';

export default function Feeling() {
    return (<div style={{padding: "2em"}}>
        <QuestionText>How are you feeling today?</QuestionText>
        <DiscreteSliderMarks />
        <Link to="survey/3">Next</Link>
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