db.getCollection("dogs").insertMany([{
    name: "Puszek",
    color: "black", 
    age: 9,
    bestFriends: {
        name: "Burek",
        age: 13
    },
    features: ["kradnie klapki", "szczeka na sąsiadów"]
}, 
{
    name: "Okruszek",
    color: "white",
    age: 16
}])

//db.getCollection("dogs").find({})

//db.getCollection("dogs").find({
////    lower than:
////    age: {$lt: 10}
////    age: {$lt: 20}
////    greater than:
//age: {$gt: 10}
//
//})

db.dogs.insert({
    name: "Fisia",
    age: 1,
    features: ["ciemna jak noc", "pstra"],
    owner: {name: "Agata", age: 26}
})

----------------------------------------------------------



db.getCollection("dogs").find({
//    lower than:
//    age: {$lt: 10}
//    age: {$lt: 20}
//    greater than:
//age: {$gt: 10}
// greater than or equal
//age: {$gte: 16}

//equal
//age: {$eq: 16},

//lower than AND color:
age: {$lt: 20},
color: "black" 
})

db.getCollection("dogs").find({
//    all under 20 and I dont want their names and age, but all around:
age: {$lt: 20}
},{
//    zero is without, 1 is with
age: 0, name: 0})

//zagnieżdżone obiekty po kropce od rodzica (po imieniu ORAZ starsza niż w zagnieżdżonym obiekcie
db.getCollection("dogs").find({
    "owner.name": "Agata",
    "owner.age": {$gt: 20}
})

//if I have many objects, I can limit returned to some I want (here will be 2)
db.getCollection("dogs").find({
    name: "Puszek"
}).limit(2)

//if I want next 3 without first 2, I can skip them
db.getCollection("dogs").find({
    name: "Puszek"
}).skip(2).limit(3)

//In JS code if I want current page I can write it like this
//let currentPage
//let itemsPerPage
//db.getCollection('dogs').find({}).skip(currentPage * itemsPerPage).limit(itemsPerPage)


//I can also sort items by some element incrasing (1) or decresing(-1)
db.getCollection("dogs").find({}).sort({age: 1})

//I can also count:
//db.getCollection("dogs").count() <- it is deprecated, better use some other thing like estimatedDocumentCound or countDocuments
db.getCollection("dogs").countDocuments()

// Now I want only collections what have some item, for example owner. Other (without owner) won't be back
db.getCollection("dogs").find({
    owner: {$exists: true}
})
//or...
db.getCollection("dogs").find({
    owner: {$exists: false}
})

//only those positions which age is exacly number

db.getCollection("dogs").find({
    age: {$type: 'number'}
})

// zawierające literę p (lub ciąg znaków np. Aga w Agata
db.getCollection("dogs").find({
    name: {$regex: 'P'}
})
//or
db.getCollection("dogs").find({ $or:[{ name: {$regex: 'P'}}, {age: {$gt: 10}}]
})
//both
db.getCollection("dogs").find({ $and:[{
    name: {$regex: 'P'}}, {age: {$gt: 10}}]
})


db.getCollection("dogs").deleteOne({name: "coś"})
db.getCollection("dogs").deleteMany({name: "coś"})

//jest jeszzcze update i save
db.getCollection("dogs").save({name: "Buro", age: 3})

db.getCollection("dogs").updateOne({name: "Buro", age: 3})



//tester
db.getCollection("dogs").find({})