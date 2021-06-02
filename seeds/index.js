const mongoose = require('mongoose');
const Project = require('../models/project');

// connects database with app //
mongoose.connect('mongodb://localhost/goksenia', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
	console.log('Database connected!');
});

const seedDB = async () => {
	await Project.deleteMany({});

	const chatApp = new Project({
		urlName: 'chatApp',
		title: 'Chat App website',
		description: {
			homeTxt:
				'This is a homepage design and build for a concept project - a chat application. I have designed the page first then later built a responsive page in Webflow',
			projectTxt:
				'This is a homepage design and build for a concept project - a chat application. I have designed the page first then later built a responsive page in Webflow',
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
			hideProject: 0,
		},
		images: {
			imgHome: {
				url: 'https://res.cloudinary.com/drpmdiapv/image/upload/v1618691894/goksenia/cprz10jrzie0x9auq1cl.png',
				filename: 'goksenia/cprz10jrzie0x9auq1cl',
			},
			imgProject1: {
				url: 'https://res.cloudinary.com/drpmdiapv/image/upload/v1618767569/goksenia/i2vpzqhqz8e0tnhagv99.png',
				filename: 'goksenia/i2vpzqhqz8e0tnhagv99',
			},
			imgProject2: {
				url: '',
				filename: '',
			},
		},
		previewLink: 'https://chatapp-5671f6.webflow.io/',
	});
	await chatApp.save();

	const teamWeb = new Project({
		urlName: 'teamWeb',
		title: 'Team website',
		description: {
			homeTxt:
				'A full website design and build for a concept team collaboration platform. This website also includes a beautiful blog. I have built the website and the blog in Webflow which has one of the best CMS for blog hosting.',
			projectTxt:
				'A full website design and build for a concept team collaboration platform. This website also includes a beautiful blog. I have built the website and the blog in Webflow which has one of the best CMS for blog hosting.',
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
			hideProject: 0,
		},
		images: {
			imgHome: {
				url: 'https://res.cloudinary.com/drpmdiapv/image/upload/v1618691410/goksenia/n8csajyf6iuxjysg20aw.png',
				filename: 'goksenia/n8csajyf6iuxjysg20aw',
			},
			imgProject1: {
				url: 'https://res.cloudinary.com/drpmdiapv/image/upload/v1618692837/goksenia/jcvw2bbes0rdtf4pmbg4.png',
				filename: 'goksenia/jcvw2bbes0rdtf4pmbg4',
			},
			imgProject2: {
				url: '',
				filename: '',
			},
		},
	});
	await teamWeb.save();

	const wineryWeb = new Project({
		urlName: 'wineryWeb',
		title: 'Winery website',
		description: {
			homeTxt:
				'Dark premium homepage design for a concept project – Louis Eschenauer Winery. This is how a gastronomy brand homepage could look like.',
			projectTxt:
				'Dark premium homepage design for a concept project – Louis Eschenauer Winery. This is how a gastronomy brand homepage could look like.',
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
			hideProject: 0,
		},
		images: {
			imgHome: {
				url: 'https://res.cloudinary.com/drpmdiapv/image/upload/v1618691410/goksenia/infha0eyouqgrqrjps0n.png',
				filename: 'goksenia/infha0eyouqgrqrjps0n',
			},
			imgProject1: {
				url: 'https://res.cloudinary.com/drpmdiapv/image/upload/v1618692232/goksenia/vtcixqphw7kptc0d94fa.png',
				filename: 'goksenia/vtcixqphw7kptc0d94fa',
			},
			imgProject2: {
				url: '',
				filename: '',
			},
		},
	});
	await wineryWeb.save();

	const moodBooster = new Project({
		urlName: 'moodBoosterApp',
		title: 'Mood Boster App',
		description: {
			homeTxt:
				'Mental health caring application which includes journaling, different kinds of mood boosters and the emergency help center.',
			projectTxt:
				'Mental health caring application which includes journaling, different kinds of mood boosters and the emergency help center.',
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
			hideProject: 0,
		},
		images: {
			imgHome: {
				url: 'https://res.cloudinary.com/drpmdiapv/image/upload/v1618691410/goksenia/mna4dtfryyzhd74bt1kp.png',
				filename: 'goksenia/mna4dtfryyzhd74bt1kp',
			},
			imgProject1: {
				url: 'https://res.cloudinary.com/drpmdiapv/image/upload/v1618767569/goksenia/pmu4gslwjc7pdle9wiqf.png',
				filename: 'goksenia/pmu4gslwjc7pdle9wiqf',
			},
			imgProject2: {
				url: 'https://res.cloudinary.com/drpmdiapv/image/upload/v1618767569/goksenia/s8ifzuma8u5fdymnbjeh.png',
				filename: 'goksenia/s8ifzuma8u5fdymnbjeh',
			},
		},
		previewLink: 'https://devpost.com/software/mood-booster-r0seax',
	});
	await moodBooster.save();

	const nikeWeb = new Project({
		urlName: 'nikeConcept',
		title: 'Sportswear online-shop',
		description: {
			homeTxt:
				'A concept project of redesigning a homepage of a fitness online-store based on high-quality photography.',
			projectTxt:
				'The goal of the design was to make a concept of a vibrant modern and photography-based website to fit with an exciting, provocative, and free-spirited brand personality. The challenge and at the same time the main feature of this online store homepage is a combination of an unusual layout and an advantageous product demonstration.',
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
			hideProject: 0,
		},
		images: {
			imgHome: {
				url: 'https://res.cloudinary.com/drpmdiapv/image/upload/v1618691894/goksenia/t5aayb5dqgdpea8m5lfr.png',
				filename: 'goksenia/t5aayb5dqgdpea8m5lfr',
			},
			imgProject1: {
				url: 'https://res.cloudinary.com/drpmdiapv/image/upload/v1618766436/goksenia/uyxh7c7swv7cwklinufo.jpg',
				filename: 'goksenia/uyxh7c7swv7cwklinufo',
			},
			imgProject2: {
				url: '',
				filename: '',
			},
		},
		previewLink: '',
	});
	await nikeWeb.save();
};

seedDB().then(() => {
	console.log('Data seeded');
	console.log('Database disconnected!');
	mongoose.connection.close();
});
