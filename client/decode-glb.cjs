const fs = require("fs");
const base64Data = `data:application/octet-stream;base64,AAAA...بقية النص...`;
const base64String = base64Data.split(",")[1];
const buffer = Buffer.from(base64String, "base64");
fs.writeFileSync("duck.glb", buffer);

console.log("✅ duck.glb created successfully!");
