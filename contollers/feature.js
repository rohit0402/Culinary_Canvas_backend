const User = require("../models/User");

const addToFavourites = async (req, res) => {
    let userid = req.params.id;
    let favourite = req.body;
    try {
        let user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ success: false, message: "Please login first" });
        }

        const existingFav = user.favourites.some((fav) => fav.idMeal === favourite.idMeal);
        if (existingFav) {
            return res.status(401).json({ success: false, message: "Already added to favourites" });
        }
        user.favourites.push(favourite);
        await user.save();
        return res.status(200).json({ success: true, message: "Recipe added to favourites" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const removeFromFavourites = async (req, res) => {

    let userid = req.params.id;
    let favourite = req.body;
    try {
        let user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ success: false, message: "Please login first" });
        }

        user.favourites = user.favourites.filter((fav) => fav.idMeal !== favourite.idMeal);
        await user.save();
        return res.status(200).json({ success: true, message: "Recipe removed from favourites" });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const getFavourites = async (req, res) => {
    let userid = req.params.id;

    try {
        let user = await User.findById(userid);
        if (!user) {
            return res.status(400).json({ success: false, message: "Please log in" });
        }
        return res.status(200).json({ success: true, favourites: user.favourites });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}



module.exports = { addToFavourites,removeFromFavourites,getFavourites };
