import classes from './styles.module.scss'

interface Props {
    children: string
}

export default function QuestionText({ children }: Props) {
    return (<h2 className={classes.questionText}>{children}</h2>)
}