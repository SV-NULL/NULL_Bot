const ClientFile = require("../functions/client")
const client = ClientFile.GetClient()
const nullText = require("../messageResponses/NULLResponses.json")
const nullGif = require("../messageResponses/NULLGifs.json")
const animeText = require("../messageResponses/Anime.json");
const animeGif = require("../messageResponses/AnimeGifs.json");
const bobrGif = require("../messageResponses/BobrGifs.json");

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    const msgContent = message.content.toLowerCase()

    const isAnime = msgContent.includes("anime");
    const isNull = msgContent.includes("null");
    const isGif = msgContent.includes("gif");
    const isBobr = msgContent.includes("bobr");

    if (isAnime && isGif) return replyToMessage(message, getRandomLine(animeGif));
    if (isNull && isGif) return replyToMessage(message, getRandomLine(nullGif));
    if (isBobr) return replyToMessage(message, getRandomLine(bobrGif));

    if (isAnime) return replyToMessage(message, getRandomLine(animeText));
    if (isNull) return replyToMessage(message, getRandomLine(nullText));
});

function getRandomLine(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function replyToMessage(message, reply) {
    message.reply(reply);
}
