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
  let inputValue = call.request.value; 
  let reversedValue = inputValue.split('').reverse().join(''); // 문자열을 뒤집음
  console.log(reversedValue)
  callback(null, { value: reversedValue }); // 뒤집힌 문자열을 반환
}


server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);
