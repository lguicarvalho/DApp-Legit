'use strict'

var ipfsClient = require('ipfs-http-client')
//Connceting to the ipfs network via infura gateway
var ipfs = new ipfsClient('ipfs.infura.io', '5001', {protocol: 'https'})

async function uploadFile(file1) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const buffer = Buffer.from(reader.result)
      ipfs.add(buffer)
      .then(files => {
        resolve(files)
      })
      .catch(error => reject(error))
    }
    reader.readAsArrayBuffer(file1)
  })
}

async function onImageChange(event) {
  const file1 = event.target.files[0]
  const files = await uploadFile(file1)
  const multihash1 = files[0].hash
  console.log(multihash1)
  $('#multihash1').val(multihash1);
  $('#ipfshash1').text(multihash1).attr('href','https://ipfs.io/ipfs/' + multihash1);
  $('#ipfsmirror1').text("Mirror 1").attr('href','https://ipfs.infura.io/ipfs/' + multihash1);
  $('#mirroripfs1').text("Mirror 2").attr('href','https://cloudflare-ipfs.com/ipfs/' + multihash1);

}

const file1 = document.querySelector('#file1')

file1.addEventListener('change', onImageChange)
