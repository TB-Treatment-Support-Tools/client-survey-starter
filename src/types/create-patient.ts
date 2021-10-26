type CreatePatientInputs = {
    [key: string]: string | number,
    givenName: string,
    familyName: string,
    username: string,
    medication: string,
    organizationId: number
}

export default CreatePatientInputs;