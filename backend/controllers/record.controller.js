const db = require("../db/db")

class RecordController {
    async createRecord(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Headers', 'origin, content-type, accept');
        const {name, completed} = req.body;
        const newRecord = await db.query(`INSERT INTO record (name, completed) values ($1, $2) RETURNING * `, [name, completed]);
        console.log(name, completed);
        res.json(newRecord.rows[0]);
    }

    async getRecords(req, res) {
        res.set('Access-Control-Allow-Origin', '*');
        const records = await db.query("SELECT * FROM record");
        res.json(records.rows);
    }

    async getOneRecord(req, res) {
        const id = req.params.id;
        const record = await db.query(`SELECT * FROM record where record_id = $1`, [id]);
        res.json(record.rows[0]);
    }

    async updateRecord(req, res) {
        const id = req.params.id;
        const {_, name, completed} = req.body;
        const record = await db.query(`UPDATE record set name = $1, completed = $2 where record_id = $3 RETURNING *`, [name, completed, id]);
        res.json(record.rows[0]);
    }

    async deleteRecord(req, res) {
        const id = req.params.id;
        const record = await db.query(`DELETE FROM record where record_id = $1`, [id]);
        res.json(record.rows[0]);
    }
}

module.exports = new RecordController()