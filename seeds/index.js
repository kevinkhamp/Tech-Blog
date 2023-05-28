const sequelize = require('../config/connection')
const { User, Posts } = require('../models')

const userData = require('./userData.json')
const postData = require('./postsData.json')

const seedDatabase = async () => {
    await sequelize.sync({force: true})

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    })

    const posts = await Posts.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    })
    
    process.exit(0)
}

seedDatabase()