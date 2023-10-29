import styles from "./css/Footer.module.css";
import { Anchor, Text } from "@mantine/core";
import { themeColor } from "../lib/constant";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Text c={"dimmed"}>(C) 2023 ARGIA. All rights reserved.</Text>
      <Text c={"dimmed"}>
        <Anchor href="https://gitlab.com/ARGI-BERRI/astrapi-f" c={themeColor}>
          Astrapi F
        </Anchor>{" "}
        is a free software. This software is licensed under{" "}
        <Anchor href="https://www.gnu.org/licenses/agpl-3.0.html.en" target="_blank" c={themeColor}>
          GNU Affero General Public License Version 3
        </Anchor>
        .
      </Text>
    </footer>
  );
}
