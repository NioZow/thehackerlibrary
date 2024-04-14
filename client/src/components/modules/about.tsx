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
          <p className="p-8">
            The Hacker Library is an open source project that aims to gather in
            one place new techniques and posts about cybersecurity. You can use
            this project to quickly learn a topic thanks to the indexed
            resources, stay up to date by regularly checking the 'latest posts'
            page or to learn a new topic/get started in cybersecurity by looking
            at the roadmaps! As this is an open-source project, feel free to
            contribute to the{" "}
            <a href="https://github.com/NioZow/thehackerlibrary">project</a> by
            adding/suggesting some features and posts using{" "}
            <a href="https://github.com/NioZow/thehackerlibrary/pulls">
              pull requests
            </a>
            !
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
