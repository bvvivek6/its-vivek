import React from "react";
import { motion } from "framer-motion";
import Entry from "./components/Entry";
import Threads from "./components/Threads";
import Filters from "./components/Filters";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Resume from "./Resume";
import JumpToSection from "./components/JumpToSection";
import Grid from "./components/Grid";

const sections = [
  {
    key: "about",
    content: <Entry />,
  },
  {
    key: "skills",
    content: <Skills />,
  },
  {
    key: "experience",
    content: <Experience />,
  },
  {
    key: "resume",
    content: <Resume />,
  },
];

const App = () => {
  const scrollRef = React.useRef();

  //skip to section handler
  const handleJump = (key) => {
    const idx = sections.findIndex((s) => s.key === key);
    if (idx !== -1 && scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const sectionHeight = scrollContainer.offsetHeight;
      scrollContainer.scrollTo({
        top: idx * sectionHeight,
      });
    }
  };

  return (
    <motion.div
      className="relative w-full h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Filters />
      <JumpToSection onJump={handleJump} />
      <Grid />

      <div className="relative dvh items-center  justify-center overflow-hidden font-grotesk flex flex-col z-0">
        <main className="flex-1 flex items-center justify-center relative w-full h-full min-h-0">
          <div
            ref={scrollRef}
            className="relative z-10 flex-1 flex flex-col items-center justify-start w-full h-full overflow-x-hidden overflow-y-auto scrollbar-hide snap-y snap-proximity scroll-smooth"
            style={{
              scrollSnapType: "y mandatory",
              WebkitOverflowScrolling: "touch",
              height: "100vh",
              minHeight: 0,
            }}
          >
            {sections.map((sectionObj) => (
              <div
                key={sectionObj.key}
                className="flex flex-col items-center justify-center w-full h-full snap-center transition-transform duration-300 p-4"
                style={{ flex: "0 0 100vh", minHeight: 0, maxHeight: "100vh" }}
              >
                {sectionObj.content}
              </div>
            ))}
          </div>
        </main>
        <div
          style={{
            width: "100vw",
            height: "700px",
            position: "absolute",
            top: 130,
          }}
        >
          <Threads
            amplitude={0.5}
            distance={0.2}
            enableMouseInteraction={true}
          />
        </div>
        <footer>
          <div className="flex items-center justify-center w-full h-16  text-gray-700 text-xs font-light">
            <span className="text-center">
              Crafted by{" "}
              <a
                href="https://github.com/bvvivek6"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-gray-900 font-light"
              >
                Vivek
              </a>
            </span>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadein { animation: fadein 1.2s cubic-bezier(.4,0,.2,1); }
        @keyframes retract { 0% { opacity: 1; transform: translateY(0); } 80% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-32px); } }
        .animate-retract { animation: retract 3.5s cubic-bezier(.4,0,.2,1) forwards; }
      `}</style>
    </motion.div>
  );
};

export default App;
