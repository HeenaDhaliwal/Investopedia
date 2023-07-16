var express = require("express");
var fileuploader = require("express-fileupload");
var nodemailer = require("nodemailer");

var app = express();
var path = require("path");

var mysql = require("mysql");
const { createConnection } = require("net");

app.use(express.static("public")); //middleware to access public folder's file
app.listen(2023, function () {
    console.log("server started....");
})
// connection
var dbConfig = {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "project",
    dateStrings: true
}
var dbRef = mysql.createConnection(dbConfig);
dbRef.connect(function (err) {
    if (err == null) {
        console.log("connected server....");
    }
    else {
        console.log(err.toString());
    }
})
app.use(express.urlencoded(true));
app.use(fileuploader());


// app.post("/signup-process",function(req,resp){
//     var email= req.body.txtEmail;
//     var pswd=req.body.txtPswd;
//     var mob= req.body.txtMob;
//     var sel= req.body.txtSel;

//     dbRef.query("insert into signup values(?,?,?,?,current_date(),1)",[email,pswd,mob,sel],function(err){

//         if(err==null){
//             console.log("record saved....");
//             resp.send("Signed up successfully");
//             // resp.redirect("")
//         }
//         else{
//             console.log(err.toString());
//             resp.send(err.toString());
//         }
//     })
// })



app.get("/", function (req, resp) {
    var dir = process.cwd;
    console.log(dir);

    var dir2 = __dirname;
    var file = __filename;
    console.log(dir2 + " " + file);

    var pathFile = path.join(__dirname, "public", "index.html");
    resp.sendFile(pathFile);
})

//ajax
app.get("/ajax-chk-user", function (req, resp) {
    var emailll = req.query.emaill;
    dbRef.query("select * from signup where email=?", [emailll], function (err, jsonAryResult) {
        if (err != null) {
            resp.send(err.toString());
        }
        else if (jsonAryResult.length == 1) {
            resp.send("ID already taken");

        }
        else {
            resp.send("Available");
        }
    })
})

// signup
app.post("/db-Signup", function (req, resp) {
    var emailll = req.body.emaill;
    var pswddd = req.body.pswdd;
    var mobbb = req.body.mobb;
    var typeee = req.body.typee;
    var mailer = req.body.emaill;
    dbRef.query("insert into signup values(?,?,?,?,current_date(),1)", [emailll, pswddd, mobbb, typeee], function (err, jsonAryResult) {
        if (err) {
            console.log(err.toString());
            resp.send(err.toString());
            // resp.redirect("signup-result.html");
        }
        else if (jsonAryResult.length == 0) {
            resp.send("Invalid Id");
        }
        else {
            resp.send("Sign Up Successfully......");
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'heenaheena21947@gmail.com',
                    pass: 'ibdzbgjcbknvmjtp'
                }
            });

            var mailOptions = {
                from: 'heenaheena21947@gmail.com',
                to: mailer,
                subject: 'Welcome To Investopedia',
                html: '<center><img src="https://weeblytutorials.com/wp-content/uploads/2018/03/Newsletter-Signup-Form-to-Weebly.jpg"></center><center><h2>Welcome to Investopedia</h1></center><center style="line-height:30px;"><br> We are so happy to have you on our site.<br> With Investopedia you can find best <br> Investors and Entrepreneurs for your business.<br>Dont hesitate to get in touch if you have any <br>questions; we will always get back to you :)'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                else {
                    console.log('Email sent:' + info.response);
                }
            });
        }
    })
})


// login
app.post("/db-login", function (req, resp) {
    var emailll = req.body.emaill;
    var pswddd = req.body.pswdd;

    dbRef.query("select * from signup where email=? and password=?", [emailll, pswddd], function (err, jsonAryResult) {
        if (err) {
            resp.send(err.toString());
        }
        else if (jsonAryResult.length == 0) {
            resp.send("Invalid Id or Password");
        }
        else {//1 record found - uid pwd is correct
            if (jsonAryResult[0].status == 0)
                resp.send("Id Blocked")
            else
                resp.send(jsonAryResult[0].usertype);
        }
    })
})

// admin
app.post("/db-Admin", function (req, resp) {
    var emailll = req.body.emaill;
    var pswddd = req.body.pswdd;
    dbRef.query("select * from admin where email=? and password=?", [emailll, pswddd], function (err, jsonAryResult) {
        if (err) {
            resp.send(err.toString());
        }
        else if (jsonAryResult.length == 0) {
            resp.send("Invalid Id or Password");
        }
        else {
            // resp.send("Admin Login Successfully");
            resp.send(jsonAryResult[0].password);
        }
    })
})

//picher submit
app.post("/pitcherSubmit", function (req, resp) {
    var email = req.body.txtEmail;
    var name = req.body.txtName;
    var mob = req.body.txtMob;
    var add = req.body.txtAdd;
    var city = req.body.txtCity;
    var state = req.body.txtState;
    var zip = req.body.txtZip;
    var id = req.body.txtId;

    var pic = req.files.txtPic.name;
    var desPath = path.join(__dirname, "public/uploads", pic);

    req.files.txtPic.mv(desPath, function () {
        console.log("file saved....")
    })
    var category = req.body.txtCategory;
    var company = req.body.txtCompany;
    var estd = req.body.txtEstd;
    var product = req.body.txtArea;
    var rev = req.body.txtRev;
    var margin = req.body.txtMargin;
    var other = req.body.txtOther;

    dbRef.query("insert into pprofile values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [email, name, mob, add, city, state, zip, id, pic, category, company, estd, product, rev, margin, other], function (err) {
        if (err == null) {
            console.log("Submitted Successfully..........................");
            resp.send("Submitted Successfully..........................");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    });
})

// pitcher search button
app.get("/json-pitcher-search", function (req, resp) {
    var emailll = req.query.emaill;
    console.log(emailll);
    dbRef.query("select * from pprofile where email=?", [emailll], function (err, jsonAryResult) {
        console.log(jsonAryResult);
        if (err != null) {
            resp.send(err.toString());
        }
        else {
            resp.json(jsonAryResult);
        }
    })
})

// picher update button
app.post("/pitcherUpdate", function (req, resp) {
    var email = req.body.txtEmail;
    var name = req.body.txtName;
    var mob = req.body.txtMob;
    var add = req.body.txtAdd;
    var city = req.body.txtCity;
    var state = req.body.txtState;
    var zip = req.body.txtZip;
    var id = req.body.txtId;
    var pic;
    if (req.files != null) {

        pic = req.files.txtPic.name; //want to change pic
        var desPath = path.join(__dirname, "public/images", pic);
        req.files.txtPic.mv(desPath, function () {
            console.log("file saved");
        })
    }
    else {
        pic = req.body.hdn; //keep old image file
        // state=req.body.hdnState;
        // id=req.body.hdnId;
        // category=req.body.hdnCategory;
    }
    var category = req.body.txtCategory;
    var company = req.body.txtCompany;
    var estd = req.body.txtEstd;
    var product = req.body.txtArea;
    var rev = req.body.txtRev;
    var margin = req.body.txtMargin;
    var other = req.body.txtOther;
    dbRef.query("update pprofile set name=?,contact=?,address=?,city=?,state=?,zip=?,id=?,ppic=?,category=?,company=?,estd=?,product=?,revenue=?,gross=?,other=? where email=?", [name, mob, add, city, state, zip, id, pic, category, company, estd, product, rev, margin, other, email], function (err, result) {

        if (err != null) {
            resp.send(err.toString());
        }
        else if (result.affectedRows == 1) {
            console.log("record updated");
            resp.send("Update successfully");
            // resp.redirect("update-result.html")
        }
        else if (result.affectedRows == 0) {
            resp.send("Invalid Id");
            // resp.redirect("invalid.html");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    })
})



// submit Shark 
app.post("/submitshark", function (req, resp) {
    var email = req.body.txtEmail;
    var name = req.body.txtName;
    var lname = req.body.txtLname;
    var dob = req.body.txtDate;
    var add = req.body.txtAdd;
    var mob = req.body.txtMob;
    var city = req.body.txtCity;
    var state = req.body.txtState;
    var zip = req.body.txtZip;
    var img = req.files.txtPic.name;
    var desPath = path.join(__dirname, "public/uploads", img);

    req.files.txtPic.mv(desPath, function () {
        console.log("file uploaded");
    });
    var company = req.body.txtCompany;
    var profession = req.body.txtPro;
    var estd = req.body.txtEstd;
    var Noofinv = req.body.txtInv;
    var Incomp = req.body.txtComp;
    var domain = req.body.txtField;
    var selfield = req.body.txtSel;
    var other = req.body.txtOther;

    dbRef.query("Insert into profileshark values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [email, name, lname, dob, add, mob, city, state, zip, img, company, profession, estd, Noofinv, Incomp, domain, selfield, other], function (err) {
        if (err == null) {
            console.log("Submited Successfully..........................");
            resp.send("Submited Successfully..........................");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    });
});
// Investor update button
app.post("/updateshark", function (req, resp) {
    var email = req.body.txtEmail;
    var name = req.body.txtName;
    var lname = req.body.txtLname;
    var dob = req.body.txtDate;
    var add = req.body.txtAdd;
    var mob = req.body.txtMob;
    var city = req.body.txtCity;
    var state = req.body.txtState;
    var zip = req.body.txtZip;
    var img;
    if (req.files != null) {
        img = req.files.txtPic.name; //want to change pic
        var desPath = path.join(__dirname, "public/uploads", img);
        req.files.txtPic.mv(desPath, function () {
            console.log("file saved");
        });
    }else {
        img = req.body.hdn; //keep old image file
    }
    var company = req.body.txtCompany;
    var profession = req.body.txtPro;
    var estd = req.body.txtEstd;
    var Noofinv = req.body.txtInv;
    var Incomp = req.body.txtComp;
    var domain = req.body.txtField;
    var selfield = req.body.txtSel;
    var other = req.body.txtOther;
    dbRef.query("update profileshark set name=?,lname=?,dob=?,address=?,contact=?,city=?,state=?,zip=?,ppic=?,company=?,profession=?,estd=?,noofinv=?,incomp=?,domain=?,selfeild=?,other=? where email=?", [name, lname, dob, add, mob, city, state, zip, img, company, profession, estd, Noofinv, Incomp, domain, selfield, other, email], function (err, result) {
        if (err != null) {
            resp.send(err.toString());
        }
        else if (result.affectedRows == 1) {
            console.log("record updated");
            resp.send("Update successfully");
        }
        else if (result.affectedRows == 0) {
            resp.send("Invalid Id");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    });
});
// shark search button
app.get("/json-shark-search", function (req, resp) {
    var emailll = req.query.emaill;
    console.log(emailll);
    dbRef.query("select * from profileshark where email=?", [emailll], function (err, jsonAryResult) {
        console.log(jsonAryResult);
        if (err != null) {
            resp.send(err.toString());
        }
        else {
            resp.json(jsonAryResult);
        }
    });
});


//setting
app.post("/db-change-shark", function (req, resp) {
    var Email = req.body.emaill;
    var oldp = req.body.oldpswdd;
    var newp = req.body.newpswdd;

    dbRef.query("update signup set password=? where email=? and password = ? and usertype= 'Investor' ", [newp, Email, oldp], function (err, result) {
        if (err != null) {
            resp.send(err.toString());
        }
        else if (result.affectedRows == 1) {
            console.log("record updated");
            resp.send("Update successfully");
        }
        else if (result.affectedRows == 0) {
            resp.send("Invalid Id or Password");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    });
});
app.post("/db-change-pitcher", function (req, resp) {
    var Email = req.body.emaill;
    var oldp = req.body.oldpswdd;
    var newp = req.body.newpswdd;

    dbRef.query("update signup set password=? where email=? and password = ? and usertype= 'Entrepreneur' ", [newp, Email, oldp], function (err, result) {
        if (err != null) {
            resp.send(err.toString());
        }
        else if (result.affectedRows == 1) {
            console.log("record updated");
            resp.send("Update successfully");
        }
        else if (result.affectedRows == 0) {
            resp.send("Invalid Id or Password");
        }
        else {
            console.log(err.toString());
            resp.send(err.toString());
        }
    });
});

// angular
app.get("/angular-get-all-users", function (req, resp) {
    dbRef.query("select * from signup", function (err, jsonAryResult) {
        if (err != null)
            resp.send(err.toString());
        else
            resp.json(jsonAryResult);
    })
})

// app.get("/angular-delete-user",function(req,resp)
// {

//     var email=req.query.x;

//     dbRef.query("delete from signup where email=?",[email],function(err,result)
//         {
//             if(err!=null)
//                 resp.send(err.toString());
//             else if(result.affectedRows==1)
//                 resp.send("Deleted Successfullyyyu");
//                     else
//                     resp.send("Invalid ID");
//     })
// }) 

app.get("/angular-block-user", function (req, resp) {
    var email = req.query.x;
    dbRef.query("update signup set status=0 where email=?", [email], function (err, result) {
        if (err != null)
            resp.send(err.toString());
        else if (result.affectedRows == 1)
            resp.send("Blocked Successfullyyyu");
        else
            resp.send("Invalid ID");
    })
})

app.get("/angular-unblock-user", function (req, resp) {
    var email = req.query.x;
    dbRef.query("update signup set status=1 where email=?", [email], function (err, result) {
        if (err != null)
            resp.send(err.toString());
        else if (result.affectedRows == 1)
            resp.send("UnBlock Successfullyyyu");
        else
            resp.send("Invalid ID");
    })
})



// Admin all Sharks
app.get("/angular-get-all-sharks", function (req, resp) {
    dbRef.query("select * from profileshark", function (err, jsonAryResult) {
        if (err != null)
            resp.send(err.toString());
        else
            resp.json(jsonAryResult);
    })
})
// admin all pitchers
app.get("/angular-get-all-pitchers", function (req, resp) {
    dbRef.query("select * from pprofile", function (err, jsonAryResult) {
        if (err != null)
            resp.send(err.toString());
        else
            resp.json(jsonAryResult);
    })
})

// find Investors
app.get("/angular-find-all-sharks", function (req, resp) {

    console.log(req.query);
    var data = ["%" + req.query.domain + " %", req.query.city, req.query.no];
    dbRef.query("select * from profileshark where selfeild like ? and city =? and noofinv>=? ", data, function (err, jsonAryResult) {

        console.log(jsonAryResult);

        if (err != null)
            resp.send(err.toString());
        else
            resp.json(jsonAryResult);
    })
})

// fetch city in combobox
app.get("/fetch-city", function (req, resp) {
    dbRef.query("select distinct city from profileshark", function (err, jsonAryResult) {
        if (err == null) {
            resp.json(jsonAryResult);
        }
        else
            resp.send(err.toString());
    })
})

// fetch domain in comobox
// app.get("/fetch-domain", function (req, resp) {
//     dbRef.query("select distinct domain from profileshark", function (err, jsonAryResult) {
//         if (err == null) {
//             resp.json(jsonAryResult);
//         }
//         else
//             resp.send(err.toString());
//     })
// })
// Domain
// app.get("/angular-domain-user", function (req, resp) {
//     // var email=req.query.x;
//     dbRef.query("select * from profileshark", function (err, result) {
//         if (err != null)
//             resp.send(err.toString());
//         else if (result.affectedRows == 1)
//             resp.send("Updated Successfullyyy");
//         else
//             resp.send("Invalid ID");
//     })
// })
// find Pitchers
app.get("/angular-find-all-pitchers", function (req, resp) {
    console.log(req.query);
    var data = [req.query.category, req.query.revenue, req.query.gross];
    dbRef.query("select * from pprofile where category=? and revenue>=? and gross>=? ", data, function (err, jsonAryResult) {
        console.log(jsonAryResult);
        if (err != null)
            resp.send(err.toString());
        else
            resp.json(jsonAryResult);
    })
})

// fetch category in combobox
app.get("/fetch-category", function (req, resp) {
    dbRef.query("select distinct category from pprofile", function (err, jsonAryResult) {
        if (err == null) {
            resp.json(jsonAryResult);
        }
        else
            resp.send(err.toString());
    })
})
