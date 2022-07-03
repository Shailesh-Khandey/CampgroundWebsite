const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');

const { places, descriptors } = require('./seedHelpers');


mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];




const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '620a8d0f655002e0531dea01',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, explicabo eaque? Sit rerum harum similique recusandae suscipit libero amet voluptatum cumque provident soluta, culpa tempore repellat maiores. Pariatur, maxime cum.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                    ] 
            },
            images: [
                {
                     url : "https://res.cloudinary.com/dyu6gmuqw/image/upload/v1645417879/YelpCamp/lxm5ikq6zlijtyorglxm.jpg",
                    filename : "YelpCamp/lxm5ikq6zlijtyorglxm"
                },
                {
                    url : "https://res.cloudinary.com/dyu6gmuqw/image/upload/v1645417879/YelpCamp/uu25olxillxewrcyb9ze.jpg",
                    filename : "YelpCamp/uu25olxillxewrcyb9ze"
               }
            ]
        })
        await camp.save();

    }
}

seedDB().then(() => {
    mongoose.connection.close();
})