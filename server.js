const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:xeztcTwr5SD2xtZN@healthshop.xnh7m.mongodb.net";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors())

const port = process.env.PORT || 5000;

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, 'build')));
// }



app.use(bodyParser.json());

// app.use(express.urlencoded({ extended: true }));

app.use('/static', express.static(path.join(__dirname, 'build', 'static')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/branches', (req, res) => {
    try {
        client.connect(async (err) => {
            const collection = await client.db("health_shop").collection("branches").find({})
                .toArray(function (err, result) {
                    if (err) throw err;
                    res.send(result);
                })
            // // perform actions on the collection object
            // console.log(collection);
            // res.send(collection);
        });
    } catch (e) {
        console.log('error');
        res.send([]);
    }
});

app.get('/branches', (req, res) => {
    try {
        client.connect(async (err) => {
            const collection = await client.db("health_shop").collection('branches').find({})
                .toArray(function (err, result) {
                    if (err) throw err;
                    res.send(result);
                })
            // // perform actions on the collection object
            // console.log(collection);
            // res.send(collection);
        });
    } catch (e) {
        console.log('error');
        res.send([]);
    }
})

app.get('/branches/:id', (req, res) => {
    try {
        client.connect(async (err) => {
            const collection = await client.db("health_shop").collection(req.params.id).find({})
                .toArray(function (err, result) {
                    if (err) throw err;
                    res.send(result);
                })
            // // perform actions on the collection object
            // console.log(collection);
            // res.send(collection);
        });
    } catch (e) {
        console.log('error');
        res.send([]);
    }
})

app.post('/branch', (req, res) => {
    try {
        client.connect(err => {
            const x = client.db("health_shop")
                .collection("branches")
                .insertOne({ name: req.body.branch });
            // const collection = client.db("health_shop").collection("brnches").findOne({});
            // // perform actions on the collection object
            // console.log(x);
            res.send('Done');
        });
    } catch (e) {
        console.log('error');
    }
});

app.get('/addbrancheData', (req, res) => {
    try {
        client.connect(err => {
            const x = client.db("health_shop")
                .collection('6066eb1605ce7235cc96bcfe')
                .insertOne({ date: '1-4-2021', in: 6, out: 2, totlal_in: 4 });
            // const collection = client.db("health_shop").collection("brnches").findOne({});
            // // perform actions on the collection object
            // console.log(x);
            res.send('Done');
        });
    } catch (e) {
        console.log('error');
    }
});


// app.get('/api',(req: express.Request, res: express.Response)=>{
//     res.send({message: 'Pets'});
// });


// app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
//     res.send({ message: err.message });
// });

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
});