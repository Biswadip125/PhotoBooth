import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TemplateSelection = () => {
  const templates = [
    {
      id: 1,
      src: "/templates/template1.png",
    },
    {
      id: 2,
      src: "/templates/template2.png",
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [copyCount, setCopyCount] = useState(2);
  const navigate = useNavigate();
  const handleProceed = () => {
    if (!selectedTemplate) {
      alert("Please select a template");
      return;
    }

    //save the template and number of copies in the local storage

    localStorage.setItem(
      "photoboothSelection",
      JSON.stringify({ selectedTemplate, copyCount })
    );

    //navigating to capture route (step 3)
    navigate("/capture");
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-auto sm:h-screen bg-white gap-10 px-6 py-8">
      <h1 className="text-3xl font-bold text-black text-center">
        Select a Template
      </h1>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-10 ">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`flex justify-center rounded-xl overflow-hidden cursor-pointer border-6  ${
              selectedTemplate?.id === template.id
                ? "border-[#0378b5]"
                : "border-transparent"
            }`}
            onClick={() => setSelectedTemplate(template)}
          >
            <img src={template.src} className="h-72 w-72" />
          </div>
        ))}
      </div>

      {/*Copy Count Selection */}
      <div className="flex items-center gap-4 justify-center">
        <span className="text-lg font-medium text-black">
          {" "}
          Number of Copies :
        </span>
        {[2, 4, 6].map((num) => (
          <button
            key={num}
            className={`px-4 py-2 rounded-full border-2 text-sm font-medium ${
              copyCount === num
                ? "bg-[#0378b5] text-white border-[#0378b5]"
                : "bg-white text-[#528bad] border-[#528bad]"
            } transition-all duration-300 cursor-pointer`}
            onClick={() => setCopyCount(num)}
          >
            {num}
          </button>
        ))}
      </div>

      {/*Proceed to Camera */}
      <button
        className="px-8 py-3 bg-[#0378b5] text-white rounded-full hover:bg-[#045c8f] transition-all duration-300 cursor-pointer"
        onClick={handleProceed}
      >
        Proceed to Camera
      </button>
    </div>
  );
};

export default TemplateSelection;
