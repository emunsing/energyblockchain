compile;
migrate;

whitelist = [web3.eth.accounts[0],web3.eth.accounts[1],web3.eth.accounts[2]];

var agg; 
Aggregator.deployed().then(function(instance){agg=instance;})

agg.whitelist(0).then(function(addr){agg.waiting(addr).then(function(iswaiting){console.log(iswaiting)})})


addr1 = web3.eth.accounts[0];
addr2 = web3.eth.accounts[1];
addr3 = web3.eth.accounts[2];

agg.whitelistLength.call().then(function(a){console.log(a)})

agg.getAverage.call(1).then(function(a){console.log(a)})

agg.submitValue(6,{from: addr1}).then(function(i){})
agg.submitValue(7,{from: addr2}).then(function(i){})
agg.submitValue(5,{from: addr3}).then(function(i){})

