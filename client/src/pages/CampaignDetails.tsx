import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PageTransition, CustomButton, CountBox, Loader } from "../components";
import { useStateContext } from "../utils/Context";
import { calculateBarPercentage, daysLeft } from "../utils/helperFunc";
import { backdrop } from "../assets";

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState<
    { donator: any; donation: string }[]
  >([]);
  const [ownerCampaigns, setOwnerCampaigns] = useState<any[]>([]);
  const { contract, address, getUserCampaignsByAddress, donate, getDonations } =
    useStateContext();

  const fetchCampaigns = async () => {
    const data = await getUserCampaignsByAddress(state.campaign.owner);
    setOwnerCampaigns(data);
  };

  const fetchDonations = async () => {
    try {
      const data = await getDonations(state.campaign.pId);
      setDonators(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDonations();
  }, [contract, address]);

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, []);

  const handleDonate = async () => {
    if (amount === "" || parseInt(amount) > 0) {
      toast.error("Must be more than 0 ETH to donate!", {
        autoClose: 3000,
        draggable: true,
        pauseOnHover: false,
      });
      return;
    }

    setLoading(true);
    try {
      console.log(amount);
      await donate(state.campaign.pId, amount);
      toast.success("Donated Successfully!", {
        autoClose: 3000,
        draggable: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        autoClose: 3000,
        draggable: true,
        pauseOnHover: false,
      });
    }
    navigate('/')
    setLoading(false);
  };

  const remainingDays = daysLeft(state.campaign.deadline);

  return (
    <PageTransition>
      <div>
        {loading && <Loader />}
        <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
          <div className="flex-1 flex-col">
            <img
              src={state.campaign.image}
              alt="campaign"
              className="w-full h-[410px] object-cover rounded-xl"
            />
            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
              <div
                className="absolute h-full bg-[#4acd8d]"
                style={{
                  width: `${calculateBarPercentage(
                    state.campaign.target,
                    state.campaign.amount
                  )}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>
          <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
            <CountBox title="Days Left" value={remainingDays} />
            <CountBox
              title={`Raised of ${state.campaign.target} ETH`}
              value={state.campaign.amountCollected}
            />
            <CountBox
              title="Total Backers"
              value={donators.length.toString()}
            />
          </div>
        </div>
        <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Creator
              </h4>
              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <img
                    src={backdrop}
                    alt="user"
                    className="w-[20px] h-[20px] object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                    {state.campaign.owner}
                  </h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                    {ownerCampaigns.length} Campaigns
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Story
              </h4>
              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  {state.campaign.description}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Donators
              </h4>
              <div className="mt-[20px] flex flex-col gap-4">
                {donators.length > 0 ? (
                  donators.map((donator, index) => (
                    <div
                      key={`${donator.donator}-${index}`}
                      className="flex justify-between items-center gap-4"
                    >
                      <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                        {index + 1}. {donator.donator}
                      </p>
                      <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-all">
                        {donator.donation} ETH
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    No donators yet. Be the first one!
                  </p>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Fund
              </h4>
              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <p className="font-epilogue font-medium text-[20px] leading-[30px] text-[#808191] text-center">
                  Fund the Campaign
                </p>
                <div className="mt-[30px]">
                  <input
                    type="number"
                    placeholder="ETH 0.0"
                    step={0.1}
                    value={amount}
                    min={0}
                    onChange={(event) => setAmount(event.target.value)}
                    className="w-full sm:px-[20px] px-[15px] py-[10px] outline-none border-[1px] border-[#3a3a43] rounded-[10px] bg-transparent text-[#4acd8d] placeholder-[#4acd8d] font-epilogue text-[18px] leading-[30px] hover:bg-[#26262e] transition"
                  />
                  <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                    <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                      Back it because you believe in it.
                    </h4>
                    <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                      Support the project because it speaks to you.
                    </p>
                  </div>
                  <CustomButton
                    btnType="button"
                    title="Fund Campaign"
                    styles="w-full bg-[#8c6dfd] hover:bg-[#bf8bf3] transition"
                    handleClick={handleDonate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CampaignDetails;
