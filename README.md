<pre>
    /backend 
  node server.js
    -> server start
  node new_server.js
    ->grpc server start
    
/client
  npm start
    ->react start

<h3>sql struct</h3>
    
CREATE TABLE `images` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `isedit` tinyint DEFAULT NULL,
  `isdelete` tinyint DEFAULT NULL,
  PRIMARY KEY (`cid`)
) 

 CREATE TABLE `change_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `cid` int DEFAULT NULL,
  `prev_value` varchar(255) DEFAULT NULL,
  `new_value` varchar(255) DEFAULT NULL,
  `edit_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`log_id`),
  FOREIGN KEY (`cid`) REFERENCES `images` (`cid`)
) 

    
</pre>
