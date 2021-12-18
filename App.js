const express = require("express");//need to use
const path = require("path");//
// const {append} = require("express/lib/response");
const port = 3001 || process.env.PORT;
// if 
// const hostName = "localhost";
const app = express();
const dotEnv = require("dotenv");
// const http = require("http");
// const hbs = require('express-handlebars'); 

//dotenv configuration
dotEnv.config({path: "./.env"}); 



// setting hbs
app.set("view engine", "hbs");

// 
app.use(express.urlencoded({extended:true}));

// 
app.use(express.json());

// setting the Route Folder
app.use("/Auth", require("./routes/Auth"));

app.use("/", require("./routes/RegisterRoutes"));



// starting a basic server or connect to the server
app.listen(port, function(req, res){
    console.log("Server Run at ", port);

});





// const mysql2 = require("mysql2");
// // const bcrypt = require("bcrypt");
// const async = require("hbs/lib/async");
// const port = 3005 || process.env.PORT;
// // if 
// const dBase = mysql2.createConnection({
 
//     host:process.env.DATABASE_HOST,
//     port:process.env.DATABASE_PORT,
//     user:process.env.DATABASE_USER,
//     password:process.env.DATABASE_PASSWORD,
//     database:process.env.DATABASE_NAME

// });




// dBase.connect((err) =>{
//     if(err){
//         console.log("Error: ", err);
//     }else{
//         console.log(`Database Created`);
//     }
// });


// exports.register = (req, res) =>{
 
// const {name, song, price} = req.body;
// // 
// // 
//     dBase.query(
//         "SELECT name FROM register WHERE product = ?",
//         [name],  
    
//         async (err, result) => {
//             if(err){
//                 console.log(err);
//                 return res.render("registration", {message: `Database has a problem (${err})` });
//             }if(result.length > 0){
//                 return res.render("registration",{message:"Song entered already in use"});
//             // }else if(password != password_confirm){
//             //     return res.render("registration", {message:"Password does not match!"})
//              }

//             // to hash or display # to the password
//             // const hashPassword = await bcrypt.hash(password,8);
//             // const hashPassword = bcrypt.hash(password,8);

//             dBase.query(
//                 "INSERT INTO product SET ?",
//                 {
//                 name:name,
//                 song:song,
//                 price:price,
//                 // password:hashPassword
//                 },
//                (err, result) =>{
//                    if(err){
//                        console.log(err);
//                    }else{
//                     return res.render("registration", {message:"Song Registered"});
//                    }
//                }
//             );
//         }
//         // its required to us the = ?
//         // when calling from database
//         );

// }



//  // function for login aacount

// //  exports.login = async(req, res) =>{
// //     try{
// //         const { email, password} = req.body;

// //         if(!email || !password){
// //             return res.status(400).render("index",{message: "Provide email and password."});
// //         };
        
// //         dBase.query(
// //             "SELECT * FROM register WHERE email =?",
// //             [email],
// //             async (err, result) =>{
// //                 console.log(result);

// //                 if(!result || !(await  bcrypt.compare(password, result[0].password))){
// //                     return res.status(401).render("index", {message: "Email or Password is incorrect"});
// //                 }else{
// //                     // display  the user data in console
// //                     // console.log(result[0].email)
// //                     dBase.query(
// //                         "SELECT * FROM register",
// //                         (err, result) =>{
// //                             res.render("list", {user:result, title:"List of users"});
// //                             //to be able to use the hbs you must use the { } not sure
// //                             // on the variable or any code that you want to use
// //                             // the "list" are from the list.hbs
// //                         }

// //                     )
// //                 }
// //             }
// //         )
    
// //     }catch (error){
// //         console.log(err);
// //     }

// // };




// // for updating data
// exports.update = (req, res) =>{
//     const name = req.params.name;//not sure what params do
//     dBase.query(
//         "SELECT * FROM product WHERE name =?",
//         [name],
//         (err, result) =>{
//             res.render("update", {title:"Edit song", user:result[0]});
//         }
//     )
// }



// // for editing  data

// exports.update_user = (req, res) =>{

//     const {name, song, id} = req.body;

//     dBase.query(
//         `UPDATE product SET name = '${name}',
//         song = '${song}' WHERE id = '${id}' `,
//         // {first_name, last_name,email},
//         [name,song,id],

//         (err) => {
//             if(err) return console.log(err.message);
//             dBase.query("SELECT * FROM product", (err, result) =>{
//                 res.render("list", {
//                     user:result,
//                     title: "list of users",
//                     message: `Song With Name: ${id}, has been updated`
//                 })
//             })
//         }
//     )
// }



// // delete user
// exports.delete_user = (req, res) =>{

//     const {id} = req.params;

//     dBase.query(
//         "DELETE  FROM product WHERE id = ?",
//         [id],
//         (err) => {
//             if(err) return console.log(err.message);
//             dBase.query("SELECT * FROM rgister;", (err, result) =>{
//                 res.render("list", {
//                     user:result,
//                     title: "list of users",
//                     message: `Song With ID: ${id}, has been deleted`
//                 })
//             })
//         }
//     )
// }