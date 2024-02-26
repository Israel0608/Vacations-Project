class CredentialsModel {
    public email: string;
    public password: number;

    constructor(credetials: CredentialsModel){
        this.email = credetials.email;
        this.password = credetials.password
    }
}

export default CredentialsModel;