import AmberGif from '../assets/genshin-table-gifs/amber.gif'
import AlbedoGif from '../assets/genshin-table-gifs/albedo.gif'
import BarbaraGif from '../assets/genshin-table-gifs/barbara.gif'
import BeidouGif from '../assets/genshin-table-gifs/beidou.gif'
import BennettGif from '../assets/genshin-table-gifs/bennett.gif'
import ChongyunGif from '../assets/genshin-table-gifs/chongyun.gif'
import DilucGif from '../assets/genshin-table-gifs/diluc.gif'
import DionaGif from '../assets/genshin-table-gifs/diona.gif'
import EulaGif from '../assets/genshin-table-gifs/eula.gif'
import FischlGif from '../assets/genshin-table-gifs/fischl.gif'
import GanyuGif from '../assets/genshin-table-gifs/ganyu.gif'
import HuTaoGif from '../assets/genshin-table-gifs/hutao.gif'
import JeanGif from '../assets/genshin-table-gifs/jean.gif'
import KazuhaGif from '../assets/genshin-table-gifs/kaedehara kazuha.gif'
import KaeyaGif from '../assets/genshin-table-gifs/kaeya.gif'
import AyakaGif from '../assets/genshin-table-gifs/kamisato ayaka.gif'
import KeqingGif from '../assets/genshin-table-gifs/keqing.gif'
import KleeGif from '../assets/genshin-table-gifs/klee.gif'
import KujouSaraGif from '../assets/genshin-table-gifs/kujou sara.gif'
import LisaGif from '../assets/genshin-table-gifs/lisa.gif'
import MonaGif from '../assets/genshin-table-gifs/mona.gif'
import NingguangGif from '../assets/genshin-table-gifs/ningguang.gif'
import NoelleGif from '../assets/genshin-table-gifs/noelle.gif'
import QiqiGif from '../assets/genshin-table-gifs/qiqi.gif'
import RaidenGif from '../assets/genshin-table-gifs/raiden shogun.gif'
import RazorGif from '../assets/genshin-table-gifs/razor.gif'
import RosariaGif from '../assets/genshin-table-gifs/rosaria.gif'
import KokomiGif from '../assets/genshin-table-gifs/sangonomiya kokomi.gif'
import SayuGif from '../assets/genshin-table-gifs/sayu.gif'
import SucroseGif from '../assets/genshin-table-gifs/sucrose.gif'
import TartagliaGif from '../assets/genshin-table-gifs/tartaglia.gif'
import ThomaGif from '../assets/genshin-table-gifs/thoma.gif'
import TravelerGif from '../assets/genshin-table-gifs/lumine.gif'
import VentiGif from '../assets/genshin-table-gifs/venti.gif'
import XianglingGif from '../assets/genshin-table-gifs/xiangling.gif'
import XiaoGif from '../assets/genshin-table-gifs/xiao.gif'
import XingqiuGif from '../assets/genshin-table-gifs/xingqiu.gif'
import XinyanGif from '../assets/genshin-table-gifs/xinyan.gif'
import YanfeiGif from '../assets/genshin-table-gifs/yanfei.gif'
import YoimiyaGif from '../assets/genshin-table-gifs/yoimiya.gif'
import ZhongliGif from '../assets/genshin-table-gifs/zhongli.gif'

export default class SampleDataGenerator {
  static sampleTableHeader(empty = false) {
    if (empty) {
      return []
    }
    return [
      {
        title: 'Full Name',
        format: '{first_name} {last_name}',
        keys: ['first_name', 'last_name'],
      },
      {
        title: 'Email Address',
        format: '{email}',
        keys: ['email'],
      },
      {
        title: 'IP Address',
        format: '{ip_address}',
        keys: ['ip_address'],
      },
    ]
  }
  static sampleTableData(empty = false) {
    if (empty) {
      return []
    }
    return [
      {
        id: 1,
        first_name: 'Raviv',
        last_name: 'Louthe',
        email: 'rlouthe0@intel.com',
        gender: 'Female',
        ip_address: '58.27.215.96',
      },
      {
        id: 2,
        first_name: 'Stirling',
        last_name: 'Swaysland',
        email: 'sswaysland1@php.net',
        gender: 'Genderfluid',
        ip_address: '48.19.77.17',
      },
      {
        id: 3,
        first_name: 'Clevey',
        last_name: 'Lucks',
        email: 'clucks2@elegantthemes.com',
        gender: 'Polygender',
        ip_address: '86.195.196.177',
      },
      {
        id: 4,
        first_name: 'Chris',
        last_name: 'Salasar',
        email: 'csalasar3@utexas.edu',
        gender: 'Bigender',
        ip_address: '84.167.247.177',
      },
      {
        id: 5,
        first_name: 'Werner',
        last_name: 'Dearnaly',
        email: 'wdearnaly4@ameblo.jp',
        gender: 'Non-binary',
        ip_address: '88.147.101.142',
      },
      {
        id: 6,
        first_name: 'Merwin',
        last_name: 'Mackett',
        email: 'mmackett5@va.gov',
        gender: 'Male',
        ip_address: '45.148.216.149',
      },
      {
        id: 7,
        first_name: 'Sharona',
        last_name: 'Backwell',
        email: 'sbackwell6@nyu.edu',
        gender: 'Polygender',
        ip_address: '229.156.138.220',
      },
      {
        id: 8,
        first_name: 'Phylys',
        last_name: 'Maple',
        email: 'pmaple7@unblog.fr',
        gender: 'Bigender',
        ip_address: '156.252.219.197',
      },
      {
        id: 9,
        first_name: 'Augy',
        last_name: 'Atherton',
        email: 'aatherton8@seattletimes.com',
        gender: 'Genderqueer',
        ip_address: '170.178.151.118',
      },
      {
        id: 10,
        first_name: 'Lemuel',
        last_name: 'Garnall',
        email: 'lgarnall9@home.pl',
        gender: 'Female',
        ip_address: '187.53.3.186',
      },
      {
        id: 11,
        first_name: 'Carmita',
        last_name: 'Dayes',
        email: 'cdayesa@fema.gov',
        gender: 'Female',
        ip_address: '27.141.32.248',
      },
      {
        id: 12,
        first_name: 'Jocko',
        last_name: 'Ashenhurst',
        email: 'jashenhurstb@businessweek.com',
        gender: 'Polygender',
        ip_address: '176.78.69.228',
      },
      {
        id: 13,
        first_name: 'Engelbert',
        last_name: 'McMechan',
        email: 'emcmechanc@bizjournals.com',
        gender: 'Polygender',
        ip_address: '67.77.69.112',
      },
      {
        id: 14,
        first_name: 'Mignonne',
        last_name: 'Stieger',
        email: 'mstiegerd@fda.gov',
        gender: 'Agender',
        ip_address: '157.134.247.191',
      },
      {
        id: 15,
        first_name: 'Salli',
        last_name: 'Rylstone',
        email: 'srylstonee@miibeian.gov.cn',
        gender: 'Agender',
        ip_address: '90.210.10.248',
      },
      {
        id: 16,
        first_name: 'Janey',
        last_name: 'Bentick',
        email: 'jbentickf@ucoz.com',
        gender: 'Genderfluid',
        ip_address: '94.31.228.164',
      },
      {
        id: 17,
        first_name: 'Pete',
        last_name: 'Marsie',
        email: 'pmarsieg@squidoo.com',
        gender: 'Agender',
        ip_address: '181.254.247.8',
      },
      {
        id: 18,
        first_name: 'Jefferson',
        last_name: 'Quantrell',
        email: 'jquantrellh@discovery.com',
        gender: 'Agender',
        ip_address: '119.112.52.2',
      },
      {
        id: 19,
        first_name: 'Shandra',
        last_name: 'Aartsen',
        email: 'saartseni@yahoo.com',
        gender: 'Non-binary',
        ip_address: '226.52.60.243',
      },
      {
        id: 20,
        first_name: 'Jake',
        last_name: 'Setch',
        email: 'jsetchj@java.com',
        gender: 'Genderfluid',
        ip_address: '70.177.25.70',
      },
      {
        id: 21,
        first_name: 'Brooks',
        last_name: 'Dutnell',
        email: 'bdutnellk@slideshare.net',
        gender: 'Polygender',
        ip_address: '151.21.244.231',
      },
      {
        id: 22,
        first_name: 'See',
        last_name: 'Paskerful',
        email: 'spaskerfull@redcross.org',
        gender: 'Non-binary',
        ip_address: '184.0.128.81',
      },
      {
        id: 23,
        first_name: 'Benny',
        last_name: 'Sissens',
        email: 'bsissensm@jigsy.com',
        gender: 'Genderqueer',
        ip_address: '6.228.144.15',
      },
      {
        id: 24,
        first_name: 'Shayna',
        last_name: 'Keerl',
        email: 'skeerln@de.vu',
        gender: 'Polygender',
        ip_address: '7.123.237.222',
      },
      {
        id: 25,
        first_name: 'Shay',
        last_name: 'Wathan',
        email: 'swathano@wunderground.com',
        gender: 'Agender',
        ip_address: '83.180.133.195',
      },
      {
        id: 26,
        first_name: 'Cordey',
        last_name: 'Ficken',
        email: 'cfickenp@tuttocitta.it',
        gender: 'Bigender',
        ip_address: '186.136.101.159',
      },
      {
        id: 27,
        first_name: 'Carleton',
        last_name: 'Fielding',
        email: 'cfieldingq@theatlantic.com',
        gender: 'Bigender',
        ip_address: '41.247.190.109',
      },
      {
        id: 28,
        first_name: 'Nikola',
        last_name: 'Lowton',
        email: 'nlowtonr@salon.com',
        gender: 'Genderqueer',
        ip_address: '187.232.219.61',
      },
      {
        id: 29,
        first_name: 'Shandeigh',
        last_name: 'Casetti',
        email: 'scasettis@hubpages.com',
        gender: 'Female',
        ip_address: '142.123.208.32',
      },
      {
        id: 30,
        first_name: 'Anita',
        last_name: 'Chasmor',
        email: 'achasmort@ted.com',
        gender: 'Female',
        ip_address: '212.235.221.50',
      },
      {
        id: 31,
        first_name: 'Curr',
        last_name: 'Gibbons',
        email: 'cgibbonsu@toplist.cz',
        gender: 'Agender',
        ip_address: '118.36.3.102',
      },
      {
        id: 32,
        first_name: 'Enrica',
        last_name: 'Challiner',
        email: 'echallinerv@mtv.com',
        gender: 'Polygender',
        ip_address: '194.63.156.132',
      },
      {
        id: 33,
        first_name: 'Consuela',
        last_name: 'Rusk',
        email: 'cruskw@storify.com',
        gender: 'Non-binary',
        ip_address: '179.82.221.32',
      },
      {
        id: 34,
        first_name: 'Ossie',
        last_name: 'Oxenbury',
        email: 'ooxenburyx@elpais.com',
        gender: 'Polygender',
        ip_address: '4.215.30.168',
      },
      {
        id: 35,
        first_name: 'Fawne',
        last_name: 'Hush',
        email: 'fhushy@github.com',
        gender: 'Male',
        ip_address: '186.55.14.147',
      },
      {
        id: 36,
        first_name: 'Ludovika',
        last_name: 'Haffner',
        email: 'lhaffnerz@buzzfeed.com',
        gender: 'Male',
        ip_address: '124.172.40.228',
      },
      {
        id: 37,
        first_name: 'Dani',
        last_name: 'Creggan',
        email: 'dcreggan10@barnesandnoble.com',
        gender: 'Agender',
        ip_address: '210.97.151.231',
      },
      {
        id: 38,
        first_name: 'Alejoa',
        last_name: 'Stockney',
        email: 'astockney11@xing.com',
        gender: 'Genderfluid',
        ip_address: '146.175.174.244',
      },
      {
        id: 39,
        first_name: 'Jose',
        last_name: 'Leathley',
        email: 'jleathley12@i2i.jp',
        gender: 'Genderfluid',
        ip_address: '182.116.105.215',
      },
      {
        id: 40,
        first_name: 'Richart',
        last_name: 'Tribbeck',
        email: 'rtribbeck13@tamu.edu',
        gender: 'Female',
        ip_address: '50.239.11.121',
      },
      {
        id: 41,
        first_name: 'Jeff',
        last_name: 'Jaram',
        email: 'jjaram14@nbcnews.com',
        gender: 'Female',
        ip_address: '214.109.190.200',
      },
      {
        id: 42,
        first_name: 'Wang',
        last_name: 'Smullin',
        email: 'wsmullin15@ifeng.com',
        gender: 'Male',
        ip_address: '2.61.202.192',
      },
      {
        id: 43,
        first_name: 'Meg',
        last_name: 'McCafferky',
        email: 'mmccafferky16@studiopress.com',
        gender: 'Genderfluid',
        ip_address: '134.86.39.135',
      },
      {
        id: 44,
        first_name: 'Deloria',
        last_name: 'Meeland',
        email: 'dmeeland17@slideshare.net',
        gender: 'Male',
        ip_address: '253.130.18.69',
      },
      {
        id: 45,
        first_name: 'Traci',
        last_name: 'Kalinke',
        email: 'tkalinke18@skyrock.com',
        gender: 'Non-binary',
        ip_address: '112.202.240.14',
      },
      {
        id: 46,
        first_name: 'Jolene',
        last_name: 'Erdes',
        email: 'jerdes19@friendfeed.com',
        gender: 'Non-binary',
        ip_address: '167.2.53.204',
      },
      {
        id: 47,
        first_name: 'Ynes',
        last_name: 'Paute',
        email: 'ypaute1a@zdnet.com',
        gender: 'Polygender',
        ip_address: '40.150.127.135',
      },
      {
        id: 48,
        first_name: 'Iolande',
        last_name: 'Gritsaev',
        email: 'igritsaev1b@miibeian.gov.cn',
        gender: 'Agender',
        ip_address: '148.118.100.151',
      },
      {
        id: 49,
        first_name: 'Haley',
        last_name: 'Antyukhin',
        email: 'hantyukhin1c@squarespace.com',
        gender: 'Genderfluid',
        ip_address: '115.169.11.182',
      },
      {
        id: 50,
        first_name: 'Gus',
        last_name: 'Coules',
        email: 'gcoules1d@live.com',
        gender: 'Female',
        ip_address: '202.80.249.218',
      },
      {
        id: 51,
        first_name: 'Christy',
        last_name: 'Golding',
        email: 'cgolding1e@dmoz.org',
        gender: 'Genderqueer',
        ip_address: '122.207.87.194',
      },
      {
        id: 52,
        first_name: 'Alyosha',
        last_name: 'Dearness',
        email: 'adearness1f@smh.com.au',
        gender: 'Polygender',
        ip_address: '158.213.112.145',
      },
      {
        id: 53,
        first_name: 'Abramo',
        last_name: 'Garroway',
        email: 'agarroway1g@cam.ac.uk',
        gender: 'Non-binary',
        ip_address: '36.98.220.111',
      },
      {
        id: 54,
        first_name: 'Ange',
        last_name: 'Viles',
        email: 'aviles1h@ask.com',
        gender: 'Agender',
        ip_address: '107.180.28.122',
      },
      {
        id: 55,
        first_name: 'Brandyn',
        last_name: 'Mechell',
        email: 'bmechell1i@t.co',
        gender: 'Polygender',
        ip_address: '88.82.31.140',
      },
      {
        id: 56,
        first_name: 'Hayes',
        last_name: 'Addess',
        email: 'haddess1j@chronoengine.com',
        gender: 'Bigender',
        ip_address: '92.74.10.64',
      },
      {
        id: 57,
        first_name: 'Danyelle',
        last_name: 'Mazillius',
        email: 'dmazillius1k@google.nl',
        gender: 'Non-binary',
        ip_address: '59.206.178.189',
      },
      {
        id: 58,
        first_name: 'Jasper',
        last_name: 'Crank',
        email: 'jcrank1l@statcounter.com',
        gender: 'Genderfluid',
        ip_address: '8.71.155.170',
      },
      {
        id: 59,
        first_name: 'Fredelia',
        last_name: 'Zammett',
        email: 'fzammett1m@dagondesign.com',
        gender: 'Male',
        ip_address: '207.65.24.157',
      },
      {
        id: 60,
        first_name: 'Chevalier',
        last_name: 'Corkish',
        email: 'ccorkish1n@devhub.com',
        gender: 'Agender',
        ip_address: '215.201.44.12',
      },
      {
        id: 61,
        first_name: 'Charles',
        last_name: 'Ashfold',
        email: 'cashfold1o@dot.gov',
        gender: 'Agender',
        ip_address: '33.251.205.75',
      },
      {
        id: 62,
        first_name: 'Laina',
        last_name: 'Pady',
        email: 'lpady1p@tmall.com',
        gender: 'Bigender',
        ip_address: '44.229.7.58',
      },
      {
        id: 63,
        first_name: 'Aldous',
        last_name: 'Colisbe',
        email: 'acolisbe1q@narod.ru',
        gender: 'Non-binary',
        ip_address: '210.139.149.240',
      },
      {
        id: 64,
        first_name: 'Tessie',
        last_name: 'Field',
        email: 'tfield1r@bravesites.com',
        gender: 'Bigender',
        ip_address: '7.165.205.156',
      },
      {
        id: 65,
        first_name: 'Thorn',
        last_name: 'Slyde',
        email: 'tslyde1s@msn.com',
        gender: 'Genderqueer',
        ip_address: '26.163.35.45',
      },
      {
        id: 66,
        first_name: 'Ronalda',
        last_name: 'Draye',
        email: 'rdraye1t@hhs.gov',
        gender: 'Polygender',
        ip_address: '91.116.66.129',
      },
      {
        id: 67,
        first_name: 'Rhianna',
        last_name: 'Skones',
        email: 'rskones1u@cafepress.com',
        gender: 'Polygender',
        ip_address: '93.222.146.184',
      },
      {
        id: 68,
        first_name: 'Keri',
        last_name: 'Spatari',
        email: 'kspatari1v@yale.edu',
        gender: 'Genderfluid',
        ip_address: '118.19.180.11',
      },
      {
        id: 69,
        first_name: 'Mord',
        last_name: 'Klouz',
        email: 'mklouz1w@economist.com',
        gender: 'Polygender',
        ip_address: '23.29.144.144',
      },
      {
        id: 70,
        first_name: 'Say',
        last_name: "De L'Isle",
        email: 'sdelisle1x@cdc.gov',
        gender: 'Genderqueer',
        ip_address: '136.56.203.151',
      },
      {
        id: 71,
        first_name: 'Etheline',
        last_name: 'McKeurtan',
        email: 'emckeurtan1y@ucsd.edu',
        gender: 'Non-binary',
        ip_address: '43.137.234.48',
      },
      {
        id: 72,
        first_name: 'Yoshiko',
        last_name: 'Kares',
        email: 'ykares1z@i2i.jp',
        gender: 'Male',
        ip_address: '229.6.249.218',
      },
      {
        id: 73,
        first_name: 'Sherrie',
        last_name: 'Quaif',
        email: 'squaif20@slideshare.net',
        gender: 'Agender',
        ip_address: '68.67.45.12',
      },
      {
        id: 74,
        first_name: 'Ulrick',
        last_name: 'Ortiger',
        email: 'uortiger21@gmpg.org',
        gender: 'Genderfluid',
        ip_address: '19.47.114.52',
      },
      {
        id: 75,
        first_name: 'Mela',
        last_name: 'Coldman',
        email: 'mcoldman22@home.pl',
        gender: 'Genderfluid',
        ip_address: '27.242.254.109',
      },
      {
        id: 76,
        first_name: 'Tammy',
        last_name: 'Moryson',
        email: 'tmoryson23@zdnet.com',
        gender: 'Female',
        ip_address: '167.24.111.212',
      },
      {
        id: 77,
        first_name: 'Annadiane',
        last_name: 'Vlasyuk',
        email: 'avlasyuk24@tinypic.com',
        gender: 'Bigender',
        ip_address: '24.244.172.8',
      },
      {
        id: 78,
        first_name: 'Valentijn',
        last_name: 'Handaside',
        email: 'vhandaside25@blogtalkradio.com',
        gender: 'Agender',
        ip_address: '38.134.96.240',
      },
      {
        id: 79,
        first_name: 'Michel',
        last_name: 'Okeshott',
        email: 'mokeshott26@gizmodo.com',
        gender: 'Genderqueer',
        ip_address: '115.202.189.22',
      },
      {
        id: 80,
        first_name: 'Goldia',
        last_name: 'Scriven',
        email: 'gscriven27@blogspot.com',
        gender: 'Bigender',
        ip_address: '28.202.154.111',
      },
      {
        id: 81,
        first_name: 'Jess',
        last_name: 'Wellwood',
        email: 'jwellwood28@youtu.be',
        gender: 'Bigender',
        ip_address: '216.229.31.77',
      },
      {
        id: 82,
        first_name: 'Rozanna',
        last_name: 'Petyanin',
        email: 'rpetyanin29@tinypic.com',
        gender: 'Agender',
        ip_address: '111.121.180.31',
      },
      {
        id: 83,
        first_name: 'Marlane',
        last_name: 'Featherstonehaugh',
        email: 'mfeatherstonehaugh2a@si.edu',
        gender: 'Non-binary',
        ip_address: '241.33.44.82',
      },
      {
        id: 84,
        first_name: 'Elmo',
        last_name: 'Kees',
        email: 'ekees2b@mapquest.com',
        gender: 'Polygender',
        ip_address: '72.252.224.146',
      },
      {
        id: 85,
        first_name: 'Kiel',
        last_name: 'Yarmouth',
        email: 'kyarmouth2c@unblog.fr',
        gender: 'Bigender',
        ip_address: '58.151.215.224',
      },
      {
        id: 86,
        first_name: 'Natty',
        last_name: 'Claybourn',
        email: 'nclaybourn2d@reuters.com',
        gender: 'Polygender',
        ip_address: '33.151.187.134',
      },
      {
        id: 87,
        first_name: 'Lorena',
        last_name: 'Croser',
        email: 'lcroser2e@issuu.com',
        gender: 'Genderqueer',
        ip_address: '92.189.101.23',
      },
      {
        id: 88,
        first_name: 'Johnny',
        last_name: 'Pavelka',
        email: 'jpavelka2f@xing.com',
        gender: 'Genderfluid',
        ip_address: '140.92.176.211',
      },
      {
        id: 89,
        first_name: 'Carmon',
        last_name: 'Simonyi',
        email: 'csimonyi2g@blogs.com',
        gender: 'Male',
        ip_address: '74.230.250.76',
      },
      {
        id: 90,
        first_name: 'Malanie',
        last_name: 'Bentley',
        email: 'mbentley2h@tumblr.com',
        gender: 'Non-binary',
        ip_address: '148.199.203.219',
      },
      {
        id: 91,
        first_name: 'Graeme',
        last_name: 'Masic',
        email: 'gmasic2i@blinklist.com',
        gender: 'Polygender',
        ip_address: '210.45.4.135',
      },
      {
        id: 92,
        first_name: 'Marisa',
        last_name: 'Bracken',
        email: 'mbracken2j@technorati.com',
        gender: 'Male',
        ip_address: '233.175.253.29',
      },
      {
        id: 93,
        first_name: 'Fremont',
        last_name: 'Tout',
        email: 'ftout2k@issuu.com',
        gender: 'Non-binary',
        ip_address: '136.178.126.242',
      },
      {
        id: 94,
        first_name: 'Marysa',
        last_name: 'Lindelof',
        email: 'mlindelof2l@omniture.com',
        gender: 'Agender',
        ip_address: '141.112.134.82',
      },
      {
        id: 95,
        first_name: 'Alanah',
        last_name: 'Hamlet',
        email: 'ahamlet2m@walmart.com',
        gender: 'Female',
        ip_address: '225.215.107.197',
      },
      {
        id: 96,
        first_name: 'Winslow',
        last_name: 'Wilmut',
        email: 'wwilmut2n@foxnews.com',
        gender: 'Polygender',
        ip_address: '198.55.114.38',
      },
      {
        id: 97,
        first_name: 'Rodrigo',
        last_name: 'Pingston',
        email: 'rpingston2o@wiley.com',
        gender: 'Genderfluid',
        ip_address: '18.233.135.147',
      },
      {
        id: 98,
        first_name: 'Devlen',
        last_name: 'Buttfield',
        email: 'dbuttfield2p@pagesperso-orange.fr',
        gender: 'Bigender',
        ip_address: '89.31.27.15',
      },
      {
        id: 99,
        first_name: 'Cyril',
        last_name: 'Annis',
        email: 'cannis2q@ucla.edu',
        gender: 'Genderfluid',
        ip_address: '10.77.117.211',
      },
      {
        id: 100,
        first_name: 'Ruby',
        last_name: 'Pettegree',
        email: 'rpettegree2r@irs.gov',
        gender: 'Genderqueer',
        ip_address: '243.56.111.208',
      },
    ]
  }
  static samplePostData(empty = false) {
    if (empty) {
      return []
    }
    return [
      [
        {
          _id: 1,
          title: 'Welcome to this page',
          content:
            'Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n',
        },
      ],
      [
        {
          _id: 2,
          title: 'First',
          content:
            'Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n Hello this is a sample long post \n',
        },
        {
          _id: 3,
          title: 'Second',
          content: 'Hello this is a sample post',
        },
        {
          _id: 4,
          title: 'Third',
          content: 'Hello this is a sample post',
        },
      ],
      [
        {
          _id: 5,
          title: 'Bar',
          content: 'Foo',
        },
        {
          _id: 6,
          title: 'Alphabet',
          content: 'Soup',
        },
      ],
    ]
  }
  static sampleNavData(empty = false) {
    if (empty) return []

    return [
      {
        title: 'About',
        titleTarget: '/about',
        paths: [],
      },
      {
        title: 'Speedrunning',
        titleTarget: '',
        paths: [{ name: 'Leaderboards', path: '/speedrun/leaderboard' }],
      },
      {
        title: 'DPS',
        titleTarget: '',
        paths: [
          { name: 'Abyss', path: '/dps/abyss' },
          { name: 'Events', path: '/dps/events' },
          { name: 'Open World', path: '/dps/openworld' },
          { name: 'Primo Geovishap', path: '/dps/primo-geovishap' },
        ],
      },
      {
        title: 'Contests',
        titleTarget: '/contests',
        paths: [],
      },
      {
        title: 'Partners',
        titleTarget: '/partners',
        paths: [],
      },
      {
        title: 'Contact Us',
        titleTarget: '/contact-us',
        paths: [],
      },
    ]
  }
  static sampleContentTypes() {
    return {
      POST: 'post',
      TABLE: 'table',
      PLACEHOLDER: 'placeholder',
    }
  }
  static samplePermissions() {
    return {
      table: ['MOD', 'ADMIN'],
      post: ['ADMIN'],
      placeholder: ['ADMIN'],
    }
  }
  static characterToGif() {
    return {
      Albedo: AlbedoGif,
      Aloy: '',
      Amber: AmberGif,
      Barbara: BarbaraGif,
      Beidou: BeidouGif,
      Bennett: BennettGif,
      Chongyun: ChongyunGif,
      Diluc: DilucGif,
      Diona: DionaGif,
      Eula: EulaGif,
      Fischl: FischlGif,
      Ganyu: GanyuGif,
      'Hu Tao': HuTaoGif,
      Jean: JeanGif,
      'Kaedehara Kazuha': KazuhaGif,
      Kaeya: KaeyaGif,
      'Kamisato Ayaka': AyakaGif,
      Keqing: KeqingGif,
      Klee: KleeGif,
      'Kujou Sara': KujouSaraGif,
      Lisa: LisaGif,
      Mona: MonaGif,
      Ningguang: NingguangGif,
      Noelle: NoelleGif,
      Qiqi: QiqiGif,
      'Raiden Shogun': RaidenGif,
      Razor: RazorGif,
      Rosaria: RosariaGif,
      'Sangonomiya Kokomi': KokomiGif,
      Sayu: SayuGif,
      Sucrose: SucroseGif,
      Tartaglia: TartagliaGif,
      Thoma: ThomaGif,
      Traveler: TravelerGif,
      Venti: VentiGif,
      Xiangling: XianglingGif,
      Xiao: XiaoGif,
      Xingqiu: XingqiuGif,
      Xinyan: XinyanGif,
      Yanfei: YanfeiGif,
      Yoimiya: YoimiyaGif,
      Zhongli: ZhongliGif,
    }
  }
}
