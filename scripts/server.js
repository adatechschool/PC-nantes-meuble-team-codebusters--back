const mongoose = require ('mongoose')
main().catch(error =>console.log(error))
async function main(){
  await mongoose.connect ('mongodb+srv://codebusters:MdpBidon@codebusters.b64gatj.mongodb.net/?retryWrites=true&w=majority')
}

const kittySchema = new mongoose.Schema({
  name: String
});
const Kitten = mongoose.model('Kitten', kittySchema);
const silence = new Kitten({ name: 'Silence' });

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})