// ESM
const Fastify = require('fastify')
const fastify = Fastify({
  logger: true
})
// import * as fs from 'fs';
const fs = require('fs')
const { Configuration, OpenAIApi } = require("openai");
// CommonJs
// const fastify = require('fastify')({
//   logger: true
// })

const whatIsMyName = 'Levi Bubeck'

const testApi = async () => {
    const configuration = new Configuration({
        apiKey: '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',
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createImageVariation(
        fs.createReadStream("willow3.png"),
        4,
        "1024x1024"
      );
      console.log('response', response.data.data)
      console.log('$$$$$$', whatIsMyName)
}

const imageEdit = async () => {
  const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.createImageEdit(
  fs.createReadStream("willow3.png"),
  undefined,
  "A cute baby dramatic light",
  2,
  "1024x1024"
);
console.log('response.data.data', response.data.data)
}

const createAnImage = async () => {
  const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
// "baseball game night thunderstorm as a DMT painting "
const response = await openai.createImage({
  prompt: "baseball game night thunderstorm as a DMT painting ",
  n: 4,
  size: "1024x1024",
});
console.log('response.data.data', response.data.data)
}



fastify.get('/', async (request, reply) => {
    // testApi()
    // imageEdit() need a mask to work
    createAnImage()
  return { hello: 'world' }
})

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()