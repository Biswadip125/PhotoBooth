import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex items-center justify-center w-full h-full flex-col gap-18 ">
      <h1 className="text-4xl font-bold text-center text-black">
        Welcome to our Photobooth
      </h1>
      <button
        className="px-8 py-4  bg-[#0378b5] hover:bg-[#045c8f] text-white rounded-full cursor-pointer transition-all duration-300"
        onClick={() => navigate("/template-selection")}
      >
        Get Started
      </button>
    </div>
  );
};

export default WelcomePage;
