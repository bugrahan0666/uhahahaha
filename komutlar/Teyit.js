const Discord = require('discord.js');
const rdb = require('quick.db');
exports.run = async (client, message, args) => {
  let kayıtYetkili = '783345825345568788' //Kayıt yetkilisi İD
  if(!message.member.roles.cache.has(kayıtYetkili))
  return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`);
  let kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!kişi) {
    let erkek = await rdb.fetch(`kayıte_${message.author.id}`) || '0'
    let kız = await rdb.fetch(`kayıtk_${message.author.id}`) || '0'
    let toplam = await rdb.fetch(`kayıttoplam_${message.author.id}`) || '0'
    let kayıtlılar = new Discord.MessageEmbed()
    .setColor('f5f5f5')
    .setTitle(`Teyit bilgileriniz`)
        .addField(`Erkek`, `\`\`\`xl\n${erkek}\`\`\``, true)
        .addField(`Kız`, `\`\`\`xl\n${kız}\`\`\``, true)
        .addField(`Toplam teyit sayınız`, `\`\`\`xl\n${toplam}\`\`\``)
    .setTimestamp()
    message.channel.send(kayıtlılar)
  }
    if(kişi) {
    let erkek = await rdb.fetch(`kayıte_${kişi.id}`) || '0'
    let kız = await rdb.fetch(`kayıtk_${kişi.id}`) || '0'
    let toplam = await rdb.fetch(`kayıttoplam_${kişi.id}`) || '0'
    let kayıtlılar = new Discord.MessageEmbed()
    .setColor('f5f5f5')
      .setDescription(`${kişi} adlı kullanıcısının teyit bilgileri`)
        .addField(`Erkek`, `\`\`\`xl\n${erkek}\`\`\``, true)
        .addField(`Kız`, `\`\`\`xl\n${kız}\`\`\``, true)
        .addField(`Toplam teyit sayınız`, `\`\`\`xl\n${toplam}\`\`\``)
    .setTimestamp()
    message.channel.send(kayıtlılar)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ks','teyit'],
  permLevel: 0
}
exports.help = {
  name: 'kayıtsay',
  description: "Teyit sayısını gösterir",
  usage: 'kayıtsay <nick>'
}