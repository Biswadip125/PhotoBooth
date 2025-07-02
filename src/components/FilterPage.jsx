import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { drawOnTemplate } from "../utils/drawOnTemplate";
import { applyFilter } from "../utils/applyFilters";
import toast from "react-hot-toast";

const FilterPage = () => {
  const [photo, setPhoto] = useState();
  const [filteredPhoto, setFilteredPhoto] = useState();
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    handleGenerateFinalImage();
  }, []);

  const handleGenerateFinalImage = async () => {
    const storedPhotos = JSON.parse(localStorage.getItem("capturedPhotos"));

    const storedTemplate = JSON.parse(
      localStorage.getItem("photoboothSelection")
    );

    let finalImage;
    if (storedPhotos && storedTemplate) {
      finalImage = await drawOnTemplate(
        storedPhotos,
        storedTemplate.selectedTemplate.src
      );
      setPhoto(finalImage);
    } else {
      navigate("/template-selection");
    }
  };

  const handleApplyFilter = async () => {
    const filteredAppliedPhoto = await applyFilter(photo, filter);
    setFilteredPhoto(filteredAppliedPhoto);
    toast.success("Filter applied Successfully");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "photo-strip.jpg";
    link.href = filteredPhoto || photo;
    link.click();
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-4 relative">
      <h1 className="text-2xl font-bold">Apply Filters</h1>
      <img
        src={filteredPhoto ? filteredPhoto : photo}
        alt={`${photo} index + 1`}
        className="w-80 h-100"
      />
      <div className="flex  gap-2">
        <p className="text-xl font-semibold">Apply :</p>
        <div className="flex items-center gap-2 justify-center text-xl">
          <input
            type="radio"
            checked={filter === "grayscale"}
            className="mt-1"
            onChange={() => setFilter("grayscale")}
          />
          <label>Black and White</label>
        </div>
        <div className="flex items-center gap-2 justify-center text-xl">
          <input
            type="radio"
            checked={filter === "sepia"}
            className="mt-1"
            onChange={() => setFilter("sepia")}
          />
          <label>Sepia</label>
        </div>
        <div className="flex items-center gap-2 justify-center text-xl">
          <input
            type="radio"
            checked={filter === ""}
            className="mt-1"
            onChange={() => setFilter("")}
          />
          <label>none</label>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          className={`px-4 py-2  
           bg-[#0378b5] hover:bg-[#045c8f] 
           text-white rounded-full cursor-pointer `}
          onClick={handleApplyFilter}
        >
          Apply Filter
        </button>
        <button
          className="px-4 py-2 bg-[#0378b5] hover:bg-[#045c8f] text-white rounded-full cursor-pointer"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default FilterPage;
