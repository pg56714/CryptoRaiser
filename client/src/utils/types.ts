import { SmartContract } from "@thirdweb-dev/sdk";

export interface StateType {
  campaign: FormType;
}

export interface FormType {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

export interface CampaignType {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: Date;
  amountCollected: string;
  image: string;
}

export interface StateContextType {
  address: string;
  contract: SmartContract;
  createCampaign: (form: FormType) => Promise<void>;
  getCampaigns: () => Promise<CampaignType[]>;
  getUserCampaigns: () => Promise<CampaignType[]>;
  getUserCampaignsByAddress: (address: string) => Promise<CampaignType[]>;
  donate: (pId: number, amount: string) => Promise<string[]>;
  getDonations: (pId: number) => Promise<{ donator: any; donation: string }[]>;
}
