const querystring = require('querystring'); 
const https = require('https'); 
var express = require('express');

//서버를 생성
var app = express();
app.listen(4200, function() {
    console.log('server start at http://127.0.0.1:4200');
})

var router = express.Router();


router.get('/openapi', function(req, res){ 

    var search = req.query.search; 
    var queryOption = {'query':search,'display':10,'start':1,'sort':'sim'};
    var query = querystring.stringify(queryOption); //queryOption객체를 json형식으로 변환

    var client_id = 'yyFWesOR1RkYz0wXJcC6';
    var client_secret = 'UylqjKeY7y';

    var options = { 
        hostname: 'openapi.naver.com', 
        port: 443, 
        path: '/v1/search/shop.xml?' + query, 
        method: 'GET',
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    }; 
    
    var req = https.request(options, (res) => { 
        console.log('statusCode:', res.statusCode); 
        console.log('headers:', JSON.stringify(res.headers)); //객체를 json형식으로 변환
        res.setEncoding('utf8'); // utf8 인코딩
        res.on('data', (xml) => { 
        //process.stdout.write(xml); 
        //console.log('BODY:' + xml);
            parseString(xml, function(err, result){   // xml to json
                var data = JSON.stringify(result); 
                res.send(data); 
            });
        }); 
    }); 
    req.end(); 
});

/* node https request 예제
const https = require('https'); 

var options = { 
  hostname: 'encrypted.google.com', 
  port: 443, 
  path: '/', 
  method: 'GET' 
}; 
 
var req = https.request(options, (res) => { 
  console.log('statusCode:', res.statusCode); 
  console.log('headers:', res.headers); 

  res.on('data', (d) => { 
    process.stdout.write(d); 
  }); 
}); 
req.end(); 
*/

/*
// 네이버 검색 API예제는 블로그를 비롯 전문자료까지 호출방법이 동일하므로 blog검색만 대표로 예제를 올렸습니다.
// 네이버 검색 Open API 예제 - 블로그 검색
var express = require('express');
var app = express();
var client_id = 'yyFWesOR1RkYz0wXJcC6';
var client_secret = 'UylqjKeY7y';
app.get('/search/blog', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/search/blog?query=' + encodeURI(req.query.query); // json 결과
//   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 app.listen(3000, function () {
   console.log('http://127.0.0.1:3000/search/blog?query=검색어 app listening on port 3000!');
 });
 */