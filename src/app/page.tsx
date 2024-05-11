import { Button } from "@/components/Button";
import { Text } from "@/components/Text";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to my page</h1>
      <Text content="aaaa bbbb cccc" size="2xl" />
      <Button label="Test" variant="secondary" size="md" />
    </main>
  );
}
