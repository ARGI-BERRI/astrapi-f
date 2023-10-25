"use client";

import { useState } from "react";
import { Group, Text, Title } from "@mantine/core";
import { Dropzone, DropzoneAccept, DropzoneIdle, DropzoneReject, FileWithPath } from "@mantine/dropzone";
import { AlertTriangle, File, Upload } from "react-feather";
import { themeColor } from "../lib/constant";

export default function FileDrop() {
  const [isUploading, setIsUploading] = useState(false);

  function upload(files: FileWithPath[]) {
    const fileNames = files.map((file) => file.name).join(", ");

    console.log(`[file] processing: ${fileNames}`);
    setIsUploading(true);

    setTimeout(() => {
      console.log(`[file] uploaded: ${fileNames}`);
      setIsUploading(false);
    }, 1000);
  }

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
              Drag files here or click to select files
            </Text>
            <Text size="sm" inline c="grey">
              All file types will be OK. File size limit: 5 MiB
            </Text>
          </div>
        </Group>
      </Dropzone>
    </>
  );
}
