const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bodyParser = require('body-parser')

//middleware
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

//ROUTES
const sqlCode = `select cl.id, t."name" as team, cl."number", s."name", cl."year", i.image_path from 
asset.card c 
inner join asset.image i  on i.card_id = c.id
inner join asset.class cl  on c.class_id = cl.id 
inner join asset.subject s on cl.subject_id = s.id
inner join asset.class_team ct on cl.id = ct.class_id
inner join asset.team t on ct.team_id = t.id;`;
//get all cards
app.get("/kapital", async(req, res) => {
    try {
        const displayAllCardData = await pool.query(sqlCode);
        //res.render('index', {displayAllCardData})

        //seperate req, render singlecard.ejs
        res.json(displayAllCardData.rows)
    } catch (err) {
        console.error(err.message);
    }
});


const sqlCodeId = `select cl.id, t."name" as team, cl."number", s."name", cl."year", i.image_path from 
asset.card c 
inner join asset.image i  on i.card_id = c.id
inner join asset.class cl  on c.class_id = cl.id 
inner join asset.subject s on cl.subject_id = s.id
inner join asset.class_team ct on cl.id = ct.class_id
inner join asset.team t on ct.team_id = t.id
WHERE cl.id = $1;`;
//get a single card by id
app.get("/kapital/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const displaySingleCardData = await pool.query(sqlCodeId, [id]);
        res.render('index', {displaySingleCardData});
        //res.json(displaySingleCardData.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//put request needs to be different to update single card data //update every single document

//update card - :id needs to match id name for destructuring {} value of id
app.put("/kapital/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const year = req.body.year; //req.body.updateData ex. to use main.js fxn
        const number = req.body.number;
        const team = req.body.team;
        const name = req.body.name;

        console.log(req.body)
//if {name} was {descName} then correct way to write it is {descName: "aksjdflk"} etc...
        const updateSingleCardYrNum = await pool.query(`update asset."class" 
        set year = $1, number = $2 where asset."class".id = $3;`, [year, number, id]);

        const updateSingleCardTeam = await pool.query(`update asset.team 
        set name = $1
        from asset.class_team, asset."class" 
        where asset.class_team.team_id = asset.team.id 
            and asset.class_team.class_id = asset."class".id 
            and asset."class".id = $2;`, [team, id]); 

        const updateSingleCardName = await pool.query(`update asset.subject 
        set name = $1
        from asset."class" 
        where asset."class".subject_id = asset.subject.id 
            and asset.subject.id = $2`, [name, id]); 
        
        //res.render('index', {updateSingleCardName, updateSingleCardYrNum, updateSingleCardTeam});
        res.json('Update was succesfull!');
        console.log("update worked");
    } catch (err) {
        console.error(err.message);
    }
});



app.listen(3000, () => {
    console.log("server running on port 3000");
});



