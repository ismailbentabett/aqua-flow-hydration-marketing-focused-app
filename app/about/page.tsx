import Image from "next/image";

export default function About() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-8 text-center bg-white text-neutral-900">
      <Image src="/logo.svg" alt="Logo" width={150} height={150} />
      <h1 className="mt-8 text-3xl font-bold">About Us</h1>
      <p className="mt-4 text-lg max-w-xl">
        Welcome to aqua flow! We are a premium water bottle company that
        specializes in sustainable and stylish water bottles. Our mission is to
        keep you hydrated and help the environment by providing reusable water
        bottles that are designed for every lifestyle.
      </p>
    </main>
  );
}
