import { FormElement } from "../../types/form-element";
import styles from './styles.module.scss'

const Element = ({ id, display, type, required, onChange, value }: FormElement) => {
    return (<label className={styles.label} >
        <span >{display}{required && "*"}</span>
        <input value={value} onChange={onChange} type="text" id={id} />
    </label>)
}

export default Element;