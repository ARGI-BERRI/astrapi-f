"use client";

import styles from "./css/FileDrop.module.css";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import { Group, Text, Title } from "@mantine/core";
import { Dropzone, DropzoneAccept, DropzoneIdle, DropzoneReject, FileWithPath } from "@mantine/dropzone";
import { AlertTriangle, File, Upload } from "react-feather";
import { themeColor } from "../lib/constant";
import { supabase } from "../lib/supabase";

interface Props {
  setUploaded: Dispatch<SetStateAction<boolean>>;
}

export default function FileDrop({ setUploaded }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  async function upload(files: FileWithPath[]) {
    setIsUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("Body", new Blob([await file.arrayBuffer()], { type: file.type }));

      console.log("[uploader] uploading...");

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/files`, {
        method: "post",
        body: formData,
      });

      if (response.ok) {
        setUploaded(true);
      }
    }

    setIsUploading(false);
  }

  useEffect(() => {
    (async () => {
      setUser((await supabase.auth.getUser()).data.user);
    })();
  }, []);

  return (
    <>
      <Title order={2} size={"lg"}>
        Upload files
      </Title>
      <Dropzone
        onDrop={(files) => upload(files)}
        onReject={(files) => console.log(`file rejected: ${files}`)}
        color={themeColor}
        loading={isUploading}
        my={16}
        disabled={user === undefined || user === null}
        className={user === undefined || user === null ? styles.disabled : ""}
      >
        <Group m="xl" justify="center">
          <DropzoneIdle>
            <File size={40} />
          </DropzoneIdle>

          <DropzoneAccept>
            <Upload size={40} />
          </DropzoneAccept>

          <DropzoneReject>
            <AlertTriangle size={40} />
          </DropzoneReject>

          <div>
            <Text size="xl" inline>
              {user ? "Drag files here or click to select files" : "You must login first."}
            </Text>
            <Text size="sm" inline c="grey">
              {user ? "All file types will be OK. File size limit: 5 MiB" : "Uploading requires authentication."}
            </Text>
          </div>
        </Group>
      </Dropzone>
    </>
  );
}
