import { Typography } from "@mui/material";
import { FormElement } from "../../types/form-element";
import styles from './styles.module.scss'

const Element = ({ id, display, type, required, onChange, value }: FormElement) => {
    return (<label className={styles.label} >
        <Typography variant="body1">{display}{required && "*"}</Typography>
        <input value={value} onChange={onChange} type="text" id={id} />
    </label>)
}

export default Element;