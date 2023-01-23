import { S3Client, ListBucketsCommand } from "npm:@aws-sdk/client-s3";

const region = Deno.env.get("AWS_REGION");
const accessKey = Deno.env.get("AWS_ACCESS_KEY_ID");
const secretKey = Deno.env.get("AWS_SECRET_ACCESS_KEY");

if (!region || !accessKey || !secretKey) {
  const output = { error: "Invalid configuration" };
  console.log(JSON.stringify(output));
  Deno.exit(0);
}

const client = new S3Client({ region: "REGION" });

const command = new ListBucketsCommand({});

client
  .send(command)
  .then((data) => {
    const output = {
      buckets: (data.Buckets || []).map((b) => b.Name),
    };
    console.log(JSON.stringify(output));
  })
  .catch((error) => {
    const output = { error: error };
    console.log(JSON.stringify(output));
  });
