import { DateTime } from 'luxon'
import React from 'react'
import classes from './styles.module.scss'

interface Props {
    date: DateTime,
    medicationWasTaken: boolean
}

export default function Day({ date, medicationWasTaken }: Props) {

    return (
        <div className={classes.day} style={{backgroundColor: medicationWasTaken ? "green" : "unset"}}>
            <p>
                {date.day}
            </p>
        </div>
    )
};
