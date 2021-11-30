import { Button, ButtonProps } from "@mui/material";
import classes from './styles.module.scss';

export default function OptionButton(props : ButtonProps){
    return <Button {...props} className={`${classes.optionButton} ${props.className}`} />
}