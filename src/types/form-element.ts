import React from "react";

export enum FormElementTypes {
    String,
    Number,
    Boolean
}

export interface FormElement {
    id: string,
    display: string,
    type: FormElementTypes,
    required?: boolean,
    onChange?: React.ChangeEventHandler,
    value? : any
}