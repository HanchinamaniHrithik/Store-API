const ProductL = require('../Models/Products')

const getallProductsStatic = async (req, res) => {
    // throw new Error('Testing async errors')


    const Product = await ProductL.find({})
        .sort('name')
        .select('name price')
    // .limit(8) // Trial to check if this works
    // .skip(4)

    res.status(200).json({ msg: Product, nbHits: Product.length })
}
//Will add skip and limit functions once I get the gist

const getallProducts = async (req, res) => {

    const { featured, company, name, sort, selFields, numericFilters } = req.query;
    const queryObj = {};

    if (featured) {
        queryObj.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObj.company = { $regex: company, $options: 'i' };/* You can just use company in place of regex and options,
                                                          there'll be limited options */
    }

    if (name) {
        queryObj.name = { $regex: name, $options: 'i' };//Case sensitive (i)

    }

    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g; //Some Js syntax for converting regular example /user friendly symbols(< <= > >= etc) to mongoose compatible code(gt , gte, lt, lte)
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );

        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-'); /* Since we're adding '-' between fields
                                                                 we'll split the fields at - 
                                                                and assign corresponding (value)
                                                                Work on this Hrithik */
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };  // <------
            }
        });
    }

    //Final result giving back to the user i.e., response
    let result = ProductL.find(queryObj)

    //Selecting which queries to display
    if (selFields) {
        const selectFilter = selFields.split(',').join(' ');
        result = result.select(selectFilter)
    }

    //Sort the order of requested queries
    if (sort) {
        const sortFilter = sort.split(',').join(' ');
        result = result.sort(sortFilter);

        // console.log(sort);
    }
    else {
        result = result.sort(createdAt);
    }

    //Setting up how the calculated results should look on front end.

    const page = Number(req.query.page) || 1; //Requested page number or default being 1
    const limit = Number(req.query.limit) || 10; // Num of objects in that reqd page or default being 10
    const skip = (page - 1) * limit /*Ivaga 2nd page hodre we'll see first N objects skipped 
                                    cause they were in First page which we defined that it has a limit of N objects 
                                    ex: 55 elements, 8 per page
                                    at 1> 1-1)* [8] = 0 first page
                                    at 2> 2-1)*8 = top [08] elements skipped in 2nd page
                                    at 3> 3-1)*8 = top [16] elements skipped in 3rd page
                                    */


    result = result.skip(skip).limit(limit);
    const Product = await result;
    res.status(200).json({ Product, nbHits: Product.length })
}

module.exports = { getallProductsStatic, getallProducts }