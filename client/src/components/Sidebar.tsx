import { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDisconnect } from "@thirdweb-dev/react";
import { navLinks } from "../utils/routes";
import { useStateContext } from "../utils/Context";
import { logo, sun } from "../assets";

interface Props {
  style?: string;
  name?: string;
  imgUrl?: string;
  isActive?: string;
  logout?: boolean;
  lightMode?: boolean;
  setLightMode?: Dispatch<SetStateAction<boolean>>;
  handleClick?: () => void;
}

const Icon = ({
  style,
  name,
  imgUrl,
  isActive,
  logout,
  lightMode = false,
  setLightMode,
  handleClick,
}: Props) => {
  const disconnect = useDisconnect();
  const { address } = useStateContext();

  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center hover:bg-[#3d3e3f] transition cursor-pointer
      ${style}
      ${logout && !address && 'hidden'}
      ${isActive && isActive === name && "bg-[#2c2f32]"}
      `}
      onClick={logout ? disconnect : handleClick}
    >
      {!isActive ? (
        <img
          src={imgUrl}
          style={{ filter: "invert(1)" }}
          alt={"logo"}
          className={`w-1/2 h-1/2`}
          onClick={() => {
            if (lightMode && setLightMode) setLightMode((prev) => !prev);
          }}
        />
      ) : (
        <img
          src={imgUrl}
          style={{ filter: "invert(1)" }}
          alt={"logo"}
          className={`w-1/2 h-1/2 ${isActive !== name && "grayscale"}`}
        />
      )}
    </div>
  );
};

const Sidebar = ({
  setLightMode,
}: {
  setLightMode: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon style="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
      </Link>
      <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navLinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (link.logout) return;
                setIsActive(link.name);
                navigate(link.link);
              }}
            />
          ))}
        </div>
        <Icon
          style="bg-[#1c1c24] shadow-secondary"
          imgUrl={sun}
          lightMode={true}
          setLightMode={setLightMode}
        />
      </div>
    </div>
  );
};

export default Sidebar;
