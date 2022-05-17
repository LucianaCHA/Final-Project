const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync({ force: false }).then(() => {
	server.listen(process.env.PORT, () => {
		console.log(`%s listening at ${process.env.PORT}`);
	});
});
/*hola que hace */

setTimeout(() => {
	const { Plans, Users } = require("./src/db.js");

var superAdmin = Users.findOrCreate({
	where: {
		email: "soyadmin@henry.com",
		password: 'admin123',
		name: "Henry Hero",
		nickname: "Henry-Hero",
		role: "ROLE_SUPER_ADMIN",
	},
});
var plan1 = Plans.findOrCreate({
	where: {
		name: "monthly",
		amount: 7,
	},
});

var plan2 = Plans.findOrCreate({
	where: {
		name: "annual",
		amount: 70,
	},
});
var plan3 = Plans.findOrCreate({
	where: {
		name: "admin",
		amount: 0,
	},
});
var plan4 = Plans.findOrCreate({
	where: {
		name: "superAdmin",
		amount: 0,
	},
});

let planes = Plans.findAll();

Promise.all([plan1, plan2, plan3, plan4, superAdmin, planes])
	.then((res) => {
		console.log([plan1, superAdmin]);
	})
	.then((res) => {
		console.log(planes.Promise);
	});//54465

}, 15000);