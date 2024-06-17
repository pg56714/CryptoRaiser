import { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useConnect,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  safeWallet,
  inAppWallet,
  localWallet,
  rainbowWallet,
  zerionWallet,
  bloctoWallet,
  frameWallet,
  phantomWallet,
  coin98Wallet,
  coreWallet,
  cryptoDefiWallet,
  okxWallet,
  oneKeyWallet,
  rabbyWallet,
  xdefiWallet,
} from "@thirdweb-dev/react";
import { useStateContext } from "../utils/Context";
import { CustomButton } from "./";
import { navLinks } from "../utils/routes";
import { logo, menu, search, backdrop } from "../assets";
import { toast } from "react-toastify";

interface Props {
  setSearchFilter: Dispatch<SetStateAction<string>>;
}

const Navbar = ({ setSearchFilter }: Props) => {
  const navigate = useNavigate();
  const connect = useConnect();

  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [wallet, setWallet] = useState("metamask");

  const { address } = useStateContext();

  const handleWallet = async () => {
    let walletConfig: any;
    switch (wallet) {
      case "metamask":
        walletConfig = metamaskWallet();
        break;
      case "coinbase":
        walletConfig = coinbaseWallet();
        break;
      case "walletConnect":
        walletConfig = walletConnect();
        break;
      case "safe":
        walletConfig = safeWallet();
        break;
      case "inApp":
        walletConfig = inAppWallet();
        break;
      case "local":
        walletConfig = localWallet();
        break;
      case "rainbow":
        walletConfig = rainbowWallet();
        break;
      case "zerion":
        walletConfig = zerionWallet();
        break;
      case "blocto":
        walletConfig = bloctoWallet();
        break;
      case "frame":
        walletConfig = frameWallet();
        break;
      case "phantom":
        walletConfig = phantomWallet();
        break;
      case "coin98":
        walletConfig = coin98Wallet();
        break;
      case "core":
        walletConfig = coreWallet();
        break;
      case "cryptoDefi":
        walletConfig = cryptoDefiWallet();
        break;
      case "okx":
        walletConfig = okxWallet();
        break;
      case "oneKey":
        walletConfig = oneKeyWallet();
        break;
      case "rabby":
        walletConfig = rabbyWallet();
        break;
      case "xdefi":
        walletConfig = xdefiWallet();
        break;
      default:
        break;
    }

    if (walletConfig) {
      try {
        await connect(walletConfig);
        toast.success(`Successfully connected to ${wallet} wallet!`, {
          autoClose: 3000,
          draggable: true,
          pauseOnHover: false,
        });
      } catch (err) {
        toast.error(`${wallet} connection failed!`, {
          autoClose: 3000,
          draggable: true,
          pauseOnHover: false,
        });
      }
    }
  };

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px] hover:bg-[#26262e] transition">
        <input
          type="text"
          onChange={(event) => {
            setSearchFilter(event.target.value);
          }}
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text=[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer hover:bg-[#62e8a8] transition">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] object-contain"
          />
        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        {!address && (
          <select
            value={wallet}
            onChange={(event) => setWallet(event.target.value)}
            className="bg-transparent outline-none text-white cursor-pointer rounded-lg hover:bg-[#59595a] transition"
          >
            <option className="bg-[#26262e]" value="metamask">
              Metamask
            </option>
            <option className="bg-[#26262e]" value="coinbase">
              Coinbase
            </option>
            <option className="bg-[#26262e]" value="walletConnect">
              WalletConnect
            </option>
            <option className="bg-[#26262e]" value="smart">
              Smart Account
            </option>
            <option className="bg-[#26262e]" value="safe">
              Safe
            </option>
            <option className="bg-[#26262e]" value="inApp">
              In-App Wallet
            </option>
            <option className="bg-[#26262e]" value="local">
              Local Wallet
            </option>
            <option className="bg-[#26262e]" value="rainbow">
              Rainbow
            </option>
            <option className="bg-[#26262e]" value="zerion">
              Zerion
            </option>
            <option className="bg-[#26262e]" value="blocto">
              Blocto
            </option>
            <option className="bg-[#26262e]" value="frame">
              Frame
            </option>
            <option className="bg-[#26262e]" value="phantom">
              Phantom
            </option>
            <option className="bg-[#26262e]" value="coin98">
              Coin98
            </option>
            <option className="bg-[#26262e]" value="core">
              Core Wallet
            </option>
            <option className="bg-[#26262e]" value="cryptoDefi">
              CryptoDefi
            </option>
            <option className="bg-[#26262e]" value="okx">
              OKX Wallet
            </option>
            <option className="bg-[#26262e]" value="oneKey">
              OneKey Wallet
            </option>
            <option className="bg-[#26262e]" value="rabby">
              Rabby Wallet
            </option>
            <option className="bg-[#26262e]" value="xdefi">
              Xdefi Wallet
            </option>
          </select>
        )}
        <CustomButton
          btnType={"button"}
          title={address ? "Create a campaign" : "Connect"}
          styles={
            address
              ? "bg-[#1dc071] hover:bg-[#4acd8d] transition"
              : "bg-[#8c6dfd] hover:bg-[#bf8bf3] transition"
          }
          handleClick={async () => {
            if (address) navigate("create-campaign");
            else handleWallet();
          }}
        />
        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer hover:bg-[#59595a] transition">
            <img
              src={backdrop}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer hover:bg-[#59595a] transition">
          <img
            src={logo}
            alt="user"
            style={{ filter: "invert(1)" }}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />
        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] shadow-secondary py-4 transition-all duration-700 rounded-md p-2 ${
            !toggleDrawer ? "-translate-y-[100vh]" : "translate-y-0"
          }`}
        >
          <ul className="mb-4">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 rounded-sm ${
                  isActive === link.name && "bg-[#3a3a43]"
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt="link-name"
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? "grayscale-0" : "grayscale"
                  } `}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[$1dc071]" : "text-[#8e8091]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4 justify-between">
            {!address && (
              <select
                value={wallet}
                onChange={(event) => setWallet(event.target.value)}
                className="bg-transparent outline-none text-white cursor-pointer rounded-lg hover:bg-[#59595a] transition"
              >
                <option className="bg-[#26262e]" value="metamask">
                  Metamask
                </option>
                <option className="bg-[#26262e]" value="coinbase">
                  Coinbase
                </option>
                <option className="bg-[#26262e]" value="walletConnect">
                  WalletConnect
                </option>
                <option className="bg-[#26262e]" value="smart">
                  Smart Account
                </option>
                <option className="bg-[#26262e]" value="safe">
                  Safe
                </option>
                <option className="bg-[#26262e]" value="inApp">
                  In-App Wallet
                </option>
                <option className="bg-[#26262e]" value="local">
                  Local Wallet
                </option>
                <option className="bg-[#26262e]" value="rainbow">
                  Rainbow
                </option>
                <option className="bg-[#26262e]" value="zerion">
                  Zerion
                </option>
                <option className="bg-[#26262e]" value="blocto">
                  Blocto
                </option>
                <option className="bg-[#26262e]" value="frame">
                  Frame
                </option>
                <option className="bg-[#26262e]" value="phantom">
                  Phantom
                </option>
                <option className="bg-[#26262e]" value="coin98">
                  Coin98
                </option>
                <option className="bg-[#26262e]" value="core">
                  Core Wallet
                </option>
                <option className="bg-[#26262e]" value="cryptoDefi">
                  CryptoDefi
                </option>
                <option className="bg-[#26262e]" value="okx">
                  OKX Wallet
                </option>
                <option className="bg-[#26262e]" value="oneKey">
                  OneKey Wallet
                </option>
                <option className="bg-[#26262e]" value="rabby">
                  Rabby Wallet
                </option>
                <option className="bg-[#26262e]" value="xdefi">
                  Xdefi Wallet
                </option>
              </select>
            )}
            <CustomButton
              btnType={"button"}
              title={address ? "Create a campaign" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={async () => {
                if (address) navigate("create-campaign");
                else handleWallet();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
