const mongoose = require('mongoose')
const connectParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
async function main(){
    var data = await mongoose.connect(process.env.DB_STRING)
    return data
}

main().then(() => console.log("successfully connected mongo db")).catch(err => console.log(err))

module.exports = mongoose
