pragma solidity 0.5.8;

contract CrowdFund {


/* Requirements:
-  Anyone can create a new campaign.
-  Multiple campaigns can be created by single owner.
- Each contributor can fund multiple campaigns. 
- Each campaign status is open or closed
- Campaign owner can withdraw funds only when required funding goal has been achieved (can withdraw before deadline has passed if funding goal is achieved).
- A Campaign is closed when:
            * deadline has passed (not closed when target goal amount is reached as campaign owner can collect more funds than the initial target) or 
            * Campaign owner withdraws funds  
            * Any time by the Campaign Owner for any reason.
- Each contributor can only claim refunds:
            * if deadline has passed and the required funding goal has not been achieved or
            *  if the deadline has not passed and the required funding goal has also not been achieved but the campaign has still been closed by the owner 
*/

    address payable public owner; //owner of contract
    uint256 totalCampaigns;//no. of campaigns

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;
    
    // This is a type for a single Campaign.
    struct Campaign {
        address payable campaignOwner; //wallet address of the campaign owner
        string campaignTitle; //title of the campaign
        string campaignDescription; //campaign description
        string campaignImage; // I added the image here
        string campaignOwnerEmail;// emails of the campaign owner to contact him/her on the progress
        string thankYouMessage; //thanks message to show contributors after contributing to a campaign
        uint256 goalAmount; //in wei
        uint256 totalAmountFunded;//in wei
        uint256 contributorsCount; //records the number of contributors for the campaign
        uint256 deadline; //capmaign deadline in days
        bool goalAchieved; //bool to record the status of a campaign goal whether is has been achieved or not
        bool isCampaignOpen; //bool to record if a campaign is opened or closed
        bool isExists; //campaign exists or not. Campaign once created always exists even if closed

        mapping(address => uint256) contributions;//stores amount donated by each unique contributor

    }
 
    // This declares a state variable campaigns that stores a `Campaign` struct for each unique campaign ID.
    mapping(uint256 => Campaign) campaigns;

    modifier onlyOwner {
        require(msg.sender == owner,"Only owner can call this function.");
        _;
    }

    modifier onlyCampaignOwner(uint256 _campaignID) {
        require(msg.sender == campaigns[_campaignID].campaignOwner,"Only Campaign owner can call this function.");
        _;
    }


    constructor() public  {
        owner = msg.sender;
    }

    
    //Creation of a campaign
    function createCampaign(string memory _campaignTitle, string memory _campaignDescription, uint256 _goalAmount, uint256 _fundingPeriodInDays, string memory _campaignImage, string memory _campaignOwnerEmail, string memory _thankYouMessage) public {

        require(bytes(_campaignTitle).length !=0 && bytes(_campaignDescription).length !=0, 'Campaign Title and description cannot be empty!');
        require(_goalAmount > 0, 'Goal amount must be more than zero ethers!');
        require(_fundingPeriodInDays >=1 && _fundingPeriodInDays <=365, 'Funding Period should be between 1 -365 days');

        ++ totalCampaigns;//id of first campaign is 1 and not 0.

        Campaign memory aCampaign = Campaign(msg.sender,_campaignTitle,_campaignDescription,_campaignImage,_campaignOwnerEmail,_thankYouMessage,_goalAmount,0,0,now + (_fundingPeriodInDays * 1 days),false,true,true);
        campaigns[totalCampaigns] = aCampaign;

    }

    //initiates transfer function
    function transfer(address _to, uint256 _value) public returns (bool success){
        require(balances[msg.sender] >= _value);
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

     //gives approval to the web3 wallet to transfer funds on behalf of the contract
    function approve(address _spender, uint256 _value) public returns (bool succees){
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }


    //Funding of a campaign
    function fundCampaign(uint256 _campaignID) public payable{
        
        require(msg.value>0, 'Contribution should be >0 wei');
        require(campaigns[_campaignID].isExists,'Campaign does not exists');
        require(campaigns[_campaignID].isCampaignOpen, 'Campaign Closed');

        checkCampaignDeadline(_campaignID);

        campaigns[_campaignID].contributions[msg.sender] = msg.value;
        campaigns[_campaignID].totalAmountFunded = campaigns[_campaignID].totalAmountFunded + msg.value;
        campaigns[_campaignID].contributorsCount = ++campaigns[_campaignID].contributorsCount;
          //check if funding goal achieved
          if(campaigns[_campaignID].totalAmountFunded >= campaigns[_campaignID].goalAmount){
                    campaigns[_campaignID].goalAchieved = true; 

          }
    }


    // Withdrawl of funds by Campaign Owner
    function withdrawFunds(uint256 _campaignID, address _cont) public onlyCampaignOwner(_campaignID){
                require(campaigns[_campaignID].isExists,'Campaign does not exists');
                require(campaigns[_campaignID].goalAchieved, 'Cant withdraw. Goal amount not reached');
                Campaign memory _campaign = campaigns[_campaignID];
                //uint256 amount = _campaign.goalAmount;
                allowed[_cont][owner] = _campaign.goalAmount;

                emit Approval(_cont, owner, _campaign.goalAmount);

                transferFrom(owner, _campaign.campaignOwner, _campaign.goalAmount);

                //msg.sender.transfer(campaigns[_campaignID].totalAmountFunded);
                campaigns[_campaignID].isCampaignOpen = false; //Close the campaign
    }
     //function to process the tranfer of fund
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success){
        //require(_value <= balances[_from]);
        //require(_value <= allowed[_from][msg.sender]);
        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] = _value;
        emit Transfer(_from,_to, _value);
    }

    //Reclaim of funds by a contributor
    function claimRefund(uint256 _campaignID, address _cont) public {
            require(campaigns[_campaignID].isExists,'Campaign does not exists');
            require(campaigns[_campaignID].contributions[msg.sender] > 0, 'No contributions');


            checkCampaignDeadline(_campaignID);

            require(!(campaigns[_campaignID].isCampaignOpen) && !(campaigns[_campaignID].goalAchieved),'Reclaim conditions not met' );
            
            //msg.sender.transfer(campaigns[_campaignID].contributions[msg.sender]);
            allowed[_cont][owner] = campaigns[_campaignID].contributions[msg.sender];

                emit Approval(_cont, owner, campaigns[_campaignID].contributions[msg.sender]);

                transferFrom(owner, msg.sender, campaigns[_campaignID].contributions[msg.sender]);
            campaigns[_campaignID].contributions[msg.sender] = 0;

    }


    //Campaign owner can close a campaign anytime
    function closeCampaign(uint256 _campaignID) public onlyCampaignOwner(_campaignID){
            campaigns[_campaignID].isCampaignOpen = false;

    }


    // Contributor can view his/her contribution details for a campaign
    function getContributions(uint256 _campaignID) public view returns(uint256 contribution){
            require(campaigns[_campaignID].isExists,'Campaign does not exists');

           return campaigns[_campaignID].contributions[msg.sender];

    }
    
     //getting the details of a particular campaign using the campaignID
    function getCampaignDetails(uint256 _campaignID) public view returns (
    uint campaignID,
    string memory name,
    string memory description,
    string memory image,
    uint256 goal,
    uint256 totalAmountFunded,
    uint256 deadline,
    address cOwner,
    uint256 contributors,
    string memory thankYouMessage,
    bool isCampaignOpen


    ) {
        require(campaigns[_campaignID].isExists,'Campaign does not exists');
    Campaign memory _campaign = campaigns[_campaignID];
   campaignID = _campaignID;
   name = _campaign.campaignTitle;
   description = _campaign.campaignDescription;
   image = _campaign.campaignImage;
   goal = _campaign.goalAmount;
   totalAmountFunded = _campaign.totalAmountFunded;
   deadline = _campaign.deadline;
   cOwner = _campaign.campaignOwner;
   contributors = _campaign.contributorsCount;
   thankYouMessage = _campaign.thankYouMessage;
   isCampaignOpen = _campaign.isCampaignOpen;
    }

    //function to get the total number of campaigns
    function getTotalCampaigns() public view returns(uint256) {
    return totalCampaigns;
    }

    //To check whether a campaign deadline has passed
    function checkCampaignDeadline(uint256 _campaignID)  internal {
        
        require(campaigns[_campaignID].isExists,'Campaign does not exists');
        
        if (now > campaigns[_campaignID].deadline){
            campaigns[_campaignID].isCampaignOpen = false;//Close the campaign
        }

    }

} // close the contract
