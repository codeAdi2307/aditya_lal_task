import Jwt from "jsonwebtoken";
import User from "../model/user.model.js"

export const userSignUp = async (req,res)=>{
    try {
        console.log("jisds");
        console.log(req.body);
        const {email,password,fullname} = req.body;
       
    let oldEmail = await User.findOne({
        email:email
    })
 
        if(oldEmail){
            res.send({ message: "You Are already registered please signIn",status: "error"});
        }else{
        const newUser = await User.create({
        email:email,
        fullname:fullname,
        password:password,
     
        })
        if(newUser){
            const UserObject = newUser.toObject();
            
            res.send({ message: "User created successfully",status: "success" });
        }else{
            res.send({ message: "User not added",status: "error"});
        }
    }
    
    } catch (error) { 
        console.log(error);
        res.send({ message: "something went wrong"});
    }
    } 

    export const userSignIn = async (req,res,next)=>{
        try {
            console.log("asdasda");
        
            const {email,password} = req.body;
        
   
        let user = await User.findOne({
            email:email,
            password:password,
        })
        
   
            if(user){
                let token =  Jwt.sign(user.toObject(),process.env.SECRET)
                console.log(token);
      
                res.send({ message: `Welcome ${user.fullname}`,token: token,status: "success"});
            }else{
                res.send({ message: "Not Registered or Wrong Password",status: "error"});   
        }
        
        } catch (error) { 
            console.log(error);
            res.send({ message: "something went wrong"});
            
        }
        }