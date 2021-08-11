const azure = require('azure-storage');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const connectionString = process.env['STORAGE_CONNECTION_STRING'];
    var tableSvc = azure.createTableService(connectionString);
    const tableName = process.env['STORAGE_TABLE_NAME'];
    
    if (req.query.person || (req.body && req.body.person)) {
        let personId = (req.query.person) || (req.body.person);
        try{         
            let promise = new Promise(function(resolve, reject) {
                // Filter out rows more than 30 days old.
                let comparisonDate = new Date();
                comparisonDate.setDate(comparisonDate.getDate() - 30);
                var query = new azure.TableQuery()
                    .where('PersonId eq ?', personId)
                    .and('Result gt ?', 0)
                    .and('Timestamp ge ?', comparisonDate);
                
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
                                .sort(row => -1*row['Timestamp']['_'])
                                .slice(0, 10)
                        };
                        resolve();
                    }
                    else {
                        console.error(error);
                        context.res = {
                            status: 500,
                            body: "An error ocurred."
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
    else {
        context.res = {
            status: 400,
            body: "Missing person identifier."
        };
    }
}