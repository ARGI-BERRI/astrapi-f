"use client";

import styles from "./css/Header.module.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Group, Text, Title } from "@mantine/core";
import { User } from "@supabase/auth-helpers-nextjs";
import { LogIn, LogOut } from "react-feather";
import { themeColor } from "../lib/constant";
import { supabase } from "../lib/supabase";
import ThemeChanger from "./ThemeChanger";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    (async () => {
      setUser((await supabase.auth.getUser()).data.user);
    })();
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Group justify="space-between">
          <Group>
            <Title size={"xs"} fw={"normal"}>
              Astrapi F
            </Title>
          </Group>
          <Group>
            {user && (
              <Button variant="subtle" color={themeColor} onClick={() => router.push("/auth/logout")}>
                <Group gap={8}>
                  <LogOut size={18} />
                  Logout
                </Group>
              </Button>
            )}
            {user === null && (
              <Button variant="subtle" color={themeColor} onClick={() => router.push("/auth/login")}>
                <Group gap={8}>
                  <LogIn size={18} />
                  Login
                </Group>
              </Button>
            )}
            {user === undefined && (
              <Button variant="subtle" color={themeColor}>
                Loading...
              </Button>
            )}
            <ThemeChanger />
          </Group>
        </Group>
        <Group>
          <Text c={"dimmed"}>
            Current user:&nbsp;
            {user === undefined && "Loading..."}
            {user === null && "Not logged in"}
            {user && `${user?.email} (${user?.role})`}
          </Text>
        </Group>
      </nav>
    </header>
  );
}
