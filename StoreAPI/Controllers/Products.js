const getallProductsStatic = async (req,res) =>{
    res.status(200).json({msg:`Testing the products route now`})
}

const getallProducts= async (req,res) =>{
    res.status(200).json({msg:`Products route here`})
}

module.exports={getallProductsStatic, getallProducts}