import { mySqlPool } from "../dataBase.js"


// Fetch All data
export  const fetchData = async (req,res)=>{
    try {
        const [rows] = await mySqlPool.query('SELECT * FROM users')
        if(!rows){
            return res.status(404).send({
                message :"No records Founds"
            })
        }
        res.status(200).send({
            Message : " All Students Records",
            totalstudents : rows.length,
            rows
        })
    } catch (error) {
        console.error(error); // Log the error for debugging
        if (!res.headersSent) { // Ensure headers are not already sent
            return res.status(500).send({
                message: "Error getting data from the database"
            });
        }
}}

// Fetch Paginated data
export  const pagination_fetch_Data = async (req,res)=>{
        try {

            const {page,limit} = req.query
            const offset = (page-1)*limit 
            const [rows] = await mySqlPool.query('SELECT * FROM users limit ? offset ? ',[+limit,+offset])
            if(!rows){
                return res.status(404).send({
                    message :"No records Founds"
                })
            }
            res.status(200).send({
                Message : " Data of user ",
                rows
            })
        } catch (error) {
            console.error(error); // Log the error for debugging
            if (!res.headersSent) { // Ensure headers are not already sent
                return res.status(500).send({
                    message: "Error getting data from the database"
                });
            }
}}

// Get Students By ID
export const getStudentsByID = async ()=>{
    try {
        const userId = req.params.id
        if(!userId){
            return res.status(404).send({
                message : "Invalid OR provide student id"
            })
        }
        // const data = await mySqlPool.query  (`SELECT * FORM users WHERE id=${userId}`)
        const data = await mySqlPool.query('SELECT * FROM users  WHERE id=?',[userId])
        if(!data){
            return res.status(404).send({
                message:"No Record Found"
            })
        }
        res.status(200).send({
            data:data[0]
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message : "Error in Get user By ID API"
        })
    }
}


export const createUserData = async (req,res)=>{
    try {
        const {name,email,age,phonenumber,password
        } = req.body
        if(!name || !email || !age || !phonenumber || !password){
            return res.status(500).send({
                message:"plz provide all fields"
            })
        }
        const data = await mySqlPool.query(`INSERT INTO users (name,email,age,phonenumber,password) VALUES (?,?,?,?,?)`,[name,email,age,phonenumber,password])
        if(!data){
            return res.status(404).send({
                message:"Error in INSERT QUERY"
            })
        }
        res.status(201).send({
            message:"New User Added Successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message : "Error in add User"
        })
        
    }
}

export const updateUserData = async(req,res)=>{
    try {
        
        const userId = req.params.id
        if(!userId){
            return res.status(500).send({
                message:"Invalid id or provide id"
            })
        }

        const {name,email,age,phonenumber,password} = req.body
        const data = await mySqlPool.query(`UPDATE users SET name=? , email=?,age=?, phonenumber=? , password=? WHERE id =? `,[name,email,age,phonenumber,password,userId])
        if(!data){
            return res.status(500).send({
                message:"Error in Update data"
            })
        }
        res.status(200).send({
            message:"User detail Updates"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"Error in UPDATE user API",

        })
        
    }
} 

export const deleteUserData = async(req,res)=>{
    try {

        const userId = req.params.id

        if(!userId){
            return res.send(500).send({
                message:"Invalid Id or Provide ID"
            })
        }
        await mySqlPool.query(`DELETE FROM users WHERE id =?`,[userId])
        res.status(200).send({
            message:"User data is deleted"
        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            message:"Error in DELETE user API",
        })
        
    }
}