import Header from "@/components/elements/header";
import Footer from "@/components/elements/footer";
import TrainingTable from "@/components/elements/table";

const Resources = () => {
  return (
    <div className="w-full flex flex-col">
      <Header />

      <div className="h-full flex flex-col justify-center items-center">
        <h1>The Hacker Library</h1>
        <p>Library of hacking learning resources, not sponsored</p>
        <TrainingTable />
      </div>

      <Footer />
    </div>
  );
};

export default Resources;
