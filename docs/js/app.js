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
       $('#Templatejs').html('<div class="col-md-12"><div class="row"><div class="panel panel-default panel-hash"><div class="panel-heading"><strong>Hash da transação</strong>: <a id="events" target="_blank"></a><br/></div><div class="panel-body"><div id="hashTemplate"><label>PDF</label><div class="form-control" style="height:70px"><strong>SHA256</strong>: <span class="PDF1"></span><br/><strong>IPFS</strong>: <a  class="PDF2" target="_blank"></a><br/><a  class="mirrorPDF2" target="_blank"></a>&nbsp;&nbsp;<a  class="PDF2mirror" target="_blank"></a><br/></div><p>&nbsp;</p><label>RDF</label><div class="form-control" style="height:70px"><strong>SHA256</strong>: <span class="RDF1"></span><br/><strong>IPFS</strong>: <a  class="RDF2" target="_blank"></a><br/><a  class="mirrorRDF2" target="_blank"></a>&nbsp;&nbsp;<a  class="RDF2mirror" target="_blank"></a><br/></div><p>&nbsp;</p><strong>Publicado por</strong>: <span class="hash-publisher"></span><br/></div></div></div></div></div>')
        $('#Publishjs').html('<div><button class="btn button6 btn-lg pull-left" data-toggle="modal" data-target="#storeHash"><i class="fa fa-ethereum"></i> Publicar Hashs</button></div>')
              App.account = account;
       web3.version.getNetwork((err, netId) => {
     switch (netId) {
       case "1":
       console.log('This is mainnet')
       $('#network').html('<a type="button" class="btn button7 pull-right"><i class="fa fa-signal"> </i> <span>Rede Principal do Ethereum</span></a>')
       $('#account').text(account).attr('href','https://etherscan.io/address/' + account)
       $('#allT').html('<button class="btn button6 btn-lg pull-left" data-toggle="modal" data-target="#allTransactions"><i class="fa fa-ethereum"></i> Exibir todas as transações</button>')
         break
       case "42":
       console.log('This is the Kovan test network.')
       $('#network').html('<a type="button" class="btn button9 pull-right"><i class="fa fa-signal"> </i> <span>Kovan</span></a>')
       $('#account').text(account).attr('href','https://kovan.etherscan.io/address/' + account)
       $('#allT').html('<button class="btn button6 btn-lg pull-left" data-toggle="modal" data-target="#allTransactions"><i class="fa fa-ethereum"></i> Exibir todas as transações</button>')
         break

       case "3":
       console.log('This is the ropsten test network.')
       $('#network').html('<a type="button" class="btn button8 pull-right"><i class="fa fa-signal"> </i> <span>Ropsten</span></a>')
       document.getElementById("account").innerHTML +=
       "<p class=form-control pull-left tooltip2 style=width:390px>" +
       "<a target=_blank class=welcome href=https://ropsten.etherscan.io/address/" + account + ">" + account + "</a>"
       + "</p>"
         $('#allT').html('<button class="btn button6 btn-lg pull-left" data-toggle="modal" data-target="#allTransactions"><i class="fa fa-ethereum"></i> Exibir todas as transações</button>')
         break

         case "4":
         console.log('This is the rinkeby test network.')
         $('#network').html('<a type="button" class="btn button10 pull-right"><i class="fa fa-signal"> </i> <span>Rinkeby</span></a>')
         document.getElementById("account").innerHTML +=
         "<p class=form-control pull-left tooltip2 style=width:390px>" +
         "<a target=_blank class=welcome href=https://rinkeby.etherscan.io/address/" + account + ">" + account + "</a>"
         + "</p>"
         $('#allT').html('<button class="btn button6 btn-lg pull-left" data-toggle="modal" data-target="#allTransactions"><i class="fa fa-ethereum"></i> Exibir todas as transações</button>')

           break

           case "5":
           console.log('This is the Goerli test network.')
           $('#network').html('<a type="button" class="btn button11 pull-right"><i class="fa fa-signal"> </i> <span>Goerli</span></a>')
           $('#account').text(account).attr('href','https://goerli.etherscan.io/address/' + account)
           $('#allT').html('<button class="btn button6 btn-lg pull-left" data-toggle="modal" data-target="#allTransactions"><i class="fa fa-ethereum"></i> Exibir todas as transações</button>')
             break
       default:
       console.log('This is an unknown network.')
       $('#network').html('<a type="button" class="btn button6 pull-right"><i class="fa fa-ban"> </i> <span>Desconectado</span></a>')
     }
   })

       //$('#account').text(account);
       web3.eth.getBalance(account, function(err, balance) {
         if(err === null) {
           document.getElementById("accountBalance").innerHTML +=
           "<p class=form-control pull-left tooltip2 style=width:200px>" + web3.fromWei(balance,"ether") + " ETH"
           + "</p>"
           //$('#accountBalance').text(web3.fromWei(balance,"ether") + " ETH");
         }
       })
      }
      $('#network').html('<a type="button" class="btn button6 pull-right"><i class="fa fa-ban"> </i> <span>Desconectado</span></a>')
      });
  },

  initContract: function() {
    $.getJSON('Inbox.json', function(inboxArtifact){
      // get the contract artifact file and use it to instantiate a truffle contract abstraction
      App.contracts.Inbox = TruffleContract(inboxArtifact);
      //set the provider for our contracts
      App.contracts.Inbox.setProvider(App.web3Provider);


  App.contracts.Inbox.deployed().then(function(instance) {
  web3.version.getNetwork((err, netId) => {
switch (netId) {
  case "1":

     break
  case "42":

     break
  case "3":
  document.getElementById("contract").innerHTML +=
  "<p class=form-control pull-right tooltip1 style=width:390px>" +
  "<a target=_blank href=https://ropsten.etherscan.io/address/" + instance.contract.address + ">" + instance.contract.address + "</a>"
  + "</p>"
    //$('#contract').html(instance.contract.address).attr('href','https://ropsten.etherscan.io/address/' + instance.contract.address)
     break
    case "4":
    document.getElementById("contract").innerHTML +=
    "<p class=form-control pull-right tooltip1 style=width:390px>" +
    "<a target=_blank href=https://rinkeby.etherscan.io/address/" + instance.contract.address + ">" + instance.contract.address + "</a>"
    + "</p>"
    //$('#contract').html(instance.contract.address).attr('href','https://rinkeby.etherscan.io/address/' + instance.contract.address)
     break
      case "5":

     break
  default:

}
})
  console.log(instance.contract.address);
})
      // listen to listen
      App.listenToEvents();
      // retrieve the article from the contract
      return App.reloadHashs();
    });
  },


  reloadHashs: function() {
    // refresh account information because the balance might have changed
    //App.displayAccountInfo();

    // retrieve the article placeholder and clear it

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
      hashTemplate.find('.PDF2').text(hash[3]).attr('href','https://ipfs.io/ipfs/' + hash[3]);
      hashTemplate.find('.mirrorPDF2').text("Mirror 1").attr('href','https://ipfs.infura.io/ipfs/' + hash[3]);
      hashTemplate.find('.PDF2mirror').text("Mirror 2").attr('href','https://cloudflare-ipfs.com/ipfs/' + hash[3]);

      hashTemplate.find('.RDF2').text(hash[4]).attr('href','https://ipfs.io/ipfs/' + hash[4]);
      hashTemplate.find('.mirrorRDF2').text("Mirror 1").attr('href','https://ipfs.infura.io/ipfs/' + hash[4]);
      hashTemplate.find('.RDF2mirror').text("Mirror 2").attr('href','https://cloudflare-ipfs.com/ipfs/' + hash[4]);


      var publisher = hash[0];
      if (publisher == App.account) {
        publisher = "Você";
      }
      hashTemplate.find('.hash-publisher').text(publisher);

      //add this hash
      //$('#hashsRow').append(hashTemplate.html());


    })

    .catch(function(err){
      console.error(err.message);
    });
  },

  storeHash: function() {
    // retrieve the detail of the hash
    var _PDF1 = $('#hashstring').text();
    var _RDF1 = $('#hashhstring').text();
    var _PDF2 = $('#multihash').val();
    var _RDF2 = $('#multihash1').val();


    App.contracts.Inbox.deployed().then(function(instance){
      return instance.storeHash(_PDF1, _RDF1, _PDF2, _RDF2, {
        from: App.account,
        gas: 500000
      });
    }).then(function(result) {
      console.log(result);
      //$('#transactionHash').text(result.tx);
      //alert("Hash da transação: " + $("#transactionHash").text());

      }).catch(function(err){
      console.error(err);
    });
  },

//listen to events triggeres by the contract
listenToEvents: function() {
App.contracts.Inbox.deployed().then(function(instance) {
     var x = new Array();
  instance.LogStoreHash({}, {fromBlock: 0, toBlock: 'latest'}).watch(function(error, event) {
     if (!error) {
       console.log(event);

       web3.version.getNetwork((err, netId) => {
     switch (netId) {
       case "1":

         break
       case "42":

         break
       case "3":

       $('#events').html(event.transactionHash).attr('href','https://ropsten.etherscan.io/tx/' + event.transactionHash);
         break
         case "4":

         $('#events').html(event.transactionHash).attr('href','https://rinkeby.etherscan.io/tx/' + event.transactionHash);

           break
           case "5":

             break
       default:

     }
   })


     } else {
       console.error(error);
     }
     App.reloadHashs();

   }).get(function(error, event) {
     if (!error) {
        console.log(event);
        var x = event;
        x.forEach(myFunction);

        function myFunction(item, index) {
          web3.version.getNetwork((err, netId) => {
        switch (netId) {
          case "1":

            break
          case "42":

            break
          case "3":
          document.getElementById("demo").innerHTML +=
          "<li>" +
          "<p>" + "<b>Transação " + index + "</b>" + "<br>" + "<br>" +
          "<b>Publicado por:</b> " + item.args._publisher + "<br>" + "<br>" +

          "<b>PDF</b> " + "<br>" +
          "<b>SHA256: </b> " + item.args.hash1 + "<br>" +
          "<b>IPFS: </b> " + "<a target=_blank href=https://ipfs.io/ipfs/" + item.args.hash3 + ">" + item.args.hash3 + "</a>" + "<br>" +
          "<a target=_blank href=https://ipfs.infura.io/ipfs/" + item.args.hash3 + ">" + "Mirror 1  " + "</a>" +
          "<a target=_blank href=https://cloudflare-ipfs.com/ipfs/" + item.args.hash3 + ">" + "Mirror 2  " + "</a>" + "<br>" + "<br>" +

          "<b>RDF</b> " + "<br>" +
          "<b>SHA256: </b> " + item.args.hash2 + "<br>" +
          "<b>IPFS: </b> " + "<a target=_blank href=https://ipfs.io/ipfs/" + item.args.hash4 + ">" + item.args.hash4 + "</a>" + "<br>" +
          "<a target=_blank href=https://ipfs.infura.io/ipfs/" + item.args.hash4 + ">" + "Mirror 1  " + "</a>" +
          "<a target=_blank href=https://cloudflare-ipfs.com/ipfs/" + item.args.hash4 + ">" + "Mirror 2  " + "</a>" + "<br>" + "<br>" +

          "<b>Hash da Transação </b> " + "<a target=_blank href=https://ropsten.etherscan.io/tx/" + item.transactionHash + ">" + item.transactionHash + "</a>" + "</p>" + "<br>" + "<br>" +
          "</li>" ;


            break
            case "4":
            document.getElementById("demo").innerHTML +=
            "<li>" +
            "<p>" + "<b>Transação " + index + "</b>" + "<br>" + "<br>" +
            "<b>Publicado por:</b> " + item.args._publisher + "<br>" + "<br>" +

            "<b>PDF</b> " + "<br>" +
            "<b>SHA256: </b> " + item.args.hash1 + "<br>" +
            "<b>IPFS: </b> " + "<a target=_blank href=https://ipfs.io/ipfs/" + item.args.hash3 + ">" + item.args.hash3 + "</a>" + "<br>" +
            "<a target=_blank href=https://ipfs.infura.io/ipfs/" + item.args.hash3 + ">" + "Mirror 1  " + "</a>" +
            "<a target=_blank href=https://cloudflare-ipfs.com/ipfs/" + item.args.hash3 + ">" + "Mirror 2  " + "</a>" + "<br>" + "<br>" +

            "<b>RDF</b> " + "<br>" +
            "<b>SHA256: </b> " + item.args.hash2 + "<br>" +
            "<b>IPFS: </b> " + "<a target=_blank href=https://ipfs.io/ipfs/" + item.args.hash4 + ">" + item.args.hash4 + "</a>" + "<br>" +
            "<a target=_blank href=https://ipfs.infura.io/ipfs/" + item.args.hash4 + ">" + "Mirror 1  " + "</a>" +
            "<a target=_blank href=https://cloudflare-ipfs.com/ipfs/" + item.args.hash4 + ">" + "Mirror 2  " + "</a>" + "<br>" + "<br>" +

            "<b>Hash da Transação </b> " + "<a target=_blank href=https://rinkeby.etherscan.io/tx/" + item.transactionHash + ">" + item.transactionHash + "</a>" + "</p>" + "<br>" + "<br>" +
            "</li>";
              break
              case "5":

                break
          default:

        }
      })



 }


      } else {
        console.error(error);
      }
    })
    //setTimeout (function() {
    //instance.LogStoreHash({}, {fromBlock: 0, toBlock: 'latest'}).stopWatching();
//  }, 60000)

  });
},

};


$(function() {
  $(window).load(function() {
  App.init();
  });
});
