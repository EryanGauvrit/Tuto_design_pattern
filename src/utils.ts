// import { Email } from "./app";

export const consoleLog = (message: string) => {
    const nbrCaracteres = message.length;
    const nbrEtoiles = nbrCaracteres + 6;

    console.log(addEtoiles(nbrEtoiles));
    console.log(`${addSpace(7)}*  ${message}${addSpace(2)}*`);
    console.log(addEtoiles(nbrEtoiles));
    console.log('');
}

const addEtoiles = (nbr: number) => {
    let etoiles = '       ';
    for (let i = 0; i < nbr; i++) {
        etoiles += '*';
    }
    return etoiles;
}

const addSpace = (nbr: number) => {
    let space = '';
    for (let i = 0; i < nbr; i++) {
        space += ' ';
    }
    return space;
}

//fonction qui formatte une chaine de caractère en fonction du nombre de caractères par ligne
export const formatString = (message: string, nbrCaracteresBylign: number) => {
    let messageFormated = '';
    let messageArray = message.split(' ');
    let nbrCaracteres = 0;
    messageArray.forEach((word) => {
        if (nbrCaracteres + word.length > nbrCaracteresBylign) {
            messageFormated += '\n';
            nbrCaracteres = 0;
        }
        messageFormated += word + ' ';
        nbrCaracteres += word.length + 1;
    });
    return messageFormated;
}



// export const mailContentDisplay = (mail: Email) => {
//     const nbrMaxCaracteres = 15;
//     const nbrSpace = 10;
//     console.log('To: ' + mail.to);
//     console.log('Subject: ' + mail.subject);
//     console.log(formatMailMessage(mail.message, nbrMaxCaracteres));
//     console.log('');
// }

// const formatMailMessage = (message: string, nbrCaracteresBylign: number) => {
//     let messageFormated = '';
//     let messageArray = message.split(' ');
//     let nbrCaracteres = 0;
//     messageArray.forEach((word) => {
//         if (nbrCaracteres + word.length > nbrCaracteresBylign) {
//             messageFormated += '\n';
//             nbrCaracteres = 0;
//         }
//         messageFormated += word + ' ';
//         nbrCaracteres += word.length + 1;
//     });
//     return messageFormated;
// }

    