

export class LoginModel {
    username: string = ''
    password: string = ''

    constructor(username: string, password: string) {
        this.username = username
        this.password = password
    }
}

export class RegisterModel {
    username: string = ''
    password: string = ''
    email: string = ''

    constructor(username: string, email: string, password: string) {
        this.username = username
        this.email = email
        this.password = password
    }
}

export class JwtResponse {
    token: string = ''
}

export class MessageResponse {
    message: string = ''
}
