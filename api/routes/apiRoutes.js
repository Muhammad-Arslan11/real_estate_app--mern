import express from 'express';

const router = express.Router();

router.get('/api', (req, res)=>{
    return res.send(200).json({message: "all ok"});
});

export default router;