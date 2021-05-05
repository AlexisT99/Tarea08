var mongoose = require("mongoose");
var schema = require("./blogs-schema");

mongoose.connect("mongodb://localhost:27017/tarea08");

var Blog = mongoose.model("Blog", schema, "blog");

const blog1 = new Blog({
  title: "Mi blog",
  author: "Alexis Torres",
  body:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus blandit metus vel placerat. Nulla dictum tristique pulvinar. Nam in faucibus massa. Aenean suscipit eros massa. Nullam ante mauris, laoreet tristique est sit amet, efficitur sodales ante. Aenean blandit ligula ac dui eleifend, ut gravida ante sodales. Aenean turpis arcu, tempor ac turpis eget, faucibus efficitur ante.",
  comments: [
    {
      body: "Hola mi comentarios",
      date: "2021/02/20",
    },
    {
      body: "Hola mi comentarios 2",
      date: "2021/02/21",
    },
  ],
  meta: {
    votes: 4,
    favs: 3,
  },
});

const blog2 = new Blog({
  title: "Mi blog 2",
  author: "Javier Torres",
  body:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus blandit metus vel placerat. Nulla dictum tristique pulvinar. Nam in faucibus massa. Aenean suscipit eros massa. Nullam ante mauris, laoreet tristique est sit amet, efficitur sodales ante. Aenean blandit ligula ac dui eleifend, ut gravida ante sodales. Aenean turpis arcu, tempor ac turpis eget, faucibus efficitur ante.",
  comments: [
    {
      body: "Hola mi comentarios",
      date: "2021/02/20",
    },
    {
      body: "Hola mi comentarios 2",
      date: "2021/02/21",
    },
  ],
  meta: {
    votes: 4,
    favs: 3,
  },
});

main();

async function encontrar(titulo) {
  return new Promise((resolve, reject) => {
    Blog.find({ title: titulo }, function (error, docs) {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      console.log("---------Encontrar--------");
      console.log(docs);
      resolve();
    });
  });
}

async function borrar(id_Blog) {
  return new Promise((resolve, reject) => {
    Blog.findByIdAndRemove({ _id: id_Blog }, function (error, docs) {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      console.log("---------Borrar--------");
      console.log(docs);
      resolve();
    });
  });
}

async function verTodo() {
  return new Promise((resolve, reject) => {
    Blog.find({}, function (error, docs) {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      console.log("---------Ver Todo--------");
      console.log(docs);
      resolve();
    });
  });
}

async function update(id_Blog) {
  return new Promise((resolve, reject) => {
    Blog.update(
      { _id: id_Blog },
      { $set: { title: "Blog con update" } },
      function (error, docs) {
        if (error) {
          console.log(error);
          process.exit(1);
        }
        console.log("---------Update--------");
        console.log(docs);
        resolve();
      }
    );
  });
}

function agregar(blog) {
  return new Promise((resolve, reject) => {
    blog.save(function (error) {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      console.log("Guardado correctamente");
      resolve();
    });
  });
}

async function main() {
  await agregar(blog1);
  await agregar(blog2);
  await verTodo();
  await encontrar("Mi blog");
  await update("6092cc300ce78380ccdeba14");
  await borrar("6092cc300ce78380ccdeba14");
  await verTodo();
  process.exit(1);
}
