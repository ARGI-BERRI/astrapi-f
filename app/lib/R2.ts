import { S3Client } from "@aws-sdk/client-s3";

const endpoint = process.env.R2_ENDPOINT ?? "";
const accessKeyId = process.env.R2_ACCESS_KEY_ID ?? "";
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY ?? "";

const R2 = new S3Client({
  region: "auto",
  endpoint: endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

export default R2;
