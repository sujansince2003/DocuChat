import AWS from "aws-sdk"

export async function uploadTos3(file: File) {
    try {
        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY
        })
        const S3 = new AWS.S3({
            params: {
                Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME
            },
            region: "eu-north-1"
        })


        const file_key = "uploads/" + Date.now().toString() + file.name.replace(" ", "-");
        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: file_key,
            Body: file
        }
        const upload = S3.putObject(params).on("httpUploadProgress", event => {
            console.log("uploading..." + parseInt(((event.loaded * 100) / event.total).toString()))
        }).promise();

        await upload.then((data) => {
            console.log("successfully uploaded" + file_key + data)
        })

        return Promise.resolve({
            file_key,
            file_name: file.name
        })

    } catch (error) {
        console.error(error)
    }

}


export function getS3url(file_key: string) {
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${file_key}`
    return url
}