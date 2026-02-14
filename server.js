const express = require("express");
const { exec } = require("child_process");
const app = express();

app.use(express.json());

app.post("/api", (req, res) => {
  const url = req.body.url;
  const type = req.body.type;

  let cmd = type === "mp3"
    ? `yt-dlp -x --audio-format mp3 -g "${url}"`
    : `yt-dlp -f "bv*+ba/b" -g "${url}"`;

  exec(cmd, (err, stdout) => {
    if (err) return res.json({ error: "Invalid link" });
    res.json({ link: stdout.split("\n")[0] });
  });
});

app.listen(10000);
