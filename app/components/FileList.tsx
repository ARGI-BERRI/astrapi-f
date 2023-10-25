"use client";

import { useEffect, useState } from "react";
import { Anchor, Card, Center, Loader, Text, Title } from "@mantine/core";
import { themeColor } from "../lib/constant";

interface FileInformation {
  /**
   * ID of the file. ID must be an UUID value and unique.
   */
  Key: string;

  /**
   * Upload date of the file. Formatting is ISO 8601.
   */
  LastModified: string;

  /**
   * Size of the file
   */
  Size: number;

  /**
   * Path to file's location such as `https://example.com/uploads/example.png`.
   */
  Path: string;
}

export default function FileList() {
  const [files, setFiles] = useState<FileInformation[]>([]);

  async function fetchFiles() {
    const request = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/files`);
      const json = (await response.json()).Contents;

      setFiles(json);
    };

    request();
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <Title order={2} size={"lg"} mt={32}>
        Uploaded files
      </Title>
      <Center>{files.length === 0 && <Loader color={themeColor} size={"lg"} />}</Center>
      {files.map((file) => {
        return (
          <section key={file.Key}>
            <Card my={16}>
              <Title order={3} size={"h6"}>
                <Anchor href={file.Path} target="_blank" c={themeColor}>
                  {file.Key}
                </Anchor>
              </Title>
              <Text c={"dimmed"}>Uploaded at: {file.LastModified}</Text>
            </Card>
          </section>
        );
      })}
    </>
  );
}
