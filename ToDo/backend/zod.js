const zod = require('zod');

const schema = zod.object({
    title: zod.string(),
    description: zod.string()
})
module.exports = schema;