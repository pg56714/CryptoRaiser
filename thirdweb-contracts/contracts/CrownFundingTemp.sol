// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    enum CampaignStatus {
        Ongoing,
        Successful,
        Failed
    }

    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        mapping(address => uint256) donations;
        address[] donators;
        bool finalized;
        CampaignStatus status;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    event CampaignCreated(uint256 campaignId, address owner, string title, uint256 target, uint256 deadline);
    event DonationReceived(uint256 campaignId, address donator, uint256 amount);
    event CampaignFinalized(uint256 campaignId, CampaignStatus status);

    modifier onlyOwner(uint256 _id) {
        require(campaigns[_id].owner == msg.sender, "Only campaign owner can call this function.");
        _;
    }

    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");
        
        Campaign storage campaign = campaigns[numberOfCampaigns];
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.finalized = false;
        campaign.status = CampaignStatus.Ongoing;

        numberOfCampaigns++;
        
        emit CampaignCreated(numberOfCampaigns - 1, _owner, _title, _target, _deadline);
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp < campaign.deadline, "The campaign is already over.");
        require(campaign.status == CampaignStatus.Ongoing, "The campaign is not accepting donations.");
        
        if (campaign.donations[msg.sender] == 0) {
            campaign.donators.push(msg.sender);
        }
        campaign.donations[msg.sender] += msg.value;
        campaign.amountCollected += msg.value;

        emit DonationReceived(_id, msg.sender, msg.value);
    }

    function finalizeCampaign(uint256 _id) public onlyOwner(_id) {
        Campaign storage campaign = campaigns[_id];
        require(block.timestamp >= campaign.deadline, "The campaign is not over yet.");
        require(!campaign.finalized, "The campaign has already been finalized.");

        campaign.finalized = true;

        if (campaign.amountCollected >= campaign.target) {
            payable(campaign.owner).transfer(campaign.amountCollected);
            campaign.status = CampaignStatus.Successful;
        } else {
            for (uint256 i = 0; i < campaign.donators.length; i++) {
                address donator = campaign.donators[i];
                uint256 donation = campaign.donations[donator];
                if (donation > 0) {
                    payable(donator).transfer(donation);
                    campaign.donations[donator] = 0;
                }
            }
            campaign.status = CampaignStatus.Failed;
        }

        emit CampaignFinalized(_id, campaign.status);
    }
}

// The current version still requires the implementation of automatic execution of the campaign finalization and replacing block.
// timestamp with an external time source, both of which need to use Chainlink. 
// These modifications can be made in the future when there is time. 
// For now, the finalization of the campaign can only be executed manually, and a button should be added in the front end.
// However, this is not what I am looking for.