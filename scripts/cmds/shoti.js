const axios = require("axios");
const request = require("request");
const fs = require("fs");

module.exports = {
  config: {
    name: "shoti",
    aliases: [],
    version: "1.0",
    author: "kshitiz",
    countDown: 20,
    role: 0,
    shortDescription: "get a temporary shoti haha",
    longDescription: "get a temporary shoti",
    category: "fun",
    guide: "{pn} shoti",
  },
  onStart: async function ({ api, event, message }) {
    try {

      message.reply("🕰 | Searching for shoti...");

      const response = await axios.post("https://your-shoti-api.vercel.app/api/v1/get", {
        apikey: "$shoti-1hecj3cvm6r1mf91948",
      });

      const file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");

      const rqs = request(encodeURI(response.data.data.url));
      rqs.pipe(file);

      file.on("finish", async () => {

        await api.sendMessage(
          {
            body: `@${response.data.data.user.username}`,
            attachment: fs.createReadStream(__dirname + "/cache/shoti.mp4"),
          },
          event.threadID,
          event.messageID
        );
      });

      file.on("error", (err) => {
        api.sendMessage(`Shoti Error: ${err}`, event.threadID, event.messageID);
      });
    } catch (error) {
      api.sendMessage("An error occurred while generating video:" + error, event.threadID, event.messageID);
    }
  },
};
