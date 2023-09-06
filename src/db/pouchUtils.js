import PouchDB from 'pouchdb';
import { async } from 'q';
import { v4 as uuidv4 } from 'uuid';


const db = new PouchDB('taskDB');

// const cdb = new PouchDB('categoriesDB');

//  const addDoc = (newDoc) => {
//     return new Promise(async (resolve, reject) => {
//         db.put({ ...newDoc, _id: '' + (await db.allDocs()).total_rows }, (err, res) => {
//             if (err) return reject(err);

//             return resolve('Success!');
//         });
//     })
// };

const addDoc = (newDoc) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Generate a unique ID using uuid
            newDoc._id = uuidv4();

            // Insert the document into the database
            const response = await db.put(newDoc);

            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
};

const addTask = (_id, _rev, newTask) => {
    return new Promise((resolve, reject) => {
        db.get(_id, (err, doc) => {
            if (err) return reject(err);

            doc.tasks.push(newTask);

            db.put(doc, (err, res) => {
                if (err) return reject(err);

                return resolve('Successfully Added');
            });
        });
    });
}

const deleteDoc = (targetID) => {
    return new Promise((resolve, reject) => {
        db.get(targetID, (err, doc) => {
            if (err) return reject(err);

            db.remove(targetID, doc._rev, (err) => {
                if (err) return reject(err);

                return resolve('Document Deleted!');
            });
        });
    });
};

const addBulk = async (newDocs) => {
    return new Promise(async (resolve, reject) => {
        db.bulkDocs(newDocs, (err, res) => {
            if (err) return reject(err);

            return resolve('Success!');
        })
    })
};

const getDoc = (targetID) => {
    return new Promise((resolve, reject) => {
        db.get(targetID, (err, doc) => {
            if (err) return reject(err);

            return resolve(doc);
        })
    });
};

const getAllDocs = () => {
    return new Promise((resolve, reject) => {
        db.allDocs({ include_docs: true }, (err, doc) => {
            if (err) return reject(err);

            return resolve(doc.rows.map(row => row.doc));
        });
    })
};
const destroyDB = () => {
    return new Promise((resolve, reject) => {
        try {
            db.destroy((err, res) => {
                if (err) return reject(err);

                return resolve(res);
            });
        }
        catch (err) {
            return reject(err);
        }
    });
};

const clearData = async () => {
    try {
        const allDocs = await db.allDocs({ include_docs: true });

        const promises = allDocs.rows.map(async (row) => {
            try {
                await db.remove(row.doc);
            } catch (err) {
                console.error(err);
            }
        });

        await Promise.all(promises);
    } catch (err) {
        console.log(err);
    }
}


export {
    addDoc,
    addTask,
    deleteDoc,
    addBulk,
    getDoc,
    getAllDocs,
    destroyDB,
    clearData
};