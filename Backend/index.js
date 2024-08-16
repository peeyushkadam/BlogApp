require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/UserModel');
const Post = require('./models/Post')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const secret = '1k234567K@'
const uploadMiddleware = multer({ dest: 'upload/' });
const fs = require('fs');

app.use(cors({ credentials: true, origin: 'https://blogic.vercel.app' }));
app.use(express.json());
app.use(cookieParser());
app.use('/upload', express.static(__dirname + '/upload'))

mongoose.connect(process.env.MONGOOSE_VARIABLE)

app.post('/register', async (req, res) => {
    const { userName, password } = req.body;
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const newUser = await User.create({
            userName,
            password: hashedPassword,
        });
        res.json(newUser);
    } catch (e) {
        console.error('Error creating user:', e);
        res.status(500).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { userName, password } = req.body;
    const findUser = await User.findOne({ userName });

    const passOk = bcrypt.compare(password, findUser.password)

    if (passOk) {
        console.log('logged in')

        jwt.sign({ userName, id: findUser._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json({
                id: findUser._id,
                userName,
            })
        })
        // res.status(200).json('correct')
    }
    else {
        console.log('ok')
    }
})

// app.get('/profile', (req, res) => {
//     const { token } = req.cookies;

//     // if (!token) {
//     //     // return res.status(401).json({ message: 'Token missing or invalid' });
//     //     return res.redirect('http://localhost:3000');
//     // }

//     jwt.verify(token, secret, {}, (err, info) => {
//         if (err) throw (err);
//         res.json(info);
//     })
// })

app.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok')
})

app.post('/post', uploadMiddleware.single('files'), async (req, res) => {
    const { originalname, path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw (err);

        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        })
        res.json(postDoc);
    })


})

app.get('/post', async (req, res) => {
    res.json(
        await Post.find()
            .populate('author', ['userName'])
            .sort({ createdAt: -1 })
            .limit(20)
    );
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id)
        .populate('author', ['userName']);
    // console.log(postDoc);
    res.json(postDoc);
    // res.json({id});
})

app.put('/post', uploadMiddleware.single('files'), async (req, res) => {
    // res.json({ test: 4, fileIs: req.files });

    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw (err);

        const { id, title, summary, content} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        res.json({isAuthor, postDoc, info});
        
        if(!isAuthor){
            // return
             res.status(400).json('YOU ARE NOT THE AUTHOR!');
        }
        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath? newPath: postDoc.cover
        })
    })
})

app.listen(4000);
