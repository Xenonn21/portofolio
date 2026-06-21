import Home from "@/components/sections/Home";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <main className="overflow-x-hidden bg-black">
      <Home />
      <About />
      <Skills />
      <Works />
      <Contact />
    </main>
  );
}