const exp=require("express");
const router=exp.Router();
const bcrypt=require("bcrypt")
const Admin=require("../db/admindb");

router.get("/reg",async (req,res)=>{
    const salt=await bcrypt.genSalt(10);
    const hp=await bcrypt.hash("admin123",salt);

    // var insobj={
    //     name : "Shibam",
    //     email : "shibamhazra850@gmail.com",
    //     password : hp
    // }

    // await Admin.create(insobj)
    // res.json({msg:"Admin Created"});
    })

    router.post("/login",async (req,res)=>{

    var e=req.body.email;
    var p=req.body.pass;
    var data=await Admin.findOne({email:e})
    if(data!=null){
    bcrypt.compare(p,data.password,(err,result)=>{
        if(err){
            throw err;
        }else{
            if(result==true){
                var udata={
                    id:data._id,
                    name:data.name
                }
                res.json(udata)

            }else{
res.json({msg:"Invalid Login"})
            }
        
        }
    })


    }else{
        res.json({msg:"Invalid Login"})
    }
    

});


module.exports=router;