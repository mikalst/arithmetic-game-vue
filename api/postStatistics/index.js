const azure = require('azure-storage');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const connectionString = process.env['STORAGE_CONNECTION_STRING'];
    var tableSvc = azure.createTableService(connectionString);
    const tableName = process.env['STORAGE_TABLE_NAME'];
    
    if (req.query.person || (req.body && req.body.person)) {
        let personId = (req.query.person) || (req.body.person);
        let input = {
            RowKey: `${personId}.${(new Date()).getTime()}`,
            PersonId: personId,
            PartitionKey: "norway",
            Result: req.query.result
        };
        try{         
            let promise = new Promise(function(resolve, reject) {
                tableSvc.insertOrReplaceEntity(
                    tableName,
                    input,
                    {echoContent: true},
                    function (error, result, response) {
                    if(!error) {
                        context.res = {
                            status: 201
                        };
                        resolve();
                    }
                    else{
                        context.res = {
                            status: 500
                        };
                        reject();
                    }
                });
            });
            await promise;
        }
        catch (exception) {
            context.res = {
                status: 500
            };
        }
    }
    else {
        context.res = {
            status: 400,
            body: "Missing person identifier."
        };
    }
}