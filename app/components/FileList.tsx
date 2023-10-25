"use client";

import { useEffect, useState } from "react";
import { User } from "@supabase/auth-helpers-nextjs";
import { Anchor, Card, Center, Loader, Text, Title } from "@mantine/core";
import { themeColor } from "../lib/constant";
import { supabase } from "../lib/supabase";

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
  const [user, setUser] = useState<User | null | undefined>(undefined);

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

    (async () => {
      setUser((await supabase.auth.getUser()).data.user);
    })();
  }, []);

  return (
    <>
      <Title order={2} size={"lg"} mt={32}>
        Uploaded files
      </Title>
      <Center>{user === undefined && <Loader color={themeColor} size={"lg"} />}</Center>
      {user &&
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
      {user === null && <Text my={8}>Please login to see contents.</Text>}
    </>
  );
}
