/* export default function  handler(request, response) {
    const {
        name
    } = request.query;
    response.status(200).send(`Hello ${name}!`);
} */

// 1 cnpm install mongodb --save

//2、引入mongodb
const {
    MongoClient
} = require('mongodb');

//3、定义数据库连接的地址
const url = 'mongodb+srv://a984419317:xwWdiogW0hEgxD5L@twikoo.5gbi80s.mongodb.net/?retryWrites=true&w=majority'; // mongodb://127.0.0.1:27017

//4、定义要操作的数据库
const dbName = 'test';

//5、实例化MongoClient 传入数据库连接地址
const client = new MongoClient(url, {
    useUnifiedTopology: true
});

module.exports = function handler(request, response) {
    const {
        name
    } = request.query;
    //6、连接数据库 操作数据

    client.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("数据库连接成功");
        let db = client.db(dbName);
        // //1、查找数据
        db.collection("comment").find().toArray((err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(data);
            response.status(200).send(data);
            //操作数据库完毕以后一定要 关闭数据库连接
            client.close();
        })
    })
    // response.status(200).send(`Hello ${name}!`);
}