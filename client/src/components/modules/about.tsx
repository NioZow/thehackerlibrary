import Header from "@/components/elements/header";
import Footer from "@/components/elements/footer";

const About = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="h-full flex flex-col justify-center items-center">
        <h1>The Hacker Library</h1>
        <p>Library of hacking learning resources, not sponsored</p>
        <div className="max-w-4xl flex item-center justify-center w-full">
          EHLO
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
