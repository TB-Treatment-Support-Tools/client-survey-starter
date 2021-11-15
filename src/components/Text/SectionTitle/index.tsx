import classes from './styles.module.scss'

interface Props{
    children: string
}

export default function SectionTitle({children}: Props){
    return(<h2 className={classes.sectionTitle}>{children}</h2>)
}