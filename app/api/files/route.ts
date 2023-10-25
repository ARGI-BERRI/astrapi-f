import R2 from "@/app/lib/R2";
import { NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

/**
 * Gets all file informations from the storage server
 * @returns Response
 */
export async function GET() {
  if (process.env.NODE_ENV === "development") {
    return NextResponse.json({
      Contents: [
        {
          Key: "test.txt",
          LastModified: new Date().toISOString(),
          Size: 1024,
          Path: "https://example.com/test.txt",
        },
      ],
    });
  }

  const { Contents } = await R2.send(
    new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET,
    })
  );

  const response = Contents?.map((content) => {
    return {
      Key: content.Key,
      LastModified: content.LastModified,
      Size: content.Size,
      Path: `${process.env.R2_PUBLIC_URI}/${content.Key}`,
    };
  });

  return NextResponse.json({
    Contents: response ?? [],
  });
}

/**
 * Creates a new file and upload it to the storage server
 */
export async function POST() {}
