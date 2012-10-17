var http = require("http");
var url = require("url");

function loadString(requestURL, callback){
    var opt = url.parse(requestURL);
    opt.port = 80;
    opt.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11',
        'Referer': 'http://lingualeo.com/savanna/search',
        'Cookie': 'lingualeouid=134324935099832; firstseen=2012/07/26; iAmFromBrazil=1; lang=ru; sbrW=17; remember=fa7pcknrrs0gcokowkc0so4w0ssk8cc; userid=995175; vk_app_3042279=expire=1343262481&mid=1338931&secret=oauth&sid=e6c01dd3b6c4fcf1e6543bec9ce6fa1807ce6d5e6d473e2e57b5742960c36c4&sig=55ef1e3f13d00d289e62e157c9025fe5; lingualeo=03b54f393541b02c13165894701f9a07:a25efaa402fb82f0845d00895be3e36d8f8663fd; chrome-hide=1; __utma=13441322.2049385537.1343255279.1343255279.1343258462.2; __utmb=13441322.1.10.1343258462; __utmc=13441322; __utmz=13441322.1343255279.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); __utmv=13441322.|1=RegisterDate=2012-02-24=1^2=UserLangLevel=4=1^3=Locale=ru=1^4=Gold=yes%2F17%2F05%2F12=1^5=JungleTest=old=1'
        //'Content-Length': post_data.length
    };
//    var request = http.post(opt);
//    request.on('response', function (res) {
//        var str_out = "";
//        res.on("data", function (chunk) {
//            str_out += chunk.toString();
//        });
//        res.on("end", function(){
//            callback(str_out);
//        });
//    });
    var out = "";
    var post_req = http.request(opt, function(res) {
        res.setEncoding('utf8');
        res.on("data", function (chunk) {
            //console.log('Response: ' + chunk);
            out += chunk;
        });
        res.on("end", function(){
            callback(out);
        });
    });
    // post the data
    //post_req.write(post_data);
    post_req.end();
}

//loadString("http://ya.ru", function(ya){
//    console.log(ya);
//});
loadString("http://lingualeo.com/social/search", function(ya){
    console.log(ya);
});

console.log("%s:%s", process.env.IP, process.env.PORT);
