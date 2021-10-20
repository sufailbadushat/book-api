require("dotenv").config();


const experss=require("express");
const mongoose=require("mongoose");
var bodyParser=require("body-parser");




//DATABASE
var database=require("./database/database")

//model
const BookModel = require("./database/books");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//INITIALIZE express
const booky=experss();


booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

mongoose.connect("mongodb+srv://badusha-t:Badusha786@cluster.pew06.mongodb.net/booky?retryWrites=true&w=majority",
    {
      
    }
).then(() => console.log("Connection Established"));

/*
==================BOOK=================================
Route        /
Description  Get all the books
Access       public
Parameter    NONE
Mehtods      GET
*/
booky.get('/',async (req,res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});


/*
Route        is
Description  Get a specific book on ISBN 
Access       public
Parameter    isbn
Mehtods      GET
*/
booky.get("/is/:isbn",async (req,res) => {

    const getspeificBook = await BookModel.findOne({ISBN: req.params.isbn});
//NULL  !0=1, !1=0
    if(!getspeificBook){
        return res.json({error: "No book found for the ISBN of ${req.params.isbn}" });
    }
    return res.json({book: getspeificBook});
})


/*
Route        cate
Description  Get all the category
Access       public
Parameter    category
Mehtods      GET
*/
booky.get("/cate/:category",async (req,res) =>{
   
    const getspeificBook = await BookModel.findOne({category: req.params.category});
//NULL  !0=1, !1=0
    if(!getspeificBook){
        return res.json({error: 'No book found for the category of ${req.params.category}' });
    }
    return res.json({book: getspeificBook});
})
 

/*  
Route        lan
Description  Get all the language
Access       public
Parameter    language
Mehtods      GET
*/
booky.get("/lan/:language",(req,res) => {
    const getspeificBook = database.books.filter(
        (book) => book.language === req.params.language
    )
    if(getspeificBook.length === 0){
        return res.json({error:'No book found for the language of ${req.params.language}'})
    }

    return res.json({books: getspeificBook})
})



/* 
=================================AUTHOR===============================
Route        author
Description  Get all the author
Access       public
Parameter    NONE
Mehtods      GET
*/


booky.get('/author',async (req,res)=>{
    const getAllAuthor = await AuthorModel.find()
    return res.json(getAllAuthor)
})


/*
Route        /author/id
Description  Get authors based on the id
Access       public
Parameter    id
Mehtods      GET
*/
booky.get('/author/authorid/:id',(req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id == req.params.id
    )
    if(getSpecificAuthor.length === 0){
        return res.json({error:'No author fund for the book of ${req.params.id}'})
    }

    return res.json({author: getSpecificAuthor})
})





/*
Route        /author/book
Description  Get all authors based on the book
Access       public
Parameter    isbn
Mehtods      GET
*/
booky.get("/author/book/:isbn",(req,res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    );

    if(getSpecificAuthor.length === 0){
        return res.json({error:'No author fund for the book of ${req.params.isbn} '});
    }
    return res.json({authors: getSpecificAuthor})
})


/*
===========================publication=============================
Route        /publication
Description  Get all the publications
Access       public
Parameter    none
Mehtods      GET
*/
booky.get('/publication',async (req,res) => {
    const getAllPublication = await PublicationModel.find();
    return res.json(getAllPublication)
})

/*
Route        /publication/id
Description  Get specific publications
Access       public
Parameter    id
Mehtods      GET
*/
booky.get('/publication/id/:id',(req,res) => {
    const getSpecificPublication = database.publication.filter(
        (publications) => publications.id == req.params.id
    )
    if(getSpecificPublication.length === 0){
        return res.json({error:'No book found for the id of ${req.params.id}'})
    }
    return res.json({publication: getSpecificPublication})
})

/*
Route        /publication/book
Description  Get all publicatons based on the book
Access       public
Parameter    isbn
Mehtods      GET
*/
booky.get('/publication/book/:isbn',(req,res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn)
    )
    if(getSpecificPublication.length === 0){
        return res.json({error:'No publication found for the id of ${req.params.isbn}'})
    }
    return res.json({publication: getSpecificPublication})
})


//==================POST=========================
/*
Route        /book/new
Description  Add new book
Access       public
Parameter    NONE
Mehtods      POST
*/
booky.post("/book/new",async (req,res) => {
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json(
        {
            books: addNewBook,
            meassage: "Book was added !!!"
        }
    )


})


/*
Route        /author/new
Description  Add new author
Access       public
Parameter    NONE
Mehtods      POST
*/
booky.post("/author/new",async (req,res) => {
    const { newAuthor } = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
        return res.json(
            {
                author: addNewAuthor,
                meassage: "Author was added !!"
            }
        )

})

/*
Route        /publication/new
Description  Add new publication
Access       public
Parameter    NONE
Mehtods      POST
*/
booky.post("/publication/new",async (req,res) => {
    const { newPublication } = req.body;
    const addNewPublication = PublicationModel.create(newPublication);
    return res.json(
        {
            publication: addNewPublication,
            meassage: "Publication was added !!"
        }
    )

})

//==================UPDATE=================
/*
booky.post("/is/update",(req,res) => {
    var updateBook = database.books.filter(
        (book) => book.ISBN == req.params.isbn
        )
        if(updateBook.length === 0){
            return res.json({eroor:'No book for the id of ${req,params.isbn}'})
        }
        else{
            updateBook = req.body;
            database.books.push(updateBook)
            return res.json(database.books)
        }
})
*/
/* 
Route              /book/new
Description        Add new books
Access             PUBLIC
Parameter          none
Methods            POST
*/
booky.post("/book/", (req,res) => {
    const newBook = req.body;
    for(let i=0; i<database.books.length; i++){
        if(database.books[i].ISBN === newBook.ISBN ){
            return res.json({error: "Book Already Exists"});
        }
    }
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});
});
//===============================PUT============================================================
/* 
Route              /book/update
Description        Update book on isbn
Access             PUBLIC
Parameter          isbn
Methods            PUT
*/
booky.put("/book/update/:isbn", async (req,res) =>{
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.bookTitle
        },
        {
            new: true
        }
    );
    return res.json(
        {
            books:updatedBook
        }
    );
});


//updating new author and book simultaneously
/* 
Route              /book/author/update
Description        Update / add new author
Access             PUBLIC
Parameter          isbn
Methods            PUT
*/
booky.put("/book/author/update/:isbn", async (req,res) => {
    //update book database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            $addToSet: {
                authors: req.body.newAuthor
            }
        },
        {
            new: true
        }
    );
    //update author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id: req.body.newAuthor
        },
        {
            $addToSet: {
                books: req.params.isbn
            }
        },
        {
            new : true
        }
    );
    return res.json(
        {
            books:updatedBook,
            authors: updatedBook,
            message: "New author was added"
        }
    )
});





/* 
Route              /publication/book
Description        Update /add new puclication
Access             PUBLIC
Parameter          isbn
Methods            PUT
*/
booky.put("/publications/update/book/:isbn",(req,res) => {
    //update the publication database
    database.publication.forEach((pub) => {
        if (pub.id === req.body.pubId){
            return pub.books.push(req.params.isbn)
        }
    })
    //udate the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            book.publications = req.body.pubId;
            return;
        }
    })
    return res.json(
        {
            books: database.books,
            publications: database.publication,
            meassage:"Successfully updated publication"
        }
    );

});


//==================DELETE===================================
/* 
Route              /is
Description        delete a book 
Access             PUBLIC
Parameter          isbn
Methods            DELETE
*/
booky.delete("/book/delete/:isbn",async (req,res) => {
    //whichever book that doesn't match with the isbn, just send it to an updatedDatabase array
    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN: req.params.isbn
        }
        
    )
        return res.json(
            {
                books: updatedBookDatabase
            }
        )

})
/* 
Route              /autherid
Description        delete author form book 
Access             PUBLIC
Parameter          id
Methods            DELETE

task chexk it
*/
booky.delete("/author/authorid/:id" ,(req,res) => {
    const updatedBookDatabase = database.author.filter(
        (author) => author.id != req.params.id
    )
    database.books = updatedBookDatabase
    return res.json({Author: database.author})
})

/* 
Route              /autherid
Description        delete author form book 
Access             PUBLIC
Parameter          i
Methods            DELETE
*/
 booky.delete("/book/delete/author/:isbn/:authorid", (req,res) => {
    //uudate book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (eachother) => eachother !== parseInt(req.params.authorid)
            )
            book.author = newAuthorList
            return;
        }
    })
    //update author database
   database.author.forEach((eachAuther) => {
       if(eachAuther.id === parseInt(req.params.authorid)) {
           const newBookList = eachAuther.books.filter(
               (book) => book != req.params.isbn
           )
            eachAuther.books = newBookList
            return;
       }
   })
   return res.json(
       {
           book: database.books,
           author: database.author,
           message: 'Author was deleted!!!!'
       }
   )
})


booky.listen(3000,(req,res)=>{
    console.log('sever 3000 port started');
});









