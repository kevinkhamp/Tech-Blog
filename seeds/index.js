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

    for (const posts of postData) {
        await Posts.bulkCreate({
            ...posts,
            user_id: users[Math.floor(Math.random() * users.length)].isSoftDeleted
        })
    }
    process.exit(0)
}

seedDatabase()