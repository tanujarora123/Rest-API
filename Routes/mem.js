const express = require('express');
let mem = require('../Members');
const MemModel = require('../Model/member');
const uuid = require('uuid');

const router = express.Router();


//Testing Database 

// router.get('/test-db', async(req, res) => {
//     const newMem = new MemModel({
//         name: 'Tanuj',
//         email: 'ta@gmail.com',
//         phn: 1234
//     });

//     try{
//         const rslt = await newMem.save();
//         res.send(rslt);
//     } catch(err) {
//         console.log(err)
//     }

// });

router.get('/', async (req, res) => {
    try{
        const rslt = await MemModel.find();
        res.send(rslt);
    } catch(err) {
        console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    //Using Vanilla JS

    // const found = mem.some(ele => ele.id == req.params.id);
    // if(found){
    //     res.json(mem.filter(ele => ele.id == req.params.id));
    // } else{
    //     res.json({ msg: "Element With given id is not found"});
    // }
    try{
        const rslt = await MemModel.findById(req.params.id);
        res.send(rslt);
    } catch(err) {
        res.send({msg: 'No Element With this Id'})
    }
});

router.post('/', async (req, res) => {
    const newMem = new MemModel({
        name: req.body.name,
        email: req.body.email,
        phn: req.body.phn,
    })

    if(!req.body.name || !req.body.email || !req.body.phn){
        res.json({ msg: "Please Enter all Feilds"}); 
    } else{
        try{
            const rslt = await newMem.save();
            console.log(rslt);
            res.json({msg: 'Adding is Successfull'});
        } catch(err) {
            console.log(err);
        }
    }
    //Using Vanilla JS
    
    // if(!req.body.name || !req.body.email || !req.body.phn){
    //     res.json({ msg: "Please Enter all Feilds"});
    // } else{
    //     // console.log(newMem);
    //     mem.push(newMem);
    //     res.json(mem);
    // }
});

router.put('/:id', async (req, res) => {
    const { name, email, phn } = req.body;
    if(!name || !email || !phn){
        res.json({msg: "Please Provide all Feilds"});
    } else{
        const memUpdated = { name, email, phn }
        try{
            const rslt = await MemModel.findByIdAndUpdate(req.params.id, memUpdated);
            console.log(rslt);
            res.json({ msg: "Update Successfull"});
        } catch(err) {
            console.log(err);
        }
    }
    // const found = mem.some(ele => ele.id == req.params.id);
    // if(found){
    //     mem.forEach(ele => {
    //         if(ele.id == req.params.id){
    //             ele.name = req.body.name ? req.body.name : ele.name;
    //             ele.email = req.body.email ? req.body.email : ele.email;
    //             ele.phn = req.body.phn ? req.body.phn : ele.phn;

    //             // console.log(ele);
    //             res.json(mem);
    //         }
    //     })
    // } else{
    //     res.json({ msg: "Please Enter a valid ID"});
    // }
});

router.delete('/:id',  async (req, res) => {
    try{
        const rslt = await MemModel.findByIdAndDelete(req.params.id);
        res.json({ msg: "Record Deleted"});
    } catch(err) {
        console.log(err);
    }

    //Vanilla JS
    // const found = mem.some(ele => ele.id == req.params.id);
    // if(found){
    //     mem = mem.filter(ele => ele.id != req.params.id)
    //     // console.log(mem);
    //     res.json(mem)
    // } else{
    //     res.json({msg : "please enter a valid Id to Delete"});
    // }
});

module.exports = router;