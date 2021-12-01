import QuestionnaireElementProps from '../../types/questionnaire-element';

import Box from '@mui/material/Box';
import QuestionText from '../Text/QuestionText';

import Rating, { IconContainerProps } from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

import classes from './styles.module.scss'
import { useEffect } from 'react';
import { QuestionnaireResponseItem } from 'fhir/r4';

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

interface RadioGroupProps {
    value: number | null,
    handleChange: (event: React.SyntheticEvent<Element, Event>, value: number | null) => void
}

function RadioGroupRating({ value, handleChange }: RadioGroupProps) {
    return (
        <Rating
            classes={{ icon: classes.ratingItem }}
            name="highlight-selected-only"
            value={value}
            onChange={handleChange}
            IconContainerComponent={IconContainer}
            highlightSelectedOnly
        />
    );
}

export default function FeelingGroup({ item, handleResponse, responseItem, allResponses, handleGroupResponse }: QuestionnaireElementProps) {

    /*

    TODO:
    - Initalize response based on default value
    - Center butons on screen
    - Allow disabling next button via required quesiton field

    */

    useEffect(()=>{
        console.log("all responses change")
        console.log(allResponses)
    },[allResponses])

    if (!item.item) {
        return <p>Error: Group question does not have child questions </p>
    }

    const handleChange = (value: number | null, linkId: string) => {
        let realValue : number | undefined = value || undefined;

        
        let oldValues: QuestionnaireResponseItem[]  = [];

        if(responseItem?.item){
           oldValues = [...responseItem?.item]

           const badIndex = oldValues.findIndex( i => i.linkId === linkId )

           if(badIndex >= 0){
               oldValues.splice(badIndex,1);
           }
        }
        
        oldValues.push({
                    linkId: linkId,
                    answer: [{valueInteger: realValue}]
                })

        handleGroupResponse(oldValues,item.linkId)

        

        // let existingItem = newItems?.findIndex(i => i.linkId === linkId)

        // if (existingItem >= 0) {
        //     // newItems.splice(existingItem, 1)
        // }

        // const newValue = { linkId: linkId, answer: [{ valueInteger: value || undefined }] }
        // newItems.push(newValue)


        // handleResponse(newItems, item.linkId)

    }

    // Trying to use default values
    // useEffect(()=>{
    //     item.item?.forEach(eachItem => {
    //             let answer = allResponses.find(res => {return res.linkId === eachItem.linkId})
    //             if(!answer && eachItem.initial && eachItem.initial[0].valueInteger ){
    //                 handleResponse( [{ value eachItem.initial[0].valueInteger}], eachItem.linkId)
    //             }
    //         }
    //     )
    // },[])


    const getValue = (linkId: string) => {
        console.log("get value")
        console.log(responseItem)
        if(responseItem && responseItem.item){
            let rel = responseItem?.item.find( i => i.linkId === linkId)
            console.log("Rel")
            console.log(rel)
            if(rel && rel.answer && rel.answer[0]){
                return rel.answer[0].valueInteger || null
            }
        }

        return null
        
        // const answer = allResponses.find(each => each.linkId === linkId)?.answer

        // if (answer && answer[0]) {
        //     return answer[0].valueInteger || null
        // }

        // return null;
    }


    return (<Box padding="1em">
        { item.item.map(each => <div key={`${each.linkId}`}>
            <QuestionText>{each.text || "No text"}</QuestionText>
            <Box height="1em" />
            <RadioGroupRating handleChange={(event: React.SyntheticEvent<Element, Event>, value: number | null) => { handleChange(value, each.linkId) }} value={getValue(each.linkId)} />
        </div>)}
    </Box>)
}