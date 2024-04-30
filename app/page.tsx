export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-6">
        {[...Array(36)].map((box, idx) => {
          return (
            <div
              className="w-24 h-24 border-solid border-2 border-gray"
              key={idx}
            ></div>
          );
        })}
      </div>
    </main>
  );
}
