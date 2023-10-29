import R2 from "@/app/lib/R2";
import mime from "mime";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ListObjectsV2Command, PutObjectCommand } from "@aws-sdk/client-s3";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/lib/supabase";
import { FILES_GET_DEV_RESPONSE } from "./constants";

/**
 * Gets all file informations from the storage server
 * @returns Response
 */
export async function GET() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  const user = await supabase.auth.getUser();

  if (user.data.user === null) {
    const response = {
      Contents: [],
    };

    return NextResponse.json(response, { status: 401 });
  }

  if (process.env.NODE_ENV === "development") {
    return NextResponse.json(FILES_GET_DEV_RESPONSE);
  }

  const { Contents } = await R2.send(
    new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET,
    })
  );

  const contentsBody = Contents?.map((content) => {
    return {
      Key: content.Key,
      LastModified: content.LastModified,
      Size: content.Size,
      Path: `${process.env.R2_PUBLIC_URI}/${content.Key}`,
    };
  });

  return NextResponse.json({
    authenticated: true,
    Contents: contentsBody ?? [],
  });
}

/**
 * Creates a new file and upload it to the storage server
 */
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  if (formData.get("Body") === null) {
    return NextResponse.json({}, { status: 400 });
  }

  const cookieStore = cookies();
  const supabase = createServerComponentClient<Database>({ cookies: () => cookieStore });
  const user = await supabase.auth.getUser();

  if (user.data.user === null) {
    return NextResponse.json({}, { status: 401 });
  }
  const file = formData.get("Body") as File;
  const extension = mime.getExtension(file.type);
  const Key = `${crypto.randomUUID()}.${extension}`;
  const Body = Buffer.from(await file.arrayBuffer());

  console.log(`[uploader - server] uploading to r2: ${Key}`);

  const response = await R2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key,
      Body,
      ContentType: file.type,
    })
  );

  return NextResponse.json({}, { status: response.$metadata.httpStatusCode });
}
