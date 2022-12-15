const modelodbaudiovisual = {

    
    queryGetfighters: "SELECT * FROM dbvisual",
    queryGetfightersById: `SELECT * FROM dbvisual WHERE ID = ?`,
    queryDeletedfighter: `UPDATE dbvisual SET Activo = 'N' WHERE ID = ?`,
    queryfighterexist: `SELECT sala FROM dbvisual WHERE sala = '?'`,
    queryaddfighter: `INSERT INTO dbvisual (
        cliente,
        sala,
        personal
    ) VALUES (
       ?,
       ?,
      
       ?
      
    )`,

    querygetfighterinfo: `SELECT 
    cliente,
    sala,
    personal
    FROM dbvisual
    WHERE dbvisual = ?`,

   queryupdatebyfighter:`UPDATE dbvisual SET (   
     cliente, 
     sala= ?,
     personal=?
     WHERE dbvisual=?`,



   
}

module.exports = modelodbvisual