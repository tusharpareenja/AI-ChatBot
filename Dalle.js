import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';


const app = express();
const port = 5000;
app.use(cors({
    origin: 'http://localhost:5173' // Allow only requests from this origin
}));
app.use(bodyParser.json());
const openapikey = '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'
app.post('/generate-image', async(req, res)=>{
    const {prompt} = req.body;
    try{
        const response = await axios.post('https://api.openai.com/v1/images/generations',{
            prompt: prompt,
            n: 1,
            size: '1024x1024',
        },{
            headers: {
                'Authorization': `Bearer ${openapikey}`,
                'Content-Type': 'application/json'
            }
        });
        const imageUrl = response.data.data[0].url;
        res.json({imageUrl});
    }catch(error){
        console.error(error);
        res.status(500)
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});