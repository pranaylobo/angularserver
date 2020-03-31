const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Pranay:REDcherry%401@angulartest-wdzzt.gcp.mongodb.net/test?authSource=admin&replicaSet=Angulartest-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true";
var nodemailer = require('nodemailer');
const delay = require('delay');

const PORT = 3000;
 const app = express();
 
 var result = false;
var stat;

 app.use(bodyParser.json());

 app.use(cors());

 global.email1;
 global.status1;
 global.count=0;
 global.count1=0;

 global.checkuser;

 global.res1;


 app.get('/',function(req,res)
 {

    res.json({
      hello:"hello"
    })
 })

app.get('/output',function(req,res){
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("TestR");
    dbo.collection("OnlineCompiler").findOne({email:"lobopranayk9@gmail.com"}, function(err, res) {
      if (err) throw err;
      console.log(res.output);
      global.res1 = res.output
      console.log(global.res1)
      global.count1=1;

      db.close();
    });

  });
  (async () => {

    await delay(3000);
  
    // Executed 100 milliseconds later
    console.log("check global",global.res1)
    res.json({
      message:global.res1
    })
  
  })();
  
})
 app.post('/setcode',function(req,res){
var email = req.body.email;
console.log(req.body.email)

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // Insert document in TestR
  var dbo = db.db("TestR");
  var myobj = { code:req.body.email,email:"lobopranayk9@gmail.com"};

    dbo.collection("OnlineCompiler").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
  
});
res.status(200).send({"message":"Data recieved"})
 });
 

 app.post('/forgotpassword',function(req,res){
 var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'maheshkunder24@gmail.com',
                    pass: 'REDcherry@1'
                  },
                  tls: {
                    rejectUnauthorized: false
                }
              });
              
              var mailOptions = {
                from: 'maheshkunder24@gmail.com',
                to: req.body.email,
                subject: 'Verification mail',
                text: 'http://localhost:4200/fpassword?email='+req.body.email+''
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);

                  res.json({
                    email: "sent"
                  })
                }
              });
        
  
 })


 app.post('/updatepassword',function(req,res){

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("TestR");
    console.log(req.body.password);
    console.log(req.body.email);

    dbo.collection("user").updateOne({email: req.body.email},{$set: {password: req.body.password}}, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      result = true;
      db.close();

      
    });
  });
  
  var transporter = nodemailer.createTransport({
                 service: 'gmail',
                 auth: {
                     user: 'maheshkunder24@gmail.com',
                     pass: 'REDcherry@1'
                   },
                   tls: {
                     rejectUnauthorized: false
                 }
               });
               
               var mailOptions = {
                 from: 'maheshkunder24@gmail.com',
                 to: req.body.email,
                 subject: 'Password Has Been Changed',
                 text: 'Your password has been changed '
               };
               
               transporter.sendMail(mailOptions, function(error, info){
                 if (error) {
                   console.log(error);
                 } else {
                   console.log('Email sent: ' + info.response);
 
                   res.json({
                     email: "sent"
                   })
                 }
               });
         
   
  })
 

 app.post('/checkuserverification',function(req,res)
 {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("TestR");
    
    dbo.collection("user").findOne({email:req.body.email},{status:true}, function(err, res) {
      if (err) throw err;
      console.log("res.email",res);
      if(res == null)
      {
global.checkuser=false
      }
      else
      {
        global.checkuser=true

      }

      


     db.close();


 });

 (async () => {

  await delay(1000);

  // Executed 100 milliseconds later
  console.log("check global",global.checkuser)

  if(global.checkuser == true)
  {
res.json({
  message:true
})
  }

  if(global.checkuser == false)
  {
    res.json({
      message:false
    })
  }

})();


      
    });


 })

 app.post('/checkuser',function(req,res)
 {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("TestR");
    
    dbo.collection("user").findOne({email:req.body.email}, function(err, res) {
      if (err) throw err;
      console.log("res.email",res);
      if(res == null)
      {
global.checkuser=false
      }
      else
      {
        global.checkuser=true

      }

      


     db.close();


 });

 (async () => {

  await delay(1000);

  // Executed 100 milliseconds later
  console.log("check global",global.checkuser)

  if(global.checkuser == true)
  {
res.json({
  message:true
})
  }

  if(global.checkuser == false)
  {
    res.json({
      message:false
    })
  }

})();


      
    });


 })
app.post('/enroll',function(req,res)
{
  var email;
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.lname);
    console.log(req.body.email);
    console.log(req.body.password);

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        // Insert document in TestR
        var dbo = db.db("TestR");
        var myobj = { fname: req.body.name, lname:req.body.lname,email:req.body.email,password:req.body.password, status: false};
      
          dbo.collection("user").insertOne(myobj, function(err, res) {
              if (err) throw err;
              console.log("1 document inserted");
              db.close();
            });

            // NOde Mailer

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'maheshkunder24@gmail.com',
                    pass: 'REDcherry@1'
                  },
                  tls: {
                    rejectUnauthorized: false
                }
              });
              
              var mailOptions = {
                from: 'maheshkunder24@gmail.com',
                to: req.body.email,
                subject: 'Verification mail',
                text: 'http://localhost:4200/verified?email='+req.body.email+''

              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
        
        
      });
    res.status(200).send({"message":"Data recieved"})
})

app.post('/update',function(req,res)
{
global.email1=req.body.email;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("TestR");
    
    dbo.collection("user").updateOne({email: req.body.email},{$set: {status: true}}, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      result = true;
      db.close();

      
    });
  });
  

  res.status(200).send({"message":"Data updated"})

});

app.get('/result', (req, res) => {
console.log("global email",global.email1);
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("TestR");
      
      dbo.collection("user").findOne({email:global.email1}, function(err, res) {
        if (err) throw err;
        console.log(res["status"]);
       global.status1 = res["status"];
       db.close();

       global.count=1;


   });

  
        
      });

      if(count==1)
      {
        console.log("hello",global.status1);

        res.json({
          status:global.status1
        })
      }

 

    });     

 app.listen(PORT,function()
 {
     console.log("sunn raha hu ")
 }
 )