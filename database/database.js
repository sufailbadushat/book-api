const books = [
    {
        ISBN:'999book',
        title:'Success story',
        pubDate:'2021-09-11',
        language:'en',
        numPage:302,
        author:[1,2],
        publications:[1],
        category:['Tech','Space','Motivation']
    }

]

const author = [
    {
        id:1,
        name:'Sufail Badusha',
        books:['999book','123book']
    },
    {
        id:2,
        name:'Elon Musk',
        books:['999book']
    }

]

const publication = [
    {
        id:1,
        name:'writex',
        books:['999book','123book']
    },
    {
        id:2,
        name:'write5',
        books:[]
    }
]



module.exports={books, author, publication};