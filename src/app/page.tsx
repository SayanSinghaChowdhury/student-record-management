import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js Starter Fullstack",
  description: "Production grade Fullstack Next.js starter template",
};

const page = () => {
  return (
    <>
      <main className="grid h-dvh place-items-center"></main>
    </>
  );
};

export default page;
