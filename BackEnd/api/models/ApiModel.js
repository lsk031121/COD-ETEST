const mysql = require('mysql');
const conf = require('../../conf');
const util = require('util');

const connection = mysql.createConnection(conf.db);
var sql = '';
const query = util.promisify(connection.query).bind(connection);
module.exports = {
    listallplan: function (req, callback) {


        sql = 'SELECT * FROM planlist.plan;';
        var planid = [];
        var Finalresult = new Map();
        (async () => {
            try {
                const rows = await query(sql);
                var string = JSON.stringify(rows);
                console.log('docker test');
                console.log('docker test', string);
                planid = JSON.parse(string)
                Finalresult.set('plan', []);
                console.log(planid)

                for (var i = 0; i < planid.length; i++) {
                    var pid = planid[i].plan_id
                    sql = mysql.format("select a.opt_name from  plan m inner join planOpt am on m.plan_id = am.plan_id inner join opt a on am.opt_id = a.opt_id where  am.plan_id=?", [pid])
                    const rows = await query(sql);
                    var strings = JSON.stringify(rows);
                    var optresult = JSON.parse(strings)
                    var optarray  = []
                    for (var j = 0; j < optresult.length; j++) {
                        optarray.push(optresult[j].opt_name)
                    }
                    Finalresult.get('plan').push({"plan_name":planid[i].plan_name,"plan_price":planid[i].plan_price,"opt_name":optarray})

                }
                console.log(Finalresult)
            } catch {
            }

            callback(Finalresult)
        })()

    }
};