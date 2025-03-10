import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Array to store all blog posts.

const blogPosts = [];

// Rendering the home page with all blog posts.

app.get('/', (req, res) => {
res.render("index.ejs", 
  {
    allBlogs: blogPosts,
  });
});

// Rendering the submit page with the title and content of the post that was submitted.

app.post('/submit', (req, res) => {
  blogPosts.push({ title: req.body.blogTitle, content: req.body.blogContent });
  res.redirect('/');
});

// Rendering the post page with the title and content of the post that matches the id in the URL.

app.get("/post/:id", (req, res) => {
  const id = req.params.id;
  const post = blogPosts[id];
  if (post) {
    res.render("post.ejs", {
      id: id,
      title: post.title,
      content: post.content,
    });
  } else {
    res.send("Post not found");
  }
});

// Rendering the edit page with the title and content of the post that matches the id in the URL.

app.get("/edit/:id", (req, res) => {
  const id = req.params.id;
  const post = blogPosts[id];
  if (post) {
    res.render("edit.ejs", { id: id, title: post.title, content: post.content });
  } else {
    res.send("Post not found");
  }
});

// A route to handle the form submission and update the post.

app.post("/edit/:id", (req, res) => {
  const id = req.params.id;
  blogPosts[id] = {
    title: req.body.blogTitle,
    content: req.body.blogContent,
  };
  res.redirect(`/post/${id}`);
});

// A route to handle the deletion of a post.

app.post("/delete/:id", (req, res) => {
  const id = req.params.id;
  blogPosts.splice(id, 1);
  res.redirect("/");
}
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);