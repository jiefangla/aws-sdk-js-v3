import { S3Client } from "@aws-sdk/client-s3-browser";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity-browser";
import { config } from "../config";

const cognitoIdentityClient = new CognitoIdentityClient({
  region: "us-west-2",
  signer: {} as any
});
cognitoIdentityClient.middlewareStack.remove("SIGNATURE");

const s3Client = new S3Client({
  region: "us-west-2",
  credentials: fromCognitoIdentityPool({
    // @ts-ignore
    client: cognitoIdentityClient,
    identityPoolId: config.IdentityPoolId
  })
});

export { s3Client };
