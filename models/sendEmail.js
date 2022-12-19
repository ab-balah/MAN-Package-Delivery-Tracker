const mail = require('nodemailer')


function sendEmailToUser(recipient, data){
    var transporter = mail.createTransport({
        service:'gmail',
        auth : {
          user:"MANlogistic2@gmail.com",
          pass:"acjrhrvwudzgazfc"
        }
      })
    var mailop={
        from : "MANlogistic2@gmail.com",
        to: recipient,
        subject:"Updated Movement Of Package",
        text:`
        Your package (Package Number: `+data.Package_number+`) has had it's location updated. Please check the website for more details.
        Time of update: `+data.Time+`.

        MAN Logistic.
        `
    }
    transporter.sendMail(mailop,(error,info)=>{
        if(error){
            console.log(error)
        }
        else {
            console.log(info.response)
        }
    });
}

module.exports = {sendEmailToUser}