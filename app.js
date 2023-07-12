const { spawn } = require("child_process");
const path = require("path");
const cron = require("node-cron");

/* 
Basic mongo dump and restore commands, they contain more options you can have a look at main page for both of them.
1. mongodump --db=amatik_db --archive=./amatik_db.gzip --gzip
2. mongorestore --db=amatik_db --archive=./amatik_db.gzip --gzip
Using mongodump - without any args:
  will dump each and every db into a folder called "dump" in the directory from where it was executed.
Using mongorestore - without any args:
  will try to restore every database from "dump" folder in current directory, if "dump" folder does not exist then it will simply fail.
*/

const DB_NAME = "amatik_db";
const ARCHIVE_PATH = path.join(__dirname, `${DB_NAME}.gzip`);

// 1. Cron expression for every 5 seconds - */5 * * * * *
// 2. Cron expression for every night at 23:30 hours (30 23 * * *)
// Note: 2nd expression only contains 5 fields, since seconds is not necessary

// Scheduling the backup eevery night at 23:30 hours (using node-cron) -- https://crontab.guru/
cron.schedule("27 21 * * *", () => backupMongoDB());

function backupMongoDB() {
  const child = spawn("mongodump", [
    `--db=${DB_NAME}`,
    `--archive=${ARCHIVE_PATH}`,
    "--gzip",
  ]);

  child.stdout.on("data", (data) => {
    console.log("stdout:\n", data);
  });
  child.stderr.on("data", (data) => {
    console.log("stderr:\n", Buffer.from(data).toString());
  });
  child.on("error", (error) => {
    console.log("error:\n", error);
  });
  child.on("exit", (code, signal) => {
    if (code) console.log("Process exit with code:", code);
    else if (signal) console.log("Process killed with signal:", signal);
    else console.log("Backup is successfull ✅");
  });
}
