var express = require("express");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var exphbs = require("express-handlebars")
var path = require("path");
var PORT = process.env.PORT || 8000;
var app = express();

//view engine setup handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Satitic folder
app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static("public"));
// app.use("/views", express.static(path.join(__dirname + "views")));

// Body Parser  Middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Get the home page
app.get("/", (req, res) => {
    res.render("index", {title: "Home Page"});
});

app.get("/contact", (req, res) => {
    res.render("contact", {title: "Contact"});
});

app.get("/portfolio", (req, res) => {
    res.render("portfolio", {title: "Portfolio"});
});

// create output string
app.post("/send", (req, res) => {
    // console.log(req.body);
    var output = `
        <p> You have a new contact request</p>
        <h3> Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Last Name: ${req.body.last}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message </h3>
        <p>${req.body.message}</p>
        `;

        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            host: "",
            port: 2525,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "", // generated ethereal user
              pass: "" // generated ethereal password
            },
            tls:{
                rejectUnauthorized:false
            }
          });
        
          // send mail with defined transport object
          var mailOptions = {
            from: '"Nodemailer contact', // sender address
            to: "", // list of receivers
            cc: "",
            subject: "Node contact request", // Subject line
            text: "Hello world?", // plain text body
            html: output // html body
          };
  
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                return console.log(error);
            }
            console.log("Message sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            
            res.render("contact", {msg: "Email has been sent."})
        });
    });
    app.listen(PORT, function() {
        console.log("Server listening on http://localhost:", PORT);
      });
      
// app.listen(3000, () => console.log("Server started ..."));


        