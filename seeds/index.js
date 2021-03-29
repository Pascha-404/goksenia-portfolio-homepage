const mongoose = require('mongoose');
const Project = require('../models/project');

// connects database with app //
mongoose.connect('mongodb://localhost/goksenia', {
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
            firstProject: 1,
            secondProject: 0,
            latestWork: 1,
            webDesign: 1,
            webflow: 1,
            concept: 1,
            appDesign: 0,
            hackathon: 0,
            hideProject: 0
        },
        images: {
            imgHome: "/img/projectHome/groupChat.png",
            imgProject1: "/img/projectPage/chatApp.png"
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
            firstProject: 0,
            secondProject: 0,
            latestWork: 1,
            webDesign: 1,
            webflow: 1,
            concept: 1,
            appDesign: 0,
            hackathon: 0,
            hideProject: 0
        },
        images: {
            imgHome: "/img/projectHome/groupTeam.png",
            imgProject1: "/img/projectPage/team.png"
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
            firstProject: 0,
            secondProject: 0,
            latestWork: 1,
            webDesign: 0,
            webflow: 0,
            concept: 1,
            webDesign: 1,
            appDesign: 0,
            hackathon: 0,
            hideProject: 0
        },
        images: {
            imgHome: "/img/projectHome/groupWine.png",
            imgProject1: "/img/projectPage/wholeWine.png"
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
            firstProject: 0,
            secondProject: 0,
            latestWork: 0,
            webDesign: 0,
            webflow: 0,
            concept: 1,
            appDesign: 1,
            hackathon: 1,
            hideProject: 0
        },
        images: {
            imgHome: "/img/projectHome/moodShifted.png",
            imgProject1: "/img/projectPage/moodThemes.png",
            imgProject2: "/img/projectPage/moodOverview.png"
        },
        previewLink: "https://devpost.com/software/mood-booster-r0seax"
    });
    await moodBooster.save();

    const nikeWeb = new Project({
        urlName: "nikeConcept",
        title: "Sportswear online-shop",
        description: {
            homeTxt: "A concept project of redesigning a homepage of a fitness online-store based on high-quality photography.",
            projectTxt: "The goal of the design was to make a concept of a vibrant modern and photography-based website to fit with an exciting, provocative, and free-spirited brand personality. The challenge and at the same time the main feature of this online store homepage is a combination of an unusual layout and an advantageous product demonstration."
        },
        tags: {
            firstProject: 0,
            secondProject: 1,
            latestWork: 1,
            webDesign: 1,
            webflow: 0,
            concept: 1,
            appDesign: 0,
            hackathon: 0,
            hidenProject: 0
        },
        images: {
            imgHome: "/img/projectHome/groupNike.png",
            imgProject1: "/img/projectPage/nike.jpg"
        },
        previewLink: ""
    });
    await nikeWeb.save();
}

seedDB().then(() => {
    console.log('Data seeded');
    console.log('Database disconnected!')
    mongoose.connection.close();
});