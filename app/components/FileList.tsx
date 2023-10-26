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
  const [fetchStatus, setFetchStatus] = useState<"ok" | "fail" | "fetching">("fetching");

  async function fetchFiles() {
    setFetchStatus("fetching");

    const doRequest = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/files`);

      if (response.status === 200) {
        setFetchStatus("ok");
      } else {
        setFetchStatus("fail");
        return;
      }

      const json = await response.json();

      setFiles(json.Contents);
    };

    doRequest();
  }

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <>
      <Title order={2} size={"lg"} mt={32}>
        Uploaded files
      </Title>
      {fetchStatus === "fetching" && <Center>{<Loader color={themeColor} size={"lg"} />}</Center>}
      {fetchStatus === "ok" &&
        files.map((file) => {
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
      {fetchStatus === "fail" && <Text my={8}>Please login to see contents.</Text>}
    </>
  );
}
