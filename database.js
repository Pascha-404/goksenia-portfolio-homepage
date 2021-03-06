const mongoose = require('mongoose');


// connects database with app //
mongoose.connect('mongodb://localhost/gokseniaDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connected!')
    })
    .catch((e) => {
        console.log(e)
    });


// database schema and model

const projectSchema = new mongoose.Schema({
    urlName: {
        type: String,
        required: true,
        min: 3
    },
    title: {
        type: String,
        required: true
    },
    description: {
        homeTxt: {
            type: String,
            required: true
        },
        projectTxt: {
            type: String,
            required: true
        }

    },
    images: {
        imgLink1: {
            type: String,
            required: true
        },
        imgLink2: {
            type: String
        }
    },
    previewLink: {
        type: String
    }
});

const Project = new mongoose.model('Project', projectSchema);

const teamWeb = new Project({
    urlName: "teamWeb",
    title: "Team website",
    description: {
        homeTxt: "A full website design and build for a concept team collaboration platform. This website also includes a beautiful blog. I have built the website and the blog in Webflow which has one of the best CMS for blog hosting.",
        projectTxt: "A full website design and build for a concept team collaboration platform. This website also includes a beautiful blog. I have built the website and the blog in Webflow which has one of the best CMS for blog hosting."
    },
    images: {
        imgLink1: "/img/team.png"
    }
})