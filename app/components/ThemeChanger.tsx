"use client";

import { useEffect, useState } from "react";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { Moon, Sun } from "react-feather";
import { themeColor } from "../lib/constant";

export default function ThemeChanger() {
  const theme = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <ActionIcon variant="light" color={themeColor} onClick={() => theme.toggleColorScheme()}>
      {mounted && theme.colorScheme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </ActionIcon>
  );
}
