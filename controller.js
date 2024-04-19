const {questains,answars,userAns}=require('./questains')
exports.getQuestains=(req,res)=>{
    try {
        return res.status(200).json(
            {
                success:true,
                message:"Get all questains",
                questains:questains
            }
        )
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.answarQuestains=(req,res)=>{
    try {
        const {id}=req.params
        const {ans}=req.body
        let newId=parseInt(id)
        let newAns=parseInt(ans)
        userAns[newId]=newAns
        return res.status(200).json(
            {
                success:true,
                message:"mark to you questains",
                userAns
            })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.submit=(req,res)=>{
    try {
        let score=0;
        for(const [key,value] of Object.entries(userAns)){
            if(value==true) score=score+1
        }
        return res.status(200).json({
            questains,
            answars,
            userAns,
            score
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}