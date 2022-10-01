const express = require("express");
const app = express();
// 1 cnpm install mongodb --save

//2、引入mongodb
const { MongoClient } = require("mongodb");

let url = process.env["MONGODB_URI"];

//3、定义数据库连接的地址
if (process.env["NODE_ENV"] === "development") {
    url =
        "mongodb+srv://a984419317:xwWdiogW0hEgxD5L@twikoo.5gbi80s.mongodb.net/?retryWrites=true&w=majority";
}

if (!url) {
    throw new Error("Please set Mongo URI");
}

// const url = 'mongodb+srv://a984419317:xwWdiogW0hEgxD5L@twikoo.5gbi80s.mongodb.net/?retryWrites=true&w=majority'; // mongodb://127.0.0.1:27017

//4、定义要操作的数据库
const dbName = "site_pv";

//5、实例化MongoClient 传入数据库连接地址
const client = new MongoClient(url, {
    useUnifiedTopology: true,
});
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); //   *
    // res.header("Access-Control-Allow-Credentials", "true");
    // res.header("Access-Control-Allow-Origin", "*"); //   *
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header(
        "Access-Control-Allow-Methods",
        "DELETE,PUT,POST,GET,OPTIONS"
    );
    next();
});
module.exports = function site_pv(req, res) {
    // 设置允许跨域的域名，*代表允许任意域名跨域
    // res.header("Access-Control-Allow-Origin","http://localhost:8080");
    // res.header("Access-Control-Allow-Origin","http://127.0.0.1:1387");
    
    // 访问者
    let cookies = req.cookies || {};
    let only_lee_site_pv;
    if (cookies.lee_site_pv) only_lee_site_pv = cookies.lee_site_pv;
    // console.log(req.cookies,'req.cookies---',req.header);
    let isNew = false; // 是否为新访客
    let lee_site_pv_id = only_lee_site_pv || generateUUID();

    const { body, cookies: header_cookies, query } = req;
    console.log(header_cookies, body, query, "~~~~");
    //6、连接数据库 操作数据
    let { method, lee_site_pv } = body || {}; // TODO 可以考虑换成 cookie的形式，禁止客户端改动cookie比localStorage数据更准确一电
    // if(!lee_site_pv){
    //     res.cookie('lee_site_pv', lee_site_pv_id, {
    //         maxAge: 60 * 60 * 1000 * 24 * 365,
    //         httpOnly: true
    //     });
    // }
    client.connect(async (err) => {
        if (err) {
            console.log(err);
            res.end(err);
            return;
        }
        console.log("数据库" + dbName + "连接成功");
        let db = client.db(dbName);
        if (method == "get" || !method) {
            // //1、查找数据
            let whereStr = {
                lee_site_pv: query.id || req.cookies.lee_site_pv || "",
            }; // 查询条件
            let _id = whereStr.lee_site_pv;
            let record = await db.collection(dbName).findOne(whereStr);
            if (record && record._id) {
                if (isNaN(record.count)) record.count = 0;
                let theCount = Number(record.count);
                theCount++;
                var updateStr = {
                    $set: {
                        count: theCount,
                    },
                };
                db.collection(dbName).updateOne(
                    whereStr,
                    updateStr,
                    function (err, resp) {
                        if (err) throw err;
                        // console.log(resp);
                        res.status(200).send({
                            message: "ok",
                            dataMsg:
                                "老访客浏览次数: " +
                                (theCount - 1) +
                                "=>" +
                                theCount,
                            data: [
                                {
                                    ...record,
                                    count: theCount,
                                    lee_site_pv: _id,
                                },
                            ],
                            result: true,
                        });
                        //操作数据库完毕以后一定要 关闭数据库连接
                        client.close();
                    }
                );
            } else {
                db.collection(dbName)
                    .find(whereStr)
                    .toArray((err, data) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        // console.log(data);
                        res.status(200).json({
                            result: true,
                            message: "ok",
                            data,
                        });
                        //操作数据库完毕以后一定要 关闭数据库连接
                        client.close();
                    });
            }
        } else if (method == "getAll") {
            // //1、查找数据
            db.collection(dbName)
                .find()
                .toArray((err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    // console.log(data);
                    res.status(200).json({
                        result: true,
                        message: "ok",
                        data,
                    });
                    //操作数据库完毕以后一定要 关闭数据库连接
                    client.close();
                });
        } else if (method == "add" || lee_site_pv) {
            // //1、增加数据
            let _id = body.lee_site_pv || lee_site_pv_id;
            body.lee_site_pv = _id;
            body.count = body.count || 0;
            let whereStr = {
                lee_site_pv: _id,
            }; // 查询条件
            let record = await db.collection(dbName).findOne(whereStr);
            if (!record) isNew = true;
            if (isNew) {
                body.count = 1;
                db.collection(dbName).insertMany([body], function (err, resp) {
                    if (err) throw err;
                    // console.log("插入的文档数量为: " + resp.insertedCount);
                    res.status(200).send({
                        message: "ok",
                        dataMsg: "新增访客: " + resp.insertedCount,
                        data: [
                            {
                                lee_site_pv: _id,
                            },
                        ],
                        result: true,
                    });
                    //操作数据库完毕以后一定要 关闭数据库连接
                    client.close();
                });
            } else {
                let theOne = await db.collection(dbName).findOne(whereStr);
                if (isNaN(theOne.count)) theOne.count = 0;
                let theCount = Number(theOne.count);
                theCount++;
                var updateStr = {
                    $set: {
                        count: theCount,
                    },
                };
                db.collection(dbName).updateOne(
                    whereStr,
                    updateStr,
                    function (err, resp) {
                        if (err) throw err;
                        // console.log(resp);
                        res.status(200).send({
                            message: "ok",
                            dataMsg:
                                "老访客浏览次数: " +
                                (theCount - 1) +
                                "=>" +
                                theCount,
                            data: [
                                {
                                    lee_site_pv: _id,
                                },
                            ],
                            result: true,
                        });
                        //操作数据库完毕以后一定要 关闭数据库连接
                        client.close();
                    }
                );
            }
        }
    });
    // res.status(200).send(`Hello ${name}!`);
};

function generateUUID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        }
    );
    return uuid;
}

function _typeof(o) {
    return Object.prototype.toString.call(o).slice(8, -1);
}
