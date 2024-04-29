const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = "./news.proto";
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition)
const newsPackage = grpcObject.newsPackage;


const client = new newsPackage.NewsService(
  "127.0.0.1:50051",
  grpc.credentials.createInsecure()
);


// client.getAllNews(null, (error, response) => {
//     console.log(JSON.stringify(response));
// });

module.exports=client