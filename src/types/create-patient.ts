type CreatePatientInputs = {
    [key: string]: string | number,
    givenName: string,
    familyName: string,
    username: string,
    organizationId: string
}

export default CreatePatientInputs;