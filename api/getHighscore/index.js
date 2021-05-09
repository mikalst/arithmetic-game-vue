const azure = require('azure-storage');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const connectionString = process.env['STORAGE_CONNECTION_STRING'];
    var tableSvc = azure.createTableService(connectionString);
    const tableName = process.env['STORAGE_TABLE_NAME'];
    
    try
    {         
        let promise = new Promise(function(resolve, reject) {
            // Filter out rows more than 30 days old.
            let pastDate = new Date();
            pastDate.setHours(pastDate.getHours() - 24);
            var query = new azure.TableQuery()
                .where('Timestamp ge ?', pastDate);
            
            tableSvc.queryEntities(
                tableName, 
                query,
                null,
                function(error, result, response) {
                if(!error) {
                    //Query was successful
                    context.res = {
                        status: 200,
                        body: result.entries
                            .sort(row => -row['Result']['_'])
                            .slice(0, 5)
                    };
                    resolve();
                }
                else {
                    context.res = {
                        status: 204
                    };
                    resolve();
                }
            });
        });
        await promise;
    }
    catch (exception) {
        console.log(exception);
        context.res = {
            status: 500
        };
    }
}