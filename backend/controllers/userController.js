import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";



//description: auth user and get Token
//route Post/api/user/login
//access public
const authUser=asyncHandler(async(req,res)=>{
   const {email,password}=req.body;
   
   const user=await User.findOne({email});

   if(user && (await user.matchPassword(password))){
     
      generateToken(res,user._id);

      res.status(200).json({
         _id: user._id,
         name: user.name,
         eamil: user.email,
         isAdmin: user.isAdmin

      });
   }else{
      res.status(401);
      throw new Error('invalid email or password');
   }

   //console.log(req.body);
   // res.send('auth user');
});

//description: Register User
//route Post/api/users
//access public
const registerUser=asyncHandler(async(req,res)=>{
   const {name,email,password}=req.body;

   const userExists=await User.findOne({email});

   if(userExists){
      res.status(400);
      throw new Error('user already exists');
   }

   const user=await User.create({
      name,
      email,
      password,
   });

   if(user){
      generateToken(res, user._id);
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin

      })
   }
      else{
         res.status(400);
         throw new Error('invalid user data');
      }
   

   //  res.send('register user');
 });

 //description: logout user and clear cookie
//route Post/api/user/logout
//access private
const logoutUser=asyncHandler(async(req,res)=>{
   res.cookie('jwt',' ',{
      httpOnly:true,
      expires: new Date(0)
   });
   res.status(200).json({message: 'logged out successfully'});
    //res.send('logout user');
 });

//description: get UserProfile
//route GET/api/user/profile
//access public
const getUserProfile=asyncHandler(async(req,res)=>{

   const user=await User.findById(req.user._id);
    //res.send('User Profile');
     if(user){
      res.status(201).json({
         _id: user._id,
         name: user.name,
         email: user.email,
         isAdmin: user.isAdmin

      })
     }
     else{
      res.status(404);
      throw new Error('User not found');
     }
 });

 //description: update userProfile
//route PUT/api/user/profile
//access private
const updateUserProfile=asyncHandler(async(req,res)=>{
   const user=await User.findById(req.user._id);

   if(user) {
      user.name=req.body.name || user.name;
      user.email=req.body.email || user.email;

      if(req.body.password){
         user.password=req.body.password;
      }
      const updateUser=await user.save();

      res.status(200).json({
         _id: updateUser._id,
         name: updateUser.name,
         email: updateUser.email,
         isAdmin: updateUser.isAdmin,

      });
   } else{
      res.status( 404);
      throw new Error("User not found");
   }

    
   
 });

//description: Get Users
//route GET/api/users
//access private/admin
const getUsers=asyncHandler(async(req,res)=>{
    res.send('Get Users');
 }); 

//description: Get Users By id
//route GET/api/users/:id
//access private/admin
const getUserById=asyncHandler(async(req,res)=>{
    res.send('Get User By Id');
 }); 

//description: Delete Users By id
//route GET/api/users/:id
//access private/admin
const deleteUser=asyncHandler(async(req,res)=>{
    res.send('Delete User');
 });  

//description: Update User
//route Post/api/users/:id
//access private/admin
const updateUser=asyncHandler(async(req,res)=>{
    res.send('update User');
 });  

 export{
    authUser,registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
 }; 