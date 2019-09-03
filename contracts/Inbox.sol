pragma solidity >=0.4.16 <0.6.0;

contract Inbox {

    address publisher;
    string PDF1;
    string RDF1;
    string PDF2;
    string RDF2;


    event LogStoreHash(
      address indexed _publisher,
      string hash1,
      string hash2,
      string hash3,
      string hash4);

    function storeHash
    (string memory hash1,
     string memory hash2,
     string memory hash3,
     string memory hash4)
     public {
        publisher = msg.sender;
        PDF1 = hash1;
        RDF1 = hash2;
        PDF2 = hash3;
        RDF2 = hash4;

        emit LogStoreHash(publisher, hash1, hash2, hash3, hash4);
    }

    function getMessage() public view returns
    (address _publisher,
     string memory hash_do_PDF,
     string memory hash_do_RDF,
     string memory PDF_no_IPFS,
     string memory RDF_no_IPFS)
     {
        return (publisher, PDF1, RDF1, PDF2, RDF2);
    }

}
