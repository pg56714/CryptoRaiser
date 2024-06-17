import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ToastContainer } from "react-toastify";
import { StateContextProvider } from "./utils/Context.tsx";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const Chain = {
  // use for real ethereum transaction
  // chainId: 1,
  // rpc: [`https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_SECRET_KEY}`],
  chainId: 11155111,
  rpc: [
    `https://sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_SECRET_KEY}`,
  ],

  nativeCurrency: {
    decimals: 18,
    name: "Sepolia test network",
    symbol: "SepoliaETH",
  },
  shortName: "SepoliaETH",
  slug: "SepoliaETH",
  testnet: true,
  chain: "SepoliaETH",
  name: "Sepolia test network",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThirdwebProvider
      activeChain={Chain}
      clientId={import.meta.env.VITE_THIRD_WEB_CLIENT_ID}
    >
      <StateContextProvider>
        <App />
      </StateContextProvider>
    </ThirdwebProvider>
    <ToastContainer />
  </BrowserRouter>
);
