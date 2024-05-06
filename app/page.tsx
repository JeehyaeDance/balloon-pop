import Board from "@/components/board";
import DarkMode from "@/components/darkMode";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-10">
      <h1 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
        Superblock Balloon Pop
      </h1>
      <DarkMode />
      <Board />
    </main>
  );
}
