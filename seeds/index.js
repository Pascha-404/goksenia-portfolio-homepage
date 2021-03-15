const mongoose = require('mongoose');
const Project = require('../models/project');

// connects database with app //
mongoose.connect('mongodb://localhost/gokseniaDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    console.log('Database connected!');
})

const seedDB = async () => {
    await Project.deleteMany({});

    const chatApp = new Project({
        urlName: "chatApp",
        title: "Chat App website",
        description: {
            homeTxt: "This is a homepage design and build for a concept project - a chat application. I have designed the page first then later built a responsive page in Webflow",
            projectTxt: "This is a homepage design and build for a concept project - a chat application. I have designed the page first then later built a responsive page in Webflow"
        },
        tags: {
            firstProject: false,
            latestWork: true,
            webDesign: true,
            webflow: true,
            concept: true,
            appDesign: false,
            hackathon: false,
            hideProject: false
        },
        images: {
            imgHome: "/img/groupChat.png",
            imgProject1: "/img/chatApp.png"
        },
        previewLink: "https://chatapp-5671f6.webflow.io/"
    });
    await chatApp.save();

    const teamWeb = new Project({
        urlName: "teamWeb",
        title: "Team website",
        description: {
            homeTxt: "A full website design and build for a concept team collaboration platform. This website also includes a beautiful blog. I have built the website and the blog in Webflow which has one of the best CMS for blog hosting.",
            projectTxt: "A full website design and build for a concept team collaboration platform. This website also includes a beautiful blog. I have built the website and the blog in Webflow which has one of the best CMS for blog hosting."
        },
        tags: {
            firstProject: false,
            latestWork: true,
            webDesign: true,
            webflow: true,
            concept: true,
            appDesign: false,
            hackathon: false,
            hideProject: false
        },
        images: {
            imgHome: "/img/groupTeam.png",
            imgProject1: "/img/team.png"
        }
    });
    await teamWeb.save();

    const wineryWeb = new Project({
        urlName: "wineryWeb",
        title: "Winery website",
        description: {
            homeTxt: "Dark premium homepage design for a concept project – Louis Eschenauer Winery. This is how a gastronomy brand homepage could look like.",
            projectTxt: "Dark premium homepage design for a concept project – Louis Eschenauer Winery. This is how a gastronomy brand homepage could look like."
        },
        tags: {
            firstProject: false,
            latestWork: true,
            webDesign: false,
            webflow: false,
            concept: true,
            webDesign: true,
            appDesign: false,
            hackathon: false,
            hideProject: false
        },
        images: {
            imgHome: "/img/groupWine.png",
            imgProject1: "/img/wholeWine.png"
        }
    });
    await wineryWeb.save();

    const moodBooster = new Project({
        urlName: "moodBoosterApp",
        title: "Mood Boster App",
        description: {
            homeTxt: "Mental health caring application which includes journaling, different kinds of mood boosters and the emergency help center.",
            projectTxt: "Mental health caring application which includes journaling, different kinds of mood boosters and the emergency help center."
        },
        tags: {
            firstProject: false,
            latestWork: false,
            webDesign: false,
            webflow: false,
            concept: true,
            appDesign: true,
            hackathon: true,
            hideProject: false
        },
        images: {
            imgHome: "/img/moodShifted.png",
            imgProject1: "/img/moodThemes.png",
            imgProject2: "/img/moodOverview.png"
        },
        previewLink: "https://devpost.com/software/mood-booster-r0seax"
    });
    await moodBooster.save();
}

seedDB().then(() => {
    console.log('Data seeded');
    console.log('Database disconnected!')
    mongoose.connection.close();
});