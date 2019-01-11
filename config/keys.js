if (process.env.NODE_ENV === 'production') {
    module.exports = {
        mongoURL: 'mongodb://sendi:stevK123-=[]@ds253804.mlab.com:53804/deveconnector'
    }
} else {
    module.exports = {
        mongoURL: 'mongodb://localhost:27017/devconnector'
    }
}