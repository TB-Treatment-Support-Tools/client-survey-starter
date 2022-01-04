import { DateTime } from 'luxon'
import classes from './styles.module.scss'

interface Props {
    date: DateTime,
    medicationWasTaken?: boolean
}

export default function Day({ date, medicationWasTaken }: Props) {

    return (
        <div className={classes.day} style={{backgroundColor: medicationWasTaken !== undefined ? (medicationWasTaken ? "rgba(68, 175, 105,.5)" : "red") : "unset"}}>
            <p>
                {date.day}
            </p>
        </div>
    )
};
