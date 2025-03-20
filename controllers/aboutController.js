const About = require("../models/about");
//id, bio, email
// Check if buyer and ad exist
// const [buyer, ad] = await Promise.all([
//     Buyer.findByPk(buyerId),
//     Ad.findByPk(adId)
//   ]);
exports.createAbout = async (req, res) =>{
    try{
        const userId = req.params.id;
        const { bio, email } = req.body;
        About.create({
            userId: userId,
            bio: bio,
            email: email,
        })

        return res.status(201).json({success: true, message: 'About created successfuly'})
    }
    catch(err){
        return res.status(500).json({success: false, message: 'Error creating about' , error: err})
    }
};
exports.getAbout = async (req, res) =>{
    try{
        const userId = req.params.id;
        const about = await About.findOne({
            where: { userId: userId },
        }); 

        return res.status(200).json({success: true, message: about})

    }
    catch(err){
        return res.status(500).json({success: false, message: 'Error retrieving about' , error: err})   
    }
};
exports.updateAbout = async (req, res) =>{
    try{
        const userId = req.params.id;
        const about = await About.findOne({
            where: { userId: userId },
        }); 

        if (!about) {
            return res.status(404).json({ message: "No about found for this user." });
        }
        const { bio, email } = req.body;

        if(bio){
            about.bio = bio;

        }
        if(email){
            about.email = email;

        }
            await about.save();
            return res.status(200).json({ message: "About updated succesfully" });
    }
    catch(err){
        return res.status(500).json({success: false, message: 'Error updating about' , error: err})
    }
};
exports.deleteAbout = async (req, res) =>{
    try{
        const userId = req.params.id;
        const about = await About.findOne({
            where: { userId: userId },
        }); 
        about.destroy();
        return res.status(200).json({ message: "About deleted succesfully" });
    }
    catch{
        return res.status(500).json({success: false, message: 'Error deleting about' , error: err})
    }
};


