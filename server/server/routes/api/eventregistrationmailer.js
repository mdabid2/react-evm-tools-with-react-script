var nodemailer = require('nodemailer');

module.exports = (app) => {
app.post('/api/registration/mailer', handleSayHello); 
    function handleSayHello(req, res) {
        // Not the movie transporter!
        const transporter = nodemailer.createTransport({
            //Set https://myaccount.google.com/lesssecureapps?pli=1 
            //Allow less secure apps: ON/OFF -> Set ON
            service: 'gmail',
            auth: {
                user: 'abid.akther@gmail.com', 
                pass: 'tiger@123'
            }
            
        });
        
        //HTMLS body Template
        let html = '<table bgcolor="#ffffff" class="content" align="center" cellpadding="0" cellspacing="0" border="0"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateContainer"><tbody><tr><td valign="top" class="bodyContent"><h4>Hello Miss/Ms./Mrs.: '+req.body.name+' Thanks For Registration</h4><h1>Training: '+req.body.events[0]+'</h1><p><strong>Description: </strong>'+req.body.events[2]+'</p></td></tr></tbody></table></td></tr><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr align="top"><td align="left" valign="top" style="margin:0;padding-top:10px;line-height:1;"><h4><strong>Venue: '+req.body.events[1]+'</strong></h4><h4><strong>Event Date: '+req.body.events[3]+'</strong></h4></td></tr></tbody></table></td></tr></tbody></table>';

        let mailOptions = {
            from: 'no-reply@gmail.com', 
            to: req.body.email, 
            subject: "Confirmation: "+req.body.events[0], 
            html: html
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
                res.json({yo: info.response});
            };
        });
    }
}