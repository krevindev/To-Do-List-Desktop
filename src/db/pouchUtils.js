import PouchDB from 'pouchdb';
import {v4 as uuidv4} from 'uuid';


const db = new PouchDB('taskDB');

// const cdb = new PouchDB('categoriesDB');

// export const addDoc = (newDoc) => {
//     return new Promise(async (resolve, reject) => {
//         db.put({ ...newDoc, _id: '' + (await db.allDocs()).total_rows }, (err, res) => {
//             if (err) return reject(err);

//             return resolve('Success!');
//         });
//     })
// };

export const addDoc = (newDoc) => {
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

export const addTask = (_id, _rev, newTask) => {
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

export const deleteDoc = (targetID) => {
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
        db.get(targetID, (err, doc) => {
            if (err) return reject(err);

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
export const destroyDB = () => {
    return new Promise((resolve, reject) => {
        db.destroy();
    });
}