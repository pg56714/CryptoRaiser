import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useStateContext } from "../utils/Context";
import { CustomButton, FormField, Loader, PageTransition } from "../components";
import { checkIfImage } from "../utils/helperFunc";
import { money } from "../assets";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const { createCampaign } = useStateContext();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    target: "0",
    deadline: "",
    image: "",
  });

  const handleFormFieldChange = (event: any, fieldName: string) => {
    setForm({
      ...form,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    if (
      !form.name ||
      !form.title ||
      !form.description ||
      !form.target ||
      !form.deadline ||
      !form.image
    ) {
      toast.error("Please fill in all fields", {
        autoClose: 3000,
        draggable: true,
        pauseOnHover: false,
      });
      setLoading(false);
      return;
    }

    checkIfImage(form.image, async (exists: boolean) => {
      try {
        
      if (exists) {
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target.toString()).toString(),
        });
        toast.success("Campaign created successfully!", {
          autoClose: 3000,
          draggable: true,
          pauseOnHover: false,
        });
        setLoading(false);
        navigate("/");
      } else {
        toast.error("Please provide a valid image URL", {
          autoClose: 3000,
          draggable: true,
          pauseOnHover: false,
        });
        setForm({ ...form, image: "" });
      }
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong", {
        autoClose: 3000,
        draggable: true,
        pauseOnHover: false,
      });
    }
    });
  };

  return (
    <PageTransition>
      <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
        {loading && <Loader />}
        <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
          <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
            Start a Campaign 🚀
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Your Name *"
              placeholder="John Doe"
              inputType="text"
              value={form.name}
              handleChange={(event) => handleFormFieldChange(event, "name")}
            />
            <FormField
              labelName="Campaign Title *"
              placeholder="Write a title"
              inputType="text"
              value={form.title}
              handleChange={(event) => handleFormFieldChange(event, "title")}
            />
          </div>
          <FormField
            labelName="Story *"
            placeholder="Write your story"
            inputType="text"
            isTextArea={true}
            value={form.description}
            handleChange={(event) =>
              handleFormFieldChange(event, "description")
            }
          />
          <div className="w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]">
            <img
              src={money}
              alt="money"
              className="w-[40px] h-[40px] object-contain"
            />
            <h4 className="font-epilogue font-bold text-[25px] text-white ml-[20px]">
              You will get 100% of the raised amount
            </h4>
          </div>
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Goal *"
              placeholder="ETH 0.50"
              inputType="text"
              value={form.target}
              handleChange={(event) => handleFormFieldChange(event, "target")}
            />
            <FormField
              labelName="End Date *"
              placeholder="End Date"
              inputType="date"
              value={form.deadline}
              handleChange={(event) => handleFormFieldChange(event, "deadline")}
            />
            <FormField
              labelName="Campaign image *"
              placeholder="Place image URL of your campaign"
              inputType="url"
              value={form.image}
              handleChange={(event) => handleFormFieldChange(event, "image")}
            />
          </div>
          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton
              btnType="submit"
              title="Submit new campaign"
              styles="bg-[#1dc071] hover:bg-[#4acd8d] transition"
            />
          </div>
        </form>
      </div>
    </PageTransition>
  );
};

export default CreateCampaign;
