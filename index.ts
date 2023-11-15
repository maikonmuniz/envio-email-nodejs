import * as nodemailer from "nodemailer";

class Email {

    constructor(
        public para?: string,
        public assunto?: string,
        public mensagem?: string
    ) { }

    enviarEmail(): Promise<string> {

        const opcoesEmail = {
            from: "enviando para ",
            to: this.para,
            subject: this.assunto,
            html: `<h1>${this.mensagem}</h1>`
        };

        const transporte = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: 'any@email',
                pass: 'any@pass'
            },
            tls: { rejectUnauthorized: false }
        });

        return new Promise((resolve, reject) => {
            transporte.sendMail(opcoesEmail, (erro, info) => {
                if (erro) {
                    console.error('Erro ao enviar o e-mail:', erro);
                    reject(erro.message);
                } else {
                    console.log('E-mail enviado:', info.response);
                    resolve("E-mail enviado com sucesso!");
                }
            });
        });
    }
}