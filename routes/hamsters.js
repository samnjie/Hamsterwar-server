const getDataBase = require('../database.js')
const db = getDataBase()


const express = require('express');
const router = express.Router();

// REST API

// GET
router.get('/', async (req, res) => {
	console.log("/HAMSTERs")
	try {
		console.log("/HAMSTER")
        const hamsterRef = db.collection('hamster');
        const snapshot = await hamsterRef.get();
        if (snapshot.empty) {
            res.send([]);
            return;
        }
        let hamster = [];
        snapshot.forEach(document => {
            const data = document.data();
            data.id = document.id
            hamster.push(data);
        });
        res.send(hamster);
    } catch (err) {
        res.status(500).send(err.message)
    }
	
})

// GET/random/hamsters

router.get('/random', async (req, res) =>{
	// console.log("RANDOM")
	try{	
		const hamsterRef = db.collection('hamster');
    	const snapshot = await hamsterRef.get();
		if (snapshot.empty) {
			res.status(404).send([])
			return
		}

		let items = []
		snapshot.forEach(doc => {
			const data = doc.data()
			data.id = doc.id
			items.push(data)
		});
		let randomIndex = Math.floor(Math.random() * items.length);

		res.status(200).send(items[randomIndex])
	} catch {
		res.status(500)
	}



})


// GET /hamster/:id
router.get('/:id', async (req, res) => {
	try{

		const id = req.params.id; 
		const docRef = await db.collection('hamster').doc(id).get();

		if ( !docRef.exists ) {
			res.status(404).send( ' Sorry, can not find hamster with this id');
			return;
		}

		const data = docRef.data();
		res.send(data);
	} catch {
		res.status(500)
	}
});


// POST /hamster
router.post('/', async (req, res) => {

	try {

		const object = req.body; 
		
		if(isHamsterObject(object)) {
			res.sendStatus(400)
			return
		}
		const docRef = await db.collection('hamster').add(object)
		res.send({ id: docRef.id })
	} catch (err) {
		res.status(500).send(err.message)
	}
})


// PUT /hamster/:id

router.put('/:id', async (req, res) => {
	try{
		const id = req.params.id;
		const object = req.body;

		console.log('FFF');
		let docRef = await db.collection('hamster').doc(id).get();
		console.log(docRef.exists);
		if (isHamsterObject(object) || !Object.keys(object).length) {
			res.sendStatus(400);
			return
		}else if (!docRef.exists) {
			res.sendStatus(404);
			return
		}
		await db.collection('hamster').doc(id).set(object, {merge: true});
		res.sendStatus(200)
	} catch (err) {
		res.status(500).send(err.message)
	}
});





// DELETE / hamster

router.delete('/:id', async (req, res) =>{
	try{

		const id = req.params.id;
		const docRef = await db.collection('hamster').doc(id).get();

		if (!docRef.exists) {
			res.sendStatus(404)
			return
		}

		if (!id) {
			res.sendStatus(400)
			return
		}

		await db.collection('hamster').doc(id).delete();
		res.sendStatus(200)
	} catch (err) {
		res.status(500).send(err.message)
	}
})






function isHamsterObject(hamstern) {
	if ( !hamstern ) {
		return false;
	} else if (!hamstern.name || !hamstern.age || !hamstern.favFoods || !hamstern.loves || !hamstern.imgName || !hamstern.wins || !hamstern.defeats || !hamstern.games) {
		return false;
	} else {
		return true;
	}	
}

module.exports = router;