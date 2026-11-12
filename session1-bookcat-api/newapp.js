const express = require('express');
const sql = require('mssql');
const app = express();
const port = 3000;

const dbConfig = {
    server: 'localhost',
    database: 'npbookstore',
    user: 'npbookstore_user',
    password: 's685188m',
    port: 1433,
    options: {
trustServerCertificate: true
    },
}
app.get('/authors', async (req, res) => {
    let connection;
    try {
        connection = await sql.connect(dbConfig);
        const result = await connection.request().query('SELECT AuthorID, Name FROM Author');
        res.status(200).json(result.recordset);
    }
    catch (err) {
        console.error('Databse connection failed:', err);
        res.status(500).json({ error: 'Database connection failed' });
    }
    finally {
        if (connection) {
            try {
                await connection.close();
            } catch (closeErr) {
                console.error('Error closing database connection:', closeErr);
            }
        }
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});