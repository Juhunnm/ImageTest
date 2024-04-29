const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("./news.proto", {});
const newsProto = grpc.loadPackageDefinition(packageDefinition);
const newsPackage = newsProto.newsPackage;


const server = new grpc.Server();

let news = [
  { id: "1", title: "Note 1", body: "Content 1", postImage: "Post image 1" },
  { id: "2", title: "Note 2", body: "Content 2", postImage: "Post image 2" }
];

//함수정의?
server.addService(newsPackage.NewsService.service, 
{
    // "GetAllNews" : GetAllNews,
    "GetReverse" : GetReverse,
});

function GetAllNews  (call, callback) {
      callback(null, {news} )
}

function GetReverse (call,callback){
  let reverseNews = {
    id : call.request.id,
  }
  let testnew = call.request.newtest;
  console.log(reverseNews)
  callback(null,reverseNews)
}

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);
