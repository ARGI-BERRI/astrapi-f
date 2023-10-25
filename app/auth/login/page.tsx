import { Button, TextInput, Title } from "@mantine/core";
import { themeColor } from "@/app/lib/constant";
const title = "Login - Astrapi - Network File System";
const url = process.env.NEXT_PUBLIC_BASE_URL + `/auth/login` ?? "https://example.com";

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
        Astrapi request you to authenticate:
      </Title>
      <form action="/api/auth/login" method="post">
        <TextInput name="email" type="email" label="Email Address" withAsterisk my={8} />
        <TextInput name="password" type="password" label="Password" withAsterisk my={8} />
        <Button type="submit" variant="filled" color={themeColor} my={16}>
          Sign In
        </Button>
      </form>
    </>
  );
}
