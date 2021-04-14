
var campaigns_d = document.getElementById('campaign-details');
var campaign_id;
        async function loadWeb3() {
            if (window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                window.ethereum.enable();
            }
        }

        async function loadContract() {
            // set ABI
            var abi =   [{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"succees","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"},{"name":"_cont","type":"address"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"},{"name":"_campaignOwnerEmail","type":"string"},{"name":"_thankYouMessage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"},{"name":"_cont","type":"address"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"cOwner","type":"address"},{"name":"contributors","type":"uint256"},{"name":"thankYouMessage","type":"string"},{"name":"isCampaignOpen","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
            //[{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"succees","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"},{"name":"_cont","type":"address"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"},{"name":"_campaignOwnerEmail","type":"string"},{"name":"_thankYouMessage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"},{"name":"_cont","type":"address"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"cOwner","type":"address"},{"name":"contributors","type":"uint256"},{"name":"thankYouMessage","type":"string"},{"name":"isCampaignOpen","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
            //[{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"succees","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"},{"name":"_cont","type":"address"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"},{"name":"_campaignOwnerEmail","type":"string"},{"name":"_thankYouMessage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"},{"name":"_cont","type":"address"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"cOwner","type":"address"},{"name":"contributors","type":"uint256"},{"name":"thankYouMessage","type":"string"},{"name":"isCampaignOpen","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
            //[{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"succees","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"},{"name":"_cont","type":"address"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"},{"name":"_campaignOwnerEmail","type":"string"},{"name":"_thankYouMessage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"},{"name":"_cont","type":"address"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"cOwner","type":"address"},{"name":"contributors","type":"uint256"},{"name":"thankYouMessage","type":"string"},{"name":"isCampaignOpen","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]; 
            //[{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"succees","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"},{"name":"_cont","type":"address"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"},{"name":"_campaignOwnerEmail","type":"string"},{"name":"_thankYouMessage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"},{"name":"_cont","type":"address"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"cOwner","type":"address"},{"name":"contributors","type":"uint256"},{"name":"thankYouMessage","type":"string"},{"name":"isCampaignOpen","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}]; 
            //[{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"succees","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"},{"name":"_cont","type":"address"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"},{"name":"_campaignOwnerEmail","type":"string"},{"name":"_thankYouMessage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"cOwner","type":"address"},{"name":"contributors","type":"uint256"},{"name":"thankYouMessage","type":"string"},{"name":"isCampaignOpen","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
            //[{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"succees","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"},{"name":"_cont","type":"address"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"},{"name":"_campaignOwnerEmail","type":"string"},{"name":"_thankYouMessage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"cOwner","type":"address"},{"name":"contributors","type":"uint256"},{"name":"thankYouMessage","type":"string"},{"name":"isCampaignOpen","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
            //[{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"succees","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"},{"name":"_campaignOwnerEmail","type":"string"},{"name":"_thankYouMessage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"cOwner","type":"address"},{"name":"contributors","type":"uint256"},{"name":"thankYouMessage","type":"string"},{"name":"isCampaignOpen","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];//[{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"},{"name":"_campaignOwnerEmail","type":"string"},{"name":"_thankYouMessage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"cOwner","type":"address"},{"name":"contributors","type":"uint256"},{"name":"thankYouMessage","type":"string"},{"name":"isCampaignOpen","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];//[{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"},{"name":"_campaignOwnerEmail","type":"string"},{"name":"_thankYouMessage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"cOwner","type":"address"},{"name":"contributors","type":"uint256"},{"name":"thankYouMessage","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]; //[{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"},{"name":"_campaignOwnerEmail","type":"string"},{"name":"_thankYouMessage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"cOwner","type":"address"},{"name":"contributors","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]; //[{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"},{"name":"_campaignOwnerEmail","type":"string"},{"name":"_thankYouMessage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"},{"name":"cOwner","type":"address"},{"name":"contributors","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
            //[{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"},{"name":"_campaignImage","type":"string"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"image","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
             //[{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"withdrawFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getTotalCampaigns","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"claimRefund","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"fundCampaign","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignTitle","type":"string"},{"name":"_campaignDescription","type":"string"},{"name":"_goalAmount","type":"uint256"},{"name":"_fundingPeriodInDays","type":"uint256"}],"name":"createCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"closeCampaign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getContributions","outputs":[{"name":"contribution","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_campaignID","type":"uint256"}],"name":"getCampaignDetails","outputs":[{"name":"campaignID","type":"uint256"},{"name":"name","type":"string"},{"name":"description","type":"string"},{"name":"goal","type":"uint256"},{"name":"totalAmountFunded","type":"uint256"},{"name":"deadline","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];

            //set contract address
            var contractAddress =    '0x4B836DF1cEE624E8062E53803Bbb8322dDEeaA1F'; //'0x69cdD9b8108b76482E28e6b82A6aa6fEf10DF538'; //'0x179E5614ba0e8e101c7325dCde23792c41dF79ac';//'0x7DE872F8940Ee2dE1E4e8e0c4f45cEc8a7703C92';//'0xE8fb1dEe72dB3C3E1810e5fCA95c80Fca186B7aD';//'0xFB80d60257f41f176EA68be348A8bC056bA9E743';  //'0xd81364e985Ff2848Ddb835Ba7528602754258071';//'0xfE9724EC2Dc0A27dc4A0C5ADE4aaa5E74A4A38c4'; //'0x0d33fA05f13f40DD8062E7d88af294801eCcfc43'; 

            return await new window.web3.eth.Contract(abi,contractAddress);
        }

        

       
        async function getCampaignDetails(campaignID) {
                    var i = campaignID;
                  //  alert(i);
                  const account = await getCurrentAccount();
                    var result = await window.contract.methods.getCampaignDetails(i).call();
                   
                    const unixTimestamp = result[6];

                    const milliseconds = result[6] * 1000 

                    const dateObject = new Date(milliseconds)

                    const humanDateFormat = dateObject.toLocaleString() 

                    dateObject.toLocaleString("en-US", {weekday: "long"})
                    dateObject.toLocaleString("en-US", {month: "long"}) 
                    dateObject.toLocaleString("en-US", {day: "numeric"}) 
                    dateObject.toLocaleString("en-US", {year: "numeric"}) 
                    dateObject.toLocaleString("en-US", {hour: "numeric"}) 
                    dateObject.toLocaleString("en-US", {minute: "numeric"}) 
                    dateObject.toLocaleString("en-US", {second: "numeric"}) 
                    dateObject.toLocaleString("en-US", {timeZoneName: "short"}) 
                    var mtime = dateObject.toLocaleString("en-US", {timeZoneName: "short"});
                    var closed;

                        var mytime = updateDate(mtime);
                         if (result[10] == false) {
                             closed = '<span class="btn btn-lg btn-danger" role="alert">'+
                                'Campaign is closed.'+
                            '</span>';
                        }else{
                            closed = "";
                        }
  
document.getElementById('loader').style.display ="none";
                    if(result[7] == account && result[10] != false){
                                if (result[5] >= result[4]) {
                                    campaigns_d.innerHTML = campaigns_d.innerHTML+'<div class="col-4">'+
                                '<div class="d-grid justify-content-md-end">'+
                                    '<button type="button" class="btn btn-success" data-toggle="modal" data-toggle="modal" data-target="#withdrawfunds">Withdraw Funds</button>'+
                                '</div>'+
                            '</div>';
                                }
                            }
                    campaigns_d.innerHTML = campaigns_d.innerHTML+ 
                        '<p class="display-6">'+
                            result[1]+ closed +
                        '</p>'+
                       
                        '<div id="unique-banner">'+
                           ' <img src="'+result[3]+'" alt="Display campaign banner" style="width: 90%;">'+
                        '</div>'+
                        '<br>'+
                        
                       ' <p class="lh-2 fs-6 small" id="unique-campaign-desc"> '+
                            result[2]+
                            
                        '</p>'+
                        
                        '<div class="row">'+
                            '<div class="col-4">'+
                                '<div class="card-body card-info py-4" id="expected-goal">'+
                                    '<p class="display-4 text-center my-0 fw-normal">'+
                                        +weiFormatter(result[4])+'ether)'+
                                    '</p>'+
                                    '<p class="text-center">'+
                                        'Expected Target'+
                                   ' </p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-4">'+
                                '<div class="card-body card-info py-4" id="amount-donated">'+
                                    '<p class="display-4 text-center my-0 fw-normal">'
                                        +weiFormatter(result[5])+'ether)'+
                                    '</p>'+
                                    '<p class="text-center">'+
                                        'Amount Raised So Far'+
                                    '</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-4">'+
                               '<div class="card-body card-info py-4" id="number-of-contributors">'+
                                    '<p class="display-4 text-center my-0 fw-normal">'+
                                        result[8]+
                                    '</p>'+
                                    '<p class="text-center">'+
                                        'Number of Contributors'+
                                    '</p>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<br>'+

                                                '<div class="progress my-1">'+
                            '<div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="'+result[5]*100/result[4]+'" aria-valuemin="0" aria-valuemax="100" style="width: '+result[5]*100/result[4]+'%">'+result[5]*100/result[4]+'%</div>'+
                        '</div>'+
                        '<p class="progress-info text-center">'+mytime+' remaining</p>'+
                        '<br>'+
                        '<div class="row">'+
                            '<div class="col-8">'+
                                '<p>'+
                                    'Any amount you can contribute will be very much appreciated. Kindly click on this button to contribute.'+
                                '</p>'+
                            '</div>';
                            if (result[10] == true) {
                                campaigns_d.innerHTML = campaigns_d.innerHTML+'<div class="col-4" style="float: right;">'+
                                '<div class="d-grid justify-content-md-end">'+
                                    '<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModalCenter">Contribute To This Project</button>'+
                                '</div>'+
                            '</div>'+
                            '</div>'+
                        '<br>';
                            }
                        if(result[7] == account){
                            if (result[10] == true) {
                                campaigns_d.innerHTML = campaigns_d.innerHTML+'<div class="col-4">'+
                                '<div class="d-grid justify-content-md-end">'+
                                    '<button type="button" class="btn btn-danger" data-toggle="modal" data-target="#closemycampaign">Close Campaign</button>'+
                                '</div>'+
                            '</div>';
                            }
                        }
                        if (result[10] != true) {
                            campaigns_d.innerHTML = campaigns_d.innerHTML+'<button onclick="claimRefund();" class="btn btn-warning">Claim Refund</button>';
                        }

                    getContribution(campaignID);    
                        
              
           
        }

        async function getResponse(campaignID) {
                    var i = campaignID;
                 
                    var result = await window.contract.methods.getCampaignDetails(i).call();
                  
                    if (result[8] !="") {
                        window.location = "thankyou.html?message="+result[9]+"";
                    }else{
                         location.reload(); 
                    }
              
           
        }


        async function closeCampaign() {
            document.getElementById('closeWarning').style.display ="none";
            document.getElementById('closeButtons').style.display ="none";
            var p = document.getElementById('closeStatus');
            p.innerHTML = p.innerHTML+'Cloisng campaign...';
            const account = await getCurrentAccount();
                  
                    var result = await window.contract.methods.closeCampaign(campaign_id).send({ from: account });
                    
                    if (result !="") {
                        
                    p.innerHTML = p.innerHTML+ '<div class="alert alert-success" role="alert">'+
                                'Campaign was successfuly closed.'+
                            '</div>';
                    }
                    location.reload(); 
              
           
        }

    
       

            function weiFormatter(wei){
                var ether = wei/1000000000000000000;
                return ether;
            }


            function updateDate(datetime) {
    var theevent = new Date(datetime);
    now = new Date();
    var sec_num = (theevent - now) / 1000;
    var days    = Math.floor(sec_num / (3600 * 24));
    var hours   = Math.floor((sec_num - (days * (3600 * 24)))/3600);
    var minutes = Math.floor((sec_num - (days * (3600 * 24)) - (hours * 3600)) / 60);
    var seconds = Math.floor(sec_num - (days * (3600 * 24)) - (hours * 3600) - (minutes * 60));

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    return  days+'days: '+ hours+'hours: '+minutes+' minutes: '+seconds+'seconds';
}

        async function formatDate(unixtimestamp){
                var theDate = new Date(unixtimestamp * 1000);
                    dateString = theDate.toGMTString();
                    //return dateString;
                    alert(dateString );
        }

        async function getCurrentAccount() {
            const accounts = await window.web3.eth.getAccounts();
            return accounts[0];
        }

        async function getContribution(campaignID){
            var i =  campaignID;
            var r = await window.contract.methods.getContributions(i).call();
                    
        }

        


        async function claimRefund(){
                const account = await getCurrentAccount();
            var contractAddress =    '0x4B836DF1cEE624E8062E53803Bbb8322dDEeaA1F';
                    
                    var result = await window.contract.methods.claimRefund(campaign_id, contractAddress).send({ from: account });
                    
                    if (result !="") {
                        
                    }
                    location.reload(); 
                    window.location = "success.html";
        }


        async function withdrawFunds(){
            document.getElementById('withdrawWarning').style.display ="none";
            document.getElementById('withdrawButtons').style.display ="none";
            var w = document.getElementById('withdrawStatus');
            w.innerHTML = w.innerHTML+'Transferring your funds to your wallet';
            const account = await getCurrentAccount();
            var contractAddress =    '0x4B836DF1cEE624E8062E53803Bbb8322dDEeaA1F';
                    
                    var result = await window.contract.methods.withdrawFunds(campaign_id, contractAddress).send({ from: account });;
                    
                    if (result !="") {
                        
                    p.innerHTML = p.innerHTML+ '<div class="alert alert-success" role="alert">'+
                                'Campaign was successfuly closed.'+
                            '</div>';
                    }
                    location.reload(); 
                    window.location = "success.html";
        }

       async function fundCampaign(){
            updateStatus('Funding campaign...');
           document.getElementById('campaign_funding_form').style.display = "none";
           document.getElementById('fundme').style.display ="none";
           const account = await getCurrentAccount();
            const coolNumber = await window.contract.methods.fundCampaign(campaign_id).send({ from: account, gas: 3000000, value: document.getElementById("campaign-fund-amount").value });
            
            await getResponse(campaign_id);
           
        }

        async function load() {
            await loadWeb3();
            window.contract = await loadContract();
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const id = urlParams.get('id');
            campaign_id = id;
            getCampaignDetails(id);
           
            updateStatus('Ready!');
        }

        function updateStatus(status) {
            const statusEl = document.getElementById('status');
            statusEl.innerHTML = status;
            
        }

        load();