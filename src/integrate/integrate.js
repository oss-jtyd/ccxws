const ccxws = require("../index.js");

var map = {
  binance: new ccxws.Binance(),
  huobi: new ccxws.Huobi()
}

//引入文件模块
const fs = require('fs');
//定义json文件路径
const path="./exchanges_config.json";
//开始读取文件的信息
fs.readFile(path, function(err, data){
	if(err){
		console.log(err);
	}else{
		let exchangeStr=data.toString();	//将Buffer转换成字符串
		exchangeJson=JSON.parse(exchangeStr);		//将数据转换为 JavaScript对象。 
    console.log(exchangeJson.length);
    for (let i=0; i < exchangeJson.length; i++) {
      const key = exchangeJson[i].exchange;
      console.log(key);
      const instance = map[key];

      const market = {
        id: "BTCUSDT", // remote_id used by the exchange
        base: "BTC", // standardized base symbol for Bitcoin
        quote: "USDT", // standardized quote symbol for Tether
      };

      // handle trade events
      instance.on("trade", trade => {
        console.log(trade)
      });
     }
	}
});

// let f = fs.readFile("./my.json", "utf-8", function(err, data){
//   let j = JSON.parse(data);
//   console.log(data);
//   console.log(j);

//   // for 循环 j
//   const binance = new ccxws.Binance();

//   // market could be from CCXT or genearted by the user
//   const market = {
//     id: "BTCUSDT", // remote_id used by the exchange
//     base: "BTC", // standardized base symbol for Bitcoin
//     quote: "USDT", // standardized quote symbol for Tether
//   };

//   // handle trade events
//   binance.on("trade", trade => {
//     console.log(trade)
//   });

//   // handle level2 orderbook snapshots
//   binance.on("l2snapshot", snapshot => {
//     console.log(snapshot)
//   });

//   // subscribe to trades
//   binance.subscribeTrades(market);

//   // subscribe to level2 orderbook snapshots
//   binance.subscribeLevel2Snapshots(market);

//   });

