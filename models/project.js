const mongoose = require('mongoose')

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
    tags: {
        latestWork: {
            type: Boolean
        },
        webDesign: {
            type: Boolean
        },
        webflow: {
            type: Boolean
        },
        concept: {
            type: Boolean
        },
        appDesign: {
            type: Boolean
        },
        hackathon: {
            type: Boolean
        }
    },
    images: {
        imgHome: {
            type: String,
            required: true
        },
        imgProject1: {
            type: String,
            required: true
        },
        imgProject2: {
            type: String
        }
    },
    previewLink: {
        type: String
    }
});

const Project = new mongoose.model('Project', projectSchema);

const chatApp = new Project({
    urlName: "chatApp",
    title: "Chat App website",
    description: {
        homeTxt: "This is a homepage design and build for a concept project - a chat application. I have designed the page first then later built a responsive page in Webflow",
        projectTxt: "This is a homepage design and build for a concept project - a chat application. I have designed the page first then later built a responsive page in Webflow"
    },
    tags: {
        latestWork: true,
        webDesign: true,
        webflow: true,
        concept: true
    },
    images: {
        imgHome: "/img/groupChat.png",
        imgProject1: "/img/chatApp.png"
    },
    previewLink: "https://chatapp-5671f6.webflow.io/"
})

const teamWeb = new Project({
    urlName: "teamWeb",
    title: "Team website",
    description: {
        homeTxt: "A full website design and build for a concept team collaboration platform. This website also includes a beautiful blog. I have built the website and the blog in Webflow which has one of the best CMS for blog hosting.",
        projectTxt: "A full website design and build for a concept team collaboration platform. This website also includes a beautiful blog. I have built the website and the blog in Webflow which has one of the best CMS for blog hosting."
    },
    tags: {
        latestWork: true,
        webDesign: true,
        webflow: true,
        concept: true
    },
    images: {
        imgHome: "/img/groupTeam.png",
        imgProject1: "/img/team.png"
    }
})

const wineryWeb = new Project({
    urlName: "wineryWeb",
    title: "Winery website",
    description: {
        homeTxt: "Dark premium homepage design for a concept project – Louis Eschenauer Winery. This is how a gastronomy brand homepage could look like.",
        projectTxt: "Dark premium homepage design for a concept project – Louis Eschenauer Winery. This is how a gastronomy brand homepage could look like."
    },
    tags: {
        latestWork: true,
        concept: true,
        webDesign: true
    },
    images: {
        imgHome: "/img/groupWine.png",
        imgProject1: "/img/wholeWine.png"
    }
})

const moodBooster = new Project({
    urlName: "moodBoosterApp",
    title: "Mood Boster App",
    description: {
        homeTxt: "Mental health caring application which includes journaling, different kinds of mood boosters and the emergency help center.",
        projectTxt: "Mental health caring application which includes journaling, different kinds of mood boosters and the emergency help center."
    },
    tags: {
        appDesign: true,
        hackathon: true,
        concept: true
    },
    images: {
        imgHome: "/img/moodShifted.png",
        imgProject1: "/img/moodThemes.png",
        imgProject2: "/img/moodOverview.png"
    },
    previewLink: "https://devpost.com/software/mood-booster-r0seax"
})

module.exports = Project;