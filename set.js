 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE1VNnlWS2h3L3JvbWV4TlduS0VwUVJSRm5aV0E4WFhabHFJZEtjOXMxZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibzUvLzhvYktvaHF4TXRuZjlaZGJFS2doYlZ5aGZoREwyYlJUMXVtb3RIYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrT3UrdTNKQmdPTXR1RXduR293SWZMYTFKR01rYjVqVUZoa29OTHVla0dzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5c1dLeTN2Wk85OVVMSkZUYjZocTNxSlZUbDBBQkFwd2dJZ2J6Zm1uQkdNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNBUjFCZ1RucmxVUGQrUTBQZTNvUHpPWVkwdldROWJLSjdMMTN4QWlCMTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImUxdll6TDQvR0ptZTdpYkFTazAvL3NCN25RQUo2M0tzRytnZUN0RGZORW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE4zdzVZd0NVSkNnRWJZQTFUUXgxQ1pwcFBsNFg3YmdLYk52SG9odEwwRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDFVNHhqcjdrODY0Y2NMT2R0L1dqN3pDa0dEaEh1QldNRlgwNWQ1c0xGcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVNbDJua283ZnhiNVRvS3g2RGxnZUhlYUF4cXRmNVQzbkF1RVpscDR4SHVEbGN0QXZpUlNZRGgrL2ZuVDlEVUZ1YnJLVUNYenNjcnF0eE5VVnV5UWdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTcsImFkdlNlY3JldEtleSI6IkJrQTZXbjNyQmpwK0MyNUhQenZYY01HejlyU21xOUMxR3J6RURiTWU4cnc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InVKV0pta0Y5UmwyVU5oaE1VSC1kN0EiLCJwaG9uZUlkIjoiMjM3OTMxMzUtZGE3NS00MDY3LWFiZGQtYzVhYWJmOTgyNGUyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFGVFFGWlgwTzU5ZllDTVFWUUJhUjhWbmJqWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCR0xGRXdONm12RkJHOElKdnlEejM1ZWgvc0U9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUlhCWkFWTEYiLCJtZSI6eyJpZCI6IjI1Njc0MDg3NDc3Nzo0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkFuZHkifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ptQ3dYRVErZkNhdGdZWUFpQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlFuOGFjVFVZSzVUcXNPcFpCb0MzeThsREVCdy9FM2FsQXU0OEc2dGF4bkk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlVCdmkvMDVPM05PN3FrTCtZMXhjY2w2bUt1YkJVbFFBTmljWFFsT2xqRUg1NTAzTjJUVUVxWDZ0dUp4aFBGOEsxekR4VU1iRXRFcTk5bjJmeU9xcUJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ0dVBRWGlxK0NzMml2dEs5WlBQNzhVcWcyb3U2TVVZR1grQW42dEYyK0xUN2FKdjU4cnB6YXVBRmZaM3dwdkN0TmJSUGZkZEdPUGtOeFpzRWx6UGlqZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1Njc0MDg3NDc3Nzo0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVKL0duRTFHQ3VVNnJEcVdRYUF0OHZKUXhBY1B4TjJwUUx1UEJ1cldzWnkifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQyOTk0MDAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBS3IwIn0=',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923072380380",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
