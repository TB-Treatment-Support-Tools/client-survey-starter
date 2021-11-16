import { ReactElement } from 'react'
import classes from './styles.module.scss'

interface Props{
    children: ReactElement | ReactElement[] | string
}

export default function SectionTitle({children}: Props){
    return(<div className={classes.sectionTitle}>{children}</div>)
}