import { FormElement, FormElementTypes } from "../types/form-element"
import Element from "../components/FormElement"

const elements: FormElement[] = [
    { id: "givenName", display: "First Name", type: FormElementTypes.String },
    { id: "familyName", display: "Last Name", type: FormElementTypes.String },
]


export default function AddPatient() {
    return (<div>
        <h1>Add a patient</h1>
        <form>
            {elements.map(element => <Element {...element} />)}
        </form>
    </div>)
}
