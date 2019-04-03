App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,

  init: function() {

    return App.initWeb3();
  },

  initWeb3: function() {
    //initialize web3
    if(typeof web3 !== 'undefined') {
      //reuse the provider of the Web3 object injected by Metamask
      App.web3Provider = web3.currentProvider;
  } else {
    //create a new provider and plug it directly into our local node
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  }
  web3 = new Web3(App.web3Provider);

  App.displayAccountInfo();


    return App.initContract();
  },

  displayAccountInfo: function() {
    web3.eth.getCoinbase(function(err, account) {
     if(err === null) {
       App.account = account;
       $('#account').text(account);
       web3.eth.getBalance(account, function(err, balance) {
         if(err === null) {
           $('#accountBalance').text(web3.fromWei(balance,"ether") + " ETH");
         }
       })
      }
    });
  },

  initContract: function() {
    $.getJSON('Inbox.json', function(inboxArtifact){
      // get the contract artifact file and use it to instantiate a truffle contract abstraction
      App.contracts.Inbox = TruffleContract(inboxArtifact);
      //set the provider for our contracts
      App.contracts.Inbox.setProvider(App.web3Provider);
      // listen to listen
      App.listenToEvents();
      // retrieve the article from the contract
      return App.reloadHashs();
    });
  },
  reloadHashs: function() {
    // refresh account information because the balance might have changed
    App.displayAccountInfo();

    // retrieve the article placeholder and clear it
    $('#hashsRow').empty();

    App.contracts.Inbox.deployed().then(function(instance) {
      return instance.getMessage();
    }).then(function(hash) {
      if(hash[0] == 0x0) {
        // no hash
        return;
      }

      // retrieve the hash template and fill it
      var hashTemplate = $('#hashTemplate');
      hashTemplate.find('.PDF1').text(hash[1]);
      hashTemplate.find('.RDF1').text(hash[2]);
      hashTemplate.find('.PDF2').text(hash[3]);
      hashTemplate.find('.RDF2').text(hash[4]);


      var publisher = hash[0];
      if (publisher == App.account) {
        publisher = "Você";
      }
      hashTemplate.find('.hash-publisher').text(publisher);

          //add this hash
      $('#hashsRow').append(hashTemplate.html());


    })

    .catch(function(err){
      console.error(err.message);
    });
  },

  storeHash: function() {
    // retrieve the detail of the hash
    var _PDF1 = $('#hash1').val();
    var _RDF1 = $('#hash2').val();
    var _PDF2 = $('#hash3').val();
    var _RDF2 = $('#hash4').val();


    App.contracts.Inbox.deployed().then(function(instance){
      return instance.storeHash(_PDF1, _RDF1, _PDF2, _RDF2, {
        from: App.account,
        gas: 500000
      });
    }).then(function(result) {
      $('#transactionHash').text(result.tx);
      //alert("Hash da transação: " + $("#transactionHash").text());

      }).catch(function(err){
      console.error(err);
    });
  },

//listen to events triggeres by the contract
listenToEvents: function() {
App.contracts.Inbox.deployed().then(function(instance) {
  instance.LogStoreHash({}, {}).watch(function(error, event) {
    if (!error) {
      console.log(event);
      $('#events').text(event.transactionHash);

      localStorage.content = $('#events').text();
      //$('#events').html(localStorage.content);

      console.log(localStorage);

      //$("#events").append('<li class="list-group-item"> Um novo documento foi registrado!</li>');
    } else {
      console.error(error);
    }
    App.reloadHashs();
  })
});
},
};

$(function() {
  $(window).load(function() {
    $('#events').text(localStorage.content);
    App.init();
  });
});
