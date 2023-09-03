import PouchDB from 'pouchdb';
const db = new PouchDB('taskDB');
// const cdb = new PouchDB('categoriesDB');

export const addDoc = (newDoc) => {
    return new Promise(async (resolve, reject) => {
        db.put({ ...newDoc, _id: '' + (await db.allDocs()).total_rows }, (err, res) => {
            if (err) return reject(err);

            return resolve('Success!');
        });
    })
};

export const addBulk = async (newDocs) => {
    return new Promise(async (resolve, reject) => {
        db.bulkDocs(newDocs, (err, res) => {
            if (err) return reject(err);

            return resolve('Success!');
        })
    })
};

export const getDoc = (targetID) => {
    return new Promise((resolve, reject) => {
        db.get(targetID, (err, doc ) => {
            if(err) return reject(err);

            return resolve(doc);
        })
    });
};

export const getAllDocs = () => {
    return new Promise((resolve, reject) => {
        db.allDocs({ include_docs: true }, (err, doc) => {
            if (err) return reject(err);

            return resolve(doc.rows.map(row => row.doc));
        });
    })
}