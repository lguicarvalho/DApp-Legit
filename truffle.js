require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = process.env["NEMONIC"];
var tokenKey = process.env["ENDPOINT_KEY"];

module.exports = {
     // See <http://truffleframework.com/docs/advanced/configuration>
     // to customize your Truffle configuration!
     networks: {
       rinkeby:{
   host: "localhost",
   provider: function() {
     return new HDWalletProvider( mnemonic, "https://rinkeby.infura.io/v3/" + tokenKey);
   },
   network_id:4
   , gas : 6700000
   , gasPrice : 10000000000
 }
     }
};
