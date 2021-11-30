import QuestionnaireElementProps from '../../types/questionnaire-element';
import { QuestionnaireResponseItemAnswer } from 'fhir/r4';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import QuestionText from '../Text/QuestionText';

import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import classes from './styles.module.scss'

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
            classes={{ icon: classes.ratingItem }}
            name="highlight-selected-only"
            defaultValue={2}
            IconContainerComponent={IconContainer}
            highlightSelectedOnly
        />
    );
}

export default function FeelingGroup({ item, handleResponse }: QuestionnaireElementProps) {

    if (!item.item) {
        return <p>Error: Group question does not have child questions </p>
    }


    return (<Box padding="1em">

        {item.item.map(each => <div key={`${each.linkId}`}>
            <QuestionText>{each.text || "No text"}</QuestionText>
            <Box height="1em" />
            <RadioGroupRating />
        </div>)}

    </Box>)
}