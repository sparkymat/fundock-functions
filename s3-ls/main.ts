import { ApiFactory } from "https://deno.land/x/aws_api@v0.7.0/client/mod.ts";
import { S3 } from "https://aws-api.deno.dev/v0.3/services/s3.ts";

const region = Deno.env.get("AWS_REGION") || "";
const awsAccessKeyId = Deno.env.get("AWS_ACCESS_KEY_ID") || "";
const awsSecretKey = Deno.env.get("AWS_SECRET_ACCESS_KEY") || "";

if (!region || !awsAccessKeyId || !awsSecretKey) {
  const output = { error: "Invalid configuration" };
  console.log(JSON.stringify(output));
  Deno.exit(0);
}

// with credentials in ~/.aws/credentials:
const s3 = new ApiFactory({
  region,
  credentials: { awsAccessKeyId, awsSecretKey },
}).makeNew(S3);

s3.listBuckets()
  .then((data) => {
    const output = {
      buckets: (data.Buckets || []).map((b) => b.Name),
    };
    console.log(JSON.stringify(output));
  })
  .catch((err) => {
    const output = { error: err };
    console.log(JSON.stringify(output));
  });
