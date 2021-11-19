const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


//ROUTES
const sqlCode = `select c.id, t."name" as team, cl."number", s."name", cl."year", i.image_path from 
asset.card c 
inner join asset.image i  on i.card_id = c.id
inner join asset.class cl  on c.class_id = cl.id 
inner join asset.subject s on cl.subject_id = s.id
inner join asset.class_team ct on cl.id = ct.class_id
inner join asset.team t on ct.team_id = t.id;`;
//get all cards
app.get("/kapital", async (req, res) => {
    try {
        const displayAllCardData = await pool.query(sqlCode);
        res.render('index', { displayAllCardData })
        //res.json(displayAllCardData.rows)
    } catch (err) {
        console.error(err.message);
    }
});


const sqlCodeId = `select c.id, t."name" as team, cl."number", s."name", cl."year", i.image_path from 
asset.card c 
inner join asset.image i  on i.card_id = c.id
inner join asset.class cl  on c.class_id = cl.id 
inner join asset.subject s on cl.subject_id = s.id
inner join asset.class_team ct on cl.id = ct.class_id
inner join asset.team t on ct.team_id = t.id
WHERE cl.id = ($1);`;
//get a single card by id
app.get("/kapital/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const displaySingleCardData = await pool.query(sqlCodeId, [id]);
        //res.render('index', {displaySingleCardData});
        res.json(displaySingleCardData.rows);
    } catch (err) {
        console.error(err.message);
    }
});


//update card - :id needs to match id name for destructuring {} value of id
app.put("/kapital/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { year } = req.body;
        const { number } = req.body;
        const { team } = req.body;
        const { name } = req.body;
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

        res.json("row was updated");
    } catch (err) {
        console.error(err.message);
    }
});



app.listen(3000, () => {
    console.log("server running on port 3000");
});


// update asset."class" 
// set year = 20190000, number = 170000
// where asset."class".id = 1;
// --where asset.card.class_id = asset."class".id;


// update asset.team 
// set name = 'LA lakersssssss'
// from asset.class_team, asset."class" 
// where asset.class_team.team_id = asset.team.id 
// 	and asset.class_team.class_id = asset."class".id 
// 	and asset."class".id = 1;

// update asset.subject 
// set name = 'RayJonJon Rondoooo'
// from asset."class" 
// where asset."class".subject_id = asset.subject.id 
// 	and asset.subject.id = 1;









