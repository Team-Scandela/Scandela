import emailjs from "emailjs-com";

const sendEmail = async (username : string, forgotPasswordEmail : string, uuid : string) => {
    const gmail = "service_8ju8lpn";
    const template = "template_mirexri";
    const publicKey = "IAaf_UMmlHAyyDH1I";
    const templateParams = {
        username: username,
        link : "https://app.scandela.com/resetpwd/" + uuid,
        sendto : forgotPasswordEmail
    };
    try {
        console.log("sending email");
        await emailjs.send(gmail, template, templateParams, publicKey);
        console.log("email sent");
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export default sendEmail;