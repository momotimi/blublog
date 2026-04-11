import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

let posts = [];
let postToEdit = null;
let clickedPost = null;
let id = 1;

/*init page load route*/
app.get('/', function(req, res){

    const clickedIndex = parseInt(req.query.d);

    /*
    if(clickedIndex !== undefined || clickedIndex !== ''){
        clickedPost = posts[clickedIndex];
    }
    */

    if(!isNaN(clickedIndex) && posts[clickedIndex]){
        clickedPost = posts[clickedIndex];
    }else{
        clickedPost = null;
    }

    res.render('index.ejs', {posts, clickedPost, postToEdit});
});

/* blog post create route */
app.post('/', function(req, res){

    const blogPost = {
        id: id++,
        title: req.body['post-title'],
        content: req.body['post-content']
    };

    posts.push(blogPost);
    //console.log(posts);

    res.redirect('/');
});

/* get edit route */
app.get('/edit/:id', function(req, res){

    const idToEdit = parseInt(req.params.id);
    postToEdit = posts.find(p => p.id === idToEdit);

    res.render('index.ejs', {posts, clickedPost, postToEdit});
});

/* update post route */
app.post('/edit/:id', function(req, res){

    const idToEdit = parseInt(req.params.id);
    postToEdit = posts.find(p => p.id === idToEdit);

    if(postToEdit){
        postToEdit.title = req.body.title;
        postToEdit.content = req.body.content;
    }

    postToEdit = null;

    res.redirect('/');
});


/* post delete route */
app.post('/delete/:id', function(req, res){

    const idToDelete = parseInt(req.params.id);
    //console.log(idToDelete);
    posts = posts.filter(p => p.id !== idToDelete);
    //console.log(posts);

    res.redirect('/');
});


/* REROUTING TO APPROPRIATE PAGES */

app.get('/about.ejs', function(req, res){

    res.render('about.ejs');
});


app.listen(port, function(){
    console.log(`App listening at port ${port}.`);
});