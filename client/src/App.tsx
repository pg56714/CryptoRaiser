import { Route, Routes } from "react-router-dom";
import { Home, Profile, CreateCampaign, CampaignDetails } from "./pages";
import { Sidebar, Navbar } from "./components";
import { useState } from "react";

const App = () => {
  const [lightMode, setLightMode] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div
      className={`relative sm:-8 p-4 ${
        lightMode ? "bg-whitesmoke" : "bg-[#13131a]"
      } min-h-screen flex flex-row transition duration-400`}
    >
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar setLightMode={setLightMode} />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar setSearchFilter={setSearchFilter} />
        <Routes>
          <Route path="/" element={<Home searchFilter={searchFilter} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
