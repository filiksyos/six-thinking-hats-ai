import { SixHatsChat } from "@/components/six-hats-chat";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-hidden">
        <SixHatsChat />
      </div>
    </main>
  );
}
