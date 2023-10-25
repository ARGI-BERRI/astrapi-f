import { Button, Title } from "@mantine/core";
import { themeColor } from "@/app/lib/constant";

const title = "Logout - Astrapi - Network File System";
const url = process.env.NEXT_PUBLIC_BASE_URL + `/auth/logout` ?? "https://example.com";

export const metadata = {
  metadataBase: new URL(url),
  title,
  openGraph: {
    title,
    url,
  },
  twitter: {
    title,
  },
};

export default function Login() {
  return (
    <>
      <Title order={2} my={16}>
        Are you sure to logout?
      </Title>
      <form action="/api/auth/login" method="post">
        <Button type="submit" variant="filled" color={themeColor} my={16}>
          Logout
        </Button>
      </form>
    </>
  );
}
