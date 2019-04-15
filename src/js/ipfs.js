'use strict'

var ipfsClient = require('ipfs-http-client')
//Connceting to the ipfs network via infura gateway
var ipfs = new ipfsClient('ipfs.infura.io', '5001', {protocol: 'https'})

async function uploadFile(file) {
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
    reader.readAsArrayBuffer(file)
  })
}

async function onImageChange(event) {
  const file = event.target.files[0]
  const files = await uploadFile(file)
  const multihash = files[0].hash
  console.log(multihash)
  $('#ipfshash').html(multihash).attr('href','https://ipfs.io/ipfs/' + multihash);

}

const file = document.querySelector('#file')

file.addEventListener('change', onImageChange)
