const Discord = require('discord.js');
const rdb = require('quick.db');
const moment = require('moment');
//Başlangıç
exports.run = async (client, message, args) => {
let kayıtYetkili = '783345825345568788' //Yetkili
let erkekRole = '788615678751014963' //Verilecek
let kayıtsızRole = '783346366188355624' //Alınacak
let tag = '•' //İsmin önüne gelecek simge,tag   
//Rademoon
if(!message.member.roles.cache.has(kayıtYetkili))
  return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`).then(x => x.delete({timeout: 5000}));

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(message.member.roles.highest.position <= member.roles.highest.position) {
    let yüksekte = new Discord.MessageEmbed()
    .setDescription(`Bu kişiyi kayıt edemiyorum çünkü yetkisi benden üstte.`)
    .setTimestamp()
    .setColor('f5f5f5');
    message.react(client.emojiler.ret).catch();
    return message.channel.send(yüksekte).then(x => x.delete({timeout: 5000}));
  }
  let isim = args[1]
  let yaş = args[2]
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
  if (!isim) return message.channel.send('Bir isim yazmalısın.').then(x => x.delete({timeout: 5000}));
  if (!yaş) return message.channel.send('Bir yaş yazmalısın.').then(x => x.delete({timeout: 5000}));
  if (isNaN(yaş)) return message.channel.send('Yaş sadece sayı olarak kabul edilir.').then(x => x.delete({timeout: 5000}));
let gün = moment(message.createdAt).format("DD.");
let yıl = moment(message.createdAt).format("YYYY HH:mm:ss");
let ay = moment(message.createdAt).format("MM.")
.replace("Ocak").replace("Şubat")
.replace("Mart").replace("Nisan")
.replace("Mayıs").replace("Haziran")
.replace("Temmuz").replace("Ağustos")
.replace("Eylül").replace("Ekim")
.replace("Kasım").replace("Aralık");
  let kayıtlımı = await rdb.fetch(`kayıtlıkişi_${member}`)
  let eskiismi = await rdb.fetch(`kayıtlıisim_${member}`)
  let toplamaisim = `${gün}${ay}${yıl} tarihin de <@${message.author.id}> tarafından \`${tag} ${isim} | ${yaş}\` **(<@&${erkekRole}>)** olarak kayıtlı.`
  setTimeout(function(){
  member.setNickname(`${tag} ${isim} | ${yaş}`)
  },100)
    setTimeout(function(){
  member.roles.add(erkekRole)
  },100)
  setTimeout(function(){
  member.roles.remove(kayıtsızRole)
  },100)

let toplam = await rdb.fetch(`kayıttoplam_${message.author.id}`) || '0'

  if(kayıtlımı !== 'evet') {
  rdb.add(`kayıte_${message.author.id}`, 1)
  rdb.add(`kayıttoplam_${message.author.id}` , 1) 
  rdb.set(`kayıtlıkişi_${member}`, 'evet')
  rdb.set(`kayıtlıisim_${member}`, toplamaisim)
  rdb.push(`eskiad_${member.id}`, toplamaisim)
  rdb.add(`toplamik_${member.id}`, 1)
  let embed = new Discord.MessageEmbed()
  .setColor('f5f5f5')
  .setDescription(`${member} kişisi <@&${erkekRole}> olarak kayıt edildi.`)
  .setTimestamp()
   message.react(client.emojiler.onay).catch();
message.channel.send(embed).then(x => x.delete({timeout: 15000}));
  } 
  if(kayıtlımı === 'evet') {
  rdb.set(`kayıtlıisim_${member}`, toplamaisim)
  rdb.push(`eskiad_${member.id}`, toplamaisim)
  rdb.add(`toplamik_${member.id}`, 1)
    let embed = new Discord.MessageEmbed()
  .setDescription(`<a:ret:780217763708534785> <@${message.author.id}> üzgünüm bu kullanıcıyı tekrar kayıt ettim fakat sana herhangi bir teyit puanı ekleyemedim çünkü veritabanın da kayıtlar buldum.

${eskiismi}

\`.isimler ${member.id}\` komutuyla üyenin geçmiş isimlerine bakmanız tavsiye edilir.`)
  .setTimestamp()
  .setColor('f5f5f5')
message.react(client.emojiler.ret).catch();
message.channel.send(embed).then(x => x.delete({timeout: 25000}));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['erkek'],
  permLevel: 0
}
exports.help = {
  name: 'e',
  description: "erkek kullanıcıları kayıt etme komutu.",
  usage: 'erkek @kişi isim yaş'
}