exports.judgePredict = (predict) => {
    if(predict<-0.7){
        return "Big"
    }else if(predict>=-0.7 && predict<-0.2){
        return "Middle"
    }else if(predict>=-0.2 && predict<0.2){
        return "Small"
    }else if(predict>=0.2 && predict<0.5){
        return "Normal"
    }else if(predict>=0.5){
        return "Bad"
    }
}

exports.rand = (max) => Math.floor(Math.random() * Math.floor(max))


// module.exports = judgePredict