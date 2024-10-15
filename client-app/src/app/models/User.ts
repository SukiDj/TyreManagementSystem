export interface User{
    ime: string;
    prezime:string;
    token:string;
    userName:string;
    roles : Role;
}

export interface Role {
    korisnikRoles: any;
    id: string;
    name: string;
    normalizedName: string;
    concurrencyStamp: any;
}

export interface UserFormValues {
    email:string;
    password: string;
}