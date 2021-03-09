// Embed

const Discord = require('discord.js');
const embedCodex = new Discord.MessageEmbed();

embedCodex.setColor('#FF6600')
.setAuthor('Codex Bruxellensis', 'https://i.imgur.com/NNZm9nx.png', 'https://codex.brussels/')
.setThumbnail('https://i.imgur.com/NNZm9nx.png')
//.setTitle('Codex Lyrics');
//.setDescription('__To look up the lyrics use: __*-vub codex lyrics [songname]*');

// Functions

const  fs = require('fs');
const lyricsFiles = fs.readdirSync(`./lyrics/`).filter(file => file.endsWith('.txt'));


// module

module.exports = {
  name: 'codex lyrics',
  description: "this is a lyric command!",
  execute(message, args){
    if (!args) {
      message.channel.send("Please mention a song: codex lyrics [songname]")
      message.channel.send('\n\n To look up the the list of songs use the command: codex listnew');
    }

    else if (args) {

      for(const file of lyricsFiles){
//        console.log(file)
        const songargs = file.toLowerCase().replace(/.txt/g, "").split(' ');

//        console.log(songargs);
        if (args.every(arg => songargs.includes(arg))) {
          var checkList = true;
          var lookupSong = file;

          console.log("Every- " + args);
          console.log("Every- " + songargs);
          break
        } 
        else {
          var checkList = false;
        }
      };   
    
      for (const file of lyricsFiles){
        if (checkList === true) {
          break
        };
        
//        console.log(file)
        const songargs = file.toLowerCase().replace(/.txt/g, "").split(' ');

//        console.log(songargs);
        if (args.some(arg => songargs.includes(arg))) {
          var checkList = true;
          var lookupSong = file;
          console.log("Some- " + args);
          console.log("Some- " + songargs);
          break
        } 
        else {
          var checkList = false;
        }
      };  
    };

    if (checkList === false) {
      embedCodex.fields = []
      embedCodex.addFields({name: "Song not found", value: "The song your were looking for does not exist \n\n To look up the the list of songs use the command: *-vub codex index*", inline: true});

      message.channel.send(embedCodex);
    }

    else if (checkList === true) {

      const lyricstxt = fs.readFileSync(`./lyrics/${lookupSong}`, 'utf8');

//      console.log(lyricstxt);
      console.log(lyricstxt.length);
      if (lyricstxt.length <= 1) {
        console.log("less than 1024");
        embedCodex.fields = [];
        embedCodex.addFields({name: lookupSong.replace(/.txt/g, ""), value: lyricstxt, inline: false});

        message.channel.send(embedCodex);
      }
      
      else if (lyricstxt.length <= 6000) {
        console.log("less than 6000");


        const { Util, MessageEmbed } = require("discord.js")

        // Returns an array of strings
        const [first, ...rest] = Util.splitMessage(lyricstxt, { maxLength: 1024 })

        // Set base options for embed, initially it has the first 4096 characters of the lyrics
        embedCodex.fields = [];
        embedCodex.addFields({name: lookupSong.replace(/.txt/g, ""), value: first})
        // Max characters were not reached so there is no "rest" in the array
        if (!rest.length) {
        // Send just the embed with the first element from the array
          message.channel.send(embedCodex)
        }

        // Get the other parts of the array with max char count
        for (const text of rest) {
        // Add new description to the base embed
          embedCodex.addFields({name: "‎", value: text})

          message.channel.send(embedCodex)
        }
      }
    }
  }
}
