const products = [
    {
        id: 1,
        name: "Kinder surprise",
        codeBar: 12335563,
        qte: 10,
        price: 9.99
    }
];

//console.log(products)
 
exports.getAll = (req, res, next) => {
    // return res.status(200).json({msg: 'OK', products})    
    return res.status(200).json({msg: 'OK', products})
}
exports.new = (req, res, next) => {
    // return res.status(200).json({msg: 'OK', products})    
    return res.status(200).json({msg: 'OK', products})
}

exports.update = (req, res, next) => {
    // return res.status(200).json({msg: 'OK', products})    
    return res.status(200).json({msg: 'OK', products})
}

exports.delete = (req, res, next) => {
    // return res.status(200).json({msg: 'OK', products})    
    return res.status(200).json({msg: 'OK', products})
}
