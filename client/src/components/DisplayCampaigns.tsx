import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { FundCard } from "./";
import { CampaignType } from "../utils/types";
import { loader } from "../assets";

interface Props {
  title?: string;
  campaigns?: CampaignType[];
  loading?: boolean;
}

const DisplayCampaigns = ({ title, campaigns, loading }: Props) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign: CampaignType) => {
    const titleWithoutSpaces = campaign.title
      .split(/\s+/)
      .map((word, index) => {
        if (index === 0) return word;
        else return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join("");

    navigate(`/campaign-details/${titleWithoutSpaces}`, {
      state: {
        campaign,
      },
    });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns?.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {loading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}
        {!loading && campaigns?.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet.
          </p>
        )}
        {!loading &&
          campaigns &&
          campaigns?.length > 0 &&
          campaigns?.map((campaign) => (
            <FundCard
              key={uuidv4()}
              campaign={campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
