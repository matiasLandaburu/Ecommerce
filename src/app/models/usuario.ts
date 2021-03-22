export class Usuario {
    name: string;
    lastName: string;
    spendMoney: number;
    mail: string;

    constructor( name, lastName, spendMoney, mail){
        this.name = name;
        this.lastName = lastName;
        this.spendMoney = spendMoney;
        this.mail = mail;
    }
}
