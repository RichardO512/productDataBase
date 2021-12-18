const mysql2 = require("mysql2");//need to use because i want to use data
// Connect to Mysql
// db.createConnection(url)
// you cant use db.connect() to connect
// you must use or put it insi
// to encrypt
const bcrypt = require("bcrypt");
const async = require("hbs/lib/async");

const dBase = mysql2.createConnection({
    // you must create .env first for security
    // reason so that you dont need to wrtite 
    // your name
    // the process are from the port const
    // but we dont need to call the variable
    // just the code inside of it that the end are .env
    // the DATABASE_HOST and so on are from the
    // .env file i created recently make sure that
    // it was correspond or same data need
    host:process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME

});




dBase.connect((err) =>{
    if(err){
        console.log("Error: ", err);
    }else{
        console.log(`Database Created`);
    }
});


exports.register = (req, res) =>{
    // declaring var and getting the values from registration.hbs
    // const firstName = req.body.first_name;
    // const lastName = req.body.last_name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirm = req.body.password_confirm;

    // destructuring
// this code are the same from the Above so 
// your choice to do Destructuring or the code above
const { first_name, last_name, email, password, password_confirm } = req.body;
// 
// 
    dBase.query(
        "SELECT email FROM register WHERE email = ?",
        [email],  
    
        async (err, result) => {
            if(err){
                console.log(err);
                return res.render("registration", {message: `Database has aproblem (${err})` });
            }if(result.length > 0){
                return res.render("registration",{message:"Email entered already in use"});
            }else if(password != password_confirm){
                return res.render("registration", {message:"Password does not match!"})
            }

            // to hash or display # to the password
            const hashPassword = await bcrypt.hash(password,8);
            // const hashPassword = bcrypt.hash(password,8);

            dBase.query(
                "INSERT INTO register SET ?",
                {
                first_name:first_name,
                last_name:last_name,
                email:email,
                password:hashPassword
                },
               (err, result) =>{
                   if(err){
                       console.log(err);
                   }else{
                    return res.render("registration", {message:"User Registered"});
                   }
               }
            );
        }
        // its required to us the = ?
        // when calling from database
        );

}



 // function for login aacount

 exports.login = async(req, res) =>{
    try{
        const { email, password} = req.body;

        if(!email || !password){
            return res.status(400).render("index",{message: "Provide email and password."});
        };
        
        dBase.query(
            "SELECT * FROM register WHERE email =?",
            [email],
            async (err, result) =>{
                console.log(result);

                if(!result || !(await  bcrypt.compare(password, result[0].password))){
                    return res.status(401).render("index", {message: "Email or Password is incorrect"});
                }else{
                    // display  the user data in console
                    // console.log(result[0].email)
                    dBase.query(
                        "SELECT * FROM register",
                        (err, result) =>{
                            res.render("list", {user:result, title:"List of users"});
                            //to be able to use the hbs you must use the { } not sure
                            // on the variable or any code that you want to use
                            // the "list" are from the list.hbs
                        }

                    )
                }
            }
        )
    
    }catch (error){
        console.log(err);
    }

};




// for updating data
exports.update = (req, res) =>{
    const email = req.params.email;//not sure what params do
    dBase.query(
        "SELECT * FROM register WHERE email =?",
        [email],
        (err, result) =>{
            res.render("update", {title:"Edit User", user:result[0]});
        }
    )
}



// for editing  data

exports.update_user = (req, res) =>{

    const {first_name, last_name, email} = req.body;

    dBase.query(
        `UPDATE register SET first_name = '${first_name}',
        last_name = '${last_name}' WHERE email = '${email}' `,
        // {first_name, last_name,email},
        [first_name,last_name,email],

        (err) => {
            if(err) return console.log(err.message);
            dBase.query("SELECT * FROM register;", (err, result) =>{
                res.render("list", {
                    user:result,
                    title: "list of users",
                    message: `User With email: ${email}, has been updated`
                })
            })
        }
    )
}



// delete user
exports.delete_user = (req, res) =>{

    const {email} = req.params;

    dBase.query(
        "DELETE  FROM register WHERE email = ?",
        [email],
        (err) => {
            if(err) return console.log(err.message);
            dBase.query("SELECT * FROM register", (err, result) =>{
                res.render("list", {
                    user:result,
                    title: "list of users",
                    message: `User With email: ${email}, has been deleted`
                })
            })
        }
    )
}

//function for adding food in the food 
exports.song =  (req, res) => {
    const {name, price, song, id} = req.body;
    db.query('INSERT INTO product SET ?', {name:name, price: price, song:song, id:id}, (err, result)=>{
        if (err) {
            console.log(err)
        }
        else {
            db.query('SELECT * FROM product', (error, result) => {
                res.render('Song List', {product: result, title: 'List of Song', message:`Song is added with name ${song}`}); //result is passed in user variable
            })

        }
    })
}

//function for deleting entry
exports.delete_song = (request, response) => {
    const {food_id} = request.params;
    db.query('DELETE FROM product WHERE id=?',[id], 
    (err, result)=> {
        console.log(result);
        if (err) return console.log(err.message)
        
        db.query('SELECT * FROM product', (error, result) => {
            response.render('Product list', {nproduct: result, title: 'List of Song', message:`Song is deleted with id ${id} `}); //result is passed in user variable
        })
    }
    )
}

//function for getting and displaying the update form
exports.update_form = (request, response) => {
    const id = request.params.id; 
    db.query('SELECT * FROM food WHERE id=?',[id], 
    (err, results) => {
        response.render('update song', {title:'Edit Song Entry', name:results[0]});
    }
    )
}
//function for posting the update inputs and displaying the new lists
exports.update_song = (request, response) => {
    const {id, name, price, song } = request.body;
    db.query('UPDATE product SET name=?, price=?, song=? WHERE id=?', [name, price, song, id],
    (err, result)=> {
        console.log(result);
        if (err) return console.log(err.message)
        
        db.query('SELECT * FROM product', (err, result) => {
            if (err) return console.log(err.message);
            else
                response.render('Product list', {product: result, title: 'List Updated Song', message:`Song with name ${name} is updated`}); 
            })
    }
    )
}