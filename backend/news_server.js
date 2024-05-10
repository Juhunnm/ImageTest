const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("./news.proto", {});
const newsProto = grpc.loadPackageDefinition(packageDefinition);
const newsPackage = newsProto.newsPackage;

const crypto = require('crypto');
//grpc client
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
    'UploadImage' : UploadImage,
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

function UploadImage (call,callback){
  // const image = call.request.image;
  // const label = call.request.label;
  // const hashed = call.request.hashed;
  const {image,label,hashed} = call.request;

  const grpcHash = crypto.createHash('sha256').update(image).digest('hex');

  console.log("grpc_server");
  console.log('label : ',label);
  console.log('image : ',image);
  console.log('hashed :',hashed);

  if(grpcHash === hashed){
    callback(null,{status: 'Image received succesfully & verified'})
  }else{
    callback(null,{status : "Not verified image"})
  }
}

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);
