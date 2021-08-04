var WebSocketServer = require("ws").Server,
    wss = new WebSocketServer({port:8888}),
    /*存储所有的连接用户*/
    users = {};
/*监听客户端发起的连接*/
wss.on("connection",function (connection) {
    console.log("User connected");
    /*监听客户端的消息*/
    connection.on("message",function (message) {
        var data;
        /*保证只接受JSON格式的消息*/
        try{
            data = JSON.parse(message);
        }catch (e) {
            console.log("Error parsing JSON");
            data = {};
        }
        switch (data.type) {
            case "login2.html":
                console.log("User logged in as ",data.name);
                if (users[data.name]){
                    sendTo(connection,
                        {
                            type:"login2.html",
                            success:false
                        })
                }else {
                    users[data.name] = connection;
                    connection.name = data.name;
                    sendTo(connection,
                        {
                            type:"login2.html",
                            success:true
                        });
                }
                break;
            case "offer":
                /*data.name为客户端想要把offer发送给的人*/
                console.log("Sending offer to",data.name);
                /*conn为offer发往的人.connection为发送offer的人*/
                var conn = users[data.name];
                if (conn != null){
                    connection.otherName = data.name;
                    sendTo(conn,{
                        type:"offer",
                        offer:data.offer,
                        name:connection.name
                    });
                }
                break;
            case "answer":
                console.log("Sending answer to ",data.name);
                var conn = users[data.name];
                if (conn != null){
                    connection.otherName = data.name;
                    sendTo(conn,{
                        type:"answer",
                        answer:data.answer
                    });
                }
                break;
            case "candidate":
                console.log("have a candidate from ",connection.name);
                console.log("Sending candidate to ",data.name);
                var conn = users[data.name];
                if (conn != null){
                    sendTo(conn,{
                        type: "candidate",
                        candidate: data.candidate
                    });
                }
                break;
            case "leave":
                console.log("Disconnecting user from ",data.name);
                var conn = users[data.name];
                conn.otherName = null;
                if (conn != null){
                    sendTo(conn,{type:"leave"});
                }
                break;
            default:
                sendTo(connection,
                    {
                        type:"error",
                        message:"Unrecognized command:" + data.type
                    });
                break;
        }
    });
    connection.on("close",function () {
        if (connection.name){
            delete users[connection.name];
            if (connection.otherName){
                console.log("Disconnecting user from ",connection.otherName);
                var conn = users[connection.otherName];
                conn.otherName = null;
                if (conn != null){
                    sendTo(conn,{type:"leave"});
                }
            }
        }
    })
});
wss.on("listening",function () {
    console.log("Server start...");
})
function sendTo(conn,message) {
    conn.send(JSON.stringify(message));
}

