const AWS=require('aws-sdk');

const  uploadToS3=(data,filename)=>{

    const BUCKET_NAME='expensetrackerappfiles';
    const IAM_USER_KEY='AKIA6FAEFQHUHQBQH2TZ';
    const IAM_USER_SECRET='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';

    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET
    })
   
    var params={
        Bucket:BUCKET_NAME,
        Key:filename,
        Body:data,
        ACL:'public-read',
        ContentLength:data.byteCount
    }
    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,result)=>{
            if(err){
                console.log("Something went wrong",err)
                reject(err);
            }else{
                console.log("SUccess",result)
                resolve(result.Location);
            }
        })

    })
    
    
}
module.exports={
    uploadToS3
}