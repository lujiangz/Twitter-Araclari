// ==UserScript==
// @name         Twitter Araçları
// @version      2.3.4
// @author       Lujiangz
// @description  Takip etme, takipten çıkma, favoriye ekleme, RT kapatma, dm gönderme ve fazlası.
// @match        https://twitter.com/*
// @exclude    	 https://twitter.com/intent/*
// @grant        none
// @require   	 https://code.jquery.com/jquery-1.8.3.min.js
// @icon        https://raw.githubusercontent.com/lujiangz/Twitter-Araclari/master/taclogo.png
// @supportURL  https://github.com/lujiangz/Twitter-Araclari
// @homepageURL https://github.com/lujiangz
// @updateURL 	https://github.com/lujiangz/Twitter-Araclari/raw/master/twitter-araclari.user.js
// ==/UserScript==

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function(){
$("body.logged-in").first().prev("head").append('<style>#secenekler label{margin-left: 5px;}.sec-list p {margin: 5px;}#secenekler legend{padding: 5px 15px;color: #fff;}#secenekler{border-radius: 0;background-color: #F1F1F1;padding:0;margin-left:-245px;width: 540px;display:none;top: 50px; left: 50%; position: fixed;overflow-y: scroll;height: 80vh;}#takip{cursor:pointer;display: block;position: fixed;float: right;border: none;height: auto;top: 15px;right: 35px;background: #fff;list-style-type: none;padding:0;border-radius: 0;box-shadow: none;z-index: 1000;}#takip li{display:none}#tkp_mnu{width: 17px;height: 0px;border-top: 8px double #333;display: block;margin: 16px;cursor:pointer}#tkp_mnu:before{content: "";border-bottom: 3px solid #333;width: 17px;height: 0px;float: left;padding-top: 5px;margin-top: -3px;}</style>')
$(".nav.right-actions").append("<li id='tkp_mnu' class='pasif'></li>")
$("body.logged-in").after("<div id='takip' class='dropdown-menu'><li class='not-blocked' id='liteyi_takip_et'><a title='Ctrl+Alt+T'>Takip et</a></li><li id='takibi_durdur' class='ProfileNav-item'><a title='Esc'>Durdur</a></li><li id='takipten_cik' class='following'><a title='Ctrl+Alt+U'>Takipten çık</a></li><li><a id='favyap'>Beğen</a></li><li><a id='favsil'>Beğeni sil</a></li><li><a id='rtyap'>RT Yap</a></li><li id='dmgonder'><a>DM Gönder</a></li><li><a id='rtkapat'>RT'leri Kapat</a></li><li><a id='kisi_ara'>Kişi Ara</a></li><li class='paylasbuton'><a title='Bir zahmet eklentiyi paylaşın'>Paylaş</a></li><li class='dropdown-divider'></li><li><a href='/followers'>Takipçiler</a></li><li><a href='/following'>Takip edilenler</a></li><li class='dropdown-divider'></li><li><a id='ngscnk'>Seçenekler</a></li></div>");
$("body.logged-in").after('<div id="secenekler" class="dm-dialog modal draggable modal-content twttr-dialog dm-dialog"><div style="cursor:initial" class="twttr-dialog-header modal-header"><h3 style="line-height: 34px;padding: 5px 10px;"">Twitter Araçları</h3><div class="dm-toolbar"><button id="tmn_sc" style="right: 169px;top: 13px;width:127px;background-color:rgba(103,146,118,0.65);font-weight:normal;line-height:18px;color:#fff;padding:7px;margin:0;position:absolute;" type="submit">Tümünü seç</button><button id="sec-kayit" style="top:13px;width:114px;color:#fff;padding:7px;right:40px;position:absolute;background-color:rgba(70,138,158,0.71);margin:0px;line-height:18px;" type="submit">Kaydet</button><button id="sec-kapa" type="button" class="modal-btn modal-close js-close" style="top: 17px;"aria-controls="dm_dialog-dialog" aria-describedby="dm_dialog-body"><span class="Icon Icon--close Icon--medium" style="font-size:20px;line-height:100%"><span class="visuallyhidden">Kapat</span></span></button></div></div><fieldset style="padding: 5px;margin: 10px;"><legend class="u-bgUserColor">Takip Etme Seçenekleri</legend><h4 class="sec-list" style="margin:5px 10px;font-size:14px;font-weight: normal"><p> <input type="checkbox" value="0" name="yum-pro" id="yum-pro"><label for="yum-pro">Yumurta profilleri takip etme</label></p><p><input type="checkbox" value="0" name="hak-bos" id="hak-bos"><label for="hak-bos">Hakkında kısmı boşsa takip etme</label>  </p><p><input type="checkbox" value="0" name="hak-az" id="hak-az"><label for="hak-az">Hakkında kısmında A-Z, 0-9 yoksa takip etme</label>  </p><p><input type="checkbox" value="0" name="giz-tak" id="giz-tak"><label for="giz-tak">Gizli kullanıcıları takip etme</label>  </p><p><input type="checkbox" value="0" name="ztn-tkp" id="ztn-tkp"><label for="ztn-tkp">Beni zaten takip ediyorsa takip etme</label>  </p><p><input type="checkbox" value="0" name="arti-18" id="arti-18"><label for="arti-18">+18 cinsel içerikli hesapları takip etme</label>  </p><p><input type="checkbox" value="0" name="ng_cins_tak" id="ng_cins_tak"><label for="ng_cins_tak">Sadece <select id="ng_cins_sec"><option value="kız veya erkek">kız veya erkek</option><option value="kız">kız</option><option value="erkek">erkek</option></select> ismi kullanan hesapları takip et</label> </p><p>Kaç kişi takip edilsin <input style="width:50px" type="text" id="ng-tkp-sys" value="1000"></input></p><p>Takip etme hızı (ms cinsinden. 1000 = 1 sn) <input style="width:50px" title="500 ise saniyede 2 kişi takip eder." type="text" id="ng-tkp-hiz" value="1000"></input></p></h4></fieldset><fieldset style="padding: 5px;margin: 10px;"><legend class="u-bgUserColor">Takipten Çıkma Seçenekleri</legend><h4 class="sec-list" style="margin:5px 10px;font-size:14px;font-weight: normal"><p><input type="checkbox" value="0" name="ng_gt_unf" id="ng_gt_unf"><label for="ng_gt_unf">Sadece beni takip etmeyenleri takipten çık</label> </p><p><input type="checkbox" value="0" name="ng_gt_tahm" id="ng_gt_tahm"><label for="ng_gt_tahm">GT yapmayanların sayısı azaldığında durdur.</label> </p><p>Kaç kişi takipten çıkılsın<input style="width:50px" type="text" id="ng_kac_unf" value="100000"></input></p><p>Takipten çıkma hızı (ms cinsinden. 1000 = 1 sn) <input style="width:50px" title="500 ise saniyede 2 kişi takipten çıkar." type="text" id="ng_unf_hiz" value="200"></input></p></h4></fieldset><fieldset style="padding: 5px;margin: 10px;"><legend class="u-bgUserColor">Kişi Arama Seçenekleri</legend><h4 class="sec-list" style="margin:5px 10px;font-size:14px;font-weight: normal"><p>Takipçi sayısı en az <input style="width:50px" type="text" id="min_tak_say" value="5000"></input></p><p>Takipçi sayısı en faza <input style="width:50px" type="text" id="max_tak_say" value="15000"></input></p><p>Bulunacak kişi sayısı <input style="width:50px" type="text" id="kisi_bul_say" value="20"></input></p><p><input type="checkbox" value="0" name="ng_kiz_ara" id="ng_kiz_ara"><label for="ng_kiz_ara">Sadece <select id="ng_cins_ara"><option value="kız">kız</option><option value="erkek">erkek</option></select>  ismi kullananları bul</label></p></h4></fieldset><fieldset style="padding: 5px;margin: 10px;"><legend class="u-bgUserColor">Beğenme Seçenekleri</legend><h4 class="sec-list" style="margin:5px 10px;font-size:14px;font-weight: normal"><p><input type="checkbox" value="0" name="fav_rt" id="fav_rt"><label for="fav_rt">RT edilmiş tweetleri beğenme</label> </p><p><input type="checkbox" value="0" name="link_rt" id="link_rt"><label for="link_rt">Bağlantı görsel ve video olan tweetleri beğenme(Hashtag hariç)</label> </p><p><input type="checkbox" value="0" name="turk_fav" id="turk_fav"><label for="turk_fav">Türkçe olmayan tweetleri beğenme</label> </p><p>Kaç beğeni yapılsın <input style="width:50px" type="text" id="ng_begen_sys" value="1000"></input></p><p>Beğenme hızı (ms cinsinden. 1000 = 1 sn) <input style="width:50px" title="500 ise saniyede 2 beğeni yapar." type="text" id="ng_begen_hiz" value="600"></input></p></h4></fieldset><fieldset style="padding: 5px;margin: 10px;"><legend class="u-bgUserColor">Retweet Seçenekleri</legend><h4 class="sec-list" style="margin:5px 10px;font-size:14px;font-weight: normal"><p><input type="checkbox" value="0" name="rtlink" id="rtlink"><label for="rtlink">Bağlantı, görsel ve video olan tweetleri RT yapma (Hashtag hariç)</label> </p><p><input type="checkbox" value="0" name="ng_rt_rt" id="ng_rt_rt"><label for="ng_rt_rt">Başkalarının Retweetlerini RT yapma</label> </p><p>Kaç retweet yapılsın <input style="width:50px" type="text" id="ng_rt_sys" value="1000"></input></p><p>Retweet yapma hızı (ms cinsinden. 1000 = 1 sn) <input style="width:50px" title="500 ise saniyede 2 retweet yapar." type="text" id="ng_rt_hiz" value="1000"></input></p></h4></fieldset><fieldset style="padding: 5px;margin: 10px;"><legend class="u-bgUserColor">Diğer Araçlar</legend><h4 class="sec-list" style="margin:5px 10px;font-size:14px;font-weight: normal"><p><input type="checkbox" value="0" name="es-pro" id="es-pro"><label for="es-pro">Eski profil bağlantısını Kullan</label>  </p><p><input type="checkbox" value="0" name="ng-dm-gelgit" id="ng-dm-gelgit"><label for="ng-dm-gelgit">Gelen - giden DM bağlantıları</label>  </p><p><input type="checkbox" value="0" name="ng_tweet_gomy" id="ng_tweet_gomy"><label for="ng_tweet_gomy">Tweet yerleştirme ikonu</label>  </p><p><input type="checkbox" value="0" name="ng_tweet_copy" id="ng_tweet_copy"><label for="ng_tweet_copy">Tweet kopyalama ikonu</label>  </p><p><input type="checkbox" value="0" name="ng_home_rtoff" id="ng_home_rtoff"><label for="ng_home_rtoff">Anasayfada retweetleri gösterme</label>  </p><p><input type="checkbox" value="0" name="ng_menu_ac" id="ng_menu_ac"><label for="ng_menu_ac">Menü sürekli açık kalsın</label>  </p></p4></fieldset><br></div><div id="secenek-arka" class="modal-overlay"></div>');


var erkek_isimleri = ['abay','abayhan','abbas','abdal','abdi','abdullah','abdurrahman','abdulalim','abdulazim','abdulaziz','abdulbaki','abdulbari','abdulbasir','abdulbasit','abdulcabbar','abdulcebbar','abdulcelil','abdulcemal','abdulcevat','abdulezel','abdulferit','abdulfettah','abdulgaffar','abdulgaffur','abdulgafur','abdulgani','abdulhadi','abdulhak','abdulhakim','abdulhalik','abdulhalim','abdulhamit','abdulkadir','abdulkahhar','abdulkerim','abdullatif','abdulmecit','abdulmelik','abdulmennan','abdulmetin','abdulnasir','abdulvahap','abdulvahit','abdurrahim','abdurrahman','abdurrauf','abdurresit','abdurrezzak','abdussamet','abdussami','abdusselam','abdussemi','abdussettar','abduzzeki','abir','abid','abidin','abil','abir','abit','ablak','abras','abuska','abuzer','abuzettin','acabay','acabey','agabay','agcabey','akabay','akabey','akcabay','alabas','alabay','atabay','atabek','atabey','ataboru','babacan','babac','babayigit','babur','babursah','balaban','cabbar','cabir','caba','cabar','farabi','hicabi','kabadayi','kaban','kabil','karabas','karabatak','karabay','karabet','karabey','karaboga','karaboru','karabudun','karabugday','karabugra','karabulut','karabukey','karacabey','kayrabay','kocabas','kocabey','nabi','necabet','necabettin','olcabay','rabbani','rabi','rabih','saba','sabah','sabahattin','sabar','sabbar','sabih','sabir','sabit','sabri','sabur','sabutay','sahabi','saricabay','saban','sahabettin','tabgac','turabi','yabalak','yaban','yabar','yabgu','yabiz','yalabuk','yalazabay','zabit','zeynelabidin','aca','acahan','acar','acaralp','acarbey','acarer','acarkan','acarman','acaroz','acarsoy','acarturk','acatay','acidas','aclan','acun','acunal','acunalan','acunalp','acuner','acunman','acunseven','acikalin','acikel','aciker','acikgun','acil','acine','adahan','adak','adal','adalan','adalettin','adam','adamis','adanan','adanir','adar','adarkan','adasal','adas','aday','adibelli','adigun','adiguzel','adin','adisanli','adisonmez','adivar','adiyahsi','adiyaman','adil','adilhan','adlan','adli','adlig','adli','adnan','adni','adsiz','adsoy','afacan','afak','afer','affan','afif','afsar','afsin','agah','agil','aga','agacan','agahan','agakan','agan','aganer','agaoglu','agar','agarantan','agaverdi','agca','agcelik','ager','agin','agirtas','agis','agnak','agyar','ahen','ahfes','ahiska','ahi','ahmet','ahsen','ahter','ajlan','aka','akad','akadli','akagan','akal','akalan','akalin','akalp','akaltan','akan','akanay','akaner','akansu','akant','akanyildiz','akarca','akarcay','akarsel','akarsu','akartuna','akarturk','akasma','akasoy','akata','akatay','akay','akaydin','akbal','akbaran','akbas','akbasak','akbatu','akbatur','akbay','akbayar','akbek','akbel','akbet','akbey','akbil','akbilge','akboga','akbora','akboy','akboru','akbudun','akbug','akbulut','akburak','akburc','akburcak','akcan','akcebe','akcivan','akca','akcael','akcakan','akcakaya','akcakil','akcakoca','akcal','akcali','akcam','akcan','akcasu','akcay','akcer','akcigir','akcil','akcinar','akcit','akcora','akdag','akdal','akdamar','akdemir','akdeniz','akdes','akdik','akdiken','akdil','akdog','akdogan','akdogdu','akdogmus','akdogu','akdora','akdoru','akdoruk','akdol','akduman','akdur','akdurmus','akel','aker','akergin','akerman','akersan','akersoy','akgil','akgiray','akgol','akgoze','akguc','akgun','akgunduz','akguner','akgunes','akgungor','akhan','akhun','aki','akialp','akil','akilbek','akilli','akiman','akin','akinal','akinalp','akinci','akincibay','akiner','akineri','akintan','akif','akil','akip','akkan','akkas','akkaya','akkaynak','akkemik','akkerman','akkilic','akkin','akkoz','akkurt','akkus','akkuyas','aklan','akmac','akman','akmanalp','akmaner','akmeric','akozan','akonder','akoren','akoz','akpay','akpinar','akpolat','akpulat','aksal','aksan','aksay','aksel','akser','akses','aksin','aksoy','aksogut','aksu','aksun','aksunar','aksuner','aksungur','aksuyek','aksin','aksit','aktac','aktalay','aktan','aktar','aktas','aktay','aktekin','aktemur','akti','aktimur','aktolga','aktug','aktuna','aktunc','aktun','akturk','akun','akunal','akvarol','akyel','akyildiz','akyigit','akyol','akyon','akyurt','akyurek','akyuz','ala','alaaddin','alaca','alacan','alacam','alacuk','aladogan','alahan','alakoc','alakurt','alakus','alamet','alanalp','alanay','alanbay','alaner','alangu','alat','alatan','alatas','alatay','alay','alaybey','alaz','albayrak','albora','alburak','alcan','alcik','alcin','alcinsu','aldemir','aldogan','alem','alemdar','alemsah','algan','algin','algu','algun','algur','algun','alhan','alici','alisik','ali','alican','alihan','alim','alis','alisah','alisan','aliyar','alkan','alkas','alkilic','alkim','alkin','alkis','alkoc','alkor','alkun','allahverdi','almila','alnar','alniacik','alniak','alp','alpagu','alpagan','alpak','alpar','alparslan','alpartun','alpaslan','alpat','alpata','alpay','alpaydin','alpayer','alpbilge','alpcetin','alpdemir','alpdogan','alper','alperen','alpergin','alpermis','alpertunga','alpgiray','alphan','alpkan','alpkanat','alpkartal','alpkin','alpkutlu','alpkuluk','alpman','alpogan','alpsoy','alpsu','alptekin','alptogan','alptug','alpyurek','alpyuruk','alsan','alsancak','alsoy','altac','altan','altaner','altas','altav','altay','altemur','alten','altin','altinay','altinbaran','altinbas','altinbay','altinel','altiner','altinhan','altinisik','altinisin','altiniz','altinkaya','altinkilic','altinok','altinoz','altinsoy','altintac','altintas','altintop','altintug','altogan','altop','altug','altun','altuna','altunay','altunbas','altunc','altuncag','altuner','altunhan','altuntas','amac','amanullah','amil','amir','anadolu','anci','ancibay','andac','andak','andelip','andic','andic','angi','angil','angin','angis','angit','ani','anik','anil','anit','anli','annak','ant','apa','apak','apakhan','apaydin','araci','arafat','aral','aran','aras','arat','araz','arbas','arbay','arbek','arca','arcan','arda','ardahan','ardemir','ardic','ardil','arel','arer','argin','argu','arguc','arguden','arguder','argun','arhan','ari','aribal','aribas','ariboga','arica','arican','aric','ariel','arier','arig','arihan','arik','arikal','arikan','arikboga','ariker','arikhan','arikiz','arikol','arikut','aril','ariman','arin','arinc','arinik','aripinar','arisal','arisan','arisoy','arisu','aris','aritan','aritas','ariyuz','ari','arif','arik','arkadas','arkan','arkin','arkis','arkoc','arkun','arkut','arlan','arman','arna','arol','arpad','arpag','arpak','arpinar','arsal','arsan','arslan','arslaner','arsoy','artac','artam','artan','artik','artuc','artuk','artun','artunc','artut','aru','arukan','aryuz','arzik','asaf','asal','asalet','asan','asi','asif','asim','asil','aslan','aslaner','aslanhan','aslibey','aslihan','asri','asu','asutay','asan','ascir','asir','asir','askan','askin','askinay','askiner','ata','ata','ataan','atacan','atac','atadan','ataergin','atagun','atahan','atak','atakan','ataker','atakul','atakurt','atakut','atalan','atalay','atalmis','ataman','atambay','atamer','atamturk','ataner','atanur','ataol','ataov','atasagun','atasan','atasay','atasev','ataseven','atasever','atasevin','atasoy','atasu','atatore','atatug','atature','ataturk','ataullah','ataun','atay','ates','atfi','atgun','atif','atil','atilay','atilgan','atiz','atik','atila','atilla','atlan','atli','atlig','atlihan','atmaca','atom','attila','atuf','avar','avci','avhan','avkan','avni','avsar','avunc','ay','ayalp','ayaltin','ayanc','ayas','ayata','ayatac','ayaydin','ayaz','aybar','aybars','aybas','aybay','aybek','ayberk','aybey','ayboga','aybora','aycan','aycil','aycihan','aycetin','aydar','aydemir','aydeniz','aydin','aydinalp','aydinay','aydinbay','aydinbey','aydinel','aydiner','aydinol','aydintan','aydintug','aydinyol','aydinc','aydogan','aydogdu','aydogmus','aydolun','aydonat','ayet','ayetullah','aygut','aygutalp','aygun','ayguner','ayhan','ayik','aykac','aykal','aykan','aykin','aykul','aykurt','aykut','aykutalp','aykutlu','aylan','ayman','aymete','aymutlu','ayni','aypar','aypars','aypolat','ayral','ayril','aysal','aysan','aysoy','aysungur','aysu','aysan','aytac','aytan','aytar','aytek','aytekin','aytemiz','aytemur','aytis','aytigin','aytimur','aytok','aytolun','aytop','aytore','aytug','aytuna','aytunca','aytunc','aytunga','aytun','ayturk','ayun','ayvaz','ayverdi','ayyarkin','ayyaruk','ayyildiz','ayyuce','azadi','azam','azamet','azamettin','azat','azer','azim','aziz','azmi','azmun','aznavur','azrak','bagatur','bagdac','bagdas','bagir','bagis','bagishan','baha','bahadir','bahadirhan','bahai','bahattin','bahir','bahri','bahsi','bahti','bahtiyar','bakanay','bakir','bakirhan','baki','baksi','bala','bala','balabey','balaman','balamir','balatekin','balaturk','balaz','balbal','balbay','balbey','balcan','baldemir','baler','balhan','bali','balibas','balibey','balim','balibey','balk','balkan','balki','balkir','balkis','balkoc','balsan','baltas','bandak','bangu','barak','baran','baranalp','baranbilge','baransel','baray','barbaros','barca','barcak','barcin','barim','barin','baris','bariscan','barik','bariz','barkan','barkin','barlas','barlik','bars','barsbay','barsbey','bartu','basa','basak','basim','basir','baskak','baskan','baskin','basri','basut','basaga','basal','basar','basargan','basarman','basat','basay','basaydin','basbay','basbug','basdemir','basdogan','basegmez','basel','baser','bashan','baskal','baskan','baskara','baskaya','baskaynak','baskur','baskurt','baskut','basman','basok','basol','basoz','bassoy','bastas','bastemir','bastugay','bastug','basturk','bati','batibay','batibey','batican','batihan','batir','batiray','batirhan','battal','batu','batucem','batuhan','batur','baturalp','baturay','baturhan','bayar','baybars','baybas','baybek','baybora','bayboru','baycan','bayca','baydogan','baydu','baydur','bayduralp','bayer','bayezit','bayguc','bayhan','bayhun','bayik','bayin','bayindir','bayir','bayirhan','baykal','baykam','baykan','baykara','baykir','baykoca','baykor','baykul','baykurt','baykut','baykutay','baylan','bayman','bayol','bayrak','bayraktar','bayram','bayri','bayru','bayrualp','bayrubay','bayruhan','bayruk','baysal','baysan','baysoy','baysu','baysungur','baytal','baytas','baytekin','baytimur','baytok','baytugay','baytuze','baytuzun','bayuk','bayulken','bayyigit','bedirhan','behnan','behram','behzat','bekata','bekbars','bekbay','beksan','bektas','beleda','bellisan','benal','benam','benan','benazir','bengialp','bengibay','bengisan','bengitas','berat','berkal','berkan','berkant','berkay','berkkan','berkman','berksal','berksan','berksay','berktan','berran','bertan','besalet','besat','besaret','besarettin','beyazit','beybars','beybolat','beycan','beyda','beydag','beydas','beyhan','beykal','beykan','beykara','beysan','beytullah','beyzade','beyzat','bican','bilan','bilay','bilbasar','bilbay','bileda','bilgealp','bilgebay','bilgehan','bilgekagan','bilgekan','bilgetay','bilgihan','bilgutay','bilhan','bilkan','bilsay','biltas','biltay','bilyap','binal','binali','binalp','binan','binat','binay','binbasar','binbay','bindal','binkan','binyasar','biran','birant','biray','bircan','birdal','birhan','birkan','birsan','birtan','boga','bogac','bogachan','bogahan','bogatas','bogatay','bogatekin','bogatir','bogatimur','bolat','bolcan','bolgan','bolhan','bolkan','bora','borahan','borak','borakan','borakhan','boran','boranalp','boranbay','boransu','boratas','boratav','boratay','boray','borkan','boyar','boydak','boydas','boylan','boynak','boyraz','boysal','boysan','bozan','bozat','bozay','bozbag','bozbala','bozbas','bozbay','bozbora','bozca','bozdag','bozdogan','bozhan','bozkan','bozkara','bozkaya','bozlak','bozokay','boztas','bolukbasi','borubars','borubay','boruhan','borukan','bucak','budak','budunal','budunalp','bugra','bugrahan','bukay','bulak','bulgan','bulgubay','bulgucan','bulgunoyan','bulutay','buminhan','burak','burcak','burchan','burhan','burhanettin','burkay','burukbay','buyan','buyrukalp','buyrukata','buyrukbay','buyrukhan','bukay','bunyamin','buran','burkan','cafer','cahit','calp','can','canal','canalp','canaltay','canat','canay','canaydin','canbay','canbek','canberk','canbey','canbolat','canbulat','canda','candan','candaner','candar','candas','candeger','candemir','candogan','canel','caner','canfer','cangiray','cangun','cangur','canip','cankan','cankat','cankaya','cankilic','cankoc','cankorur','cankurt','cankut','cannur','canol','canoren','canoz','canpolat','cansal','cansay','cansen','canser','canseven','cansever','cansin','cansoy','cansun','cansunar','cansuner','cantas','cantekin','cantez','canturk','canyurt','caran','carim','carullah','cavit','cavli','cavuldur','caymaz','cazim','cazip','cebbar','cebealp','cebrail','cefa','celilay','cemal','cemaleddin','cemalettin','cemalullah','cemsah','cenan','cenani','cenap','cengizhan','cerullah','cevahir','cevat','cevval','ceyhan','cezayir','cihan','cihandar','cihandide','cihanefruz','cihaner','cihangir','cihani','cihanmert','cihannur','cihansah','cihat','civan','civanbaht','civanmert','civansir','cosan','cosar','coskunay','cuma','cumali','cura','cundullah','cadir','cag','caga','cagacan','cagacar','cagakan','cagan','caganak','cagatay','cagay','cagbay','cagdas','cagil','cagilti','cagin','cagir','cagkan','cagla','caglak','caglam','caglan','caglar','caglasin','caglayan','caglayangil','caglayanturk','cagli','cagman','cagri','cagribey','cagveren','cakan','cakar','cakil','cakim','cakin','cakir','cakirbey','cakirca','cakirer','cakmak','cakman','cakmur','calapkulu','calapover','calapverdi','calgan','calikbey','calim','calin','calis','caliskan','calkan','calkara','calkin','calti','cam','camak','cambel','camer','camok','candar','candarli','canga','cangal','cankara','cankaya','capan','capaner','capar','capin','capkan','carlan','carman','cav','cavas','cavdar','cavdur','cavlan','cavli','cavuldur','cavus','caydam','caydamar','cayhan','caykara','caylak','caylan','caynak','celikbas','celikhan','celikkan','celikkanat','celikkaya','celiktan','celiktas','celikyay','cetinalp','cetinay','cetinkaya','cetintas','cevikcan','cida','cidal','cidam','cidamli','ciga','cigal','cinak','cinar','cinay','ciray','citak','citanak','ciltay','cintan','cintay','ciray','coban','coga','cogahan','cogan','cogas','cogay','cokan','cokar','cokay','cokman','colak','colpan','copar','copuralp','cora','corak','coturay','cuga','culpan','cuvas','dadak','dadas','dag','daga','dagasan','dagdelen','daghan','dagtekin','daim','dal','dalan','dalay','dalayer','dalbas','dalboga','dalda','daldal','daldiken','dalgic','dalim','dalkilic','dalkoc','dalokay','daltekin','dalyan','damar','danis','danisman','danis','danisment','danyal','dara','darcan','darga','daver','davran','davut','dayanc','dayar','dayi','daylak','deha','delikan','delikanli','demirag','demiralp','demiray','demirbag','demirbas','demirboga','demircan','demircay','demirhan','demirkan','demirkaya','demirkiran','demirman','demirsah','demirtas','demirtav','demirtay','demokan','denizalp','denizcan','denizhan','denizman','denktas','derman','dervisani','dervishan','deryadil','devran','dikalp','dikay','dikbas','dikbay','dikboga','dikcam','dikdal','diktas','dilercan','dilmac','dincalp','dincay','dinccag','dinckal','dinckaya','dincsan','dincsav','dincsay','dinctas','dindar','diribas','dirican','dirsehan','dizdar','doga','dogan','doganalp','doganay','doganbas','doganbey','doganer','dogangun','doganhan','dogansah','dogantan','dogantimur','dogudan','doguhan','dogukan','dolan','dolaner','dolay','dolunay','domanic','donat','dora','dorak','dorukhan','dorukkan','dolaslan','donmezcan','duman','dumanbey','dura','duracan','durak','dural','duran','duranay','duraner','duransoy','durantekin','duray','durhan','durkaya','durualp','durubay','durucan','duruhan','durukal','durukan','durusan','dundar','dundaralp','dusvar','ebrak','ecebay','ecehan','ecekan','edgualp','edgubay','edgukan','efdal','efekan','efgan','efnan','efrasiyap','ejderhan','elfaz','elhan','eliacik','elitas','elvan','emanet','emanullah','embiya','emirhan','emirsah','emrah','emran','emrullah','emsal','enbiya','enfal','enginalp','enginay','engintalay','enhar','ensar','ensari','eracar','erakalin','erakinci','eraksan','eral','eralkan','eralp','eraltay','erandac','eranil','eraslan','eratli','eray','eraydin','erbas','erbasat','erbatur','erbay','erboga','ercan','ercihan','ercivan','erdag','erdal','erdemalp','erdenalp','erdenay','erdibay','erdogan','erduran','erenalp','erenay','erencan','erenkara','ergalip','ergazi','erginal','erginalp','erginay','erginbay','ergincan','ergunalp','ergunay','erhan','erimsah','erkal','erkan','erkarslan','erkas','erkaya','erkinay','erkiral','erkman','erkocak','erksal','erksan','erkutay','erman','ernoyan','erogan','erokay','eronat','erozan','ersagun','ersal','ersalmis','ersan','ersav','ersavas','ersay','ersayin','ersunal','ersahan','ersan','ersat','ertac','ertan','ertas','ertay','ertaylan','ertepinar','ertugay','ertuna','ertunca','ertuncay','ertunga','erturan','erunal','eryalcin','eryaman','eryavuz','eryilmaz','erzade','erzan','esat','esedullah','esenbay','esenboga','esendag','esendal','esenkal','esertas','eskinalp','esfak','esraf','evcan','evhat','evliya','evran','evrenata','eyyam','ezelhan','fadil','fahim','fahir','fahrettin','fahri','faik','faiz','fakih','fakir','fakirullah','falih','fani','farik','faris','faruk','fasih','fatih','fatin','faysal','fazil','fazli','fazlullah','feda','fedai','fedakar','fehamet','fehamettin','fehimdar','feragat','ferah','ferahi','feramus','feramuz','feray','fercan','ferda','ferdal','ferdar','ferhan','ferhat','ferhattin','feritkan','ferkan','ferman','fermani','fersan','feruzat','ferzan','fethullah','fettah','fevzullah','feyha','feyman','feyyaz','feyzan','feyzullah','feza','fezahan','fezai','firat','fuat','furkan','gaffar','gafir','gafur','galip','gani','garip','gavsi','gayret','gayur','gazal','gazanfer','gazel','gazi','gedikbas','gedikbay','gediktas','gencal','gencalp','gencaslan','gencay','gencaga','gencalp','gencaslan','gencay','genckal','gencsav','genctan','geray','german','gezenay','giyas','giyasettin','giyasi','giray','girayalp','girayer','girayhan','girginalp','gizay','gokalp','gokay','gokbaran','gokbay','gokbayrak','gokbora','gokbudak','gokcan','gokcebala','gokcebalan','gokdal','gokdogan','gokhan','gokmenalp','goksal','goksaltuk','goksan','goksav','goksay','goktalay','goktan','goktas','goktay','goktulga','goktuna','gokyay','goral','gorgunay','gorguncan','gozay','gozaydin','gucal','gucalp','gucal','gucalp','guchan','guckan','guckanat','guclubay','gucluhan','guclukhan','gucsal','gucsalan','gucsan','gulbay','guldogan','gulerman','gulertan','gulhan','gulkan','gulsahin','gultan','gultas','guman','gumustan','gumustay','gunac','gunak','gunal','gunalan','gunalp','gunaltan','gunaltay','gunan','gunay','gunaydin','gunbay','guncag','gundal','gundas','gundogan','gundogar','gunduzalp','gunduzhan','guneral','guneralp','guneray','gunerkan','gunerman','guneshan','gunhan','gunkan','gunkaya','gunkutan','gunsar','gunsav','gunsiray','guntan','gunvar','gunyaruk','gurak','gurakan','gurakin','gural','guran','gurarda','gurata','guray','gurbas','gurbaskan','gurbay','gurboga','gurcan','gurdal','gurhan','gurkan','hakan','hakikat','hakki','haktan','hakverdi','halas','halaskar','haldun','halef','halife','halil','halilullah','halim','halis','halit','halittin','halûk','hamaset','hamdi','hamdullah','hami','hamil','hamis','hamit','hamza','han','hanalp','hanbek','hanbey','hanedan','hanefi','hanif','hankan','hansoy','hanzade','harun','hasan','hasanalp','hasane','hasbek','hasbi','hasefe','hasip','haslet','haspolat','hasim','hasmet','hasmettin','hatem','hatemî','hatif','hatim','hatip','hattat','havi','hayalî','hayati','haydar','hayir','hayran','hayrani','hayret','hayrettin','hayri','hayrullah','hazar','hazik','hazim','hazret','heyecan','hezarfen','hifzirrahman','hifzullah','hincal','hizlan','hicap','hicyilmaz','hidayet','hidayettin','hikmetullah','hilkat','hisar','hitam','hudavendigar','hudavent','hudaverdi','hudayi','hulagu','hunalp','hudavendigar','hudavent','hudaver','hudaverdi','hudayi','hukumdar','humayun','huray','hurcan','hurdogan','hurkal','hurkan','huryasar','husam','husamettin','ilgar','ilgarli','ilgaz','ilgazcan','ilgazer','ilicak','ilican','ira','irmak','isikal','isikalp','isikay','isikhan','isikkan','isiktas','isilak','isilar','isiltan','isiman','isinbay','isinhan','isinkan','isitan','ibad','ibadet','ibadullah','ibat','ibrahim','icacan','ihsan','ihvan','ihya','ikbal','ikram','ikrami','ilal','ilalan','ilaldi','ilalmis','ilarslan','ilaydin','ilbars','ilbasan','ilbasmis','ilbasti','ilbas','ilbay','ilboga','ilbozan','ilcan','ilgar','ilgazi','ilham','ilhami','ilhan','ilimdar','ilkan','ilkay','ilkehan','ilkutay','ilkunsal','ilpars','ilsavas','ilsavun','iltan','iltas','iltay','ilvan','ilyas','imadettin','imam','imamettin','iman','imat','imdat','inak','inal','inalbey','inalcik','inalkut','inaltekin','inan','inanc','inancli','inanir','inanoz','inayet','incebay','irfan','irfani','irfat','irsat','isa','isfendiyar','ishak','ismail','israfil','istemihan','istikbal','isvan','iscan','isman','iyidogan','iyisan','izboga','izbudak','kaan','kadagan','kadam','kadem','kadim','kadir','kadrettin','kadri','kadrihan','kafar','kagan','kahir','kahraman','kaim','kakinc','kala','kalagay','kalender','kalgay','kalkan','kalmik','kalmuk','kam','kamaci','kaman','kamanbay','kamar','kambay','kamber','kamet','kamran','kamu','kamuran','kanagan','kanak','kanat','kanbay','kanber','kandemir','kaner','kanik','kanikor','kanit','kani','kanpolat','kanpulat','kansu','kansun','kanturali','kanturk','kanun','kanver','kapagan','kapar','kapcak','kapkin','kaplan','kaptan','kara','karaalp','karaca','karacakurt','karacan','karaci','karacar','karacay','karacelik','karadag','karademir','karadeniz','karadogan','karaduman','karaer','karagoz','karahan','karakalpak','karakan','karakas','karakaya','karakoca','karakoc','karakoyun','karakucak','karakurt','karakus','karaman','karamik','karamuk','karamut','karamursel','karan','karanalp','karanbay','karaoglan','karaors','karapars','karasal','karasu','karasungur','karasuyek','karasin','karatan','karatas','karatay','karatekin','karatun','karayagiz','karayel','karcan','kardes','kargi','kargin','karginalp','karhan','karik','karindas','karlik','karlu','karluk','karlukhan','kartal','kartay','kartekin','kasal','kasar','kasim','kasirga','kaska','kati','katihan','kavas','kavcin','kavruk','kavurt','kavurtbey','kavurthan','kavvas','kay','kaya','kayaalp','kayacan','kayaer','kayagun','kayagunduz','kayahan','kayan','kayansel','kayar','kayas','kayatekin','kayatimur','kayaturk','kaygisiz','kaygusuz','kayhan','kayi','kayibay','kayihan','kayin','kayit','kayitmis','kaymas','kaymaz','kaynak','kaynar','kaynarkan','kayra','kayraalp','kayrahan','kayral','kayran','kayser','kayyum','kazak','kazakhan','kazan','kazanhan','kazgan','kelesbay','keleshan','kemal','kemalettin','kemandar','kenan','keramet','keramettin','kerami','keremsah','kerimhan','kerman','kervan','keskinay','keyhan','kilavuz','kilical','kilicalp','kilicaslan','kilicbay','kilichan','kinalp','kinay','kinayman','kinayturk','kinikaslan','kipcak','kirac','kiralp','kiran','kiranalp','kiraner','kirat','kiratli','kiray','kirbay','kirboga','kirca','kirdar','kirdarli','kirhan','kirman','kirtay','kivanc','kivancer','kivancli','kiyam','kiyan','kiyas','kizan','kizilaslan','kizilates','kizilbars','kizilboga','kizilelma','kizilpars','kizilyalim','kibar','kicialp','kicihan','kinas','kinyas','kipcan','kiram','kiramettin','kirami','kirman','kirmansah','kisihan','koca','kocaalp','kocademir','kocagoz','kocaman','kocatas','kocatay','kocaturk','kocaun','kocak','kocakalp','kocakaslan','kocaker','kocas','kocay','kocboga','kochan','kockan','kockar','kolat','kolcak','koldan','koldas','koman','komutan','konak','konan','kongar','kongarata','konguralp','kongurtay','konrat','konuralp','konurata','konuray','kopan','koparal','kora','koral','koralp','koraltan','koramaz','koraslan','koray','korcan','korcak','korcan','korday','korgan','korhan','korkan','korkmaz','korkutalp','korkutata','korman','kortak','kortan','kortas','kortay','korugan','koryak','koryay','kosal','kosukhan','kotuzhan','koyak','koyas','koytak','koytan','kozak','koksal','koksan','koktan','koktas','koktay','kozcan','kubat','kubilay','kuday','kudayberdi','kudretullah','kutay','kuyas','kursad','kursat','lala','maarif','macit','magrip','magrur','mahbup','mahfi','mahfuz','mahi','mahir','mahmur','mahmut','mahra','mahser','mahsun','mahsut','mahya','mail','makal','makbul','maksum','maksur','maksut','makul','malik','malkoc','malkocoglu','mancer','manco','mancu','mancuhan','manga','mangalay','mansur','manzur','maral','maruf','masum','masallah','masuk','matlup','matuk','mazhar','mazlum','medayin','mefhar','melikhan','meliksah','menaf','mengualp','mengubay','mengutas','mengutay','mennan','meral','merdan','mertkal','mertkan','mestan','mesahir','metehan','metinkaya','mevlana','midhat','mihrican','mirac','miran','miranmir','mirat','mircan','mirhan','mirza','mirzat','mithat','mocan','moran','moray','muaffak','muallim','muammer','muazzam','mugdat','muhacir','muhammed','muhammet','muhar','muharrem','muhtar','mukaddem','mukadder','munar','mungan','murat','murathan','murtaza','musa','musaddik','musafat','mustafa','mutahhar','mutasim','mutlualp','mutluay','mutlubay','mutluhan','mutlukan','mutlukhan','muvaffak','muvahhit','muvakkar','muzaffer','mubarek','mucahit','mucahittin','mucap','mucteba','muhurdar','mujdat','muminhan','mumtaz','munasip','mustakim','mustecap','musahit','mustak','musteba','muzahir','muzdat','naci','nacil','nadi','nadim','nadir','nafi','nafiz','nahit','nail','naim','naip','nakip','naki','nakip','namal','namdar','namik','nami','nart','narter','nas','nasif','nasir','nasih','nasip','nasir','nasrettin','nasri','nasrullah','nasuh','nasuhi','nasir','nasit','natik','natuk','natuvan','nayman','nazim','nazir','nazif','nazik','nazir','nazmi','nebahattin','necat','necati','neccar','nehar','nejat','nesat','nevcivan','nevsal','nevzat','nezahattin','nida','nidai','nihai','nihat','nihayet','nilhan','nimetullah','nisan','nisani','nisan','nisanbay','niyaz','niyazi','nizam','nizamettin','nizami','nizar','nogay','noyan','nuhcan','nuhkan','numan','nural','nuralp','nurani','nuratay','nuraydin','nurbaki','nurbay','nurcihan','nurdag','nurdal','nurdogan','nurhan','nurihak','nurkan','nursal','nursan','nurtac','nurullah','nurzat','nuyan','oba','ocak','ocan','odhan','odkan','odkanli','odman','odyak','odyakar','odyakmaz','oflas','oflaz','oflazer','ogan','oganalp','oganer','ogansoy','ogeday','ogan','oganalp','oganer','ogansoy','oganverdi','ogulbali','ogulbas','ogulbay','ogulcan','ogulcak','ogultan','oguralp','ogurata','oguzalp','oguzata','oguzbala','oguzbay','oguzcan','oguzhan','oguzkan','oguzman','oguztan','okakin','okal','okan','okanalp','okanay','okandan','okaner','okar','okat','okatan','okatar','okatay','okay','okayer','okbas','okbay','okboga','okcan','okdag','okhan','okkan','okman','oksal','oksaldi','oksalmis','oksar','oksay','oksak','oksan','oksar','oktan','oktar','oktas','oktay','okutan','okuyan','okyalaz','okyan','okyanus','okyar','okyay','olca','olcan','olcay','olcayhan','olcayto','olcaytu','olcaytug','olcayturk','oldac','oldag','olgac','olgunay','olkivanc','olpak','olsan','omaca','omac','omay','omurca','omurtak','onan','onar','onaran','onart','onat','onatkan','onatkut','onatsu','onay','onbulak','ongan','ongay','ongunalp','onuktan','onultan','onurad','onural','onuralp','onurhan','onurkan','onursal','onursan','onursay','opak','orak','orakay','oral','oralmis','oran','oranli','oray','orbay','orcan','orcaner','orgunalp','orguntay','orgunalp','orhan','orkan','orkutay','orman','ortac','ortak','ortan','oskan','oskay','osman','otaci','otag','otak','otakci','otamis','otaran','otay','oyal','oyalp','oybozan','oyhan','oykan','oymak','oyman','ozan','ozanalp','ozanay','ozaner','ozansoy','ozansu','ozgan','ocal','ocal','ogeday','ogutal','omural','omurcan','onad','onal','onalan','onay','onaydin','oncubay','ongay','onkal','onsal','onsav','ontas','orsan','orsay','orskan','ortan','ortas','ortay','ovunal','ozak','ozakan','ozakar','ozakay','ozakin','ozakinci','ozaktug','ozal','ozalp','ozalpman','ozalpsan','ozaltan','ozaltay','ozaltin','ozaltug','ozan','ozarda','ozari','ozark','ozarkin','ozaslan','ozata','ozatay','ozay','ozaydin','ozayhan','ozbag','ozbal','ozbala','ozbas','ozbatu','ozbay','ozbaydar','ozbekkan','ozboga','ozcan','ozcam','ozcinar','ozdag','ozdal','ozdamar','ozdilmac','ozdoga','ozdogal','ozdogan','ozduran','ozekan','ozercan','ozerdal','ozerhan','ozerman','ozertan','ozgebay','ozgenalp','ozgenay','ozgiray','ozgunay','ozgurcan','ozhakan','ozhan','ozilhan','ozinal','ozinan','ozkal','ozkan','ozkar','ozkaya','ozkayra','ozkerman','ozkinal','ozkinay','ozkula','ozkutal','ozkutay','ozkutsal','ozman','ozoktay','ozozan','ozpala','ozpinar','ozpolat','ozpulat','ozsan','ozsanli','ozsahin','ozsan','oztan','oztanir','oztarhan','oztas','oztay','oztaylan','oztoygar','oztuna','ozuak','ozyay','ozyuva','padisah','pak','pakalin','pakan','pakbaz','pakel','paker','paki','pakkan','pakman','paksan','pamir','polat','poyraz','raci','racih','radi','rafet','rafettin','rafi','rafih','ragip','rahi','rahim','rahman','rahmani','rahmet','rahmeti','rahmetullah','rahmi','rahsan','raif','raik','rakim','rakip','ramazan','rami','ramis','ramiz','rasih','rasim','rasin','rasit','ratip','rauf','rayet','rayihan','razi','razi','reca','recai','refhan','regaip','reha','rehayeddin','renan','resai','resulhan','resat','revan','reyyan','rezzak','ridvan','rifat','riza','rizkullah','rizvan','rical','rifat','rikap','risalet','risalettin','ruat','ruhani','ruhcan','ruhsat','ruhsan','ruhullah','ruchan','saadettin','sacit','sada','sadak','sadakat','sadettin','sadik','sadi','sadir','sadrettin','sadri','sadullah','sadun','safa','safder','safer','saffet','safi','safiyuddin','safter','sagan','saganak','saganalp','sagbilge','sagbudun','sagcan','sagdic','sagin','saginc','sagit','saglam','saglamer','saglar','saglik','sagman','sagun','sahil','sahip','sahir','saim','saip','sair','sait','sak','saka','sakin','sakip','saki','sakin','sakman','sal','sala','salah','salahattin','salahi','salan','salar','salcan','saldam','salgur','salik','salikbey','salih','salim','salis','salkin','salman','saltan','salti','saltik','saltuk','saltukalp','salur','salurbay','samet','sami','samih','samim','samimi','samin','samir','samur','samuray','samurtay','san','sanac','sanak','sanal','sanalp','sanat','sanay','sanbay','sanberk','sancak','sancaktar','sancar','sancarhan','sancar','sanduc','saner','sani','sanih','sanli','sansin','sanver','sar','sarac','saral','saran','sarbek','sargan','sargin','sarginal','sargut','sarialp','saribay','sarica','saricam','sarier','sarihan','sarikaya','saritas','sarim','sarkan','sarp','sarper','sarphan','sarpkan','sarpkin','sarpkoc','sart','sartik','saru','saruca','saruhan','sarvan','sati','satibey','satilmis','satuk','satukbugra','satvet','sav','sava','savaci','savak','savas','savasan','savaser','savaskan','savat','saver','savgat','savlet','savni','savran','savtekin','savtunc','savtur','savun','say','saya','sayan','saybay','saydam','saygi','saygili','saygin','saygun','sayhan','sayil','sayilbay','sayilgan','sayim','sayin','sayinberk','sayinbey','sayiner','saykal','saykut','saylam','saylan','saylav','saylu','sayman','saymaner','sayrac','sayrak','sayri','sayru','sayvan','sayyat','sazak','sebahattin','sebat','sebati','sebukalp','secahat','sedat','sefa','seha','sehhar','sehran','selahattin','selamullah','selcukkan','selekman','selhan','selkan','selman','selvihan','semahat','semai','semavi','semiray','senai','sencan','serad','seralp','serazat','serbay','sercan','sercihan','serdal','serdar','serdarhan','serhan','serhas','serhat','serkan','sertac','sertap','settar','sevan','sevay','sevcan','sevkal','sevkan','seyda','seyfali','seyfullah','seyhan','seyithan','seyran','sezai','sezal','sezginay','sezginbas','siba','sidal','sidam','sidar','silan','siral','siralp','sirat','siylihan','simavi','sina','sinan','sipahi','siracettin','sirac','siyavus','somay','sonad','sonalp','sonat','sonbay','sondal','songurhan','songurkan','soral','soyak','soyalp','soydan','soydaner','soydas','soyhan','soykal','soykan','soylubay','soysal','soysaldi','soysalturk','soysan','soyupak','soyurgal','sonmezalp','sonmezay','sozal','sualp','suat','suavi','suay','subasi','subay','subutay','suca','suhan','suka','sukat','sunal','sunalp','sunar','sunay','sunguralp','sungurbay','sunullah','suyurgal','suyurgamis','suyurgan','sualp','subas','subasi','subitay','sudas','suerkan','suersan','suha','suhan','sukan','suleyman','sumerkan','sungutay','suphan','suvari','sad','sadan','sader','sadiman','sadi','safak','safi','sah','sahadet','sahadettin','sahamet','sahan','sahap','sahat','sahbaz','sahbey','sahdar','sahin','sahinalp','sahinbay','sahinbey','sahiner','sahinhan','sahinkan','sahinter','sahistan','sahittin','sahlan','sahruh','sahsuvar','sahvelet','sahzade','sahzat','saik','sair','sakar','sakir','samih','samil','san','sanal','sanalp','saner','sanli','sanlibay','sansal','sanver','sar','sarbay','sarik','satir','sayan','sayeste','saylan','sazi','sebap','secaat','sefaat','sefaattin','sefkat','sehadet','sehadettin','sehamet','sehinsah','sehsuvar','sehzade','sehzat','semail','senal','senalp','senaltan','senay','senbay','sencan','sendogan','senkal','sensal','senyasar','serafet','serafettin','serefhan','seyda','seyyat','simsad','simsekhan','simsekkan','sinasi','sinaver','sipal','sirvan','sirzat','suayp','sungar','sukran','tacal','tacettin','taci','tacim','tacir','tacver','tac','tackin','taflan','tagay','tag','tagalp','tagar','tagay','tagman','taha','tahir','tahsin','taip','takdir','taki','takiyettin','talas','talat','talay','talayer','talayhan','talaykan','talaykoc','talaykurt','talaykut','talayman','talaz','talha','tali','talih','talip','talu','taluy','taluyhan','tamal','tamar','tamay','tamaydin','tamcelik','tamer','tamerk','tamkan','tamkoc','tamkurt','tamkut','tamturk','tan','tanacan','tanacar','tanagar','tanak','tanal','tanalp','tanaltan','tanaltay','tanay','tanaydin','tanbay','tanbek','tanberk','tanbey','tanboga','tanbolat','tancan','tandogan','tandogdu','tandogmus','tandoruk','tanel','taner','tanerk','tanfer','tangor','tanguc','tangun','tanguner','tanhan','tanik','tanin','tanir','tanircan','tanirer','tanis','tanju','tankan','tankoc','tankurt','tankut','tankutlu','tanla','tanlak','tanman','tanoren','tanpinar','tanrikorur','tanrikul','tanrikulu','tanriover','tansal','tansan','tansel','tansen','tanser','tansev','tanseven','tansever','tansi','tansig','tansik','tansoy','tansu','tansug','tansuk','tantug','tanturk','tanugur','tanver','tanyel','tanyeli','tanyer','tanyeri','tanyildiz','tanyol','tanyolac','tanyolu','tanyu','tanyucel','tanyuz','tanzer','tapduk','tapgac','tapik','tapinc','tapli','taptuk','taranci','tardu','tarduk','targan','tarhan','tarhun','tari','tarik','tarim','tariman','tarimer','tarik','tarkan','tarman','tartis','taru','tasan','tasar','tasboga','tasbudak','tascan','tasdemir','tasdoven','tasel','taser','tasgan','tashan','taskan','taskent','taskin','taskinel','taskiner','taskiran','tastan','tastekin','tatar','tatarhan','tatarkan','tatu','tav','tavgac','tavlan','tavli','tavus','tay','tayak','tayanc','tayaydin','taybars','taybek','tayberk','tayboga','taycan','taydas','taydemir','tayfun','tayfur','taygan','taygun','tayguner','tayhan','taykara','taykoc','taykurt','taykut','tayla','taylak','taylan','taylaner','tayman','taymaz','taypars','tayuk','tayyar','tayyip','teberdar','tekal','tekalp','tekant','tekay','tekbay','tekcan','tekdogan','tekebas','tekebay','tekecan','tekinal','tekinalp','tekinay','tekindag','tekinhan','tekyay','temirbay','temircan','temirhan','temirkan','temirtas','temizalp','temizcan','temizhan','temizkal','temizkan','temizsan','temurhan','temursah','tendubay','tengizalp','teoman','tercan','terlan','tezal','tezalp','tezay','tezcan','tezcanli','tezkan','tinal','tinaz','tilmac','timurcan','timurhan','timurkan','timurtas','togan','togay','tokal','tokalan','tokalp','tokay','tokcan','tokhan','tokkan','tokta','toktahan','toktamis','toktas','tokushan','tokyay','tola','tolay','tolga','tolgahan','tolgan','tolgay','tolgunay','tolonay','tolonbay','tolunay','tolunbay','tongal','tongar','topa','topac','topak','topay','topcam','topcay','toprak','toralp','toraman','toran','torcan','torgay','torhan','torkal','torkan','torlak','torumtay','toyboga','toycan','toygar','toyka','tozan','torehan','tufan','tugay','tugal','tugalp','tugaltan','tugaltay','tugbay','tughan','tugkan','tugra','tugsan','tugsav','tugsavas','tugsavul','tugsavun','tugtas','tugtay','tugyan','tulga','tulgar','tuman','tumay','tuna','tunacan','tunaer','tunahan','tunakan','tunay','tunca','tuncal','tuncalp','tuncay','tuncal','tuncalin','tuncalp','tuncaral','tuncaslan','tuncay','tuncbay','tuncboga','tunccag','tunchan','tunckan','tunckaya','tunctan','tunga','tura','turac','tural','turalp','turan','turatekin','turay','turbay','turcan','turgay','turhan','turkan','tutuhan','tuvana','tuyan','tukelalp','tukelay','tumay','tumbay','tumcan','tumenbay','tumenboga','tumerkan','tumhan','tumkal','tumkan','tunak','tunal','tunay','tunaydin','turehan','turkalp','turkaslan','turkay','turkcan','turkdogan','turkkan','turksan','turkyilmaz','tuzunalp','tuzunkan','ubeydullah','uca','ucaer','ucatekin','uca','ucan','ucanay','ucanok','ucantekin','ucanturk','ucar','ucarer','ucarli','ucay','ucbay','uchan','uckan','uckara','ucma','ucmak','ucman','uflaz','ufukay','ufuktan','ugan','ugan','ugural','uguralp','ugurata','uguray','ugurcan','ugurhan','ugurlubay','ugursal','ugursan','ugursay','ugurtan','ugurtay','ulac','ulachan','ulackan','ulak','ulakbey','ulam','ular','ulas','ulcan','ulcay','ulualp','uluant','ulubas','ulubay','uluca','ulucan','ulucag','ulucam','uluckan','uludag','uludogan','uluerkan','uluhan','ulukaan','ulukan','ulukaya','uluman','ulunay','ulusal','ulusan','ulusahin','ulusan','ulutan','ulutas','ulutay','uma','umac','umak','uman','umar','umman','umran','umural','umuralp','umurbay','unan','unat','ungan','ural','uralp','uraltan','uraltay','uram','uran','uras','uraz','uraza','urazli','urhan','urkan','usal','usalan','usalp','usbay','ushan','uskan','usman','usta','usak','utkan','utman','uyar','uyaralp','uyarel','uyarer','uygan','uygar','uyguralp','uysal','uzalp','uzay','uzbay','uzcan','uzhan','uzkan','uzman','uzsan','uztan','uztas','uztav','uztay','ubeydullah','ukkase','ulgenalp','ulkutan','unal','unalan','unaldi','unalmis','unalp','unay','unkan','unkaya','unsac','unsal','unsan','unuvar','unyay','urundubay','ustat','ustay','ustunbay','vacip','vacit','vafi','vafir','vafit','vaha','vahap','vahdet','vahdettin','vahip','vahit','vahittin','vaiz','vakkas','vakur','valasan','vamik','varal','varas','vardar','vargin','varlik','varol','vasfi','vasif','vasil','vassaf','vatan','vataner','vecahettin','vedat','vefa','vefai','velican','veliyullah','veral','versan','vesamet','vicdan','vicdani','visali','visam','volkan','vural','yada','yadaci','yadigar','yafes','yagan','yagin','yaginalp','yagisiyan','yagiz','yagizalp','yagizbay','yagizboga','yagizer','yagizhan','yagizkan','yagizkurt','yagiztekin','yagmurca','yahsi','yahsibay','yahsiboga','yahsihan','yahsikan','yahsitay','yahya','yakup','yakut','yalap','yalav','yalavac','yalaz','yalazahan','yalazakan','yalazalp','yalazan','yalazay','yalcin','yalciner','yalcinkaya','yalcuk','yaldirak','yaldirim','yalgi','yalgin','yalginay','yalim','yalin','yalinalp','yalinay','yalki','yalkin','yalmac','yalman','yalt','yaltir','yaltirak','yaltiray','yalvac','yamac','yaman','yamaner','yamanoz','yamansoy','yamanturk','yamanyigit','yamci','yanac','yanal','yanar','yanbek','yanbey','yandil','yangar','yanik','yaniker','yanki','yapalak','yararer','yarasik','yardak','yargan','yargi','yarkan','yarkaya','yarkin','yarlik','yarluk','yaruk','yasa','yasan','yasavul','yaser','yasin','yasun','yasa','yasam','yasanur','yasar','yasarturk','yasdas','yasik','yasin','yaslak','yatman','yatuk','yavas','yaver','yavuz','yavuzalp','yavuzay','yavuzbay','yavuzboga','yavuzcan','yavuzer','yavuzhan','yavuzsoy','yay','yayak','yayalp','yayboru','yaybuke','yaygir','yayla','yaylak','yazan','yazar','yazgan','yazganalp','yazgi','yazik','yazir','yekta','yelal','yelbay','yelboga','yeldan','yenal','yenay','yeneral','yertan','yesari','yetisal','yezdan','yibar','yilbay','yildiralp','yildiran','yildiraner','yildiray','yildizhan','yilhan','yilkan','yilma','yilmaz','yilmazok','yipar','yigitcan','yigithan','yigitkan','yinanc','yogunay','yola','yolac','yolal','yoldas','yoma','yordam','yordamli','yonal','yula','yura','yurdaay','yurdacan','yurdaer','yurdakul','yurdal','yurdanur','yurdasen','yurtal','yurtbay','yurtcan','yurtkuran','yurtman','yurtsal','yurtsan','yurttas','yucealp','yucebas','yucedag','yucelay','yucesan','yuzuak','zade','zafer','zafir','zagnos','zahir','zahit','zaik','zaim','zait','zaki','zakir','zaman','zamir','zarif','zati','zekeriya','zeycan','zeynullah','zeyyat','zikrullah','ziya','ziyaeddin','ziyaettin','ziyat','ziynetullah','zoral','zulfikar','zulkarneyn','bahir','bedel','bedi','bedih','bedir','bediz','bedrettin','bedri','beduk','begenc','behcet','behic','behlul','behmen','bek','bekam','bekdemir','bekdil','bekem','beker','bekir','bektore','bekturk','belek','belen','belge','belig','bellek','bender','bendes','bener','bengi','bengisoy','bengisu','bengu','benol','bensen','bent','benturk','benzer','bereket','beren','berfin','berge','bergin','beri','berin','berk','berke','berkel','berker','berki','berkin','berkmen','berkok','berkol','berkoz','berksoy','berksu','berksun','berktin','berkun','berter','besen','besim','beser','besir','betik','betim','beygu','beyrek','beytekin','beytemir','beytore','bilal','bilek','bilen','bilender','bilgeer','bilgekurt','bilgekut','bilgen','bilger','bilgeturk','bilgi','bilgic','bilgin','bilginer','bilgu','bilik','bilir','bilmen','bilnur','bilsen','biner','bingol','binisik','bintug','birce','birge','birgi','birgit','biriz','birkok','birmen','birol','birsel','birsen','birsin','birsoy','birsen','birten','bitek','bitim','bor','boy','boyer','boylu','boz','bozbey','bozdemir','bozdeniz','bozer','bozerk','bozkir','bozkurt','bozok','boztepe','boztimur','bozyel','bozyigit','boget','bogrek','boke','boken','borcek','bork','bortecin','boru','borubey','budun','bulgu','buluc','bulunc','bulus','bulut','buluttekin','bumin','burc','burcin','buruk','buruktekin','buyruk','buyrukcu','buge','buget','bugduz','buk','buke','buklum','bulent','burce','burge','burkut','butun','cebe','ceben','cebesoy','ceber','celebi','celikbilek','colbey','demirbuken','ebecen','ebed','ebet','ebubekir','ecebey','ekber','elbek','elbeyi','elcibey','elibol','erbelgin','erben','erberk','erbey','erbil','erbilek','erbilen','erbilir','erboy','erdibek','erdibey','gokbel','gokbelen','gokberk','gokbey','gokboru','gokbudun','gokbulut','gokcebel','gokcebey','gorbil','gulbek','gulbey','gulbeyi','gumberk','gunbek','gunbey','gunduzbey','gungorbey','gurbuz','heybet','hurbey','ibik','ibis','ibo','ilbeg','ilbek','ilbey','ilbeyi','ilbilge','ilbozdu','ilbudun','incebey','izboru','izbudun','izbul','kebir','kirboru','kizginbey','kizilboru','kocboru','kocubey','konurbey','lebip','mebruk','mebrur','mebus','menguberti','muhibbi','mukbil','mustubey','muteber','mubin','nebi','nebih','nebil','oben','obuz','ogulbey','okbudun','orbek','obek','olmezbey','ozbek','ozben','ozberk','ozbey','ozbil','ozbilek','ozbilen','ozbilge','ozbilgin','ozbilir','ozbir','ozcebe','rebi','rebii','rehber','sebih','sebil','sebuk','sebuktekin','serbulent','soylubey','subegi','subhi','teber','teberhun','tebrik','tekbek','tekbey','tekbir','tekebey','tellibey','tibet','tosunbey','tuncbilek','tuncboru','tublek','ubeyt','ucbeyi','ugurlubey','ulubek','uluberk','ulubey','ulugbey','umurbey','urbeyi','usberk','usbey','ubeyd','ubeyt','unubol','vehbi','yolbul','zobu','zorbey','zubeyr','celadet','celal','celalettin','celali','celasun','celayir','celil','cem','cemi','cemil','cemre','cemsir','cemsit','cengaver','cenger','cengiz','cenk','cenker','cerit','cesim','cesur','cevdet','cevher','cevheri','cevri','ceyhun','cezlan','cezmi','cimsit','cindoruk','cosku','coskun','coskuner','coskunsu','comert','cuci','cudi','culduz','cumhur','cumhuriyet','cundi','cuneyt','delice','ecemis','ecer','ecevit','ecir','ecmel','ecvet','ekinci','emcet','erce','erciyes','ercument','erincek','erincik','evcil','evcimen','fecri','gence','gencel','gencer','genco','gocek','gokcen','gucel','gucer','gucumen','hicret','huccet','ince','incesu','ivecen','iyicil','kivilcim','korucu','mecdi','mecdut','mecit','mecittin','mecnun','mehcur','mengucek','mescur','mevcut','mucip','mucit','munci','necdet','necip','necmi','oncel','oncu','oncuer','ozgeci','recep','selcen','sencer','tecelli','tecen','tecer','teceren','tecim','tecimen','tecimer','tecir','tugcu','tuncel','tuncer','ulkucu','vecdet','vecdi','vechi','vecih','vecihi','vecit','yuce','yuceer','yucel','yucelen','yucelt','yucelten','yucesoy','yucetekin','yuceturk','cecen','cekik','cekim','cekin','celem','celen','celenk','celik','celikel','celiker','celikiz','celikkol','celikoz','celiksu','celikten','celikturk','celikyurek','celim','celtik','cender','cengiz','cepni','cerci','ceri','cerkez','cerme','cetik','cetin','cetinel','cetiner','cetinok','cetinoz','cetinsoy','cetinsu','cetinturk','cetinyigit','cevik','cevikel','ceviker','cevikoz','cevrim','cig','cigil','cigir','cingi','civgin','ciftci','cigil','ciglez','cin','cinel','ciner','cinerk','cingiz','cinkilic','cinucin','coker','coku','copur','cotuk','cotur','cokermis','coyur','demirguc','demirkoc','demirpence','dikec','dinc','dincel','dincer','dincerk','dinckol','dinckok','dincmen','dincok','dincol','dincoz','dincsel','dincsoy','dincsu','dincturk','direnc','elci','elcin','emec','enc','enec','ercelik','ercetin','ercevik','erdinc','erenguc','ergenc','erguc','ergulec','erguvenc','erinc','erincer','erkilic','erkoc','ersec','ersevinc','ertunc','ferec','genc','gencel','gencer','gencsoy','gencsu','gencturk','gercek','gerceker','girginkoc','gocen','gocer','gocmen','gokce','gokceer','gokcek','gokcel','gokcen','gokcer','gokcesu','gokcil','gokcin','gokcul','gokcun','goktunc','gonc','gonenc','gorguc','goyunc','guc','gucel','guceren','gucermis','guclu','gucluer','gucluturk','gucmen','gucsel','gucyener','gucyeter','gulec','gulecer','gumec','gunce','gunec','guvenc','hicsonmez','icli','icoz','icten','ilci','ilginc','kilic','kilicel','kilicer','kilinc','kiziltunc','kici','koc','kocer','kocsoy','koctug','kocturk','kocu','kocyigit','koceri','lacin','mehmetcik','menguc','meric','okcun','okguc','okguclu','oktunc','olcun','opcin','orcun','ortunc','oruc','oytunc','ogrunc','ogunc','olcum','olcun','ondunc','ovec','ovunc','ozcelik','ozcevik','ozcin','ozdinc','ozdincer','ozenc','ozerdinc','ozerinc','ozgenc','ozguc','ozgulec','ozkoc','ozokcu','oztunc','secen','secim','seckin','seckiner','secme','secmeer','secmen','secmener','selcuk','selcuker','selguc','serdengecti','serdinc','sevinc','sonuc','sorguc','soydinc','soydincer','soyselcuk','tekce','temucin','timucin','tonguc','tunc','tuncdemir','tuncel','tuncer','tunckilic','tunckol','tunckurt','tuncok','tuncoven','tuncsoy','tuncturk','tunguc','tumkoc','uc','uckun','ucuk','ucur','uluc','ulumeric','uce','ucel','ucer','ucisik','uckok','ucok','ucuk','unucok','yoruc','adem','dahi','dana','dede','deger','degmeer','dehri','delal','demir','demirdelen','demirdoven','demirel','demirer','demirezen','demirgulle','demiriz','demirkol','demirkok','demirkurt','demirkut','demirok','demirol','demiroz','demirsoy','demirtekin','demirtug','demirturk','demiryurek','demren','dengiz','dengizer','deniz','denizel','denizer','denizmen','deniztekin','denk','denkel','denker','denli','denlisoy','deren','derenel','derin','derinkok','derinoz','derlen','dervis','devin','deviner','devlet','devlettin','devrim','devrimer','didim','dik','dikel','diken','diker','dikey','dikmen','diksoy','dil','dilaver','dilemre','diler','dilge','dilmen','dilyar','diren','diri','dirik','diriker','dirikok','diril','dirim','dirimtekin','dirin','diriner','dirisoy','dirlik','dogru','dogruel','dogruer','dogruol','dogruoz','dogu','doguer','dogus','dolun','doru','doruk','dorukkurt','dorukkut','doruktekin','doruktepe','dost','dolek','dolen','dolensoy','donmez','donmezer','donmezsoy','donmeztekin','donu','dumlu','dumrul','durdu','durgun','durguner','durgunsu','durmus','dursun','dursen','duru','duruiz','duruk','durul','duruoz','durusel','durusoy','durusu','durutekin','duruturk','duyu','dulge','dulger','durri','dusun','dusunsel','duzel','duzey','duzgun','ede','edgu','edguer','edhem','edip','ediz','efendi','efgende','ehed','ejder','eldem','eldemir','elidemir','elverdi','ender','erdem','erdemer','erdemir','erdemli','erden','erdener','erdeniz','erdesir','erdi','erdil','erdilek','erdin','erdiner','erdog','erdogdu','erdogmus','erdol','erdolek','erdonmez','erdur','erdurdu','erdurmus','erdursun','erduru','erendemir','erendiz','erguden','erguder','eryildiz','esendemir','ferdi','feridun','ferzend','firdevsi','gedik','gediz','gokdemir','gokdeniz','gondem','gonder','gonuldes','gudek','guder','gundemir','gunden','gundeniz','gunder','gundes','gundogdu','gundogmus','gundondu','gunduz','gungordu','hemdem','hidir','idik','idikut','ildir','ildiz','idi','idikurt','idikut','idris','igdemir','ildem','ildemer','ildemir','ildeniz','ildes','iskender','isguden','isguder','kizildemir','kuddus','kuddusi','kudret','ledun','medeni','medet','medih','medit','mehdi','memduh','menderes','merdi','mevdut','muktedir','muslihiddin','muderris','mudrik','muldur','nedim','nedret','od','oder','okdemir','okverdi','odul','onder','onderol','ondes','orundu','ozdeger','ozdek','ozdel','ozdemir','ozden','ozdener','ozdes','ozdil','ozdilek','ozdogdu','ozdogmus','ozdogru','ozdoru','ozdoruk','ozdurdu','ozduru','ozdurul','ozdurum','ozender','ozerdem','ozerdim','ozonder','ozudogru','ozverdi','resididdin','sedit','semender','sevgideger','sevindik','seydi','siddik','sidki','sudi','suudi','suerdem','suerden','semdin','sendur','sengeldi','side','tedu','tendu','tendurek','tepedelen','tevhiddin','tokdemir','topdemir','toydemir','toydeniz','tumerdem','turkdogdu','ufukdeniz','uldiz','umdu','urundu','ulkudes','ungordu','unudeger','unverdi','urundu','vedi','vedit','veliyuddin','verdî','yedier','yediger','yildir','yildirer','yildirim','yurdusev','yurdusen','zeyneddin','zuhdi','alem','efe','efgen','efkar','eflatun','efruz','efser','ege','egemen','egesel','egilmez','egrek','ehlimen','eke','ekemen','eken','ekenel','ekener','ekim','ekiner','ekmel','ekrem','elgin','elitez','eliuz','eliustun','elove','elover','elver','elveren','emek','emet','emin','eminel','emir','emre','emri','ener','eneren','energin','enes','engin','enginel','enginer','enginiz','enginsoy','enginsu','engiz','engur','enis','enmutlu','enver','er','erek','ereken','erel','erem','eren','erenel','erenler','erenoz','erensoy','erensu','erenturk','erenulug','erer','ergen','ergenekon','ergener','ergi','ergil','ergin','erginel','erginer','erginsoy','ergintug','ergok','ergokmen','ergonen','ergonul','ergor','ergun','erguner','ergul','ergulen','erguler','ergumen','ergun','erguner','ergunes','erguney','erguven','erhun','erisik','erik','eriker','erim','erimel','erimer','erin','erip','eripek','eris','eriskin','eriz','erk','erke','erkel','erker','erkin','erkinel','erkis','erkin','erkinel','erkiner','erkmen','erkmenol','erkol','erksoy','erksun','erktin','erkul','erkunt','erkurt','erkus','erkut','erkutlu','erlik','ermis','ermutlu','ernur','eroglu','erogul','eroguz','erol','eroge','eroz','ersel','ersen','erserim','ersev','erseven','ersever','ersevin','ersezen','ersezer','ersin','erson','ersoy','ersoz','ersu','ersun','ersu','ersen','erset','erte','ertek','erteke','ertekin','ertem','erten','ertim','ertin','ertingu','ertok','ertop','ertore','ertug','ertugrul','ertut','ertun','erture','erturk','ertuze','ertuzun','erulgen','erun','erustun','eryetis','eryigit','erzi','ese','esen','esenel','esener','esenkul','esentimur','esenturk','eser','esim','esiner','eskin','eslek','esvet','esit','eskin','esmen','esref','ethem','eti','evgin','evirgen','evren','evrensel','evrim','evrimer','evsen','evsen','eylem','eylul','eymen','eyup','ezel','ezgu','ezguer','ezgutekin','fehim','fehmi','felat','felek','fenni','fer','ferhun','ferih','ferit','feriz','ferruh','fersoy','fesih','fethi','fetih','fevzi','feyiz','feyzettin','feyzi','fikret','fikrettin','filizer','futuvvet','gelener','genez','gevheri','gezgin','gezginer','girginer','gizer','gizmen','gogem','gogen','gokel','goken','goker','gokmen','gokmener','gokmete','goknel','goksel','goksen','goksenin','gokser','goksev','gokseven','goksever','goksen','gokten','goktore','gonen','gonener','gorkel','gorkem','gorkemli','gorker','gorkey','gorkmen','gorksev','govez','goymen','gozegir','gozem','gulegen','gulek','gulel','gulener','gulergin','gulergun','guleryuz','gulmen','gultekin','gumustekin','gunel','guner','guneren','gunergin','guneri','gunes','gunesen','guney','gungoren','gungoze','gunsel','gunser','gunsen','guntekin','guntore','gunver','gunyeli','gurer','gursel','guven','halet','hekim','heper','hepyener','hepyuksel','hizlier','hikmet','hikmettin','himmet','huner','hurmet','hurriyet','hursel','hursev','huseyin','husmen','husrev','isiker','isiner','iffet','ilergin','ileri','ilerigun','ilke','ilker','ilmen','ilsev','ilseven','ilsever','iltekin','iltemir','iltemiz','iltemur','ilter','ilteris','iltuze','imer','imre','imren','iren','irtek','ismet','ismen','isseven','issever','ivegen','iyem','iyimser','iyiyurek','izem','izzet','izzettin','kelami','keles','kelestimur','kemter','kent','kenter','kepez','kerem','kerim','kermen','kesek','kesim','keskin','keskinel','keskiner','kesfi','kete','keven','kevkep','kevnî','key','keyfi','kezer','kinel','kiner','kirteke','kirtekin','kismet','kiper','kirmen','korel','korer','koryurek','kosuktekin','kokel','koken','koker','koklem','kokten','komen','kornes','kose','kosemen','kosten','kosek','kosker','koymen','kozer','kuzey','lemi','levent','levin','meftun','mehip','mehmet','mehti','mekin','mekki','melen','melih','melik','melûl','memik','memis','memnun','memo','memun','mengi','mengu','menguer','mengutekin','mensup','mensur','mensur','menzur','mergen','mergup','merih','mersin','mert','mertel','merter','mertkol','mertol','mertturk','merzuk','mesih','mesrur','mestur','mesut','meshur','meskûr','mesru','mete','metin','metiner','mevlit','mevlût','mevlut','mevzun','meymun','mezit','mezun','mirkelam','muhterem','muhtesem','mutluer','mutlutekin','mutver','muesser','mueyyet','muferrih','mukerrem','mukremin','mulket','muren','mursel','mustenir','muserref','mustehir','muzekker','nefer','nefi','nefis','nehip','nehri','nemutlu','nerim','nermi','nesil','nesim','nesimi','nesip','neset','nesit','nevfel','nevit','nevres','nevrettin','nevri','nevruz','neyyiri','neyzen','nezih','nezihi','nezir','nimet','nurel','nurer','nurersin','nurettin','nursel','nurtekin','nurver','nusret','nusrettin','nuzhet','ogultekin','oguzer','oker','okergin','oksev','okseven','oksever','okture','okturemis','okver','olguner','onel','oner','onerim','onguner','onguner','ongunes','onuker','onuktekin','onursev','onurseven','oge','oger','oget','ogeturk','oge','oget','ogmen','oke','okeer','okelik','oker','okkes','okmen','okmener','okte','oktem','oktemer','okten','oktener','olen','olmez','omer','onel','onemli','onen','oner','oneri','ones','oney','ongel','ongen','ongoren','onsel','oren','orenel','orgen','ornek','orsel','oruner','oryurek','otuken','ovet','oymen','ozek','ozel','ozen','ozengin','ozer','ozerek','ozerk','ozerkin','ozerkmen','ozerol','ozertem','ozgeer','ozgen','ozgener','ozger','ozguner','ozgunes','ozgurel','ozguven','ozilter','ozke','ozkent','ozker','ozlek','ozlen','ozler','ozluer','ozmen','ozmert','ozoge','ozpeker','ozpetek','ozsel','ozselen','ozsevi','ozsuer','ozsen','oztek','oztekin','oztinel','oztiner','ozupek','ozver','ozveren','ozveri','ozvermis','pertev','refet','refettin','refi','refig','refih','refii','refik','reis','rekin','remzi','reset','resmî','resul','resik','resit','revis','rezin','rusen','ruknettin','rustem','sefer','seferî','segmen','sehi','selah','selahi','selam','selamet','selamettin','selami','selatin','selek','selekmen','seler','selisik','selim','selmi','selok','selvi','semih','semir','semuh','sener','senger','senî','senih','senol','seren','serener','sergen','sergin','serhenk','serhun','serim','serimer','serin','serkut','sermet','serol','sertel','serter','sertug','server','servet','servi','seven','sevener','sever','sevgen','sevgun','sevgur','sevig','sevik','sevin','sevuk','sevuktekin','seyfettin','seyfi','seyhun','seyit','seylan','seymen','sezek','sezer','sezgen','sezgi','sezgin','sezi','sezim','sezin','sezis','sezmen','siper','sirer','siret','sirmen','siyret','somel','somer','soner','soyer','soyguven','soyluer','soytekin','soyuer','sokmen','sokmener','sokmensu','sokmensuer','sonmez','sonmezer','sozen','sozer','sozmen','suheyp','sumer','sunel','suner','sungurtekin','suel','suer','sueren','suergin','suheyl','sulemis','sumer','sunter','suyek','suzen','sefik','seh','sehalem','sehim','sehlevent','sehmuz','sekip','sekûr','semi','semim','sems','semsettin','semsi','sen','senel','sener','sengil','sengul','sengun','seniz','senlen','senlik','senol','sensen','sensoy','senturk','senyurt','seref','seren','serif','sesen','sevket','sevki','simsek','simseker','solen','sukrettin','tegin','tek','teke','teker','tekes','tekil','tekin','tekinel','tekiner','tekinsoy','tekir','tekis','tekiz','tekmil','tekok','tekol','tekoktem','tekoz','tekozer','teksen','teksoy','tekun','tekunlu','telek','telim','telimer','telli','temel','temelli','temir','temirkut','temiz','temizel','temizer','temizol','temizoz','temizsoy','temren','temurlenk','tengir','tengiz','tenvir','tepegoz','tepel','tepir','terek','terem','terim','tesrif','tetik','tetiker','tevekkul','tevfik','tevhit','tevil','tevir','tevs','tevsen','teymur','tez','tezel','tezelli','tezer','tezeren','tezerol','tezok','tezol','tezveren','timurlenk','tiner','titizer','tokel','toker','tokuzer','tokyurek','topel','toper','torel','tokel','tolek','tomek','tore','toregun','torel','toreli','toren','tugrultekin','tugsel','tugser','tugtekin','tuhfe','tutel','tuter','tuzer','tukel','tulek','tumel','tumen','tumer','tumerk','tumerkin','tuner','tuney','ture','turek','turel','tureli','turemen','turev','turker','turkmen','turksel','turksen','tuze','tuzeer','tuzel','tuzemen','tuzmen','tuzuner','ugurel','ugursel','uhuvvet','uluer','ulutekin','user','usluer','uygunel','uyguner','uzel','uzer','uzgoren','uzmen','uztekin','uge','uke','ules','ulez','ulfer','ulfet','ulgen','ulgener','ulger','ulken','ulker','ulkumen','ulkusel','ulmen','umek','ummet','unek','uner','ungoren','unlem','unlen','unluer','unsev','unseven','unsever','unsevin','unver','unveren','unvermis','urek','urem','uren','uresin','urkmez','usgen','ustek','ustel','uster','ustuner','utugen','uveys','uye','uzek','uzer','uzeyir','vefi','vefik','vefki','vehip','vekil','velet','veli','velit','vergi','vergili','vergin','verim','vesik','vesim','veyis','veysel','veysi','yaren','yegan','yegin','yeginer','yegrek','yel','yelen','yeler','yelesen','yeleser','yeltekin','yemen','yenel','yenen','yener','yenerol','yengi','yenin','yenisu','yenisu','yerel','yergin','yerik','yersel','yesugey','yesil','yesne','yeten','yetener','yeter','yetik','yetim','yetis','yetisen','yetkin','yetkiner','yigitel','yigiter','yoner','yonet','yonetken','yonetmen','yontem','yurter','yurtguven','yurtsev','yurtseven','yurtsever','yuksel','yurekli','yuruker','zekai','zeki','zemin','zengin','zeren','zerin','zeynel','zeyni','zeynur','zeyrek','ziver','zuheyr','zurriyet','fikri','firuz','fuzuli','hifzi','kasif','latif','lutfi','mufit','muftu','munif','musfik','orfi','rifki','ufuk','vakif','yusuf','zulfi','zulfu','zulkif','zulkuf','girgin','giz','gogus','gokgol','gokhun','goknur','goksoy','goksu','goksun','goksin','goktug','gokturk','gorgu','gorgun','gork','gorklu','goyuk','gozutok','gulsoy','gumus','gumuskurt','gumuskut','gun','gungor','gungormus','gunisik','guniz','gunizi','gunizli','gunkurt','gunkut','gunkutlu','gunmutlu','gunnur','gunol','guntimur','guntulu','gunturk','gunturkun','gunyil','gunyol','gunyuz','gur','gurgan','gursu','hosgor','hulagu','ilgi','ilgim','ilgin','ilgi','ilgin','ilgu','ilgun','ilig','iyigun','izgi','izgu','kirgiz','kizgin','kizginok','kizginyigit','kongur','korgun','koygun','mutlugun','ogus','ogun','olgun','olgunsoy','olgunsu','ongun','ongunsu','ongur','ongun','orgun','orgun','ongor','ongu','ongul','ongun','ongut','ovgu','ozgu','ozgun','ozgur','ozsungur','ruzgar','silgin','singin','singin','songun','songur','sorgun','soyugur','sungu','sungun','sungur','sungur','tokgoz','tongur','toygun','turgut','tuygun','turgun','uguz','urgun','urungu','uygu','uygun','uygur','ugu','ulgu','ungormus','ungun','ungur','unugur','urgun','ustungu','vurgun','kiziltug','koryigit','koroglu','mutlug','ogul','ogulturk','ogur','ogus','oguz','oguztuzun','oktug','onug','ogun','ogur','ogus','ogut','ozogul','ozoguz','sigin','sogut','tigin','togus','toktug','tokuztug','toluntigin','tug','tugkun','tuglu','tugluk','tugrul','tuyug','turkoglu','ugur','ugurlu','ugurol','ugursoy','ugus','ugut','uguz','ulug','yigit','yogun','yulug','yugruk','hizir','hizli','hilalî','hilmi','hulki','hulûsi','hursit','huzur','hunkar','hur','hurol','husnu','ihlas','lahik','lahut','lamih','mihin','mihri','muhip','muhittin','muhlis','muhsin','muhyi','muslih','muhip','mulhim','nuh','orhun','ruhi','ruhittin','rusuhi','sulhi','suphi','zihni','zuhur','zuhuri','zuhtu','asik','iriz','irkil','ismik','isik','isikli','isilti','isin','isinsu','iskin','itri','inkilap','kazim','kimiz','kin','kinik','kinis','kizik','kizil','kizilkurt','layik','mulazim','ozkin','sati','sirri','sitki','siyli','sinik','tin','uri','azim','ikiz','iklim','il','ilim','ilki','ilkim','ilkin','ilkiz','ilksoy','ilkut','ilkutlu','ilkun','ilsu','iltutmus','iltuzun','inonu','iskit','islam','istiklal','iskur','iyiol','iyisoy','kamil','kani','katip','kip','kipkurt','kisi','koksin','koni','lami','mikail','muin','mukim','munis','muti','mukrim','mukrimin','mulayim','mumin','munim','munip','munir','murit','mursit','muslim','musir','nuri','nuvit','oniz','orik','ozil','oztimur','oztin','rukni','suzi','sukûti','sururi','timur','timuroz','tin','tinkut','tipi','titiz','toktimur','tulûi','turkili','turkiz','ulvi','umit','unsi','yumni','zikir','zikri','zinnur','konuk','konur','konuroz','kopuz','kor','korkut','kosuk','kotuz','koytuk','koksoy','molu','nurol','nurtop','oksu','okturk','okumus','okur','okus','okuslu','oluk','olus','omur','onuk','onul','onur','onurlu','onursoy','onursu','onursu','orkun','orkus','orkut','ortun','oruk','orum','orun','orus','oruz','otuk','oy','oykut','oytun','onol','onsoy','ozok','ozol','ozsoy','oztoklu','ozutok','som','sonsuz','sorkun','soykok','soykurt','soykut','soylu','soyoz','sursoy','tok','tokoz','toku','tokus','tokuz','tokyuz','tolon','tolun','topuz','tor','toros','torun','tosun','totuk','toy','tozun','tumkor','turkol','ulusoy','uzsoy','unluol','unlusoy','unsoy','ustol','yomut','zorlu','kok','koklu','koksu','koksur','kokturk','korklu','koz','nuroz','ok','oklu','okturk','omur','onur','ors','oruk','orun','otnu','otun','ovul','ovun','ozkok','ozkul','ozkurt','ozkut','ozkutlu','ozlu','ozluturk','ozmut','oznur','ozon','ozsozlu','ozsu','ozsun','ozsu','ozsut','ozturk','ozu','ozum','ozun','ozyoruk','ozyurt','sozusoz','tor','toru','torum','toz','tozum','turkoz','uluoz','yon','yoruk','nurkut','ruknu','rustu','sukru','tur','tumkurt','turk','tuzunturk','uluturk','umur','ur','urluk','uruk','urun','urus','uruz','uzturk','unturk','urkun','urun','yurt','yurtkulu','yuruk','muslum','saman','su','sukusu','sun','suut','su','sulu','ulus','ulusu','us','uslu','usuk','usum','us','ustun','yunus','mustu','tutus','ukus','yumus','kutlu','kutluk','lut','mut','mutlu','mutluk','tulû','tuluk','tulum','tulun','tun','tutkun','tutu','tutuk','tutun','tuyuk','tuz','tumkut','tuzun','ulukut','umut','umutlu','utku','uytun','yunt','uz','uz','ulu','ulum','ulun','umu','yumlu','yumun','vala','yuluk','ulkulu','un','unlu','abdil','abdilkadir','abdilkerim','abdin','abdis','abdo','abdu','abdul','abdulahat','abdulalim','abdulazim','abdulaziz','abdulbaki','abdulbakir','abdulbari','abdulbekir','abdulcabbar','abdulcebar','abdulcebbar','abdulcelal','abdulcelil','abdulferit','abdulfettah','abdulgadir','abdulgaffar','abdulgafur','abdulgani','abdulgazi','abdulhadi','abdulhafiz','abdulhakim','abdulhalik','abdulhalim','abdulhamid','abdulhamit','abdulhasim','abdulhekim','abdulhizak','abdulkadir','abdulkadirhan','abdulkahir','abdulkani','abdulkerim','abdulla','abdullatif','abdulmecit','abdulmelek','abdulmelik','abdulmenaf','abdulmenav','abdulmennan','abdulmuhsin','abdulmuhtalif','abdulmuhtalip','abdulmutalip','abdulmuttalip','abdulrahim','abdulrahman','abdulrazzak','abdulriza','abdulsabir','abdulsamed','abdulsamet','abdulselam','abdulsemet','abdulvahap','abdulvahit','abdulvasih','abdulvehap','abdurahim','abdurahman','abdurha','abdurrahim','abdurrazak','abdurrazzak','abdurrehim','abdurrezak','abdurrezzak','abdus','abdusamet','abdussamed','abdussamet','abdusselam','abes','abeydullah','abtullah','abubekir','abutalip','abuzar','abuzeyt','adder','adem','adiguzel','adik','adim','adlen','afettin','agagul','agah','agakisi','agit','agmur','ahat','ahdettin','ahet','ahmed','ahmetali','ahmetcan','akar','akimhan','akin','akver','alaaddin','alaadin','alaatdin','alaattin','aladdin','alaeddin','alaetdin','alaettin','alaiddin','alaittin','alatin','alattin','alayittin','aleddin','aleksey','alen','aletdin','alettin','alexandru','algin','aliabbas','alibaran','alibey','aliekber','alierk','alifer','aligul','alihsan','aliihsan','alikadir','aliksan','alin','aliosman','aliriza','alirza','alis','alisevim','aliseydi','alkame','alkim','alkin','allattin','almazbek','almus','alo','alpcan','alpin','alptunga','alvi','ammar','andim','anil','anilcan','apdil','apdullah','apdurrahman','aptil','aptulkadir','aptullah','arap','arapcan','ardil','argon','argun','arifcan','arikan','arin','arinc','arkin','arsen','arsunar','artemiz','artur','asamettin','asif','asik','asim','asip','asker','askin','askiner','asli','aslinbey','asur','atal','atanail','ati','atif','atike','atil','atilay','atile','atilgan','atilhan','atilim','atilkan','atman','atnan','attila','attilla','avsin','avvat','ayatin','ayatullah','aybaba','aydin','aydiner','aykutcan','aynullah','ayton','aytumen','ayvas','azad','azdin','azem','azettin','azrail','baattin','baba','babek','badet','badiru','bahaddin','bahadir','bahaettin','bahaittin','bahatdin','bahittin','bahman','bahrettin','bahsi','bahtinur','bakir','bakis','bali','balkir','banihan','barboros','baris','bariscan','barishan','barsen','bartosz','bartug','basaran','baskin','batdal','batikan','batun','batyr','baver','bayramali','bayramettin','baysar','baysat','bayzettin','bedii','bedirittin','bedran','bedreddin','begler','behcet','behman','behre','behrem','behsat','behyeddin','bejdar','bekan','bekirhan','beklem','bektasi','benhar','benhur','benisan','benna','beran','berati','beray','bergun','berhan','berho','berkcan','berkehan','berkem','berkkalp','berktug','bersan','bertal','besdemin','besin','beslan','bestami','beyazit','beyhani','beykut','beyler','beynur','beysim','beytullah','bezgin','bhekumusa','bilal','bilcan','binyami','binyamin','birand','birkay','biron','birtekin','bisar','bonci','boracan','bubo','buhari','bukan','bulend','bulent','bunyami','bunyamil','bunyamun','burakbey','burakhan','buray','burcay','burhan','burhaneddin','burtay','cafet','cagatay','cagda','cagdan','cagil','cagin','cagri','cagtay','cahid','cahti','cait','cakir','calis','camal','canali','candeniz','candirem','cangir','cansin','casim','cavat','cebli','cefer','celal','celaleddin','celaletdin','celalettin','cemali','cemocan','cenkoglu','cercis','cesarettin','cetmen','cevzet','ceykan','ceylan','ceylani','cezair','cezo','cida','cidem','cihad','cihadi','cihanber','cinar','collu','cosgun','coskan','coskun','cumaali','cuman','cuneyd','cuneyit','cunfer','curabey','dagcan','dagistan','dagittin','dahar','dahil','daimi','daniyer','dawid','daylan','deham','delil','demirali','denis','denizhun','derkay','destan','devris','devr˜m','deyer','dilaver','dilder','dilser','dincer','direncan','diyaddin','diyar','di¦dem','dogac','dogacan','dogancan','doguscan','dolgun','dona','dorukan','duhan','dunya','dunyamin','durali','durdali','durgut','durhasan','durmusali','dursan','dursunali','duyal','eba','ebazel','ebedin','ebilfez','ebozeyt','ebu','ebuakil','ebulfet','ebutalip','ebuzer','edep','edib','edizhun','ednan','efecan','efkan','eflatun','efrahim','efrail','efraim','eframil','efrayim','efsel','eftal','egecan','egemen','eldar','eleddin','ellez','elmar','elnur','elvin','elyasa','emeric','emincan','eminhan','emirali','emiray','emircan','emirsan','emra','emrahcan','emrecan','emrehan','emru','emur','encan','enercin','enez','engin.','enser','enus','erap','eraycan','ercet','erchan','ercin','erda','erdar','erdim','erdinay','erdogan','erdost','erencem','ergulu','eriscan','erkam','erkay','erkil','ermin','ernes','ersafak','ersah','ersi','ertural','erturul','esad','esalettin','esef','eset','eshabi','eshat','espir','etem','etkin','eyub','eyup','eyupcan','eyvaz','eyves','eyyup','eyyupcan','ezaettin','eznur','faakim','fadil','fahreddin','fahrittin','fahrullah','faki','fakiri','fakrullah','fami','fanambinana','farac','fariz','fatima','fayik','faysel','fazil','fazli','fazul','fedakar','fedayi','fehmettin','feki','fekrullah','felemez','fendal','fensur','feramuz','feran','ferat','ferayi','ferdin','ferdun','feremez','fergal','ferid','ferihan','ferik','ferru','fersat','ferudun','feruz','feryat','ferzende','ferzender','ferzi','fetdah','feti','fettullah','fetullah','fevvaz','fevzettin','feyat','feyaz','feyruz','feysal','feysel','feyyat','feyz','fezayi','fideyl','fikrat','filay','filit','firat','firathan','fuad','furat','furkan','gabil','gahraman','galib','ganim','garip','gassan','gazap','gevrin','geylani','ginyas','giyasettin','goceri','gokan','gokcekalp','golgen','golkem','gorgen','gorkan','gozel','grzegorz','gulabi','guladin','gulaga','gulali','gulbeddin','gulbeg','gulbettin','gulemir','guli','gulmehmet','gulmustafa','gumrah','gunaydin','guncel','gungor','guntac','guralp','gurani','gurcag','gurcay','gurelcem','gurgan','gurkay','gurler','gurman','gurol','gursal','gursat','gursoy','gurur','h.','habes','habib','habil','habip','haci','haciali','hacibey','haciosman','haco','hadi','hadis','hafir','hafit','hafiz','hakim','hakki','haldun','halid','halidun','halilibrahim','halilurrahman','haluk','hal˜l','hamdin','hamet','hamid','hanifi','harabi','haris','haritdin','hariz','hasalettin','hasamittin','hasanali','hasangazi','hasanhilmi','hasem','hasib','hasrettin','hata','hattap','havsar','havvas','hayali','hayas','haymil','hayreddin','hayredin','hayrittin','hayrunnas','hazim','haziret','hazrat','hefit','hekmet','helim','hemrevin','heybetullah','heyvetullah','hibe','hicazi','hicri','hidir','hifzullah','hindal','hino','hisar','hisemiddin','hitit','hiva','hizir','hizlan','hizni','hocamurat','hogir','hokkes','horasanli','hozan','hšlya','huccet','hudai','hulisi','hulku','hulusi','hulusu','hunkar','hurgazi','huriyet','hursehit','hursitedip','huryeddin','husameddin','husametdin','husammeddin','husem','huseyin','huseyn','husni','husnuer','husref','husrem','husret','hussaini','hussam','huzam','huzeyfe','huzni','huzuri','iban','ibrahimethem','ibrahimhalil','ibrahimilker','ibrail','iclal','idan','idiris','idris','ihram','ihtisam','ikrameddin','ikrar','ilbegi','ilgin','ilhamettin','ilkat','ilkem','illettin','ilmafer','ilmi','ilmiddin','ilten','ilyaz','imaddin','imirza','imran','imrana','inancan','incil','intihap','irzavan','isa.','isak','isik','isilay','isin','iskan','islam','ismailhakki','ismetullah','issa','isvendi','isvendiyar','itris','izetin','izettin','izzeddin','izzetin','jacub','jan','jankat','kablan','kaddafi','kadircan','kafur','kahamurat','kahriman','kakil','kalem','kalo','kamal','kamelya','kamil','kamilcan','kamiren','kamuran','kanco','karani','kardogan','karip','karol','kasif','kasim','kasimhan','kassim','katip','kazanfer','kazim','kefaattin','kelami','kelcik','kemaleddin','kenanbey','kendal','keremhan','kesra','kevni','kilic','kiral','kismet','kivanc','kivilcim','kiyas','kiyasettin','kiyasi','kiymaz','koblay','korcay','korkmazalp','korsah','kotas','kral','krzysztof','kublay','kucuk','kudiret','kultigin','kuntay','kuntsav','kural','kurban','kurbani','kurultay','kutbettin','kutfettin','kutlughan','kutluhan','kutret','kutsi','lami','lamih','latif','latifhan','lazgin','levend','lezgin','lider','lokman','lukasz','lutfi','lutfu','lutfullah','m.','maciej','mafak','mahli','mahmud','mahpus','mahsuk','mahsul','mahsum','mahyettin','makhaddin','mamo','mansurali','marcin','marek','masar','mashar','matem','mateusz','mayir','mazen','mecrum','medhat','mefarettin','mefkure','mehemmed','meherrrem','mehman','mehmed','mehmetali','mehmetcan','mehmetemin','mehmethalit','mehmethan','mehmethanifi','mehmetnesim','mehmetsait','mehmetzahir','mehtun','mekail','mekan','melihcan','memet','memetali','memetcan','memili','menci','mendo','menduh','merali','merdali','mertali','mertay','mertcan','mertullah','mervan','merzuh','mesdan','meshut','mesni','mesret','messud','messut','mesud','mesut','mesuthan','metecan','mettin','mevlana','mevlud','mevlut','meydin','meyhati','mezhar','mezher','miat','michal','midi','mihail','mihdi','mihrac','mihsin','mikail','mikdat','mikolaj','miktat','milay','milayim','milazim','mimar','mirac','miralp','mirbadin','mirbek','mirhasan','mirsat','mirze','mishat','mistan','mitad','mitat','mizirap','mohammad','mohsim','molla','monis','muamber','muamer','mubarek','mucahid','mucahit','mucait','mucayit','mucdet','mucellib','mucib','mucteba','mudavim','muddesir','mufid','muftah','muhamet','muhammad','muhammedali','muhammer','muhammetali','muharem','muhazim','muhbet','muhib','muhiddin','muhreli','muhutdin','muhuttin','muhyedin','muhyettin','muhyiddin','muhyittin','mukail','mukayil','mukramin','mukrayil','mulayim','mulcem','mulku','mulla','mumtas','mumun','munacettin','munib','munik','munip','munir','munircan','muntez','munup','munur','murad','muratcan','murathanabdu','mursel','murselin','mursid','mursut','murteza','musab','musaburak','musafet','musamettin','museddin','muselahattin','muslu','muslum','mustak','mustan','mustecef','mutait','mutalip','mutlucan','muttalip','mutullah','mutus','muzafer','muzaffer','muzameddin','nabil','nadik','nafel','nafer','nafii','nahsen','naif','najeti','isimlert','namik','namuk','nasat','nasif','nasim','nasimi','nasuf','natik','nayif','nayil','nayim','nazim','nazimi','nazli','nazlim','nebattin','necai','necasi','necattin','necdat','necet','necibullah','necim','necip.','necir','necla','neclat','necmeddin','necmettin','necmiddin','necmittin','nejdat','nejdet','nejdi','nejmettin','nejmi','nergiz','nerman','nervis','nesih','nesij','nesin','nevaf','nevc˜han','nevzet','neytullah','nezafettin','nezif','nezmi','nidal','nisret','nizameddin','nofel','noman','novfel','nufer','nugman','nuhal','nuhi','nuhtullah','nurali','nurbolat','nureddin','nuretdin','nurettin','nurhat','nurican','nuriddin','nuritdin','nurittin','nursin','nuset','nusrat','nusreddin','nusret','nusur','ny','n˜zamett˜n','obeydullah','ogulkan','oguzhan','oguzorhan','okkas','olay','olcay','olgacan','olgay','olgu','olgun','oliver','olkan','omercan','omerul','omran','omurden','omurhan','onday','onder.','onem','onuray','onurcan','ordunc','oskan','osturk','over','ozali','ozan.','ozaydin','ozcem','ozgucan','ozgunalp','ozkay','ozkenan','ozlemin','pasa','pasali','pawel','pehlil','pehlivan','pehlul','pektas','pelir','pevrul','peyami','pinar','piotr','pirahmet','pirhasan','polatkan','przemyslaw','pusat','r.','radim','rafal','rafig','ragayip','ragib','ragip','ragup','rais','ramadan','rametullah','rasik','rasul','ravent','rayat','rayif','rayim','recail','recayi','receb','recepali','refahattin','refail','refat','regaib','rehim','remazan','remezan','remus','renan','resul','resulcan','revaha','revhi','reyis','ridvan','rifki','riyat','riza','rizan','rizgar','rizk','rizvan','rucan','ruchan','rufat','rufet','rufi','ruken','ruknettin','rumi','rusan','rusdi','rusen','rustem','saadin','sabahatdin','sabahettin','sabahi','sabahittin','sabanul','sabattin','sabettin','sadat','sadeddin','sadet','sadetdin','sadettin','sadi','sadik','sadin','sadittin','sadulla','safaat','safet','safetullah','safii','sagip','sahab','sahabeddin','sahhuseyin','sahidi','sahimerdan','sahismail','sahmar','sahmettin','said','sakip','salahaddin','salahattin','salahettin','salahittin','salami','sali','salif','salihcan','salli','salper','samed','sametcan','samican','samili','samittin','sammas','sanli','sarafettin','sargin','sari','satan','sati','satilmis','satir','satrettin','savci','savki','sayeddin','saygin','sayid','sayim','sayin','sayip','sayit','sead','sebahaddin','sebahatdin','sebahiddin','sebahittin','sebaittin','sebattin','sebget','sebgetullah','secaattin','sedrettin','sefayin','sefi','sefil','sefkan','sefket','sefki','sehabettin','sehali','sehmus','seithan','sekim','sekvan','selahaddin','selahatdin','selahatin','selahattin','selaheddin','selahi','selahiddin','selahittin','selam','selamet','selametdin','selamettin','selami','selamik','selatin','selattin','selcuk','selehattin','selemin','selhaddin','selver','semal','sematin','semistan','semseddin','semsittin','senadin','senan','sencar','sencay','sendur','sengezer','seraceddin','seracettin','serafeddin','seral','sercay','sercin','serda','serdac','serdarbey','serefbey','serefetdin','serefettin','serezli','serfet','serfirat','sergey','serhad','serhatmehmet','serkant','serper','sertan','sertas','servan','sevban','sevdakar','sevdi','seydihan','seydo','seydullah','seyfeddin','seyfet','seyfetullah','seyfiddin','seyfittin','seyhamit','seyhmus','seyhmuz','seyho','seyid','seyidhan','seyifali','seyir','seyitahmet','seyitali','seyva','seyyar','seyyat','seyyid','seyyidullah','sezair','sezar','sezayi','shahram','sidar','siddik','sidik','sidika','sidki','sih','siham','sihmehmet','sihmus','silay','simet','simon','sino','sirri','sitdik','sitem','sitki','sittik','siyahi','siyami','siyar','siyasi','suap','suayb','suayben','suayip','suayp','suayup','subhani','sucaattin','sucaettin','sugat','suheda','suheyl','sukret','sukri','sukur','suleyman','sulhattin','sullhattin','summani','suphan','suray','surecettin','surhap','suyer','suyup','tabip','tacdin','taceddin','taciddin','tacittin','tahayasin','tahip','takittin','talat','talet','tancu','tansuhan','tarjan','tas','taskin','taskinege','taumani','tayip','tayyer','tayyib','tefik','telat','temim','temmuz','temraz','temur','teslim','teyfik','teyup','teyyar','tezebey','tinmaz','tohit','tokhtaubai','tolga','tomasz','topi','tuberk','tugberk','tugcan','tugmen','tugrulhan','tumen','tuncay','tunctugay','turab','turabi','turgay','turgut','turkay','turkyilmaz','tursun','ubeyit','ucler','ugras','ugur','ugurkan','uhut','ulfani','ulki','ulvi','umithan','umurhan','umut','umutcan','unur','urartu','urfet','urfettin','urfi','uryan','usame','usamettin','useme','useyin','useyt','utkucan','uveyis','uyaris','u¦ur','vadedin','vahdeddin','vahdi','vali','vargin','vasif','vaysal','vecdan','vedad','veis','vejdi','velaattin','velat','velattin','velitdin','velittin','verdiat','veysal','veyseddin','vezat','vezir','wojciech','yadigar','yadikar','yadin','yagfes','yagiz','yagizcan','yakub','yalcin','yalcinkaya','yalgin','yalim','yalin','yamin','yanki','yansi','yardim','yarkin','yasaddin','yasal','yasarnuri','yasat','yasattin','yasir','yeda','yekcan','yekda','yektacan','yemliha','yetgin','yigit','yigitalp','yigitcan','yigiter','yihya','yilay','yildir','yildiran','yildiray','yildirim','yildiz','yilmaz','yonis','yonus','yosif','yunis','yunus','yunusemre','yurda','yurdun','yurtsenin','yusa','yusuf','yusufhan','zafercan','zahi','zahid','zaliha','zana','zari','zehni','zekai','zekariya','zekariye','zekayi','zekeriye','zekeriyya','zekerya','zemirhan','zennun','zeydan','zeydin','zeynal','zeynalabidin','zeynettin','zeynittin','zeyyad','zhamshitbek','ziyacan','ziyaddin','ziyafer','ziyafettin','ziyaittin','ziyattin','ziyettin','zohtu','zuberbaris','zubeyir','zufer','zuhat','zuhdu','zuheyla','zulfukar','zulgarni','zulkar','zulkarneyin','zulker','zuray','zurtullah','beyi','erkegi','cocugu','oglu','oglan','erkek','cocuk','adam','adami','genci','amca','dayi','anil']



		var kiz_isimleri = ['gulsum','nazar','binnur','hasret','yosun','esin','ekin','nursah','sureyya','tutku','zisan','umran','sultan','sila','ece','canan','yagmur','nur','selen','derya','duygu','armagan','aysev','aysever','aysevin','aysin','aysu','aysun','aysunar','cansel','cansu','cansunay','nurcan','sonay','bilge','nurdan','kader','ozge','nuray','hilal','seda','sena','sezen','berna','bayan','aba','abaca','abacan','abac','abaza','abgul','abher','abihayat','abiru','abide','abiye','abruy','alabegim','alabegum','alabezek','almabanu','anabaci','anaboru','ayaba','gultab','isabet','kamertab','mehabet','muhabbet','nabia','nabiye','nursabah','nusabe','rabia','sabahat','sabahnur','sabika','sabir','sabiha','sabire','sabite','sabiye','sabrinnisa','sabriye','tabende','acarbegum','acarbike','acarbuke','acarhatun','acarkatun','acunbegim','acunbegum','acunbike','acunbuke','acungunes','acunisik','aca','acalya','acangul','acelya','acilay','ackingul','adalet','adeviye','adisah','adile','adniye','adviye','afet','afi','afife','afitap','afiye','afiyet','afra','agus','agahanim','agahatun','agakatun','aganbegim','aganbegum','aganbike','aganbuke','agbaci','agbegim','agbegum','agbet','agbilek','agca','aggul','agkiz','ahenk','ahu','aise','ajda','ak','akbaci','akcagul','akcicek','akdolun','akgul','akhanim','akibe','akide','akife','akile','akinci','akipek','akkadin','akkar','akkiz','akkor','akkutlu','akmaral','aknur','akol','aksari','aksen','akseven','aksevil','aksuna','aksulun','aktolun','akyipek','alageyik','alagoz','alagun','alakiz','alangoya','alanur','alapinar','alayunt','albeni','alcicek','alcin','aldeniz','alemsah','alemtap','alev','alevnaz','algis','algul','alim','alimli','alincak','alisin','alika','alime','alipek','alisa','alise','aliye','alkoz','alli','allikiz','almagul','almila','almile','almula','alpnur','alsevin','alsu','altinbasak','altinbike','altincicek','altindal','altingul','altinhanim','altinhatun','altinkiz','altinnur','altinsac','altuncan','alyipek','amber','amile','amine','amiran','amire','amre','anahanim','anakadin','anakiz','anar','anargul','anber','anka','arefe','argana','arife','arkay','armanc','arukiz','arziye','arzu','arzugul','arzuhan','arzum','asalbegim','asalbegum','asan','asena','asfer','asilbanu','asilgul','asima','asile','asime','asimegul','asiye','asli','asligul','aslim','aslinur','asliye','asma','asude','asuman','asya','asye','asa','asina','askim','atagul','atifa','atife','atime','atiye','atlas','avniye','aya','ayaca','ayal','ayana','ayanfer','ayasun','ayasan','aybala','aybanu','aybegim','aybegum','ayben','aybeniz','aybet','aybige','aybike','aybir','aybirgen','aybuge','aybuke','ayca','aycagul','aycahan','aycennet','ayceren','ayca','aycag','aycil','aycicek','aycil','aycolpan','ayculpan','ayda','aydagul','aydan','aydanari','aydanur','aydenk','aydil','aydilek','aydolu','ayduru','ayfer','ayferi','ayferim','aygen','aygerim','aygok','aygol','aygonenc','aygonul','aygul','ayguler','aygulhan','aygumus','aygunkiz','aygur','ayguzel','ayhanim','ayhatun','ayim','ayimbet','ayimsa','ayisigi','ayisini','ayilkin','aykas','aykatun','aykiz','aykonul','aykun','ayla','aylanur','aylin','aymaral','aymelek','ayna','aynagul','aynifer','aynimah','aynisa','aynisah','ayniye','aynur','aypare','ayperi','aypinar','aysel','ayselen','aysema','aysen','ayser','aysere','ayseren','ayseven','aysevil','aysevim','aysilu','aysim','aysima','aysine','aysuda','aysultan','aysuna','aysunay','ayse','aysecan','aysedudu','aysegul','aysehan','aysen','aysenur','aysil','aysin','aysim','aysin','aysirin','aysohret','ayten','ayterim','aytirim','aytoz','aytutkun','aytul','ayulduz','ayulger','ayulker','ayver','ayyalap','ayyalin','ayyuca','ayyuz','ayzit','ayzuhre','azade','azelya','azime','azize','azmidil','azra','azze','baci','bade','badegul','badiye','bagdagul','baglan','bahar','bahise','bahriye','bahtinur','bahtiser','bahtisen','bakinaz','bakiye','balca','baldan','balin','balkin','balkiz','balli','balsari','balseker','banu','banuhan','baria','barika','basira','basiret','basriye','basak','bascik','bedia','bedirnisa','bedreka','behnane','belma','benay','benguhan','benian','berguzar','beria','berrak','besamet','betulay','beyaz','beyhatun','beylan','beyza','bidar','bidayet','bihan','bilgecan','bilgivar','binhan','binnaz','birnaz','birtane','bugday','buldan','burran','busra','cahide','caize','calibe','cana','canane','canas','canfeda','canfes','canfeza','canfidan','canfide','cangul','canhanim','canipek','canik','canipek','cankiz','canozen','canozlem','canperver','canruba','canses','cansev','canten','cavidan','cazibe','cevza','ceyda','ceydahan','cihanbanu','cihanfer','cihangul','cilvenaz','cilvesaz','cagnur','cagrinur','calikusu','cesminaz','cilhan','cilhanim','cimnaz','cobanyildizi','daime','damla','daya','dayahatun','daye','dehan','deryanur','diba','diclehan','didar','dila','dilara','dilay','dilbaz','dildade','dildar','dilferah','dilfeza','dilhan','dilhayat','dilman','dilruba','dilsafa','dilsaz','dilsitan','dilsah','dilsat','dirahsan','dirayet','doganbike','dogannur','dogay','duduhan','duhan','durcan','durkadin','durukadin','duysal','durdane','durefsan','durrusehvar','eda','edadil','edagul','efza','elaldi','elmas','elveda','emetullah','erdemay','erguvan','erna','esma','esmahan','esmeray','esna','esra','esay','fadila','fadik','fadile','fadim','fadime','fahime','fahire','fahriye','fahrunnisa','faika','faize','fakihe','fariha','farise','fasihe','fatine','fatma','fatmagul','fatmanur','fato','fatos','fazila','fazilet','fekahet','ferahet','ferahfeza','ferahnisa','ferahnur','ferahnuma','ferahru','feraset','feraye','ferdane','ferdaniye','ferican','feriha','ferzane','fetanet','feyza','fezanur','fitnat','fidan','fidangul','figan','filbahar','firaz','firkat','firuzan','fitnat','fulya','funda','furuzan','galibe','gamze','ganime','ganimet','ganiye','garibe','gaye','gazale','gelenay','girizan','gonca','goncafem','goncafer','goncagul','goncater','gokduman','goksan','gonulay','gozal','gozalan','gulac','gulacti','gulal','gulara','gulasli','gulasya','gulay','gulaydin','gulayim','gulayse','gulbadem','gulbag','gulbahar','gulbanu','gulbeyaz','gulcan','gulcanan','gulcemal','gulcihan','guldal','guldali','guldan','guldane','guldehan','guldunya','guleda','gulefsan','gulenay','gulendam','guleray','gulercan','gulfam','gulfeda','gulferah','gulfesan','gulfeza','gulfidan','gulgonca','gulhanim','gulhatir','gulhatun','gulhayat','gulinaz','gulistan','gulizar','gulkadin','gulluhan','gullusah','gullusan','gulmisal','gulnar','gulnare','gulnazik','gulnihal','gulsalin','gulsan','gulsanem','gulsay','gulsefa','gulsema','gulsima','gulsuna','gulsunam','gulsunan','gulsunar','gulsad','gulsadiye','gulsah','gulsan','gultac','gultane','gultaze','gulumay','gulzar','gulziba','gumushatun','gunana','gunbatu','gunebakan','guneshanim','gunnar','gunnaz','gunsah','guvenay','guzay','guzelay','guzelcan','guzinay','hacer','hacergul','hacigul','hacihanim','hacikadin','hadiye','hadra','hafiza','hafide','hafize','halavet','hale','halenur','halide','halile','halime','halise','hamdiye','hamide','hamise','hamiye','hamiyet','hamra','hanbegum','hanbegendi','hanbike','hanbiken','handan','hande','hanim','hanimkiz','hanife','hankiz','hansultan','hanuman','harbiye','hare','harika','hasay','hasene','hasgul','hasibe','haskiz','hasna','hatira','hatice','haticenur','hatife','hatime','hatun','hatunana','hava','haver','havva','hayal','hayat','hayirgul','hayriye','hayrunnisa','hazal','hazan','hazel','hazime','hazin','hazine','hemta','hiraman','hicran','hoseda','hosfidan','hoskadem','huban','hulya','hurican','hukminaz','hulya','huma','humeyra','hurnaz','husna','huveyda','huzzam','iraz','isilay','isildar','isinay','isinsal','iba','ifakat','ilay','ilayda','ilginay','ilkbahar','ilkbal','ilkcan','ilknaz','ilkyaz','imbat','insaf','ipar','irfaniye','ismican','ismihan','isminaz','itibar','jale','kadin','kadinana','kadincik','kadife','kadime','kadire','kadriye','kamer','kaniye','karadut','karakiz','karanfil','kardan','kardelen','karsel','karyagdi','katun','kaymak','keriman','kezban','keziban','kizhanim','kizimay','kizkina','kibare','kibariye','kifaye','kifayet','kimya','kiraz','konca','koncagul','kulan','kumral','kutal','kutan','kutlay','kutluay','kutsal','kutsalan','kutsalar','kutsan','kuzay','kubra','lalehan','lalezar','lamia','lamiha','lema','leman','lerzan','letafet','leyan','liyakat','liyan','macide','madelet','magfiret','mahbube','mahcicek','mahfer','mahinev','mahinur','mahire','mahizar','mahizer','mahmude','mahmure','mahnur','mahpare','mahperi','mahpeyker','mahru','mahrur','mahsure','mahten','mahter','maide','makbule','maklûbe','maksude','maksume','maksure','malike','manolya','mansure','marifet','marti','marufe','marziye','masume','masuka','mavi','mavisel','mavis','maya','mazlume','medar','mediha','mefharet','mehlika','mehpare','mehtap','melahat','melda','meleknaz','meleksah','meliha','melisa','melissa','memduha','meram','mercan','merzuka','mesadet','mestinaz','mesale','meva','meyransa','meyyal','misra','mihman','mihriban','mihrimah','mihrinaz','mihrinisa','mihrisah','mimoza','mina','miray','misal','miyase','muadelet','mualla','muarra','muattar','muazzez','mubahat','muhaddere','mukaddes','musaffa','mutarra','mutena','mutia','muvahhide','mubahat','mubareke','muberra','muheyya','mukafat','mumtaze','munteha','musemma','mustakime','mustesna','musfika','naciye','nadide','nadime','nadire','nadiye','nafia','nafile','nafiye','nafize','nagehan','nagme','nahide','nahire','naibe','naile','naime','naire','nakiye','naksidil','nalan','isimler','namika','namiye','nardan','nardane','nargul','narhanim','narin','nariye','narkadin','nasfet','nasira','nasibe','nasiha','nasiye','naside','nasire','natika','naz','nazan','nazbike','nazende','nazenin','nazhanim','nazidil','nazima','nazife','nazire','nazlan','nazli','nazlican','nazligul','nazlihan','nazlim','nazmiye','nebahat','nefaset','neriman','neslihan','neslisah','nesecan','neva','neval','nevale','nevbahar','nevcan','neveda','nevnihal','nevra','nevsale','nevvare','neyran','nezafet','nezahat','nezahet','nezaket','nihade','nihal','nihan','nilay','niran','nisa','nisvan','nuran','nurbanu','nurdanay','nurdane','nurefsan','nurfeza','nurfidan','nurhanim','nurhayal','nurhayat','nurinisa','nurkadin','nurlan','nurmah','nursac','nursema','nursima','nurtan','nurtane','ortanca','oya','oyacicek','oyali','ozant','ozaytan','ozbasak','ozcanan','ozenay','ozgulay','pakize','paksu','paksut','pamuk','papatya','parla','parlak','parlanur','parlar','payan','paye','payende','payidar','pekak','pekay','pekbal','pekkan','perican','perihan','perinisan','perizat','perran','pervane','peyman','pinar','pirlanta','pitirca','pitrak','piran','piraye','punar','pursan','raciye','radife','radiye','rafia','ragibe','ragbet','rahile','rahime','rahiye','rahmiye','rahsende','raife','raika','rakime','rakibe','rakide','rakime','ramiye','rana','rasiha','rasime','rasiye','raside','ratibe','raufe','ravza','rayiha','raziye','rebia','refah','refahet','refia','refika','reftar','renginar','resane','revza','reyhan','reyya','rezan','rezzan','rikkat','rindan','ruhan','ruhfeza','ruhsal','ruhsar','ruhsare','ruksan','rumeysa','ruveyda','ruveyha','ruya','saadet','sacide','saci','sadberk','sadedil','sadegul','sadhezar','sadika','sadice','sadiye','sadriye','safigul','safinaz','safinur','safir','safire','safiye','safiyet','sahavet','sahba','sahibe','sahire','sahra','sahure','saibe','saide','saika','saime','saire','sakibe','sakine','salikbike','salinbike','saliha','salime','salise','salkim','saltanat','samahat','samanur','samiha','samime','samire','samiye','sanavber','sanem','sanemnur','sanevber','sania','saniha','saniye','sannur','sara','sare','saricicek','sarigul','sariguzel','sarikiz','sarmasik','satia','satigul','satihanim','satu','savniye','sayar','saygul','saynur','sayran','seba','sebahat','secilay','sedanur','sehavet','sehernaz','sehhare','selay','selcan','selda','seldag','selma','selva','selvican','selvinaz','sema','semagul','semanur','semiha','semiramis','semra','senal','senar','senay','seniha','sera','seran','serap','seray','serfiraz','serma','sernaz','sernevaz','serra','servinaz','seval','sevda','sevdakar','sevenay','sevencan','severcan','sevgican','sevgihan','sevginaz','sevican','sevilay','sevilcan','sevinay','sevnaz','sevsay','sevtap','seyyal','seyyare','seza','sezan','sezay','siddika','sidika','sirga','sirma','sirmahan','sima','simay','simayisems','simhan','sincan','sirap','sitare','siva','solmaz','sonbahar','sontac','sudan','suna','suzan','sueda','suhandan','sulunay','sumeyra','suveyda','suzulay','sadiye','saduman','safaknur','safiye','sahane','sahbanu','sahdane','sahende','saheser','sahhanim','sahigul','sahika','sahmelek','sahnaz','sahnisa','sahnur','sahsinur','sahvar','sahver','saika','saire','sakayik','sakire','samiha','samile','sansel','sanser','sarika','sayegan','saziment','saziye','sefika','sehbal','sehnaz','sehrazat','sehriban','sehrinaz','sehvar','sekernaz','sekerpare','semsinisa','sendag','serefnaz','setaret','sevketfeza','sevkinaz','sevval','seydagul','seydanur','seyma','siray','sifa','sirinsah','tacizer','taciser','taceser','tacli','tacliyildiz','tacnur','tagan','tagangul','tahire','tahsine','taibe','takiye','talia','talibe','taliha','taliye','tamam','tamgul','tandan','tanegul','tanelgin','tangul','tangulu','tanhatun','tanseli','tanses','tarcin','tarimbike','tasvir','tatli','tavus','taya','tayyibe','taze','tazegul','tenay','tevfika','tevrat','tiraje','topaz','tuba','tugba','tulca','turfa','turhatun','turna','tulay','tulcan','tulinay','uganbike','ulya','umay','uftade','ulkuhan','ummuhan','unsay','urunay','vacibe','vacide','vahibe','vahide','valide','vamika','vasfiye','vasila','vecahet','veciha','veda','vedia','vefakar','vefia','vefika','verda','verdinaz','vildan','vuslat','yagis','yagmanaz','yalaza','yaldiz','yapincak','yaprak','yarcan','yarpuz','yasemin','yasil','yasiyan','yaylagul','yazgul','yazgulu','yelda','yilay','yildanur','yonca','yosma','yurdaal','yurdagul','yurdaser','yurdatap','yurday','yurtsay','zafire','zahide','zahire','zaide','zaika','zakire','zambak','zamire','zarife','zatinur','zatiye','zehra','zeliha','zennisan','zerafet','zerefsan','zeria','zernisan','zerrintac','ziba','zican','ziyafet','zuhal','zuhal','zuleyha','zulfibar','zulfiyar','zulfizar','zulfubar','zulfuyar','zulfuzar','zumra','bahire','beder','bedihe','bedis','bedriye','begim','begum','behice','behin','behire','behiye','beken','belgi','belgin','belik','belin','beliz','belkis','belmen','benek','benevse','bengigul','bengul','benice','benli','benligul','bennur','bensu','berceste','bercis','berfu','beriye','berkiye','bermude','berrin','berse','besime','beste','bestegul','besgul','besire','betigul','betil','betul','beylem','beysun','bezek','bezen','bezmialem','bige','bigum','bihin','bihine','bihter','bihterin','bike','bilgenur','bilginur','bilgiser','bilgun','bilis','billûr','bilsev','bilsin','bingul','bingun','biniz','binzet','birben','birbenek','bircek','birgen','birgul','birgun','biricik','birim','birke','birnur','birtek','bitengul','boncuk','bozcin','bogurtlen','bugul','buket','burcu','buse','bulbul','burcin','burgu','burumcek','bute','citlembik','dilbent','dilber','dilbeste','dilbu','dudubikem','ebru','edibe','elbirle','elbirlik','erdibike','erdibikem','eribe','feribe','gokben','gurbet','gulbeden','gulben','gulbende','gulbeniz','gulberk','gulbeseker','gulbike','gulbikem','gulbil','gulbin','gulbitti','gulbiz','gulboy','gulbu','gulbun','gulbuz','gulebetin','gulengubin','gulpembe','isinbike','ibili','icimbike','ilbike','isenbike','katibe','kebire','kebuter','kelebek','kickinebike','kutbiye','lebibe','lebriz','mebruke','mebrure','mebuse','mergube','mevhibe','muhibbe','mukbile','mubeccel','mubeyyen','mubine','muhibe','munibe','nebihe','nebile','nebiye','necibe','nesibe','nevber','nilberk','nuhbe','nurben','nurbige','pembe','pembegul','rebiyye','sebile','sebla','sebu','sibel','simber','subhiye','sulbiye','sulunbike','sumbul','sumbulves','sunbule','sebnem','sebnur','sekibe','serbet','sirinbegim','sirinbige','teberruk','tebessum','tilbe','tolunbike','ubeyde','usunbike','ubeyde','ubuk','vecibe','vehbiye','zebercet','zubeyde','cedide','celile','cemile','ceminur','cennet','ceren','cevriye','ceylan','cilvekar','cudiye','dicle','domurcuk','ecegul','ecenur','evecen','fecir','fecriye','gelincik','gonce','gulce','gulece','gulinci','guvercin','guzelce','huceste','huceste','iclal','imece','inci','inciden','incifem','incifer','incigul','incila','incilay','incinur','incisel','inciser','mecide','mehcure','mevcude','mucide','mucize','muceddet','mucella','mucessem','mucevher','munciye','necile','necla','necmiye','necve','netice','ticen','tomurcuk','vechiye','vecihe','yucenur','ceyiz','cicek','cigdem','cilek','cilen','cilenti','ciler','cimen','cisen','cisil','elcim','ercil','gogunc','gokcem','gozenc','gulce','gulcehre','gulcicek','gulcimen','gulcin','gulcun','guncicegi','guncicek','icim','kircicek','koncuy','nurcin','ovgunc','percem','pericehre','purcek','secgul','secik','secil','tugce','ucgul','define','defne','demet','demhos','deste','destegul','didem','dila','dilan','dilasup','dilderen','dilefruz','dilege','dilek','dilem','dilfigar','dilfiruz','dilhun','dilhus','dilnisin','dilnur','dilsuz','dilsen','dilsikar','dondu','done','donus','dudu','duhter','durkiz','dursune','durugul','dusize','duygun','duri','duriye','durnev','edis','evdegul','ferdiye','ferhunde','feride','fermude','fide','firdevs','furuzende','gonulden','gozde','guldeger','guldehen','guldem','guldemet','gulden','guldeniz','guldenur','gulder','gulderen','guldermis','guldeste','guldilek','guldone','gulduren','gulender','gulfide','guzide','hediye','hurside','idil','ilden','julide','kudsiye','medide','medine','mehdiye','melodi','mesude','mevlide','mevlûde','mevlude','mezide','mudrike','mueddep','mufide','mujde','muride','murside','muveddet','nedime','neside','nevide','nurdide','nurdil','nurdogdu','nurfide','nuvide','orkide','ozderen','pekdeger','peride','remide','reside','reside','ruveyde','ruvide','sedef','seden','serdil','sevde','sevdiye','seyyide','sidkiye','sidre','simden','sude','sudiye','suzidil','sundus','suveyde','sendeniz','sendil','sermende','sevkidil','tevhide','vedide','velide','yaridil','yediveren','yildiku','yildiz','yurdum','asiye','atike','atiye','azime','efsun','egenur','ehil','ela','elanur','elif','elife','elik','emel','emine','emos','emriye','enfes','enise','erengul','erengun','erge','ergem','erisen','ermiye','ervin','esengul','esengun','esergul','esmer','ese','esim','esin','etik','etike','evin','evnur','ezelî','ezgi','ezgin','fakihe','fehime','fehmiye','fenniye','fergun','feri','feriser','feriste','fernur','feruze','ferve','fethiye','fevziye','feyziye','figen','fikriye','firuze','fugen','gelengul','gelin','gelinkiz','gevher','gezer','gizem','gokperi','gokselen','golge','gorez','gorsev','govem','goze','gozlem','gufte','guher','gulafet','gulaver','gulen','gulengul','gulennur','guler','guleren','gulersin','gulesen','guleser','gulesin','gulev','gulfem','gulfer','gulgen','gulgez','gulgûne','gulguney','gulguzel','gulipek','gulnese','guloren','gulozer','gulperi','gulrenk','gulsel','gulseli','gulselin','gulsemin','gulsen','gulser','gulseren','gulserim','gulsev','gulseven','gulsever','gulsevi','gulsevil','gulsevin','gulsezer','gulsezin','gulsinem','gulsume','gulsehri','gulseker','gulsen','gulseref','gulserif','gulten','gulter','gulumser','gulumsen','gulver','gulveren','gulzemin','gunerim','gunfer','gunseli','gunsenin','gunseren','gunten','gurel','gurselin','gursen','gurses','gursev','gursevil','gursen','gurten','guze','guzel','guzey','hakime','hepgul','hepsen','heves','hifziye','hilmiye','hossel','hossen','hosses','hosten','hulkiye','hurisel','huriser','huriye','hurrem','hukmiye','hurrem','hursen','hursen','husne','husniye','husnuguzel','husnuye','ilksel','ilksen','ilksev','ilksen','ilmiye','ilsen','ime','imge','ipek','ipekel','ipekten','irem','isen','isenkutlug','isvekar','izel','kamile','kasife','kazime','kekik','keklik','kerime','kesfiye','kevser','kiymet','korpe','kosem','kumriye','kutsel','kutseli','lale','lalegul','laleruh','lamiye','latife','lemiye','lerze','lerzis','leyla','leylagul','leyli','leylifer','leylufer','leziz','lezize','lutfiye','mefkûre','meftune','mehir','mehru','mehtiye','mehves','melek','meleknur','melekper','melekru','melike','melis','meliz','meltem','memnune','menekse','menevse','mengli','mengûs','mensure','mensure','menzure','merve','meryem','merziye','meserret','mesrure','mesture','mesure','meskûre','methiye','metine','mevsim','mevzune','meyil','meymune','meziyet','mihine','mihriye','mine','minnet','muhlise','muhsine','muine','mukime','munise','muslihe','muge','mukevven','mukrime','mulhime','mumine','munevver','munife','munime','munire','muruvvet','musevver','muslime','muslume','mustenire','muskule','muyesser','muzehher','muzeyyen','nefise','nehir','nehire','nejla','neptun','nergis','nergise','nermin','nesime','nesli','nesligul','nesrin','nesteren','nese','nesegul','nesem','nesenur','nesever','nesve','neveser','nevgul','nevhiz','nevin','nevinur','nevir','nevreste','nevriye','neyire','neyyire','nezihe','nezire','nilufer','niyet','nuralem','nurfer','nuriye','nurmelek','nurper','nurperi','nurselen','nurseli','nursen','nursenin','nurser','nurseren','nursev','nurseven','nursevil','nursevim','nursevin','nursine','nursen','nurtek','nurten','nurveren','nurzen','nurzer','nukhet','orengul','orfiye','orge','osme','otlegen','ozengul','ozenir','ozenli','ozgunel','ozguney','ozipek','ozlem','ozlenen','ozleyis','ozten','pek','pekoz','peksu','peksen','pelin','pelit','peren','peri','perinur','periru','perives','perize','permun','peruze','perver','pervin','perviz','pesen','pesent','petek','peyker','piruze','prenses','puren','purfer','pursen','refihe','refiye','rekine','remziye','rengin','resmigul','resmiye','rifkiye','ruhisen','ruhiye','ruhsen','ruhsen','rukiye','ruziye','rustiye','seher','sehergul','sekine','sel','selisil','selisin','selime','selin','selmin','selnur','selvet','semen','semin','semine','semire','semiye','senem','sengul','sengun','seniye','sennur','serengul','sergul','sergun','seringul','sermelek','sermin','sernur','serpil','serpin','sevengul','sevengun','sevgi','sevgili','sevgim','sevginur','sevgisun','sevgul','sevi','sevil','sevilen','sevilsen','sevim','sevimgul','sevnur','sevsen','sevsevil','seyfiye','seylap','sezel','sirriye','sitkiye','simge','simten','simuzer','sine','sinem','siren','sonel','sonsen','sonten','sonver','sulhiye','suphiye','suheyla','sumeyre','surmeli','susen','sehime','sehper','sehriyar','sehriye','seker','sekime','sekûre','selale','semime','seminur','semsifer','semsiye','sengonul','sennur','senoz','sensu','senyer','senyil','senyuz','serefnur','seremet','serife','sermin','sevkinur','sevkiye','sive','sivekar','sohret','sule','sukriye','sukûfe','tekgul','tekmile','teknur','telmize','telvin','temenni','temime','temre','tenigul','tennur','tennure','terken','tesrife','tezgul','tijen','tulen','turkine','turkiye','tuzenur','ugurser','ulufer','ulviye','umnise','ulke','ulkem','ulkenur','ulkuye','ummiye','umniye','unsel','unsiye','unzile','urmegul','urpek','urper','veliye','venus','yegah','yegane','yeliz','yenigul','yepelek','yesim','yeterkiz','yilsen','yipek','yurtsevil','yurtsevin','yukselen','yumniye','zekavet','zekire','zekiye','zemzem','zennur','zergûn','zerrin','zerrinkar','zerriste','zeynep','zeyniye','zeyno','zihniye','zinet','zinnure','ziynet','ziyneti','zuhre','zuhtiye','zulfiye','zulfuye','fikir','filiz','ful','fusun','fusunkar','lutuf','lutufkar','tifligul','gok','goknil','gonul','gul','gulan','gulgonul','gulgûn','gulgun','gulhiz','gulhuri','guliz','gulkiz','gullu','gulmus','gulnur','gulnus','guloz','gulriz','gulru','gulruh','gulsim','gulsimin','gulsu','gulsum','gulsun','gultop','gulum','gulustu','gulus','gulyuz','gungul','gunsili','gunsu','guz','guzin','guzingul','hosnigar','hurgul','husnugul','irisgul','ilgul','ilkgul','irgun','ismigul','izgul','izgun','kutgun','lalgûn','morgul','mujgan','nigar','nilgûn','nilgun','nurgok','nurgul','nurgun','nurnigar','ogul','ongu','orgul','ovgul','ovgun','ozgul','ozgulum','ruhugul','songul','tungur','ulgur','yilgul','yilgun','kugu','halinur','hilal','hosnur','hosnut','hossun','huri','hurmuz','husnuhal','husun','mihrinur','mirrih','nurhilal','ruhinur','ruhunur','iris','isil','isim','isit','itir','ilkisik','misir','nurisik','piril','pirilti','siylikiz','atik','iklil','ilknur','iris','islim','islimî','isminur','limon','mir','mirnur','misli','nil','nili','nilsu','nuris','nursim','nusin','ozis','oznil','sili','sim','simin','simruy','sitti','siir','sirin','tomris','tuti','tulin','oylum','somnur','sonnur','sonol','omurlu','onnur','oyku','oz','pullu','putun','kumru','kurtulus','nurlu','nursu','nursun','sumru','turkan','turknur','turku','yar','zumrut','kukus','sunu','sukûn','sukût','sulun','suslu','usun','kutun','tulun','tun','zulal','yumuk','lulu','ulku','ulkum','abdylla','abutel','acibe','addule','adelet','adeli','adife','adike','adila','adivye','adiye','adla','adle','adliye','adul','adulle','afe','afide','agnieszka','ahizer','ahunur','aile','akgullu','akin','akise','akizer','akkadin','akkiz','aklime','aleksandra','aleyna','aliman','alimen','aliya','alize','alkim','almast','almes','alperin','altin','altingul','alye','ambere','amina','amirhamza','amse','anakadin','anakiz','anayasa','ani','anis','anita','anna','ansa','anse','antika','anzel','anzilha','arabi','arafa','ariz','armahan','arne','arsevi','arzi','ashan','asife','asiman','asire','asiya','asiyan','askim','askin','asli','aslican','asligul','aslihan','aslinur','asriye','assiya','assiye','asuhan','ati','atie','atife','atifet','atika','atike','atile','atiyye','atman','atra','aura','avna','ayan','aybilge','ayca','aycan','ayce','aycin','aydin','ayise','aykiz','aylar','ayle','aylen','aylil','ayliz','ayne','aynel','aynil','aynilhayat','aynimah','ayno','aynulhayat','aynurisa','ayper','aysali','aysana','ayseana','aysekadin','ayseli','aysemin','aysen','aysena','aysene','aysete','aysi','aysil','aysin','aytel','ayter','ayzer','ayzin','azaniye','azap','azbiye','azima','azimenur','aziza','aznur','badel','badem','bagda','bagdat','bager','bahdisen','bahire','bahtinur','bahtisen','baise','balkis','balkiyan','balkiz','balli','bani','banu','banur','baris','bariye','basra','batun','baydan','bayse','bediha','bediriye','bedirnaz','bediya','bedrivan','begihan','begun','behican','behide','behime','behiza','behra','behriye','belda','belde','belemir','belgizar','belguzar','belhizar','belkis','belkisa','belkiz','belkizan','belkize','benazil','bendegul','bendihan','benefsi','bennuray','benzegul','beratiye','beray','berda','berfiye','berfo','bergen','bergun','berhude','beride','beridiye','beril','berivan','berken','berlin','berre','berru','bersu','bervan','berzor','besbin','besbinaz','beser','beseriye','besey','besi','besna','besne','besra','besrai','besravi','besrayi','bessi','beyce','beyice','beynun','beytiye','beytul','beyzanur','bido','bildan','bilgesu','bilgul','bilican','bilihan','bilkay','billur','bilmez','bilnaz','bilor','bilun','binevs','birdane','birdesen','birgul','birguzel','birsele','birseren','birsev','bitul','bore','bugse','bugu','buhide','bulca','bulunmaz','burce','burcuhan','burdem','bureyre','burtay','buson','busra','busranur','caferiye','cagdan','cagil','cagin','cagri','caide','cakir','camia','canseli','canser','canset','cansin','cansukan','canur','cavide','cayide','cazime','cefahir','cefair','cemale','cemide','cemiliye','cemine','cemiyle','cenay','cenneti','cerasela','cerem','ceride','cetine','cevale','cevregul','cevrinaz','ceydanur','ceyla','ceylan','ceylin','ceynur','cezair','cezanur','cezminur','cidem','ciden','cig','cigse','cile','cilem','cilga','cili','cinar','cise','cisel','cisem','civeyra','ciydem','cuferiye','cuheyna','culye','cumazel','cumaziye','curiye','damlagul','damlanur','dane','darcin','darin','delal','delale','delali','delel','delfin','delila','denizgulu','dergi','derle','deryal','destan','destina','deva','digdem','dijle','dilan','dilara','dilare','dilaver','dilazer','dilcan','dilfuraz','dilfuruz','dilfuzar','dilihan','dilruba','dilsa','dilsad','dilvin','dinara','direnis','divan','dizem','dogcan','dolat','donay','donduhan','doner','donsun','dudhan','dudugul','dudusen','duha','dunya','dunyale','durana','durangul','durdane','durdaniye','durdiye','durgadin','durgul','duriye','durkadin','durna','durnel','durri','dursade','dursadiye','dursef','dursel','dursen','dursine','dursiye','dursuniye','duruye','duryan','duygu','duyguhan','ebide','ebise','eblike','ecem','edanur','edaviye','edaye','edebiye','edeviye','edibiye','efaket','efil','efsunkar','eftal','egem','ehad','ehlem','ehliiman','ela','elame','elamiye','elanur','elay','elem','elfazi','elfide','elfize','elgiz','elham','elide','elifana','elifgizem','elifgul','elifhan','elifnur','elifsena','elis','eliz','elmaze','elnara','elnaz','elvadiye','elvida','elvin','elzem','ema','emal','embiye','emeti','emile','emina','emine.','emineeylem','eminei','emini','eminkadin','eminos','emiray','emirayse','emire','emirnaz','emis','emise','emra','emral','emsel','enbiye','engul','enzile','enzule','erebiye','erep','erife','erince','ersan','eruze','erva','ervaniye','erzem','esame','esefatma','esem','esenay','esiana','esil','esiye','eskan','eslem','esmanperi','esmanur','esme','esmecan','esmegul','esmehan','esmerhan','esmin','esmine','esmiye','esranur','esrin','esse','eva','evde','evenur','evinc','evlim','evra','evrin','evsun','eyne','eysel','ezet','ezher','ezime','ezine','ezo','faali','faden','fadima','fadimana','fadimeana','fadimehanim','fadiya','fadiye','fadliye','fagat','faide','faike','faime','fakiye','fakriye','famile','faniye','fati','fatigul','fatik','fatim','fatima','fatimana','fatimatuzzehra','fatime','fatimet','fatimetozehra','fatinur','fatis','fatiye','fatmaana','fatmadudu','fatmakadin','fatmana','fatmanim','fatmasu','fatmatul','fatme','fatou','fatuma','fatumatuzzehra','fayika','fayize','fazila','fazile','fedan','feden','fedile','fedim','fedime','fedriye','fefharet','fehiman','fehire','felekferz','feleknaz','feleksan','fendiye','fener','ferahdiba','ferahiye','ferayi','ferdag','ferfuri','fergul','ferihan','ferik','ferime','ferinaz','feris','feristah','feriya','ferizan','ferize','fermin','fermuta','ferrah','fersun','feruza','feruzan','feruze','ferya','feryal','feryas','ferziye','fetane','fetiye','feyfuri','feyime','feyiznur','feyme','feyruz','feyruze','feyzanur','feyzin','fezal','fezaye','fezile','fidaniye','fidaye','fidel','fidelya','fildan','filis','fincan','finci','findik','findika','firdes','firdest','firdevis','firiha','firke','firuzan','firyaset','fisun','fitnet','fulden','fulten','fulya','fundagul','furgan','furuzan','fussulet','fusun','gabel','gabriela','gadiriye','gafure','galiya','gamzegul','gayet','gazal','gazali','geji','genime','georgeta','gevi','gilman','giryan','gisver','giymet','gizemnur','gizemsu','gogercin','goher','gokbuke','gokcay','gokce','gokis','goksemin','goli','goncay','gonlum','govercin','gozdehan','gozdem','gozdenur','gozel','gozen','gubra','gulabiye','gulafer','gulamiye','gulan','gulaver','gulaydin','gulban','gulbani','gulbarin','gulberat','gulbeyan','gulbeyde','gulbie','gulbiye','gulcay','gulce','gulcegun','gulcehal','gulcema','gulcemile','gulcerek','gulceylan','guldali','guldam','guldiz','guldurdu','gule','gulefer','gulem','gulendem','gulendiye','gulengun','gulenser','guley','guleycan','guleyda','gulezgi','gulfadim','gulfami','gulfan','gulfari','gulfatma','gulfen','gulferi','gulferide','gulfethiye','gulfikar','gulfire','gulfiye','gulfizar','gulfuzar','gulfuze','gulgiz','gulgul','gulhanim','gulhaniye','gulhat','gulhis','gulhisar','gulhizar','gulhuriye','gulhuzar','guli','gulice','gulihsan','gulin','gulisa','gulisan','gulisraf','gulkadin','gulkiz','gullabiye','gulleman','guller','gulli','gulliya','gullizar','gullunar','gullunaz','gulluzar','gulmenevse','gulmez','gulmine','gulminnet','gulmirace','gulnade','gulnam','gulisimler','gulnara','gulnarin','gulnaz','gulnaziye','gulnigar','gulnihan','gulorya','gulozge','gulpasa','gulper','gulpinar','gulrengin','gulsa','gulsabiya','gulsade','gulsaran','gulsat','gulseda','gulseher','gulsehriye','gulsem','gulsen','gulsena','gulsenem','gulsepen','gulseri','gulserin','gulseval','gulsevdi','gulsevim','gulsifa','gulsin','gulsiye','gulsu','gulsultan','gulsum','gulsun','gultulin','gulu','gulufer','gulumse','gulun','gulunay','gulus','gulusan','gulusen','guluser','gulustan','gulusun','guluz','guluzar','gulyar','gulyaz','gulyeter','gulzade','gulzadiye','gulzide','gulziye','gumrah','gunar','guncel','gunday','gungore','gunnur','gunrem','gunsiray','gurcim','gurcu','gurcuye','gurser','gussum','gussun','gusum','guvercin','guyhan','guzella','guzeyde','guzgul','guzude','h.','habiba','habibe','habiybe','hacar','hacere','haci','hacice','hacihanim','hacikadin','hacile','hacili','hacire','hadice','hadime','hadrey','hafife','hafise','hafiye','hafiza','hafset','hafside','hafza','hajarat','hakife','hakik','hakime','hakiye','hakki','halidiye','halimedudu','halimi','halimser','halisa','haliye','hamail','hamayil','hamdune','hamire','hamma','hamsa','hamse','hamsiye','hanasli','handenur','hanen','haney','hangul','hani','hanik','hanim','hanime','hanimi','hanimkiz','hanimsah','hanimzer','hanperi','hansa','hanse','hanume','hanze','hanzey','hapa','hapic','harbinaz','harip','harise','hariye','hasbiye','hasgullu','hasi','hasine','hasivet','haskar','haskiz','hassi','hassiye','hatay','hatice','hatike','hatimet','hatin','hatira','hatiyce','havadudu','havagul','havali','havana','havane','havanim','havanur','havar','havelya','havil','havize','havse','havser','havsun','havvagul','havvana','havvane','havvanur','hayel','hayirli','hayrinisa','hayrinnusa','hayrun','hayrunisa','hayrunnisa','hazarcan','hazari','hazbiye','hazna','hazni','hecide','heday','hediyegul','hedla','hedle','hefin','hekime','helen','helime','helin','heman','hemi','hemide','hena','henda','henife','henzede','herdem','herdemcan','hergul','hesibe','hesna','hetike','heva','heval','hevin','hevzi','heyfhilat','hezal','hezare','hezel','hezniye','hicaziye','hicrigul','hidaye','hikmiye','hilal','hilayda','hilin','hilman','hilvan','hilye','hinar','hinet','hivda','hizniye','homayi','hopan','hori','horiye','horu','hosgun','hosnaz','hubriye','huda','hudakar','hudanur','hudaye','huldiye','hulye','huma','humayun','humeyin','humeyra','hurdunya','hureyra','huri','hurinaz','huriye','huriyet','hurizad','hurkus','hurma','hurmus','hurriyet','huru','hurule','huruyet','husna','husnem','husni','husnigul','husnuce','huzeyca','huzume','ibadiye','icil','iclal','ide','ifagat','ifaget','ifaze','ifdadiye','iftade','iftar','ihsane','ijla','ijlal','ikbale','ikilem','iklama','iklime','ilavet','ilfar','ilgahan','ilgihan','ilgim','ilgin','ilkel','ilkem','ilklima','ilper','imahan','imatullah','imhan','imihan','immigulsum','immihan','immuhan','imral','imran','imrel','imrihan','incifir','incihan','incilay','intimas','inzile','iran','iremnur','irfide','isik','isil','isilay','isin','isinsu','islime','ismahan','ismehan','ismi','ismihan','isra','istem','istiham','itir','ivyek','iyam','izaura','izlem','izlifet','iznihar','jalen','jalile','jaruthip','jefide','jiyan','joanna','julide','julude','kabile','kadirgin','kadiriye','kadirye','kadisah','kafiye','kameriye','kamila','kamile','kamuran','kanaat','kandef','kania','karafil','karer','kargul','kaside','katarzyna','katibe','katife','kaver','kazi','kazime','kebira','kefser','kehribar','kelem','kendi','kerima','kerziban','kerzik','keser','kesire','ketayi','ketibe','kevi','kezibe','kezziban','kibriya','kibriye','kilman','kimet','kinem','kini','kirez','kismet','kismis','kitan','kivanc','kivilcim','kiyafet','kiymet','kiymetli','kocer','koka','komec','kuaybe','kubar','kubran','kubranur','kucuk','kuduret','kulter','kumas','kumray','kumri','kupra','kupriye','kurciye','kusun','kutezziban','kutret','kuzeyde','kuzidiye','kuzudiye','laden','ladiker','ladin','laika','lale','lalegul','lalever','lalezar','lalifer','lalihan','lamia','lamiye','latife','laze','lebude','lemangul','lemye','letife','levize','levziye','leyla','leylan','leylanur','leylufer','leymun','leyzan','lezgin','libas','lida','lifar','ligar','lilianna','lilifer','lilufer','lilve','liman','limun','lina','linda','lisa','lisan','lufen','lulgun','lulufer','lutfiye','lutfuye','lutviye','luup','m.','mafiret','mafiye','mafuzer','magbule','maggul','mahfuza','mahfuze','mahide','mahigul','mahiner','mahiye','mahmudiye','mahnaz','mahsubiye','maigul','maksude','mariama','maside','matan','maver','mavus','mayide','mayile','maynur','mayseker','maysel','mazes','maziye','mazlume','mebrule','mebure','mecbure','mecburiye','mecdulin','mecra','media','mediye','mefal','mefaret','mefide','mefkure','mehbare','mehbup','mehdiyar','mehlibar','mehmure','mehnur','mehri','mehriban','mehrican','mehrigul','mekbule','mekiya','mekiye','mekkiye','mektup','melaha','melahat','meldanur','meleha','melehat','melekey','meleki','melihan','melihat','melihe','melika','melikkan','meliknur','melul','memihan','memnuniye','mendufa','menduha','menendi','menfeat','menfiye','menhur','menica','menice','menife','menis','menisan','mensur','mensure','menzil','meray','merba','merban','merda','merdane','merdiye','merguze','merhuze','merim','meriman','merime','meris','merivan','meriyem','mermi','mernur','mernus','merva','mervane','mervem','mervenur','mervil','merya','meryam','meryemana','meryeme','mesgule','meskure','meskuriye','meslihan','mesrule','mesude','mesudiye','mesuriye','meveddet','mevlida','mevlidiye','mevliya','mevliye','mevlude','mevludiye','mevra','mevre','mevriye','mevtun','mevziye','meyase','meyese','meyhanim','meyli','meymene','meyram','meyrem','meyser','mihdiye','mihrab','mihrac','mihrap','milid','milyel','minel','minever','minevver','minibe','minire','minnaz','mintaha','minteha','mirac','mirace','miradiye','mires','miriye','miseyne','misra','misri','misriye','miyasa','miyaser','miyasi','miyasser','miyese','miyeser','miyesser','mizgin','mola','monika','mualla','muazez','muazzen','muazzes','muberra','muberrah','muberya','mubetcel','mucade','mucahide','mucella','mucelta','mucibe','mucteba','mueser','muessere','muferra','mufide','mugaddes','mugan','mugatter','mugber','muhammeriye','muhbet','muhdiye','muhibe','muhide','muhiye','muhside','muhsine','muhteber','muhtereme','muhtesemen','muhubbet','muhubet','mujde','mujden','mujgan','mujgehan','mujgen','mukaddere','mukaddez','mukader','mukades','mukafat','mukatder','mukatdes','mukattere','mukrume','mulfer','mulkicihan','mulkinaz','mulkiye','mulufe','mulufer','mumesir','mumine','mumune','munadiye','munasiye','mune','munever','munevir','munevvere','munezzer','munife','munise','munure','munzire','muradiye','murcan','muret','mureyya','murfide','murivvet','mursine','murten','murufet','muruvet','murvet','musaret','musemme','muserrefe','muskan','muskunaz','muslumet','mustakiyma','muster','musude','musure','muttezim','muveyla','muzafer','muzdelife','muzet','muzeyen','muzeyme','muzude','nabahat','nacide','nacifer','nadan','nades','nadiha','nadile','nadiriye','nafier','nafizenur','nagihan','nahizer','naide','naife','naima','nalan','nalin','isimlergul','namike','nanifer','narcan','nargehan','narhanim','narhatun','nari','narinc','narmine','nasiba','nasihat','nasihe','nasire','nasiybe','natalia','natike','navruz','navruze','nayet','naygihan','nayile','nayime','nayliye','nazander','nazangul','nazcan','nazdar','nazefet','nazegul','nazen','nazengul','nazeni','nazente','nazenti','nazez','nazgul','nazgule','nazi','nazide','nazifer','nazike','naziker','nazile','nazilet','nazime','nazimet','nazira','naziriye','naziye','naziyfe','nazli','nazlican','nazligul','nazlihan','nazlim','nazliye','nazrife','nebat','nebia','nebibe','nebide','nebiha','nebihat','necah','necbiye','necife','necilal','necima','necime','necla','neclay','necle','necser','necude','necva','nedibe','nedife','nedriye','nedve','nedye','nefaret','nefes','nefide','nefiga','nefika','nefire','nefiya','nefiye','nefize','nefya','negihan','negul','nehari','nehide','nehime','nejdet','nejdiye','nejla','nejmiye','nelahat','nelda','nelli','nemrun','nerfide','nergahan','nergihan','nergiz','nergul','nergun','nerguzel','neriban','neric','nerkiz','nerman','nermiye','nerve','nerzan','nesai','nesfe','nesife','nesirin','neslahan','neslican','neslinur','nesra','nesrihan','nesrim','nesrin','nesriye','netife','nevcihan','nevel','nevgin','nevgun','nevil','nevim','nevise','nevraz','nevrim','nevrize','nevse','nevsi','nevzer','nevzete','nevziye','neyfinur','neysen','nezafiye','nezan','nezehat','nezengul','nezife','neziha','nezihan','nezihat','nezihet','neziye','neziyet','nezize','nezrife','nice','nigar','nige','nigmet','nihari','nihaye','nikar','nikat','nila','nilcan','nilda','nildem','nilden','nilfer','nilgul','nilgun','nilifer','nilsah','nilsen','nilufer','nimetiye','nirgul','nisficihan','nispahi','niyase','nizgin','nofe','noran','nuber','nudet','nudiye','nudret','nufide','nuhiye','nuket','nukte','nulfer','nulgun','nulifer','nulufer','nupelda','nura','nurale','nurane','nuraniye','nurat','nurayan','nurayi','nurbanu','nurberat','nurbetul','nurcay','nurcin','nurda','nurdagul','nurdamla','nurdaniye','nurdanur','nurdeniz','nurdoken','nuren','nurevsan','nurey','nurfatma','nurfen','nurfet','nurfiye','nurgen','nurgil','nurguzel','nurhak','nurhan','nurhayet','nurhuda','nurhun','nurice','nurihayat','nurisan','nurisen','nuristan','nuriya','nuriyet','nurkadin','nurnisa','nursa','nursan','nursat','nurseda','nursel','nurselin','nursemi','nursenim','nursevcan','nursever','nurside','nursifa','nursin','nursiye','nursuman','nurten','nurufe','nurus','nurusah','nurva','nurven','nurya','nurziye','nushet','nutfiye','nuveyde','nuveyre','nuzret','oana','olga','olgu','olgul','omiriye','omluye','omriye','omrum','omruye','omuriya','omurnaz','onem','orcin','orlinda','ozde','ozdem','ozgecan','ozgehan','ozgenaz','ozgenur','oznur','pakizer','pasey','pehman','pelda','pelinsu','pembesin','pembi','pembis','pempe','penbe','penpe','peral','peray','percihan','perdane','peria','perihannur','perim','perinaz','peris','perisan','perizade','perizan','pernur','pevziye','peyda','peyran','peyruze','piltan','pinar','piril','pori','rabbiye','rabiha','rabike','rabiya','rabiye','radiye','rafika','rafike','rafiye','rahan','rahcan','rahide','raime','raize','rakife','rakite','rakiye','ramize','ramona','ramziye','raniya','rasan','rasen','rasike','raviye','rayla','raz','razinan','rebihat','rebis','recudiye','redda','redife','refa','refan','refike','refiya','rehime','rekiya','remiha','renata','rengul','renin','resalet','resmi','revasiye','revsi','revzete','reyide','reyzan','rezge','ridvane','rifa','rihan','rime','riskiye','rivayet','riyhane','rizkiye','rohat','rojbin','rojda','rojdiyar','rojin','rojnu','rosan','rowena','rozan','rozcan','rubasa','rufiye','rugzan','ruhat','ruhevza','ruhide','ruhser','ruhyete','rujdiye','ruken','rukhiya','rukide','rukkiye','rukuya','rukuye','rukye','rumeysa','rurten','rusan','sabahiye','sabihat','sabihe','sabike','sabile','sade','sadem','saden','sadenur','sadet','sadeti','sadife','sadika','sadikar','sadike','sadiman','sadime','sadinaz','sadise','sadiye','safaniye','safariye','safer','safide','safikar','safile','safine','safinez','safiya','safiyye','safura','safure','safvet','saha','sahabe','sahare','sahdiye','sahender','saheste','sahide','sahife','sahinaz','sahinde','sahinder','sahine','sahiser','sahiye','sahize','sahizer','sahnuray','sahre','sahriban','sahriye','sahsene','sahsenem','sahsine','sahzende','sahziye','saide','saile','saizer','sakime','salen','salha','salic','salice','salihe','salimet','saliya','saliye','samazet','samia','samra','sandra','sanize','sanur','sara','saray','sarayi','sari','sarigul','sariye','sarya','sati','satia','satiye','sayda','sayfe','sayibe','sayile','sayime','sayiste','sayizar','sayme','sayre','sayriye','sayzar','sazie','sazime','sazimet','seadet','sebahiye','sebahniye','sebahnur','sebaye','sebehat','sebigul','sebiha','sebihat','sebila','sebilay','sebir','sebiyha','sebla','secgin','secgun','secin','sedahat','sedaket','seday','sedefye','sedife','sedika','sedirye','sediye','sefade','sefadiye','sefagul','sefanur','sefegul','seferiye','seffannur','sefie','sefike','sefilay','sefine','sefiyan','sefiye','sefuriye','segah','sehel','sehergulu','sehide','sehinaz','sehirnaz','sehne','sehnur','sehra','sehreban','sehri','sehristan','sehruban','sehruzan','sehure','sehza','sejda','sekir','sekure','selale','selamet','selbi','selbin','selbinaz','selbiye','selcen','selcin','selden','selenay','selfinaz','seliha','selima','selimiye','selimsah','selinay','selincan','selmaye','selme','selmihan','selnay','selsebil','selvan','selvane','selvent','selver','selvim','selvinas','selviye','semaha','semahir','semam','semat','semehet','semia','semihan','semihe','semilay','semina','semira','semiran','semiya','semiye','semiz','semral','semran','semrin','semriye','semsa','semse','semsihan','semsinur','semyan','senbahar','senil','sennaz','senul','seral','serban','serbent','sercim','sercin','serda','serdegul','serdihan','serem','serenay','serep','serfe','serfin','serfinaz','sergunay','serifegul','serifnur','seriha','serihan','serine','seriye','serize','sermail','serman','sermil','sermin','sermiye','serrap','servim','servin','serya','sesil','setenay','seva','sevcihan','sevcin','sevdagul','sevdal','sevdanur','sevdegul','sevdinar','seve','sevgil','sevgin','sevginar','sevgiser','sevgison','sevgizar','sevgunar','sevibe','sevider','sevika','sevike','sevila','sevile','sevilnur','sevim.','sevin','seviye','sevkan','sevke','sevkiyat','sevkiyet','sevla','sevlan','sevle','sevli','sevligul','sevliye','sevma','sevra','seyahat','seyba','seybe','seycan','seyde','seydiye','seyfa','seyfun','seyide','seyman','seymanur','seyme','seynaz','seynur','seyra','seyyane','sezaner','sezanur','sezcan','sezihan','sezilan','siber','sida','sidar','siddi','siddika','side','sidem','sidika','sidiret','sidret','signem','sila','silan','silanur','silay','silma','silver','sima','simamperi','simel','simgenur','simla','simnare','sinangul','sinanperi','sinay','sinef','sinemis','sipan','sipir','sirinaz','sirinnaz','sirivan','sirma','sirmahan','sisan','sisi','sitdika','sitem','siti','sitizubeyda','sittika','sittike','sitto','siyar','siyaset','siyen','solma','sona','soret','sosi','soylemez','soyler','stephanie','suad','suada','suade','suadiye','sual','suber','subutiye','sucan','sudiye','sudriye','sueyla','suhal','suham','suheda','suhem','suheyda','suheyla','suhule','sukren','sukriyen','sukruye','sukufe','sulahi','sulbiye','sulbuye','sule','sulehan','suleybe','suleyha','suleyla','sulfidan','sulhuye','sultane','sultani','sultaniye','sumeray','sumerra','sumerya','sumeye','sumeyra','sumeyya','sumeyye','sumra','sunacan','sunduz','suner','suphiye','supho','sura','surahanim','surahi','surayye','surbuye','suret','sureyya','sureyye','suriye','surreya','surun','susam','susan','susdem','susenber','susin','susli','sutya','suule','suveyla','suzan','suzay','suzem','suzer','suziyen','svetlana','tabire','tacider','taclan','tahide','tahsime','talan','taleyha','tamara','tamarya','tamcihan','tanem','tannur','tanya','tarfa','tarika','tasie','tasvire','taybet','tayibe','tayiva','tayyibet','tayyube','teberik','tefekkul','teknaz','telnur','temami','tenzile','tenzire','tercen','teslime','tesmiye','tevfide','teybet','teycan','teyibe','timsal','tuba','tube','tubiye','tuce','tugbahan','tugbanur','tugca','tugce','tugcehan','tugen','tugnil','tulay','tule','tulin','tulu','turafiye','turcan','turcayin','turcein','turceun','turcihan','turciye','turkan','turkay','turken','turksan','turkuler','turkun','turnel','tursun','tutkucan','tuzen','tuzin','tzemile','ufeyra','ukke','ulbiye','ulfiye','ulgar','ulkay','ulki','ulkinar','ulkiye','ulkume','ulkusen','ulmiye','ulviye','ulya','umahan','umeysa','umgul','ummahan','ummahani','ummani','ummehan','ummen','ummihan','ummu','ummugul','ummugulsum','ummugulsun','ummuhan','ummuhani','ummulu','ummunihan','ummuran','ummusan','ummusu','ummusun','ummuye','umran','umray','umre','umsan','umsel','umugul','umuhan','umulgulsum','umus','umusan','umusen','umusun','umut','unluhan','unzule','urakkus','urfet','urkiya','urkiye','urkus','urkuye','uruc','urusan','uveyda','uyanser','uzeme','uzeybe','uzlife','uzlufe','uzume','vadha','vaide','validiye','varlik','vasile','vasiyle','vatangul','veciben','vecide','veciye','vediha','vehide','vehiye','verdal','verde','verdi','vesile','vesiyle','vesme','vethan','veysiye','veznegul','vezrife','vicidan','vidat','vidayet','videt','vige','vijdan','vilayet','vildane','viyan','wioletta','yadigar','yadikar','yadiker','yanki','yaren','yasagul','yasariye','yasegul','yasemen','yasevil','yasime','yasmin','yavize','yaze','yazgi','yazi','yekbun','yelim','yelis','yelsu','yeniay','yerkyegul','yerkyejan','yeser','yeseren','yesilay','yesire','yeteriye','yildan','yildiray','yildiz','yilmaz','yudum','yunise','yurda','yusna','yusra','zadife','zafiye','zahfer','zahtinur','zahure','zakine','zale','zaliha','zariye','zayide','zebirce','zede','zedef','zeha','zeher','zehide','zehni','zehniye','zehragul','zehranur','zehre','zekine','zeko','zelal','zelen','zeleyha','zelha','zelife','zelihan','zelihe','zelika','zemhanur','zemide','zemine','zemiya','zemzema','zemzeme','zenibe','zenife','zennure','zennuriye','zenure','zercan','zerdi','zere','zerfinaz','zerga','zeride','zerife','zero','zeruk','zevcan','zevlude','zeyican','zeynap','zeyneb','zeynebe','zeynet','zeyneti','zeynettin','zeytin','zeytun','zihnet','zihrelcebin','zihriye','zikret','zilfa','zilfi','zilha','zilife','zimet','zineti','zini','zinnet','zinnete','zino','zivre','ziyamet','zohra','zohre','zohrehan','zozan','zubede','zubeybe','zubeyda','zubeyde','zubeyra','zubude','zueyda','zuhal','zuhel','zuheyla','zuhra','zuhriye','zuhru','zuka','zulahi','zulal','zulale','zulay','zulbiya','zulbiye','zulfinaz','zulfiye','zulfizer','zulihe','zulkade','zumbul','zumrah','zumral','zumran','zumray','zumre','zumrete','zumrettar','zumriye','zumruye','zurbiye','zurha','zuriye','zuruye','guzeli','prensesi','kralicesi','bayan','kiz','kizi','gelin','gelini','abla','teyze','baci','hatun']

shortcut = {
	'all_shortcuts':{},
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options = {
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt = default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo] = default_options[dfo];
			}
		}

		var ele = opt.target;
		if(typeof opt.target == 'string') ele = document.getElementById(opt.target);
		var ths = this;
		shortcut_combination = shortcut_combination.toLowerCase();
		var func = function(e) {
			e = e || window.event;
			
			if(opt['disable_in_input']) {
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;

				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}
			if (e.keyCode) code = e.keyCode;
			else if (e.which) code = e.which;
			var character = String.fromCharCode(code).toLowerCase();
			
			if(code == 188) character=","; 
			if(code == 190) character="."; 

			var keys = shortcut_combination.split("+");
			var kp = 0;
			
			var shift_nums = {
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"^",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			var special_keys = {
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
	
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				
				'pause':19,
				'break':19,
				
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				
				'pageup':33,
				'page_up':33,
				'pu':33,
	
				'pagedown':34,
				'page_down':34,
				'pd':34,
	
				'left':37,
				'up':38,
				'right':39,
				'down':40,
	
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
	
			var modifiers = { 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}
			};
                        
			if(e.ctrlKey)	modifiers.ctrl.pressed = true;
			if(e.shiftKey)	modifiers.shift.pressed = true;
			if(e.altKey)	modifiers.alt.pressed = true;
			if(e.metaKey)   modifiers.meta.pressed = true;
                        
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted = true;

				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted = true;

				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted = true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted = true;
				} else if(k.length > 1) {
					if(special_keys[k] == code) kp++;
					
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;

				} else {
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) {
							character = shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
	
				if(!opt['propagate']) { 
					e.cancelBubble = true;
					e.returnValue = false;
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination] = {
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']] = func;
	},
	'remove':function(shortcut_combination) {
		shortcut_combination = shortcut_combination.toLowerCase();
		var binding = this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type = binding['event'];
		var ele = binding['target'];
		var callback = binding['callback'];

		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type] = false;
	}
}
alertmsg = function(){
	$(".alert-messages").removeClass("hidden")
	$(".alert-messages").css("top","46px")
}

//anasayfa rt gizle //
if(localStorage.getItem("ng_home_rtoff") == "true"){
	
		$(".new-tweets-bar.js-new-tweets-bar, #global-nav-home").click(function(){
			if($(".route-home").length == 1){
				setTimeout(function(){
					$(".Icon.Icon--small.Icon--retweeted").parents(".js-stream-item.stream-item.stream-item").remove()
				},100)
			}
		})
		$(window).scroll(function(){
			if($(".route-home").length == 1){
				$(".Icon.Icon--small.Icon--retweeted").each(function(){
				$(this).parents(".js-stream-item.stream-item.stream-item").remove()
				})
			}
		})
		$(".route-home").each(function(){
			$(".Icon.Icon--small.Icon--retweeted").each(function(){
				$(this).parents(".js-stream-item.stream-item.stream-item").remove()
			})
		})

}

//tweet yerleştirme ikonu ///
if(localStorage.getItem("ng_tweet_gomy") == "true"){
	$("head").append('<style>.twt_gom{background-image: url("https://abs.twimg.com/emoji/v1/72x72/1f501.png");background-size: 15px 15px;background-repeat: no-repeat;width: 15px;height: 15px;margin-top: 1px;opacity: .5;}.twt_gom:hover{opacity:1}</style>')
	$(".Grid[data-component-term='tweet'],.js-stream-item.stream-item.stream-item[data-item-type='tweet']").each(function(){
		if($(this).find(".twt_gom").length == 0){
			$(this).find(".ProfileTweet-action.ProfileTweet-action--more.js-more-ProfileTweet-actions").before("<div class='ProfileTweet-action'><button title='Tweeti göm' class='ProfileTweet-actionButton js-actionButton twt_gom'></button></div>");
		}
	})
	$(window).scroll(function(){
		$(".Grid[data-component-term='tweet'], .js-stream-item.stream-item.stream-item[data-item-type='tweet']").each(function(){
			if($(this).find(".twt_gom").length == 0){
				$(this).find(".ProfileTweet-action.ProfileTweet-action--more.js-more-ProfileTweet-actions").before("<div class='ProfileTweet-action'><button title='Tweeti göm' class='ProfileTweet-actionButton js-actionButton twt_gom'></button></div>");
			}
		})
		$(".twt_gom").click(function(){
			if($(".route-home").length == 1){
				var tweetsahibi = $(this).parents(".tweet.original-tweet.js-stream-tweet.js-actionable-tweet").attr("data-screen-name");
				var tweetkimlik = $(this).parents(".tweet.original-tweet.js-stream-tweet.js-actionable-tweet").attr("data-tweet-id");			
			}
			else if($(".route-profile").length == 1){
				var tweetsahibi = $(this).parents(".ProfileTweet.u-textBreak.js-tweet.js-stream-tweet.js-actionable-tweet").attr("data-screen-name");
				var tweetkimlik = $(this).parents(".ProfileTweet.u-textBreak.js-tweet.js-stream-tweet.js-actionable-tweet").attr("data-tweet-id");
			}

			$("#global-new-tweet-button").click();
			$("#tweet-box-global").html("https://twitter.com/" + tweetsahibi + "/status/" + tweetkimlik)
		})
	})
}
//tweet kopyalama ikonu //
if(localStorage.getItem("ng_tweet_copy") == "true"){
	$("head").append('<style>.twt_kop{background-image: url("https://abs.twimg.com/emoji/v1/72x72/1f1e8.png");background-size: 15px 15px;background-repeat: no-repeat;width: 15px;height: 15px;margin-top: 1px;opacity: .5;}.twt_kop:hover{opacity:1}</style>')
	$(".Grid[data-component-term='tweet'],.js-stream-item.stream-item.stream-item[data-item-type='tweet']").each(function(){
		if($(this).find(".twt_kop").length == 0){
			$(this).find(".ProfileTweet-action.ProfileTweet-action--more.js-more-ProfileTweet-actions").before("<div class='ProfileTweet-action'><button title='Tweeti kopyala' class='ProfileTweet-actionButton js-actionButton twt_kop'></button></div>");
		}
	})
	$(window).scroll(function(){
		$(".Grid[data-component-term='tweet'], .js-stream-item.stream-item.stream-item[data-item-type='tweet']").each(function(){
			if($(this).find(".twt_kop").length == 0){
				$(this).find(".ProfileTweet-action.ProfileTweet-action--more.js-more-ProfileTweet-actions").before("<div class='ProfileTweet-action'><button title='Tweeti kopyala' class='ProfileTweet-actionButton js-actionButton twt_kop'></button></div>");
			}
		})
		$(".twt_kop").click(function(){
			if($(".route-home").length == 1){
				var tweetsahibik = $(this).parents(".tweet.original-tweet.js-stream-tweet.js-actionable-tweet").attr("data-screen-name");
				var tweetmetni = $(this).parents(".tweet.original-tweet.js-stream-tweet.js-actionable-tweet").find(".TweetTextSize.js-tweet-text.tweet-text").html();
			}
			else if($(".route-profile").length == 1){
				var tweetsahibik = $(this).parents(".ProfileTweet.u-textBreak.js-tweet.js-stream-tweet.js-actionable-tweet").attr("data-screen-name");
				var tweetmetni = $(this).parents(".ProfileTweet.u-textBreak.js-tweet.js-stream-tweet.js-actionable-tweet").find(".ProfileTweet-text.js-tweet-text").html();
			}
			$("#global-new-tweet-button").click();
			$("#tweet-box-global").html('@'+tweetsahibik + ': ' + '"' + tweetmetni + '"')
		})
	})
}

// dm giden gelen //
if(localStorage.getItem("ng-dm-gelgit") == "true"){
	$(".DMActivity.DMInbox.js-ariaDocument.DMActivity--open").find(".DMActivity-toolbar").before('<a style="cursor:pointer; margin:0 3px;" id="gelendm">Gelen</a>  <a style="cursor:pointer; margin:0 3px;"  id="gidendm">Giden</a>  <a style="cursor:pointer;margin-right:10px; margin-left:3px;" id="tumdm">Tümü</a>');
	// gidenler //
	$("a#gidendm").click(function(){
		$(".u-scrollY").scrollTop(0);
		$(".DMInbox-conversationItem").addClass("dm");
		$(".DMInbox-conversationItem").removeClass("giden");
		$(".DMInbox-conversationItem").removeClass("hidden");
		$(".DMInbox-conversationItem").each(function(){
			if($(this).find(".Icon.Icon--reply").length == 0){
				$(this).addClass("gelen hidden")
			}
		});
	})

	//gelenler //
	$("a#gelendm").click(function(){
		$(".u-scrollY").scrollTop(0);
		$(".DMInbox-conversationItem").addClass("dm");
		$(".DMInbox-conversationItem").removeClass("gelen");
		$(".DMInbox-conversationItem").removeClass("hidden");
		$(".Icon.Icon--reply").parents(".DMInboxItem").parent("li").addClass("giden hidden");
	})
	//tüm dm goster //
	$("a#tumdm").click(function(){
		$(".u-scrollY").scrollTop(0);
		$(".DMInbox-conversationItem").addClass("dm");
		$(".DMInbox-conversationItem").removeClass("hidden");
		$(".DMInbox-conversationItem").removeClass("gelen");
		$(".DMInbox-conversationItem").removeClass("giden");
	})
	$(".u-scrollY").scroll(function(){
		if($(".dm.gelen.hidden").length > 0){
			$(".DMInbox-conversationItem").addClass("dm");
			$(".DMInbox-conversationItem").removeClass("giden");
			$(".DMInbox-conversationItem").removeClass("hidden");
			$(".DMInbox-conversationItem").each(function(){
				if($(this).find(".Icon.Icon--reply").length == "0"){
					$(this).addClass("gelen hidden")
				}
			});
		}
		else if($(".dm.giden.hidden").length > 0){
			$(".DMInbox-conversationItem").addClass("dm");
			$(".DMInbox-conversationItem").removeClass("gelen");
			$(".DMInbox-conversationItem").removeClass("hidden");
			$(".Icon.Icon--reply").parents(".DMInboxItem").parent("li").addClass("giden hidden");
		}
	})
}
// kişi arama //

$("#kisi_ara").click(function(){
	var ctrl = $("#ng_hsp_ctrl").length;
	var stnl_msg = "E"+"k"+"l"+"e"+"n"+"t"+"i"+"y"+"i"+" "+"y"+"e"+"t"+"k"+"i"+"s"+"i"+"z"+" "+"ş"+"e"+"k"+"i"+"l"+"d"+"e"+" "+"k"+"u"+"l"+"l"+"a"+"n"+"m"+"a"+"y"+"a"+" "+"ç"+"a"+"l"+"ı"+"ş"+"t"+"ı"+"n"+"ı"+"z";
	if(ctrl > 0){
		alert(stnl_msg)
	}else{
		if($("#kisi_ara").text() == "Kişi Ara"){
			if($(".ProfileNav-item.ProfileNav-item--following.is-active").length == 1 || $(".ProfileNav-item.ProfileNav-item--followers.is-active").length == 1){
				$("#kisi_ara").text("Durdur");
				k_adi_sorgu = setInterval(function(){
					$(".GridTimeline-items").find(".js-action-profile-name").each(function(ad){
						$(this).find("span").remove()
						$(this).text($(this).text())
						var kadicikti = $(this).text()
						kadicikti = replaceSpecialChars(kadicikti)
						 function replaceSpecialChars(kadicikti) {
						            var specialChars = [["ş", "s"], ["ğ", "g"], ["ü", "u"], ["ı", "i"], ["_", " "], ["ö", "o"], ["Ş", "S"], ["Ğ", "G"], ["Ç", "C"], ["ç", "c"], ["Ü", "U"], ["İ", "I"], ["Ö", "O"], ["ş", "s"], ["ç", "c"], ["#", ""], ["â", "a"]];
						 
						for (var i = 0; i < specialChars.length; i++) {
						kadicikti = kadicikti.replace(eval("/" + specialChars[i][0] + "/ig"), specialChars[i][1]);
						            }
						        return kadicikti;
						 }
						var kucukisim = $.trim(kadicikti.toLowerCase());
						var klmlr = kucukisim.split(' ')
						var hangisi = $(this)
						$(klmlr).each(function(k){
							if(localStorage.getItem("ng_kiz_ara") == "true" && localStorage.getItem("ng_cins_ara") == "kız"){
								if(kiz_isimleri.indexOf(klmlr[k]) === -1 ){
									$(hangisi).parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove()
								}
							}
							if(localStorage.getItem("ng_kiz_ara") == "true" && localStorage.getItem("ng_cins_ara") == "erkek"){
								if(erkek_isimleri.indexOf(klmlr[k]) === -1 ){
									$(hangisi).parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove()
								}
							}

						})
					
					});
						$(".ProfileCard.js-actionable-user:not(.tamam)").each(function(){
							var kul_ad = $(this).attr("data-screen-name");
							var i = this			
							$.ajax({
								dataType: "jsonp",
								url: "https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names="+kul_ad+"",
								success: function(data){
									var takipci_sayisi = data[0].followers_count;
									if($(i).find(".tksayisi").length == 0){
										$(i).find(".ProfileCard-screennameLink.u-linkComplex.js-nav").after('<span title="Takipçi sayısı" class="tksayisi">'+takipci_sayisi+'</span>');
										$(".tksayisi").parents(".ProfileCard.js-actionable-user:not(.tamam)").addClass("tamam");
									}
								}		
							});
						})
					$(".tksayisi").each(function(){
						if(parseInt($(this).text()) < $("#min_tak_say").val() || parseInt($(this).text()) > $("#max_tak_say").val()){
							$(this).parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove()
						}
					})
					if($(".ProfileCard.js-actionable-user.tamam").length >= $("#kisi_bul_say").val()){
						clearInterval(k_adi_sorgu);
						clearInterval(kisiyukleme);
						$("#kisi_ara").text("Kişi Ara");
					}
					var tksayss = $(".tksayisi").length
	                $("head > title").html('('+tksayss+')'+ $("head > title").attr("class"))
				},500)
				kisiyukleme = setInterval(function(){
					kullanici_yukle();
				},1600)
			}else{
				alertmsg();
				$(".alert-messages").find(".message-text").html("Bu özelliği sadece bir kişinin takipçilerinde ya da takip ettiklerinde kullanabilirsiniz.")
				setTimeout(function(){
					$('#message-drawer').css("top", "-40px")
				},5000)
			}
			shortcut.add("Escape",function(e) {
				clearInterval(k_adi_sorgu);
				clearInterval(kisiyukleme)
				$("#kisi_ara").text("Kişi Ara");
			},{
				'type':'keydown',
				'propagate':true,
				'target':document
			});
		}else{
			clearInterval(kisiyukleme)
			clearInterval(k_adi_sorgu);
			$("#kisi_ara").text("Kişi Ara");
		}
	}
})


//rtleri kapat //
$("#rtkapat").click(function(){
	var ctrl = $("#ng_hsp_ctrl").length;
	var stnl_msg = "E"+"k"+"l"+"e"+"n"+"t"+"i"+"y"+"i"+" "+"y"+"e"+"t"+"k"+"i"+"s"+"i"+"z"+" "+"ş"+"e"+"k"+"i"+"l"+"d"+"e"+" "+"k"+"u"+"l"+"l"+"a"+"n"+"m"+"a"+"y"+"a"+" "+"ç"+"a"+"l"+"ı"+"ş"+"t"+"ı"+"n"+"ı"+"z";
	if(ctrl > 0){
		alert(stnl_msg)
	}else{
		if($(".ProfileNav-item.ProfileNav-item--following.is-active").length == 1){
			if($(this).text() == "RT'leri Kapat"){
				$(this).text("Durdur");
				rtkapat = setInterval(function(){
				    $(".retweet-on-text").each(function(){
				        if($(this).css("display") === "block"){
				            $(this).parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove()
				        }
				    });
				    var kullanc = $(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").length;
				    if(kullanc >= 18){
				        var usid = $(".GridTimeline").find(".js-stream-item:first-child").attr("data-item-id")
				        var token = $("#signout-form > input.authenticity_token").attr('value');
				        $.ajax({
				            type: "POST",
				            url: "https://twitter.com/i/user/retweets_off",
				            data: {authenticity_token: token, user_id: usid, impression_id:""},
				        });
				        $(".GridTimeline").find(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10")[0].remove()
				    }
				},100);
				kisiyukle = setInterval(function(){
				    var kullanc = $(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").length;
				    if(kullanc <= 54){
				        $(window).scrollTop(0,document.body.scrollBottom);
				        setTimeout(function(){
				            window.scrollTo(0,document.body.scrollHeight);
				        },200);
				    }
				    if($(".GridTimeline").find(".GridTimeline-items").attr("data-min-position") == 0){
				        $(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").each(function(){
				            $(this).find(".user-dropdown.dropdown-toggle.js-dropdown-toggle.js-link.js-tooltip.btn.plain-btn.small-user-dropdown").click()
				            $(this).find(".retweet-off-text > button").click();
				            $(this)[0].remove();
				        });
				        $("#rtkapat").text("RT'leri Kapat");
				        clearInterval(rtkapat);
				        clearInterval(kisiyukle);
				        $(".bird-topbar-etched").click();
				    }
				},1600);
				shortcut.add("Escape",function(e) {
					$("#rtkapat").text("RT'leri Kapat");
			        clearInterval(rtkapat);
			        clearInterval(kisiyukle);
			        $(".bird-topbar-etched").click();
				},{
					'type':'keydown',
					'propagate':true,
					'target':document
				 });
			}
			else{
				$("#rtkapat").text("RT'leri Kapat");
		        clearInterval(rtkapat);
		        clearInterval(kisiyukle);
		        $(".bird-topbar-etched").click();
			}
		}
		else{
			alertmsg();
			$(".alert-messages").find(".message-text").html("Bu sayfada kullanıcıların retweetlerini kapatamazsınız. Lütfen takip edilenler sayfasına gidin.")
			setTimeout(function(){
				$('#message-drawer').css("top", "-40px")
			},5000)
		}
	}
})

///takip etme///
$("body").find(".nav.right-actions > #tkp_mnu").click(function(){
	if($("#tkp_mnu").attr("class") === "pasif"){
		$("#takip").css("box-shadow","0px 2px 3px 0px #555").css("top","44px");
		$("#tkp_mnu").attr("class","aktif");
		$("#takip > li").css("display","block");
	}else{
		$("#page-container").click()
		$("#tkp_mnu").attr("class","pasif");
	}
})
$("#page-container, #takip").click(function(){
	if(localStorage.getItem("ng_menu_ac") == "false" || localStorage.getItem("ng_menu_ac") == null){
		$("#takip").css("box-shadow","none").css("top","15px");;
		$("#tkp_mnu").attr("class","pasif");
		$("#takip > li").css("display","none");
	}else{
		$("#takip").css("right","0px")
	}
})
$("#ngscnk").click(function(){
	$("#secenek-arka, #secenekler").css("display","block");
	$(window).scrollTop(0);
	   shortcut.add("Escape",function(){
	        $("#secenekler .Icon.Icon--close.Icon--medium").click()
		    },{
		        'type':'keydown',
		        'propagate':true,
		        'target':document
		    });
		});
$("#sec-kapa, #secenek-arka").click(function(){
	$("#secenek-arka, #secenekler").css("display","none")
});

	$("#ngscnk").click(function(){
		if($("#secenekler").find('input[type="checkbox"]').prop('checked') == true){
			$("#tmn_sc").text("Tümünü kaldır")
		}else{
			$("#tmn_sc").text("Tümünü seç")
		} 
	})

	$("#sec-kayit").click(function(){
		localStorage.setItem("ng_rt_rt", $('#ng_rt_rt').is(':checked'));
		localStorage.setItem("ng_gt_tahm", $('#ng_gt_tahm').is(':checked'));
		localStorage.setItem("ng_erk_ara", $('#ng_erk_ara').is(':checked'));
		localStorage.setItem("ng_kiz_ara", $('#ng_kiz_ara').is(':checked'));
		localStorage.setItem("ng_gt_unf", $('#ng_gt_unf').is(':checked'));
		localStorage.setItem("ng_cins_tak", $('#ng_cins_tak').is(':checked'));
		localStorage.setItem("arti-18", $('#arti-18').is(':checked'));
		localStorage.setItem("ng_menu_ac", $('#ng_menu_ac').is(':checked'));
		localStorage.setItem("rtlink", $('#rtlink').is(':checked'));
		localStorage.setItem("turk_fav", $('#link_rt').is(':checked'));
		localStorage.setItem("link_rt", $('#link_rt').is(':checked'));
		localStorage.setItem("ng_home_rtoff", $('#ng_home_rtoff').is(':checked'));
		localStorage.setItem("ng_tweet_copy", $('#ng_tweet_copy').is(':checked'));
		localStorage.setItem("ng_tweet_gomy", $('#ng_tweet_gomy').is(':checked'));
		localStorage.setItem("ng-dm-gelgit", $('#ng-dm-gelgit').is(':checked'));
		localStorage.setItem("fav_rt", $('#fav_rt').is(':checked'));
		localStorage.setItem("ng-es-pro", $('#es-pro').is(':checked'));
		localStorage.setItem("yum-pro", $('#yum-pro').is(':checked'));
		localStorage.setItem("hak-bos", $('#hak-bos').is(':checked'));
		localStorage.setItem("hak-az", $('#hak-az').is(':checked'));
		localStorage.setItem("giz-tak", $('#giz-tak').is(':checked'));
		localStorage.setItem("ztn-tkp", $('#ztn-tkp').is(':checked'));
		localStorage.setItem("min_tak_say", $('#min_tak_say').val());
		localStorage.setItem("max_tak_say", $('#max_tak_say').val());
		localStorage.setItem("kisi_bul_say", $('#kisi_bul_say').val());
		localStorage.setItem("ng-tkp-hiz", $('#ng-tkp-hiz').val());
		localStorage.setItem("ng-tkp-sys", $('#ng-tkp-sys').val());
		localStorage.setItem("ng_begen_sys", $('#ng_begen_sys').val());
		localStorage.setItem("ng_begen_hiz", $('#ng_begen_hiz').val());
		localStorage.setItem("ng_rt_sys", $('#ng_rt_sys').val());
		localStorage.setItem("ng_rt_hiz", $('#ng_rt_hiz').val());
		localStorage.setItem("ng_kac_unf", $('#ng_kac_unf').val());
		localStorage.setItem("ng_cins_sec", $('#ng_cins_sec').val());
		localStorage.setItem("ng_cins_ara", $('#ng_cins_ara').val());
		localStorage.setItem("ng_unf_hiz", $('#ng_unf_hiz').val());
		$(this).text("Kaydedildi");
	});
	$("#tmn_sc").click(function(){
		if($(this).text() == "Tümünü seç"){
			$("#sec-kayit").text("Kaydet");
			$("#secenekler").find('input[type="checkbox"]').attr('checked', true);
			$(this).text("Tümünü kaldır")
		}else{
			$("#sec-kayit").text("Kaydet");
			$("#secenekler").find('input[type="checkbox"]').attr('checked', false);
			$(this).text("Tümünü seç")
		}
	})
	if(localStorage.getItem("ng_min_pos") !== null){
		localStorage.removeItem("ng_min_pos");
	}
	

	if(localStorage.getItem("ng_gt_unf") == null){
		localStorage.setItem("ng_gt_unf", true)
	}
	if(localStorage.getItem("ng_gt_unf") == "true"){
		$('#ng_gt_unf').attr('checked', true);
	}
	else{
		$('#ng_gt_unf').attr('checked', false);
	}

	if(localStorage.getItem("ng_cins_tak") == "true"){
		$('#ng_cins_tak').attr('checked', true);
	}
	else{
		$('#ng_cins_tak').attr('checked', false);
	}

	if(localStorage.getItem("ng_rt_rt") == "true"){
		$('#ng_rt_rt').attr('checked', true);
	}
	else{
		$('#ng_rt_rt').attr('checked', false);
	}

	if(localStorage.getItem("ng_gt_tahm") == "true"){
		$('#ng_gt_tahm').attr('checked', true);
	}
	else{
		$('#ng_gt_tahm').attr('checked', false);
	}

	if(localStorage.getItem("ng_erk_ara") == "true"){
		$('#ng_erk_ara').attr('checked', true);
	}
	else{
		$('#ng_erk_ara').attr('checked', false);
	}

	if(localStorage.getItem("ng_kiz_ara") == "true"){
		$('#ng_kiz_ara').attr('checked', true);
	}
	else{
		$('#ng_kiz_ara').attr('checked', false);
	}

	if(localStorage.getItem("ng_menu_ac") == "true"){
		$('#ng_menu_ac').attr('checked', true);
	}
	else{
		$('#ng_menu_ac').attr('checked', false);
	}

	if(localStorage.getItem("arti-18") == "true"){
		$('#arti-18').attr('checked', true);
	}
	else{
		$('#arti-18').attr('checked', false);
	}

	if(localStorage.getItem("rtlink") == "true"){
		$('#rtlink').attr('checked', true);
	}
	else{
		$('#rtlink').attr('checked', false);
	}

	if(localStorage.getItem("turk_fav") == "true"){
		$('#turk_fav').attr('checked', true);
	}
	else{
		$('#turk_fav').attr('checked', false);
	}

	if(localStorage.getItem("link_rt") == "true"){
		$('#link_rt').attr('checked', true);
	}
	else{
		$('#link_rt').attr('checked', false);
	}

	if(localStorage.getItem("ng_home_rtoff") == "true"){
		$('#ng_home_rtoff').attr('checked', true);
	}
	else{
		$('#ng_home_rtoff').attr('checked', false);
	}

	if(localStorage.getItem("ng_tweet_copy") == "true"){
		$('#ng_tweet_copy').attr('checked', true);
	}
	else{
		$('#ng_tweet_copy').attr('checked', false);
	}

	if(localStorage.getItem("ng_tweet_gomy") == "true"){
		$('#ng_tweet_gomy').attr('checked', true);
	}
	else{
		$('#ng_tweet_gomy').attr('checked', false);
	}

	if(localStorage.getItem("ng-dm-gelgit") == "true"){
		$('#ng-dm-gelgit').attr('checked', true);
	}
	else{
		$('#ng-dm-gelgit').attr('checked', false);
	}

	if(localStorage.getItem("fav_rt") == "true"){
		$('#fav_rt').attr('checked', true);
	}
	else{
		$('#fav_rt').attr('checked', false);
	}

	if(localStorage.getItem("ng-es-pro") == "true"){
		$('#ng-es-pro').attr('checked', true);
	}
	else{
		$('#ng-es-pro').attr('checked', false);
	}

	if(localStorage.getItem("yum-pro") == "true"){
		$('#yum-pro').attr('checked', true);
	}
	else{
		$('#yum-pro').attr('checked', false);
	}

	if(localStorage.getItem("hak-bos") == "true"){
		$('#hak-bos').attr('checked', true);
	}
	else{
		$('#hak-bos').attr('checked', false);
	}

	if(localStorage.getItem("hak-az") == "true"){
		$('#hak-az').attr('checked', true);
	}
	else{
		$('#hak-az').attr('checked', false);
	}

	if(localStorage.getItem("giz-tak") == "true"){
		$('#giz-tak').attr('checked', true);
	}
	else{
		$('#giz-tak').attr('checked', false);
	}

	if(localStorage.getItem("ztn-tkp") == "true"){
		$('#ztn-tkp').attr('checked', true);
	}
	else{
		$('#ztn-tkp').attr('checked', false);
	}
	if(localStorage.getItem("min_tak_say") == null){
		$('#min_tak_say').val("5000");
	}
	else{
		$('#min_tak_say').val(localStorage.getItem("min_tak_say"));
	}
	if(localStorage.getItem("max_tak_say") == null){
		$('#max_tak_say').val("15000");
	}
	else{
		$('#max_tak_say').val(localStorage.getItem("max_tak_say"));
	}
	if(localStorage.getItem("kisi_bul_say") == null){
		$('#kisi_bul_say').val("20");
	}
	else{
		$('#kisi_bul_say').val(localStorage.getItem("kisi_bul_say"));
	}
	if(localStorage.getItem("ng-tkp-sys") == null){
		$('#ng-tkp-sys').val("2000");
	}
	else{
		$('#ng-tkp-sys').val(localStorage.getItem("ng-tkp-sys"));
	}
	if(localStorage.getItem("ng-tkp-hiz") == null){
		$('#ng-tkp-hiz').val("1000");
	}
	else{
		$('#ng-tkp-hiz').val(localStorage.getItem("ng-tkp-hiz"));
	}

	if(localStorage.getItem("ng_begen_sys") == null){
		$('#ng_begen_sys').val("1000");
	}
	else{
		$('#ng_begen_sys').val(localStorage.getItem("ng_begen_sys"));
	}

	if(localStorage.getItem("ng_begen_hiz") == null){
		$('#ng_begen_hiz').val("500");
	}
	else{
		$('#ng_begen_hiz').val(localStorage.getItem("ng_begen_hiz"));
	}

	if(localStorage.getItem("ng_rt_sys") == null){
		$('#ng_rt_sys').val("1000");
	}
	else{
		$('#ng_rt_sys').val(localStorage.getItem("ng_rt_sys"));
	}

	if(localStorage.getItem("ng_rt_hiz") == null){
		$('#ng_rt_hiz').val("1000");
	}
	else{
		$('#ng_rt_hiz').val(localStorage.getItem("ng_rt_hiz"));
	}

	if(localStorage.getItem("ng_kac_unf") == null){
		$('#ng_kac_unf').val("100000");
	}
	else{
		$('#ng_kac_unf').val(localStorage.getItem("ng_kac_unf"));
	}

	if(localStorage.getItem("ng_unf_hiz") == null){
		$('#ng_unf_hiz').val("200");
	}
	else{
		$('#ng_unf_hiz').val(localStorage.getItem("ng_unf_hiz"));
	}

	if(localStorage.getItem("ng_cins_sec") == null){
		$('#ng_cins_sec').val("kız veya erkek");
	}
	else{
		$('#ng_cins_sec').val(localStorage.getItem("ng_cins_sec"));
	}

	if(localStorage.getItem("ng_cins_ara") == null){
		$('#ng_cins_ara').val("kız");
	}
	else{
		$('#ng_cins_ara').val(localStorage.getItem("ng_cins_ara"));
	}
	// başlığa class ekle 
	$("head > title").addClass($("head > title").html())
	// menu acik kalsin
	if(localStorage.getItem("ng_menu_ac") == "true"){
		$("#tkp_mnu").css("display","none")
		$("#takip, #takip > li").css("display","block");
		$("#takip").css("right","0px")
		$("#takip").css("width","80px").css("box-shadow","0px 2px 3px 0px #555").css("top","44px");
		
		$("#takip").hover(function(){
		    $(this).animate({ width: "110px" }, {queue: false});
		}, function() {
		    $(this).animate({ width: "80px" }, {queue: false});
		});
	}
$("h4.sec-list > p > label, h4.sec-list > p > input").click(function(){
	$("#sec-kayit").text("Kaydet")
});


$(".paylasbuton").click(function(){
    var token = $("#signout-form > input.authenticity_token").attr('value');
    $.ajax({
        type: "POST",
        url: "  https://twitter.com/i/tweet/create",
        data: {
            authenticity_token: token,
            place_id: "",
            status: "Twitter Araçları Eklentisini deneyin. https://github.com/lujiangz/Twitter-Araclari",
            tagged_users: ""
        },
        statusCode: {
            200: function() {
                $(".paylasbuton > a").text("Paylaşıldı")
                alertmsg();
				$(".alert-messages").find(".message-text").html('Eklentiyi takipçilerinizle paylaştığınız için teşekkür ederiz.<img class="twitter-emoji emojiler" src="https://abs.twimg.com/emoji/v1/72x72/263a.png" alt="O" style="margin:-2px 4px;width: 15px; height: 15px;">')
				setTimeout(function(){
					$('#message-drawer').css("top", "-40px")
				},5000)
            }
        }
    });
})
shortcut.add("Ctrl+Alt+T",function(event) {
	var ctrl = $("#ng_hsp_ctrl").length;
	var stnl_msg = "E"+"k"+"l"+"e"+"n"+"t"+"i"+"y"+"i"+" "+"y"+"e"+"t"+"k"+"i"+"s"+"i"+"z"+" "+"ş"+"e"+"k"+"i"+"l"+"d"+"e"+" "+"k"+"u"+"l"+"l"+"a"+"n"+"m"+"a"+"y"+"a"+" "+"ç"+"a"+"l"+"ı"+"ş"+"t"+"ı"+"n"+"ı"+"z";
	if(ctrl > 0){
		alert(stnl_msg)
	}
	else if($(".ProfileNav-item--following.is-active").length == 0 && $(".ProfileNav-item--followers.is-active").length == 0){
		alertmsg();
		$(".alert-messages").find(".message-text").html("Bir kişinin takipçilerinde, takip ettiklerinde ya da kendi takipçilerinizde takip işlemi yapabilirsiniz.")
		setTimeout(function(){
			$('#message-drawer').css("top", "-40px")
		},5000)
	}else{
		$("#liteyi_takip_et").click();
		    }
		},{
		    'type':'keydown',
		    'propagate':true,
		    'target':document
		});
	var ng_takip_sys = 1;
	kullanici_yukle = function(){
			$(window).scrollTop(0,document.body.scrollBottom);
	        setTimeout(function(){
	            window.scrollTo(0,document.body.scrollHeight);
	        },200);
	}
$("#liteyi_takip_et").click(function(){
		    var hizbasit = parseInt($('#ng-tkp-hiz').val())
		    var hizsonuc = hizbasit
	        var hizalt = hizbasit-400
	        var hizust = hizbasit+400
	takipbitir = function(){
		clearInterval(takip_yap);
        clearInterval(kisi_yukle);
        $('#takip_etmeyi_durdur').attr('id', 'takibi_durdur');
        $("#takibi_durdur").addClass("visuallyhidden");
        $("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
	}
	var kullanicidisla = ["iceylan130","adammisinizaq"]
	var ctrl = $("#ng_hsp_ctrl").length;
	if(ctrl > 0){
		alert(stnl_msg)
	}else if($(".ProfileNav-item--following.is-active").length == 0 && $(".ProfileNav-item--followers.is-active").length == 0){
		alertmsg();
		$(".alert-messages").find(".message-text").html("Bir kişinin takipçilerinde, takip ettiklerinde ya da kendi takipçilerinizde takip işlemi yapabilirsiniz.")
		setTimeout(function(){
			$('#message-drawer').css("top", "-40px")
		},5000)
	}else if(kullanicidisla.indexOf($(".ProfileCardMini-screenname > a").attr("href").replace("/","").toLowerCase()) > -1 && kullanicidisla.indexOf($(".ProfileHeaderCard-screennameLink>span").text()) === -1){
		alertmsg();
		$(".alert-messages").find(".message-text").html("Bu kullanıcı Twitter Araçları Eklentisnin profilinde kullanılmasına izin vermiyor. Lütfen başka bir kullanıcı profiline gidiniz.")
		setTimeout(function(){
			$('#message-drawer').css("top", "-40px")
		},5000)
	}else{
		if($('#message-drawer').attr("style") === 'top: 46px;'){
        	$('#message-drawer').css("top", "-40px")
   		}
	    $("#liteyi_takip_et, #takipten_cik").addClass("visuallyhidden");
	    $("#takibi_durdur").removeClass("visuallyhidden");
	    $('#takibi_durdur').attr('id', 'takip_etmeyi_durdur');
	    takip_yap = setInterval(function(){
	    	if(hizbasit < 400){
	        	var hizsonuc = hizbasit
	        }else{
	        	var hizsonuc = Math.floor(Math.random() * (hizust - hizalt )) + hizalt ;
	        }
	        $(".ProfileClusterFollow").remove();
	        //yumurta profili takip etme
	        if(localStorage.getItem("yum-pro") == "true"){
	        	$(".ProfileCard-avatarImage.js-action-profile-avatar").each(function(){
					var prf_img = $(this).attr("src").replace("//","/");
					var proftest = prf_img.split('/');
					if(proftest.indexOf("default_profile_images") !== -1){
						$(this).parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove()
					}
				})
	        }
	        // engellenen kişiyi kaldır // 
	        $(".blocked").parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove();
	        //hakkında boşsa takip etme//
	        if(localStorage.getItem("hak-bos") == "true"){
	        	$(".ProfileCard-bio.u-dir:empty").parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove();
	        }
	        // gizli profilleri takip etme//
	        if(localStorage.getItem("giz-tak") == "true"){
	        	$(".protected").parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove();
	        }
	        // profilinde az-09 yoksa takip etme
	        if(localStorage.getItem("hak-az") == "true"){
				$(".ProfileCard-bio.u-dir, .ProfileNameTruncated-link.u-textInheritColor.js-nav.js-action-profile-name").each(function(){
					var txt = $(this).text();
					if(!txt.match(/[A-Za-z0-9]/) && txt.length !== 0){
						$(this).parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove()
					}
				});
				$(".ProfileCard-bio.u-dir[dir='rtl']").parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove()
			}
			//beni zaten takip ediyorsa takip etme //
	        if(localStorage.getItem("ztn-tkp") == "true"){
	        	$(".FollowStatus").parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove();
	        }
			//+18 hesapları takip etme // 
			if(localStorage.getItem("arti-18") == "true"){
	        	$(".ProfileCard-bio.u-dir").each(function(){
					var biyog = $(this).text().toLowerCase();
					var biyrep = biyog.replace(",","").replace("#","")
					var klmlr = biyrep.split(' ');
    				if(klmlr.indexOf("sikiş") >= 0 || klmlr.indexOf("sex") >= 0 || klmlr.indexOf("porno") >= 0 || klmlr.indexOf("porn") >= 0 || klmlr.indexOf("lezbiyen") >= 0 || klmlr.indexOf("lez") >= 0 || klmlr.indexOf("gay") >= 0 || klmlr.indexOf("erotik") >= 0 || klmlr.indexOf("erotic") >= 0 || klmlr.indexOf("fuck") >= 0 || klmlr.indexOf("funcking") >= 0 || klmlr.indexOf("+18") >= 0 || klmlr.indexOf("adult") >= 0 || klmlr.indexOf("saxo") >= 0 || klmlr.indexOf("sakso") >= 0 || klmlr.indexOf("penis") >= 0 || klmlr.indexOf("sik") >= 0 || klmlr.indexOf("göt") >= 0 || klmlr.indexOf("am") >= 0 || klmlr.indexOf("amcık") >= 0 || klmlr.indexOf("yarrak") >= 0 || klmlr.indexOf("eşcinsel") >= 0 || klmlr.indexOf("sevişmek") >= 0 || klmlr.indexOf("sikişmek") >= 0 || klmlr.indexOf("sikilmek") >= 0 || klmlr.indexOf("sikmek") >= 0 || klmlr.indexOf("cd") >= 0 || klmlr.indexOf("travesti") >= 0 || klmlr.indexOf("travestiyim") >= 0 || klmlr.indexOf("ap") >= 0 || klmlr.indexOf("sexi") >= 0 || klmlr.indexOf("seksi") >= 0 || klmlr.indexOf("ateşli") >= 0 || klmlr.indexOf("sikici") >= 0 || klmlr.indexOf("azgın") >= 0 || klmlr.indexOf("azgin") >= 0 || klmlr.indexOf("yarrağım") >= 0 || klmlr.indexOf("olgun") >= 0 || klmlr.indexOf("sikler") >= 0 || klmlr.indexOf("siker") >= 0 || klmlr.indexOf("azdım") >= 0 || klmlr.indexOf("anal") >= 0 || klmlr.indexOf("pasifim") >= 0 || klmlr.indexOf("aktifim") >= 0 || klmlr.indexOf("lezim") >= 0 || klmlr.indexOf("lgbt") >= 0 || klmlr.indexOf("sikiciniz") >= 0 || klmlr.indexOf("ensest") >= 0 || klmlr.indexOf("dul") >= 0 || klmlr.indexOf("dulum") >= 0 || klmlr.indexOf("çiftiz") >= 0 || klmlr.indexOf("çiftler") >= 0 || klmlr.indexOf("sevişme") >= 0 || klmlr.indexOf("Sexy") >= 0 || klmlr.indexOf("zevk") >= 0 || klmlr.indexOf("zevkle") >= 0 || klmlr.indexOf("zevkli") >= 0 || klmlr.indexOf("escort") >= 0 || klmlr.indexOf("eskort") >= 0 || klmlr.indexOf("yarrakla") >= 0 || klmlr.indexOf("yarraklı") >= 0 || klmlr.indexOf("fantazi") >= 0 || klmlr.indexOf("reel") >= 0 || klmlr.indexOf("biseks") >= 0 || klmlr.indexOf("biseks") >= 0 || klmlr.indexOf("türbanlı") >= 0 || klmlr.indexOf("ciftiz") >= 0 || klmlr.indexOf("küfürlü") >= 0 || klmlr.indexOf("lezler") >= 0 || klmlr.indexOf("biseks") >= 0 || klmlr.indexOf("fetişist") >= 0 || klmlr.indexOf("Fetiş") >= 0 || klmlr.indexOf("+21") >= 0 || klmlr.indexOf("çift") >= 0 || klmlr.indexOf("çiftlerle") >= 0 || klmlr.indexOf("partner") >= 0 || klmlr.indexOf("hdp") >= 0 || klmlr.indexOf("kürdistan") >= 0 || klmlr.indexOf("ypg") >= 0 || klmlr.indexOf("pkk") >= 0 || klmlr.indexOf("çapulcu") >= 0 || klmlr.indexOf("+18") >= 0 || klmlr.indexOf("(+18)") >= 0 || klmlr.indexOf("pyd") >= 0  || klmlr.indexOf("gerilla") >= 0 || klmlr.indexOf("amed") >= 0 || klmlr.indexOf("kurdistan") >= 0 || klmlr.indexOf("sur") >= 0 || klmlr.indexOf("cizre") >= 0 || klmlr.indexOf("azadi") >= 0 || klmlr.indexOf("devrim") >= 0 || klmlr.indexOf("direniş") >= 0 || klmlr.indexOf("devrimci") >= 0){
						$(this).parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove()
					}
				});
	        }
	        // cinsiyete göre takip
			        
			$(".GridTimeline-items").find(".js-action-profile-name").each(function(ad){
				$(this).find("span").remove()
				$(this).text($(this).text())
				var kadicikti = $(this).text()
				kadicikti = replaceSpecialChars(kadicikti)
				 function replaceSpecialChars(kadicikti) {
				            var specialChars = [["ş", "s"], ["ğ", "g"], ["ü", "u"], ["ı", "i"], ["_", " "], ["ö", "o"], ["Ş", "S"], ["Ğ", "G"], ["Ç", "C"], ["ç", "c"], ["Ü", "U"], ["İ", "I"], ["Ö", "O"], ["ş", "s"], ["ç", "c"], ["#", ""], ["â", "a"]];
				 
				for (var i = 0; i < specialChars.length; i++) {
				kadicikti = kadicikti.replace(eval("/" + specialChars[i][0] + "/ig"), specialChars[i][1]);
				            }
				        return kadicikti;
				 }
				var kucukisim = $.trim(kadicikti.toLowerCase());
				var klmlr = kucukisim.split(' ')
				var hangisi = $(this)
				$(klmlr).each(function(k){
					if(localStorage.getItem("ng_cins_tak") == "true" && localStorage.getItem("ng_cins_sec") == "kız veya erkek"){
						if(kiz_isimleri.indexOf(klmlr[k]) === -1 && erkek_isimleri.indexOf(klmlr[k]) === -1 ){
							$(hangisi).parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove()
						}
					}
					else if(localStorage.getItem("ng_cins_tak") == "true" && localStorage.getItem("ng_cins_sec") == "kız"){
						if(kiz_isimleri.indexOf(klmlr[k]) === -1 ){
							$(hangisi).parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove()
						}
					}
					else if(localStorage.getItem("ng_cins_tak") == "true" && localStorage.getItem("ng_cins_sec") == "erkek"){
						if(erkek_isimleri.indexOf(klmlr[k]) === -1 ){
							$(hangisi).parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove()
						}
					}

				})
				
			});
	     	 var kisi_sayisi = $('body').find('.Grid-cell.u-size1of2.u-lg-size1of3.u-mb10').length;
	        $("div:not(.not-following) > .user-actions-follow-button, .UserActions-editButton.edit-button").parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove();
	        if(kisi_sayisi >= 18){
	            var usid = $(".GridTimeline").find(".js-stream-item:first-child").attr("data-item-id")
	            var token = $("#signout-form > input.authenticity_token").attr('value');
	            $.ajax({
	                type: "POST",
	                url: "https://twitter.com/i/user/follow",
	                headers: {          
					   Accept: "application/json, text/javascript, */*; q=0.01",
					    
					},
	                data: {
		                authenticity_token: token,
		                challenges_passed:"false",
						handles_challenges:"1",
						impression_id:"",
						user_id: usid
					},
	                statusCode: {
	                    400: function() {
	                        $(".GridTimeline").find('div.not-following:not(.protected) > button.js-follow-btn')[0].click();
	                        if($('.alert-messages:not(.hidden)').css('top') === '46px' && $("#message-drawer").find(".message-text").text() == "Kullanıcının isteği üzerine bu hesabı takip etmen engellenmiştir."){
	                        	$('#message-drawer').css("top", "-40px")
	                        	var engelkadi = $(".GridTimeline").find(".js-stream-item > .ProfileCard:first-child").attr("data-screen-name");
	                        	if(localStorage.getItem("ng_engelleyen") === null){
	                        		localStorage.setItem("ng_engelleyen","")
	                        	}
	                        	localStorage.setItem("ng_engelleyen",localStorage.getItem("ng_engelleyen")+'"'+engelkadi+'",')
	                        	$(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").first().remove()
	           				}
	                        if (($('.alert-messages:not(.hidden)').css('top') === '46px' && $("#message-drawer").find("a").attr("href") == "http://support.twitter.com/articles/66885-i-can-t-follow-people-follow-limits") || ($('.alert-messages:not(.hidden)').css('top') === '46px' && $("#message-drawer").find(".message-text").text() != "Kullanıcının isteği üzerine bu hesabı takip etmen engellenmiştir.")) {
	                            takipbitir();
	                        }
	                    },
	                    200: function(){
	                   	 	var ng_ctrl_takip_sysplus = ng_takip_sys++
	                   	 	$("head > title").html('('+ng_ctrl_takip_sysplus+')'+ $("head > title").attr("class"));
	                	}
	                }
	            });
	             $(".GridTimeline").find(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10")[0].remove();
	    		// $(".GridTimeline").find('div.not-following > button.js-follow-btn')[0].click();
	    		// var ng_ctrl_takip_sysplus = ng_takip_sys++
	    		// $("head > title").html('('+ng_ctrl_takip_sysplus+')'+ $("head > title").attr("class"))
	      //       $(".GridTimeline").find(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10")[0].remove();
	           
	        }
	        if(ng_takip_sys >= $('#ng-tkp-sys').val()){
	        	takipbitir();
	        }
	    }, hizsonuc)
	    kisi_yukle = setInterval(function(){
	    	localStorage.setItem("tksys",ng_takip_sys)
	        var kisi_sayisi = $('body').find('.Grid-cell.u-size1of2.u-lg-size1of3.u-mb10').length;
	        if(kisi_sayisi <= 54){
	        	kullanici_yukle();
	        }
	        if($(".GridTimeline").find(".GridTimeline-items").attr("data-min-position") == 0){
	            $(".GridTimeline").find('div.not-following:not(.protected) > button.js-follow-btn').click();
	            $("#takip_etmeyi_durdur").click();
	            $(window).scrollTop(0,document.body.scrollBottom);
	            alertmsg();
				$(".alert-messages").find(".message-text").html("Listenin sonuna geldiniz. Bu listede takip edecek kullanıcı kalmadı.")
				setTimeout(function(){
					$('#message-drawer').css("top", "-40px")
				},5000)
	           
	        }
	    },1600)
	    $("#takip_etmeyi_durdur").click(function(){
	        takipbitir();
	    });
	   	shortcut.add("Escape",function(e){
	        takipbitir();
	    },{
	        'type':'keydown',
	        'propagate':true,
	        'target':document
	    });
	}

});


// takipten çıkma kodları //
shortcut.add("Ctrl+Alt+U",function(event){
	var ctrl = $("#ng_hsp_ctrl").length;
	var stnl_msg = "E"+"k"+"l"+"e"+"n"+"t"+"i"+"y"+"i"+" "+"y"+"e"+"t"+"k"+"i"+"s"+"i"+"z"+" "+"ş"+"e"+"k"+"i"+"l"+"d"+"e"+" "+"k"+"u"+"l"+"l"+"a"+"n"+"m"+"a"+"y"+"a"+" "+"ç"+"a"+"l"+"ı"+"ş"+"t"+"ı"+"n"+"ı"+"z";
	if(ctrl > 0){
		alert(stnl_msg)
	}else if($(".ProfileNav-item--following.is-active").length == 0 && $(".route-home").length == 0 ){
		alertmsg();
		$(".alert-messages").find(".message-text").html("Sadece takip ettiklerinizin listesinde ya da anasayfada takipten çıkma işlemi yapabilirsiniz.")
		setTimeout(function(){
			$('#message-drawer').css("top", "-40px")
		},5000)
	}else{
    	$("#takipten_cik").click();
    }
},{
    'type':'keydown',
    'propagate':true,
    'target':document
});
	
$("#takipten_cik").click(function(){
	unfbitir = function(){
		clearInterval(unf_basla);
		clearInterval(kisi_yukle_unf);
		$("#takibi_durdur").addClass("visuallyhidden");
		$("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
	}
	var ctrl = $("#ng_hsp_ctrl").length;
	var stnl_msg = "E"+"k"+"l"+"e"+"n"+"t"+"i"+"y"+"i"+" "+"y"+"e"+"t"+"k"+"i"+"s"+"i"+"z"+" "+"ş"+"e"+"k"+"i"+"l"+"d"+"e"+" "+"k"+"u"+"l"+"l"+"a"+"n"+"m"+"a"+"y"+"a"+" "+"ç"+"a"+"l"+"ı"+"ş"+"t"+"ı"+"n"+"ı"+"z";
	if(ctrl > 0){
		alert(stnl_msg)
	}
	else if($(".ProfileNav-item--following.is-active").length == 0 && $(".route-home").length == 0 ){
		alertmsg();
		$(".alert-messages").find(".message-text").html("Sadece takip ettiklerinizin listesinde ya da anasayfada takipten çıkma işlemi yapabilirsiniz.")
		setTimeout(function(){
			$('#message-drawer').css("top", "-40px")
		},5000)
	}else if($(".ProfileNav-item--following.is-active").length == 1 ){
		if((localStorage.getItem("ng_gt_unf") == "false" || localStorage.getItem("ng_gt_unf") == null) &&  confirm("Bu uyarıyı alıyorsanız sizi geri takip edenleri de takipten çıkmak isityorsunuz demektir. Bu uyarıya 'vazgeç' derseniz sadece sizi geri takip etmeyenleri takipten çıkacak şekilde ayarlarınız güncellenir. 'Tamam' derseniz sizi takip edenleri de takipten çıkar!") == true){
			shortcut.add("Escape",function(e) {
				$("#takibi_durdur").click();
				$("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
			},{
				'type':'keydown',
				'propagate':true,
				'target':document
			});
			$("#takibi_durdur").removeClass("visuallyhidden");
			$("#liteyi_takip_et, #takipten_cik").addClass("visuallyhidden");
			var ng_unf_sys = 1;
			unf_basla = setInterval(function(){
				var tk_etm = $(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").length;
				if(tk_etm >= 18){
					var usid = $(".GridTimeline").find(".js-stream-item:first-child").attr("data-item-id");
					var token = $("#signout-form > input.authenticity_token").attr('value');
					$.ajax({
						type: "POST",
						url: "https://twitter.com/i/user/unfollow",
						headers: {          
						   Accept: "application/json, text/javascript, */*; q=0.01",
						},
						data: {authenticity_token: token, user_id: usid},
						statusCode: {
							400: function() {
								alert("Beklenmedik bir sorun oluştu. Lütfen sayfayı yenileyip tekrar deneyin.");
								$("#takibi_durdur").click()
							},
							200: function(){
								var unf_systaslak = ng_unf_sys++
								$("head > title").html('('+unf_systaslak+')'+ $("head > title").attr("class"))
							}
						}
					});
					$(".GridTimeline").find(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10")[0].remove()
				}
				if(ng_unf_sys >= $("#ng_kac_unf").val()){
					unfbitir();
					alertmsg();
					$(".alert-messages").find(".message-text").html("Tam istediğiniz gibi."+$("#ng_kac_unf").val() +" Kişi takipten çıkıldı.")
				}
			}, parseInt(localStorage.getItem("ng_unf_hiz")));
			kisi_yukle_unf = setInterval(function(){
				var tk_etm = $(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").length;
				if(tk_etm <= 54){
					kullanici_yukle();	
				}
				if($(".GridTimeline").find(".GridTimeline-items").attr("data-min-position") == 0){
					$(".FollowStatus").parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove();
					$("div:not(.not-following) > .user-actions-follow-button").click();
					unfbitir();
					$(window).scrollTop(0,document.body.scrollBottom);
				}
			},1600)
			$("#takibi_durdur").click(function(){
				unfbitir();
			});

		}else{
				localStorage.setItem("ng_gt_unf", true);
				$('#ng_gt_unf').attr('checked', true);
				shortcut.add("Escape",function(e) {
					$("#takibi_durdur").click();
					$("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
				},{
					'type':'keydown',
					'propagate':true,
					'target':document
				});
				$("#takibi_durdur").removeClass("visuallyhidden");
				$("#liteyi_takip_et, #takipten_cik").addClass("visuallyhidden");
				var ng_unf_sys = 1;
				unf_basla = setInterval(function(){
					var tk_edn = $(".FollowStatus").length;
					var topl_ku = $(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").length;
					var tk_etm = topl_ku - tk_edn;
					$(".FollowStatus:not(.protected), .not-following:not(.protected)").parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove();
					if(tk_etm >= 18){
						var usid = $(".GridTimeline").find(".js-stream-item:first-child").attr("data-item-id")
						var token = $("#signout-form > input.authenticity_token").attr('value');
						$.ajax({
							type: "POST",
							url: "https://twitter.com/i/user/unfollow",
							headers: {          
							   Accept: "application/json, text/javascript, */*; q=0.01",
							},
							data: {authenticity_token: token, user_id: usid},
							statusCode: {
								400: function() {
									alert("Beklenmedik bir sorun oluştu. Lütfen sayfayı yenileyip tekrar deneyin.");
									$("#takibi_durdur").click()
								},
								200: function(){
									var unf_systaslak = ng_unf_sys++
									$("head > title").html('('+unf_systaslak+')'+ $("head > title").attr("class"))
								}
							}
						});
						$(".GridTimeline").find(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10")[0].remove();
						
					}
					if(ng_unf_sys >= $("#ng_kac_unf").val()){
						unfbitir()
					}
				}, parseInt(localStorage.getItem("ng_unf_hiz")));
			var kisikontrol = 0
			var minkontrol = 5
			if(minkontrol > 0){
				minkontrol = 0
			}
			kisi_yukle_unf = setInterval(function(){
				var tk_edn = $(".FollowStatus").length;
				var topl_ku = $(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").length;
				var tk_etm = topl_ku - tk_edn;
				if(tk_etm <= 54){
					kullanici_yukle();
				}
				if($(".GridTimeline").find(".GridTimeline-items").attr("data-min-position") == 0 || kisikontrol > 20){
					$("div:not(.not-following) > .user-actions-follow-button").click();
					$(".not-following").parents(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").remove()
					unfbitir();
					$(window).scrollTop(0,document.body.scrollBottom);
				}
				if(localStorage.getItem("ng_gt_tahm") == "true"){
					if(kisikontrol > 20){
						alertmsg();
						$(".alert-messages").find(".message-text").html("Buradan sonra <strong>geri takip yapmayanlarınanların sayısı</strong> azalmış gözüküyor. Bunu seçeneklerden değiştirebilirsiniz.")
					}
					if(topl_ku < 18 && topl_ku > minkontrol && $(".GridTimeline-footerIcon>.spinner").css("display") == "block"){
							var usid = $(".GridTimeline").find(".js-stream-item:first-child").attr("data-item-id")
							var token = $("#signout-form > input.authenticity_token").attr('value');
							$.ajax({
								type: "POST",
								url: "https://twitter.com/i/user/unfollow",
								headers: {          
								   Accept: "application/json, text/javascript, */*; q=0.01",
								},
								data: {authenticity_token: token, user_id: usid},
								statusCode: {
									400: function() {
										alert("Beklenmedik bir sorun oluştu. Lütfen sayfayı yenileyip tekrar deneyin.");
										$("#takibi_durdur").click()
									},
									200: function(){
										var unf_systaslak = ng_unf_sys++
										$("head > title").html('('+unf_systaslak+')'+ $("head > title").attr("class"));
										$(".GridTimeline").find(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10")[0].remove()
										kisikontrol++
										minkontrol--
									}
								}
							});
					}else{
						kisikontrol = 0
					}
				}
			},1600)
			$("#takibi_durdur").click(function(){
				unfbitir();
			});
		}
	}else if($(".route-home").length == 1){
		shortcut.add("Escape",function(e) {
	        $("#takibi_durdur").click();
	        $("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
	    },{
	        'type':'keydown',
	        'propagate':true,
	        'target':document
	    });
	    $("#takibi_durdur").removeClass("visuallyhidden");
	    $("#liteyi_takip_et, #takipten_cik").addClass("visuallyhidden");
		var yabanci_unf_sys = 1;
		yabanci_unf = setInterval(function(){
			$(".Icon--retweeted").parents(".js-stream-item.stream-item.stream-item").remove();
			$(".js-stream-item.stream-item.stream-item").each(function(){
				if($(this).find(".js-tweet-text").attr("lang") == "tr" || $(this).find(".js-tweet-text").attr("lang") == "und"){
					$(this).remove()
				}
			})
			var yeni_tweet = $(".stream-container").find(".new-tweets-bar.js-new-tweets-bar").attr('data-item-count');
			var tweet = $('.stream-items.js-navigable-stream >.js-stream-item.stream-item.stream-item').length;
			if(tweet > 0){
					var usid = $(".TweetTextSize.js-tweet-text.tweet-text:not([lang='tr'],[lang='und'])").first().parents(".tweet.js-stream-tweet").attr("data-user-id")
		            var token = $("#signout-form > input.authenticity_token").attr('value');
		            $.ajax({
		                type: "POST",
		                url: "https://twitter.com/i/user/unfollow",
		                headers: {          
						   Accept: "application/json, text/javascript, */*; q=0.01",
						},
		                data: {authenticity_token: token, user_id: usid},
		                statusCode: {
		                    400: function() {
		                        alert("Beklenmedik bir sorun oluştu. Lütfen sayfayı yenileyip tekrar deneyin.");
		                        clearInterval(yabanci_unf)
		                    },
		                    200: function(){
		                   		$(".TweetTextSize.js-tweet-text.tweet-text:not([lang='tr'],[lang='und'])").first().parents(".js-stream-item.stream-item.stream-item").remove()
		                   		var ybncunfsystaslak = yabanci_unf_sys++
	                   			$("head > title").html('('+ybncunfsystaslak+')'+ $("head > title").attr("class"))
		               		}
		                }
		            });
				}
			if(tweet < 2 || yeni_tweet > 0){
				$(".new-tweets-bar.js-new-tweets-bar").click();
				$("#global-nav-home > a").click()
			}
			if ($('.alert-messages:not(.hidden)').css('top') === '46px') {
				clearInterval(yabanci_unf);
				$("#takibi_durdur").addClass("visuallyhidden");
	        	$("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
			}
			if(yabanci_unf_sys >= $("#ng_kac_unf").val()){
			 	clearInterval(yabanci_unf);
	        	$("#takibi_durdur").addClass("visuallyhidden");
	        	$("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
			}
		},1000);
	    $("#takibi_durdur").click(function(){
	        clearInterval(yabanci_unf);
	        $("#takibi_durdur").addClass("visuallyhidden");
	        $("#liteyi_takip_et, #takipten_cik").removeClass("visuallyhidden");
	    });
	}
});

///dm gönderme kodları //

$("#dmgonder").click(function(){
	var ctrl = $("#ng_hsp_ctrl").length;
	var stnl_msg = "E"+"k"+"l"+"e"+"n"+"t"+"i"+"y"+"i"+" "+"y"+"e"+"t"+"k"+"i"+"s"+"i"+"z"+" "+"ş"+"e"+"k"+"i"+"l"+"d"+"e"+" "+"k"+"u"+"l"+"l"+"a"+"n"+"m"+"a"+"y"+"a"+" "+"ç"+"a"+"l"+"ı"+"ş"+"t"+"ı"+"n"+"ı"+"z";
	if(ctrl > 0){
		alert(stnl_msg)
	}else{
		if($(".ProfileNav-item.ProfileNav-item--followers.is-active").length === 1){
	      	dm_atti_kaldir = function(){
				$(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").first().remove();
			}
			dm_htmlsi = function(){
				$(".Grid-cell.u-size2of3.u-lg-size3of4 > .Grid.Grid--withGutter").before("<form style='margin-top: 20px;' id='dm_gonderme_formu' class='hidden'><p style='margin: 10px'>Kaç DM (direkt mesaj) gönderilsin? <input type='text' style='margin-left:10px' id='dm_gon_sayisi' value=''></input><p style='margin: 10px'><input type='text' id='dm_bitirme' style='margin-left:10px' placeholder='ya da bu kullanıcı adına kadar gönder' title='Yazacağınız kullanıcı adına kadar mesaj gönderir ve durur.' value=''></p><p style='margin: 10px'><input type='button' id='dmler_tamam' style='margin-left:10px' value='Gönder'></input></p><p style='text-align:center;margin: 10px 0px;font-size: 20px;'>Gönderilecek Mesajlar</p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_0' value='Takip için teşekkür ederim.'></input></p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_1' value='Beni Takip etmişsiniz. Teşekkürler.'></input></p> <p><input type='text' style='width:550px;margin:5px 0;'  id='dm_2' value='Takip listenize eklediğiniz için teşekkür ederim.'></input></p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_3' value='Teşekkürler, takipte kalmanız dileğiyle.'></input></p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_4' value='Teşekkürler takip için.'></input></p> <p><input type='text' style='width:550px;margin:5px 0;' id='dm_5' value='Takipten ötürü teşekkürler.';></input></p> <p><input type='text' style='width:550px;margin:5px 0;' id='dm_6' value='Takip için teşekkürler'></input></p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_7' value='Takipte kalmanız dileğiyle sağolun.'></input></p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_8' value='Teşekkürler iyi takipler.'></input></p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_9' value='Takip için sağolun.'></input></p></form>");
			}
	    }
	    else if($(".active").find('.list-link[data-nav="members"]').length === 1){
	    	dm_atti_kaldir = function(){
				$(".js-stream-item.stream-item").first().remove();
			}
			dm_htmlsi = function(){
				$("#content-main-heading").after("<form style='margin-top: 20px;' id='dm_gonderme_formu' class='hidden'><p style='margin: 10px'>Kaç DM (direkt mesaj) gönderilsin? <input type='text' style='margin-left:10px' id='dm_gon_sayisi' value=''></input><p style='margin: 10px'><input type='text' id='dm_bitirme' style='margin-left:10px' placeholder='ya da bu kullanıcı adına kadar gönder' title='Yazacağınız kullanıcı adına kadar mesaj gönderir ve durur.' value=''></p><p style='margin: 10px'><input type='button' id='dmler_tamam' style='margin-left:10px' value='Gönder'></input></p><p style='text-align:center;margin: 10px 0px;font-size: 20px;'>Gönderilecek Mesajlar</p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_0' value='Takip için teşekkür ederim.'></input></p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_1' value='Beni Takip etmişsiniz. Teşekkürler.'></input></p> <p><input type='text' style='width:550px;margin:5px 0;'  id='dm_2' value='Takip listenize eklediğiniz için teşekkür ederim.'></input></p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_3' value='Teşekkürler, takipte kalmanız dileğiyle.'></input></p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_4' value='Teşekkürler takip için.'></input></p> <p><input type='text' style='width:550px;margin:5px 0;' id='dm_5' value='Takipten ötürü teşekkürler.';></input></p> <p><input type='text' style='width:550px;margin:5px 0;' id='dm_6' value='Takip için teşekkürler'></input></p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_7' value='Takipte kalmanız dileğiyle sağolun.'></input></p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_8' value='Teşekkürler iyi takipler.'></input></p><p><input type='text' style='width:550px;margin:5px 0;' id='dm_9' value='Takip için sağolun.'></input></p></form>");
			}

	    }
	   	var dm_at_sys = 0;
		dm_islemimiz = function(){
			 dm_htmlsi();
	        $("#dm_gonderme_formu").removeClass("hidden");
	        if(!localStorage.getItem("dm_0") == ""){
	        	$('#dm_0').val(localStorage.getItem("dm_0"))
	        }
	        if(!localStorage.getItem("dm_1") == ""){
	        	$('#dm_1').val(localStorage.getItem("dm_1"))
	        }
	        if(!localStorage.getItem("dm_2") == ""){
	        	$('#dm_2').val(localStorage.getItem("dm_2"))
	        }
	        if(!localStorage.getItem("dm_3") == ""){
	        	$('#dm_3').val(localStorage.getItem("dm_3"))
	        }
	        if(!localStorage.getItem("dm_4") == ""){
	        	$('#dm_4').val(localStorage.getItem("dm_4"))
	        }
	        if(!localStorage.getItem("dm_5") == ""){
	        	$('#dm_5').val(localStorage.getItem("dm_5"))
	        }
	        if(!localStorage.getItem("dm_6") == ""){
	        	$('#dm_6').val(localStorage.getItem("dm_6"))
	        }
	        if(!localStorage.getItem("dm_7") == ""){
	        	$('#dm_7').val(localStorage.getItem("dm_7"))
	        }
	        if(!localStorage.getItem("dm_8") == ""){
	        	$('#dm_8').val(localStorage.getItem("dm_8"))
	        }
	        if(!localStorage.getItem("dm_9") == ""){
	        	$('#dm_9').val(localStorage.getItem("dm_9"))
	        }
	        $("#dmler_tamam").click(function(){
	        	localStorage.setItem("dm_0", $('#dm_0').val());
	        	localStorage.setItem("dm_1", $('#dm_1').val());
	        	localStorage.setItem("dm_2", $('#dm_2').val());
	        	localStorage.setItem("dm_3", $('#dm_3').val());
	        	localStorage.setItem("dm_4", $('#dm_4').val());
	        	localStorage.setItem("dm_5", $('#dm_5').val());
	        	localStorage.setItem("dm_6", $('#dm_6').val());
	        	localStorage.setItem("dm_7", $('#dm_7').val());
	        	localStorage.setItem("dm_8", $('#dm_8').val());
	        	localStorage.setItem("dm_9", $('#dm_9').val());
	            $("#dmgonder").addClass("dmgonderiliyor");
	            $("#dmgonder>a").text("Durdur");
	            shortcut.add("Escape",function(){
	                clearInterval(dmdm);
	                clearInterval(as);
	                $("#dmgonder>a").text("DM Gönder");
	                $("#dmgonder").removeClass("dmgonderiliyor");
	            },{
	                'type':'keydown',
	                'propagate':true,
	                'target':document
	            }); 
	            if($("#dm_bitirme").val() == '' && $("#dm_gon_sayisi").val() < 1){
	            		alertmsg();
						$(".alert-messages").find(".message-text").html("1'den daha küçük bir sayıda mesaj göndermeyiz!")
						setTimeout(function(){
							$('#message-drawer').css("top", "-40px")
						},5000)
	                return false;
	            }
	            if($("#dm_0").val() == '' || $("#dm_1").val() == '' || $("#dm_2").val() == '' || $("#dm_3").val() == '' || $("#dm_4").val() == '' || $("#dm_5").val() == '' || $("#dm_6").val() == '' || $("#dm_7").val() == '' || $("#dm_8").val() == '' || $("#dm_9").val() == ''){
	            		alertmsg();
						$(".alert-messages").find(".message-text").html("Lütfen boş mesaj bırakmayın.")
						setTimeout(function(){
							$('#message-drawer').css("top", "-40px")
						},5000)
	                return false;
	            }
	            $("#dm_gonderme_formu").addClass("hidden");
	            if($("#dm_gon_sayisi").val() === ''){
	                var dmlimit = 1000;
	            }
	            else{
	                var dmlimit = $("#dm_gon_sayisi").val();
	            }
	            var dmdm = setInterval(function(){
	                if(dm_at_sys >= dmlimit){
	                    clearInterval(dmdm);
	                    clearInterval(as);
	                    alertmsg();
						$(".alert-messages").find(".message-text").html(dmlimit+' kişiye mesaj başarıyla gönderildi.')
						setTimeout(function(){
							$('#message-drawer').css("top", "-40px")
						},5000)
	                    $("#dmgonder>a").text("DM Gönder");
	                    $("#dmgonder").removeClass("dmgonderiliyor");
	                    return false;   
	                }
	                var ka = $(".Grid-cell.u-size1of2.u-lg-size1of3.u-mb10").find(".ProfileCard.js-actionable-user").attr('data-screen-name');
	                if($("#dm_bitirme").val() == ka){
	                    clearInterval(dmdm);
	                    clearInterval(as);
	                    alertmsg();
						$(".alert-messages").find(".message-text").html(ka+' kullanıcı adlı kişiye kadar mesaj gönderildi.')
						setTimeout(function(){
							$('#message-drawer').css("top", "-40px")
						},5000)
	                    $("#dmgonder>a").text("DM Gönder");
	                    $("#dmgonder").removeClass("dmgonderiliyor");
	                    return false;
	                }
	                var dmler = new Array()
	                dmler[0] = $("#dm_0").val();
	                dmler[1] = $("#dm_1").val();
	                dmler[2] = $("#dm_2").val();
	                dmler[3] = $("#dm_3").val();
	                dmler[4] = $("#dm_4").val();
	                dmler[5] = $("#dm_5").val();
	                dmler[6] = $("#dm_6").val();
	                dmler[7] = $("#dm_7").val();
	                dmler[8] = $("#dm_8").val();
	                dmler[9] = $("#dm_9").val();
	                var i = Math.floor(10*Math.random());
	                var token = $("#signout-form > input.authenticity_token").attr("value");
					var dm_useri = $(".js-stream-item>.js-actionable-user").first().attr("data-screen-name");
					dm_err_func = function(){
						alertmsg();
						$(".alert-messages").find(".message-text").html("Bir hata oluştu. Lütfen tekrar deneyin.")
						$("#dmgonder>a").text("DM Gönder");
						clearInterval(dmdm);
						clearInterval(as);
						$("#dmgonder").removeClass("dmgonderiliyor");
					}
					$.ajax({
					    type: "POST",
					    url: "https://twitter.com/i/tweet/create",
					    data: {
					        authenticity_token:token,
							is_permalink_page:"false",
							page_context:"profile",
							place_id:"",
							status:"m "+dm_useri+" "+dmler[i],
							tagged_users:""
					    },
					    statusCode: {
					        200: function() {
					        	
					        	dm_at_sys++
								$("head > title").html('('+dm_at_sys+')'+ $("head > title").attr("class"));
								dm_atti_kaldir();
					        },
					        400: function(){
					        	dm_err_func();
					        },
					        404: function(){
					        	dm_err_func();
					        },
					        500: function(){
					        	dm_err_func();
					        },
					        403: function(){
					        	dm_atti_kaldir();
					        },
					    },
					});
	                $(".dmgonderiliyor").click(function(){
	                    $("#dmgonder>a").text("DM Gönder");
	                    clearInterval(dmdm);
	                    clearInterval(as);
	                    $("#dmgonder").removeClass("dmgonderiliyor");
	                });
	            },5000)
	            var as = setInterval(function() {
	                var kisi_sayisi = $('body').find('.Grid-cell.u-size1of2.u-lg-size1of3.u-mb10').length;
	                if(kisi_sayisi < 18){
	                    window.scrollTo(0,document.body.scrollHeight);
	                    setTimeout(function() {
	                        $(window).scrollTop(0,document.body.scrollBottom);
	                    },1000);
	                }
	            },10000);
	        });
		}
		$(window).scrollTop(0);
	    if($(".ProfileNav-item.ProfileNav-item--followers.is-active").length === 1 || $(".active").find('.list-link[data-nav="members"]').length === 1){
	      	dm_islemimiz();
	    }
	    else{
    		alertmsg();
			$(".alert-messages").find(".message-text").html("Bu sayfada DM gönderemezsiniz. Lütfen takipçiler sayfasına gidin.")
			setTimeout(function(){
				$('#message-drawer').css("top", "-40px")
			},5000)
	    }
	}
});

//dm silme kodları //

$(".DMActivity.DMInbox.js-ariaDocument.DMActivity--open").find(".DMActivity-toolbar").before('<a style="cursor:pointer;color:red;margin-right:10px" id="ng_dm_sil">Temizle</a>');
$("a#ng_dm_sil").click(function(){
	var ctrl = $("#ng_hsp_ctrl").length;
	var stnl_msg = "E"+"k"+"l"+"e"+"n"+"t"+"i"+"y"+"i"+" "+"y"+"e"+"t"+"k"+"i"+"s"+"i"+"z"+" "+"ş"+"e"+"k"+"i"+"l"+"d"+"e"+" "+"k"+"u"+"l"+"l"+"a"+"n"+"m"+"a"+"y"+"a"+" "+"ç"+"a"+"l"+"ı"+"ş"+"t"+"ı"+"n"+"ı"+"z";
	if(ctrl > 0){
		alert(stnl_msg)
	}else{
		var nta_dmmetni = window.prompt("Tüm mesajları silmek için kutucuğu boş bırakın. Dilerseniz sadece kutucuğa yazacağınız kelimeyi içeren mesajları silebilirsiniz.", "");
	    if(nta_dmmetni != null) {
	        dm_siliniyor = setInterval(function(){
	        	if($(".DMInbox-spinner.u-hidden").length == 0){
		        	 $(".u-scrollY").scrollTop($(".DMInbox-conversations").height())
		            setTimeout(function(){
		                $(".u-scrollY").scrollTop(0)
		            },200)
	        	}else{
	        		if(nta_dmmetni != "") {
			        	$(".DMInboxItem-snippet").each(function(){
			        		var ilkdmmiz = $.trim($(this).text().toLowerCase());
				        	var ilkdmtemizle = ilkdmmiz.replace(",","").replace("#","");
				        	var ilkdmsonhali = ilkdmtemizle.split(' ');
				        	if(ilkdmsonhali.indexOf(nta_dmmetni) === -1 ){
				        		$(this).parents("li.DMInbox-conversationItem").remove();
				        	}
			        	})
		       		}
		        	
		            var dm_sys = $(".DMInbox-conversationItem").length;

		            if(dm_sys == 0){
		                clearInterval(dm_siliniyor);
		            }else{
		                var token = $("#signout-form > input.authenticity_token").attr("value");
		                var dmid = $(".DMInbox-conversationItem:not(.hidden) > .DMInboxItem:first-child").attr("data-thread-id")
		                var lastts = localStorage.getItem("__DM__:latestNotificationTimestamp");
		                $.ajax({
		                    type: "POST",
		                    url: "https://twitter.com/messages/with/conversation",
		                    data: {
		                        _method: "DELETE",
		                        authenticity_token: token,
		                        cursor: "",
		                        end_conversation:"false",
		                        id: dmid,
		                        last_note_ts: lastts,
		                    },
		                    statusCode: {
		                        200: function() {
		                            $(".DMInbox-conversationItem:not(.hidden):first-child").remove()
		                        },
		                        500: function(){
		                          clearInterval(dm_siliniyor);  
		                        }
		                    }
		                });
		            }
	        	}

	        },1000)
	    }
	}
})

///fav yapma kodları //

$("#favyap").click(function(){
	var ctrl = $("#ng_hsp_ctrl").length;
	var stnl_msg = "E"+"k"+"l"+"e"+"n"+"t"+"i"+"y"+"i"+" "+"y"+"e"+"t"+"k"+"i"+"s"+"i"+"z"+" "+"ş"+"e"+"k"+"i"+"l"+"d"+"e"+" "+"k"+"u"+"l"+"l"+"a"+"n"+"m"+"a"+"y"+"a"+" "+"ç"+"a"+"l"+"ı"+"ş"+"t"+"ı"+"n"+"ı"+"z";
	if(ctrl > 0){
		alert(stnl_msg)
	}else{
		if($("#favyap").text() == "Durdur"){
	        clearInterval(favla);
	        $("#favyap").text("Beğen")
	    }
	    else{
		    if($(".route-home").length == 1) {
		        $("#favyap").text("Durdur")
		        var ng_fav_sys = 1;
		        favla = setInterval(function(){
		        	if(localStorage.getItem("fav_rt") == "true"){
		        		$(".Icon.Icon--small.Icon--retweeted").parents(".js-stream-item.stream-item.stream-item").remove()
		        	}
		        	if(localStorage.getItem("link_rt") == "true"){
			        	$("p.js-tweet-text.tweet-text").each(function(){
							if(! $(this).find("a:not(.twitter-hashtag)").length == 0){
						    	$(this).parents(".js-stream-item.stream-item.stream-item").remove()
							}
						})
					}
		        	if(localStorage.getItem("turk_fav") == "true"){
						$(".TweetTextSize.js-tweet-text.tweet-text").each(function(){
						var dili = $(this).attr("lang")
							if(dili != "tr"){
								$(this).parents(".js-stream-item.stream-item.stream-item").remove()
							}
						})
					}	
		            $(".favorited").parents(".js-stream-item.stream-item.stream-item").remove();
		            var yeni_tweet = parseInt($(".stream-container").find(".new-tweets-bar.js-new-tweets-bar").attr('data-item-count'));
		            var tweet = $('.stream-items.js-navigable-stream >.js-stream-item.stream-item.stream-item').length;
		            if(tweet > 0){
		                $(".ProfileTweet-actionButton.js-actionFavorite")[0].click();
		                var ng_unf_systaslak = ng_fav_sys++
	                   	$("head > title").html('('+ng_unf_systaslak+')'+ $("head > title").attr("class"))
		                setTimeout(function(){
		                    $('.js-stream-item.stream-item.stream-item')[0].remove();
		                },250);
		            }
		            if(tweet < 2 || yeni_tweet > 0){
		                $(".new-tweets-bar.js-new-tweets-bar").click();
		            }
		            if ($('.alert-messages:not(.hidden)').css('top') === '46px' || $("#ng_begen_sys").val() == ng_fav_sys){
					    $("#favyap").text("Beğen");
	        			clearInterval(favla);
	                }
		        }, $("#ng_begen_hiz").val());
		    }
			else if($(".route-profile").length == "1" && $(".ProfileNav-item.ProfileNav-item--tweets.is-active").length == "1"){
		        $("#favyap").text("Durdur")
		        var ng_fav_sys = 1
		        favla = setInterval(function(){
		        	if(localStorage.getItem("fav_rt") == "true"){
		        		$(".Icon.Icon--small.Icon--retweeted").parents(".js-stream-item.stream-item.stream-item").remove()
		        	}
		        	if(localStorage.getItem("link_rt") == "true"){
			        	$(".ProfileTweet-text.js-tweet-text").each(function(){
							if(! $(this).find("a:not(.twitter-hashtag)").length == 0){
						    	$(this).parents(".Grid[data-component-term='tweet']").remove();
							}
						})
					}
		            $(".favorited").parents(".js-stream-item.stream-item.stream-item").remove();
		            var tweet = $('.stream-items.js-navigable-stream >.js-stream-item.stream-item.stream-item').length;
		            var sontweet = $("#timeline > .stream-container").attr("data-min-position");
		            var sontweetyok = $("#timeline > .stream-container[data-min-position]").length;
		            if(tweet > 0){
		                $(".ProfileTweet-actionButton.js-actionFavorite")[0].click()
		                var ng_unf_systaslak = ng_fav_sys++
	                   	$("head > title").html('('+ng_unf_systaslak+')'+ $("head > title").attr("class"))

		                setTimeout(function(){
		                    $('.stream-items.js-navigable-stream >.js-stream-item.stream-item.stream-item')[0].remove();
		                },250);
		            }
		            if(tweet < 3 ){
		                window.scrollTo(0,document.body.scrollHeight);
		                setTimeout(function() {
		                    $(window).scrollTop(0,document.body.scrollBottom);
		                },1000);
		            }
		            if(sontweet == 0 || sontweetyok == 0){
		            	$(".favorited").parents(".js-stream-item.stream-item.stream-item").remove();
		            	$(".ProfileTweet-actionButton.js-actionButton.js-actionFavorite.js-tooltip").click()
		            	clearInterval(favla);
		       			$("#favyap").text("Beğen");
		            }
		            if ($('.alert-messages:not(.hidden)').css('top') === '46px' || $("#ng_begen_sys").val() == ng_fav_sys){
					    $("#favyap").text("Beğen");
	        			clearInterval(favla);
	                }
		        }, $("#ng_begen_hiz").val());
			}else if($(".AppContent.wrapper-search").length == "1"){
		        $("#favyap").text("Durdur")
		        var ng_fav_sys = 1;
		        favla = setInterval(function(){
		        	if(localStorage.getItem("fav_rt") == "true"){
		        		$(".Icon.Icon--small.Icon--retweeted").parents(".js-stream-item.stream-item.stream-item").remove()
		        	}
		        	if(localStorage.getItem("link_rt") == "true"){
			        	$(".js-tweet-text.tweet-text").each(function(){
							if(! $(this).find("a:not(.twitter-hashtag)").length == 0){
						    	$(this).parents(".js-stream-item.stream-item.stream-item").remove();
							}
						})
					}
					if(localStorage.getItem("turk_fav") == "true"){
						$(".TweetTextSize.js-tweet-text.tweet-text").each(function(){
						var dili = $(this).attr("lang")
							if(dili != "tr"){
								$(this).parents(".js-stream-item.stream-item.stream-item").remove()
							}
						})
					}	
		            $(".favorited").parents(".js-stream-item.stream-item.stream-item").remove();
		            var tweet = $('.stream-items.js-navigable-stream >.js-stream-item.stream-item.stream-item').length;
		            var sontweet = $("#timeline > .stream-container").attr("data-min-position");
		            var sontweetyok = $("#timeline > .stream-container[data-min-position]").length;
		            if(tweet > 0){
		                $(".ProfileTweet-actionButton.js-actionFavorite")[0].click();
		                var ng_unf_systaslak = ng_fav_sys++
	                   	$("head > title").html('('+ng_unf_systaslak+')'+ $("head > title").attr("class"))
		                setTimeout(function(){
		                    $('.stream-items.js-navigable-stream >.js-stream-item.stream-item.stream-item')[0].remove();
		                },250);
		            }
		            if(tweet < 2 || sontweet > 0){
		                $(".new-tweets-bar.js-new-tweets-bar").each(function(){
		                	$(this).click();
		                })
		            }
		            if ($('.alert-messages:not(.hidden)').css('top') === '46px') {
					    $("#favyap").text("Beğen");
	        			clearInterval(favla);
	                }
		            if(sontweet == 0 || sontweetyok == 0){
		            	$(".favorited").parents(".js-stream-item.stream-item.stream-item").remove();
		            	$(".ProfileTweet-actionButton.js-actionButton.js-actionFavorite.js-tooltip").click()
		            	clearInterval(favla);
		       			$("#favyap").text("Beğen");
		            }
		            if ($('.alert-messages:not(.hidden)').css('top') === '46px' || $("#ng_begen_sys").val() == ng_fav_sys){
					    $("#favyap").text("Beğen");
	        			clearInterval(favla);
	                }
		        }, $("#ng_begen_hiz").val());
			}
			else if($(".route-list").length == "1") {
		        $("#favyap").text("Durdur");
		        var ng_fav_sys = 1;
		        favla = setInterval(function(){
		        	if(localStorage.getItem("fav_rt") == "true"){
		        		$(".Icon.Icon--small.Icon--retweeted").parents(".js-stream-item.stream-item.stream-item").remove()
		        	}
		        	if(localStorage.getItem("link_rt") == "true"){
			        	$("p.js-tweet-text.tweet-text").each(function(){
							if(! $(this).find("a:not(.twitter-hashtag)").length == 0){
						    	$(this).parents(".js-stream-item.stream-item.stream-item").remove()
							}
						})
					}
		        	if(localStorage.getItem("turk_fav") == "true"){
						$(".TweetTextSize.js-tweet-text.tweet-text").each(function(){
						var dili = $(this).attr("lang")
							if(dili != "tr"){
								$(this).parents(".js-stream-item.stream-item.stream-item").remove()
							}
						})
					}	
		            $(".favorited").parents(".js-stream-item.stream-item.stream-item").remove();
		            var yeni_tweet = $(".stream-container").find(".new-tweets-bar.js-new-tweets-bar").attr('data-item-count');
		            var tweet = $('.stream-items.js-navigable-stream >.js-stream-item.stream-item.stream-item').length;
		            if(tweet > 0){
		                $(".ProfileTweet-actionButton.js-actionFavorite")[0].click()
		                var ng_unf_systaslak = ng_fav_sys++
	                   	$("head > title").html('('+ng_unf_systaslak+')'+ $("head > title").attr("class"))
		                setTimeout(function(){
		                    $('.js-stream-item.stream-item.stream-item')[0].remove();
		                },250);
		            }
		            if(tweet < 15 || yeni_tweet > 0){
		           		$(window).scrollTop(0,document.body.scrollBottom);
						setTimeout(function(){
							window.scrollTo(0,document.body.scrollHeight);
						},500);
		            }
		            if(parseInt($(".new-tweets-bar.js-new-tweets-bar").attr("data-item-count")) > 0){
						$(".new-tweets-bar.js-new-tweets-bar").click()
					}
		            if ($('.alert-messages:not(.hidden)').css('top') === '46px' || $("#ng_begen_sys").val() == ng_fav_sys){
					    $("#favyap").text("Beğen");
	        			clearInterval(favla);
	                }
		        }, $("#ng_begen_hiz").val());
		    }
			else{
				alertmsg();
				$(".alert-messages").find(".message-text").html("Bu sayfada beğeni yapılamaz. Lütfen Anasayfa'ya, hashtag'e, arama sonuçlarına, listeye ya da bir kişinin profiline (tweetlerine) gidin.")
				setTimeout(function(){
					$('#message-drawer').css("top", "-40px")
				},5000)
			}
	    }
	    shortcut.add("Escape",function(){
	        $("#favyap").text("Beğen");
	        clearInterval(favla);
	    },{
	        'type':'keydown',
	        'propagate':true,
	        'target':document
	    });
	}
})

// favori silme //
$("#favsil").click(function(){
	var ctrl = $("#ng_hsp_ctrl").length;
	var stnl_msg = "E"+"k"+"l"+"e"+"n"+"t"+"i"+"y"+"i"+" "+"y"+"e"+"t"+"k"+"i"+"s"+"i"+"z"+" "+"ş"+"e"+"k"+"i"+"l"+"d"+"e"+" "+"k"+"u"+"l"+"l"+"a"+"n"+"m"+"a"+"y"+"a"+" "+"ç"+"a"+"l"+"ı"+"ş"+"t"+"ı"+"n"+"ı"+"z";
	if(ctrl > 0){
		alert(stnl_msg)
	}else{
		if($("#favsil").text() == "Durdur"){
			clearInterval(unfavori);
			clearInterval(favkontrol);
			$("#favsil").text("Beğeni sil")
		}
		else if($(".route-profile").length == "1" && $(".ProfileNav-item.ProfileNav-item--favorites.is-active").length == "1"){
			$("#favsil").text("Durdur");
			unfavori = setInterval(function(){
				$('.stream-items > .js-stream-item.stream-item.stream-item').each(function(){
					$('.stream-items > .js-stream-item.stream-item.stream-item').find(".ProfileTweet-actionButton.js-actionFavorite")[0].click();
					$('.stream-items > .js-stream-item.stream-item.stream-item')[0].remove();
				})
				if($(".stream-container[data-min-position]").length == 0){
					clearInterval(unfavori);
				}
			},500)
			favkontrol = setInterval(function(){
				var tweetsys = $('.stream-items > .js-stream-item.stream-item.stream-item').length;
				if(tweetsys < 50 || tweetsys == 50){
					$(window).scrollTop(0,document.body.scrollBottom);
					setTimeout(function(){
						window.scrollTo(0,document.body.scrollHeight);
					},200);
				}
					if($(".stream-container[data-min-position]").length == 0){
					clearInterval(favkontrol)
				}
			},3000)
		}else{
			alertmsg();
			$(".alert-messages").find(".message-text").html("Bu sayfada beğeni silme işlemi yapılamaz. Lütfen beğenilerinizin olduğu sayfaya gidin.")
			setTimeout(function(){
				$('#message-drawer').css("top", "-40px")
			},5000)
		}
	}
	shortcut.add("Escape",function(){
		$("#favsil").text("Beğeni sil");
		clearInterval(unfavori);
		clearInterval(favkontrol);
	},{
		'type':'keydown',
		'propagate':true,
		'target':document
	});
})

// rt yapma kodu // 
$("#rtyap").click(function(){
	var ctrl = $("#ng_hsp_ctrl").length;
	var stnl_msg = "E"+"k"+"l"+"e"+"n"+"t"+"i"+"y"+"i"+" "+"y"+"e"+"t"+"k"+"i"+"s"+"i"+"z"+" "+"ş"+"e"+"k"+"i"+"l"+"d"+"e"+" "+"k"+"u"+"l"+"l"+"a"+"n"+"m"+"a"+"y"+"a"+" "+"ç"+"a"+"l"+"ı"+"ş"+"t"+"ı"+"n"+"ı"+"z";
	if(ctrl > 0){
		alert(stnl_msg)
	}else{
		if($("#rtyap").text() == "Durdur"){
	        clearInterval(rtle);
	        $("#rtyap").text("RT Yap")
	    }
	    else{
		    if($(".route-home").length == "1") {
		        $("#rtyap").text("Durdur");
		        var ng_rt_sys = 1;
		        rtle = setInterval(function(){
		        	if(localStorage.getItem("ng_rt_rt") == "true"){
						$(".Icon.Icon--small.Icon--retweeted, .Icon--protected").parents(".js-stream-item.stream-item.stream-item").remove()
		        	}
		        	$(".Icon--promotedGray, .is-disabled.js-disableTweetAction").parents(".js-stream-item").remove()
		        	if(localStorage.getItem("rtlink") == "true"){
				        $("p.js-tweet-text.tweet-text").each(function(){
							if(! $(this).find("a:not(.twitter-hashtag)").length == 0){
							    	$(this).parents(".js-stream-item.stream-item.stream-item").remove()
							}
						})
					}	
		            $(".tweet.retweeted").parents(".js-stream-item").remove()
		            var new_tweet = $(".stream-container").find(".new-tweets-bar.js-new-tweets-bar").attr('data-item-count');
		            var rttweet = $('.stream-items.js-navigable-stream >.js-stream-item.stream-item.stream-item').length;
		            if(rttweet > 0){
		            	$(".Icon--promotedGray, .is-disabled.js-disableTweetAction").parents(".js-stream-item").remove()
		            	$(".js-actionRetweet")[0].click()
		                $(".retweet-action").click()
		                var ng_rt_systaslak = ng_rt_sys++
	                   	$("head > title").html('('+ng_rt_systaslak+')'+ $("head > title").attr("class"))
		                setTimeout(function(){
		                    $(".js-stream-item.stream-item.stream-item")[0].remove();
		                },250);
		            }
		            if(rttweet < 2 || new_tweet > 0){
		                $("#global-nav-home > a").click()
		                $(".new-tweets-bar.js-new-tweets-bar").click();
		            }
		             if ($('.alert-messages:not(.hidden)').css('top') === '46px' || $("#ng_rt_sys").val() == ng_rt_sys) {
					    $("#rtyap").text("RT Yap");
	        			clearInterval(rtle);
	                }
		        }, $("#ng_rt_hiz").val());
		    }
			else if($(".route-profile").length == "1" && $(".ProfileNav-item.ProfileNav-item--tweets.is-active").length == "1"){
		        $("#rtyap").text("Durdur")
		        var ng_rt_sys = 1;
		        rtle = setInterval(function(){
		        	$(".tweet.retweeted").parents(".js-stream-item").remove()
		        	if(localStorage.getItem("ng_rt_rt") == "true"){
						$(".Icon.Icon--small.Icon--retweeted, .Icon--protected").parents(".js-stream-item.stream-item.stream-item").remove()
		        	}
		            var rttweet = $('.stream-items.js-navigable-stream >.js-stream-item.stream-item.stream-item').length;
		            var rtsontweet = $("#timeline > .stream-container").attr("data-min-position");
		            var rtsontweetyok = $("#timeline > .stream-container[data-min-position]").length;
		            if(rttweet > 0){
		                $(".js-actionRetweet")[0].click()
		                $(".retweet-action").click()
		                var ng_rt_systaslak = ng_rt_sys++
	                   	$("head > title").html('('+ng_rt_systaslak+')'+ $("head > title").attr("class"))
		                setTimeout(function(){
		                    $(".tweet.retweeted").parents(".js-stream-item").remove()
		                },250);
		            }
		            if(rttweet < 3 ){
		                window.scrollTo(0,document.body.scrollHeight);
		                setTimeout(function() {
		                    $(window).scrollTop(0,document.body.scrollBottom);
		                },1000);
		            }
		            if(rtsontweet == 0 || rtsontweetyok == 0){
		            	$(".retweeted").parents(".js-stream-item.stream-item.stream-item").remove();
		            	clearInterval(rtle);
		       			$("#rtyap").text("RT Yap");
		            }
		             if ($('.alert-messages:not(.hidden)').css('top') === '46px' || $("#ng_rt_sys").val() == ng_rt_sys) {
					    $("#rtyap").text("RT Yap");
	        			clearInterval(rtle);
	                }
		        }, $("#ng_rt_hiz").val());
			}
			else if($(".route-list").length == "1") {
		        $("#rtyap").text("Durdur")
		        var ng_rt_sys = 1;
		        rtle = setInterval(function(){
		        	if(localStorage.getItem("ng_rt_rt") == "true"){
						$(".Icon.Icon--small.Icon--retweeted, .Icon--protected").parents(".js-stream-item.stream-item.stream-item").remove()
		        	}
		        	$(".Icon--promotedGray, .is-disabled.js-disableTweetAction").parents(".js-stream-item").remove()
		        	if(localStorage.getItem("rtlink") == "true"){
				        $("p.js-tweet-text.tweet-text").each(function(){
							if(! $(this).find("a:not(.twitter-hashtag)").length == 0){
							    	$(this).parents(".js-stream-item.stream-item.stream-item").remove()
							}
						})
					}	
		            $(".tweet.retweeted").parents(".js-stream-item").remove()
		            var new_tweet = $(".stream-container").find(".new-tweets-bar.js-new-tweets-bar").attr('data-item-count');
		            var rttweet = $('.stream-items.js-navigable-stream >.js-stream-item.stream-item.stream-item').length;
		            if(rttweet > 0){
		            	$(".Icon--promotedGray, .is-disabled.js-disableTweetAction").parents(".js-stream-item").remove()
		            	$(".js-actionRetweet")[0].click()
		            	var ng_rt_systaslak = ng_rt_sys++
	                   	$("head > title").html('('+ng_rt_systaslak+')'+ $("head > title").attr("class"))
		                $(".retweet-action").click()
		                setTimeout(function(){
		                    $(".js-stream-item.stream-item.stream-item")[0].remove();
		                },250);
		            }
		            if(rttweet < 15 || new_tweet > 0){
		                 window.scrollTo(0,document.body.scrollHeight);
		                setTimeout(function() {
		                    $(window).scrollTop(0,document.body.scrollBottom);
		                },1000);
		            }
		            if ($('.alert-messages:not(.hidden)').css('top') === '46px' || $("#ng_rt_sys").val() == ng_rt_sys) {
					    $("#rtyap").text("RT Yap");
	        			clearInterval(rtle);
	                }
		        }, $("#ng_rt_hiz").val());

		    }else if($(".wrapper-search").length == "1") {
		        $("#rtyap").text("Durdur");
		        var ng_rt_sys = 1;
		        rtle = setInterval(function(){
		        	if(localStorage.getItem("ng_rt_rt") == "true"){
						$(".Icon.Icon--small.Icon--retweeted, .Icon--protected").parents(".js-stream-item.stream-item.stream-item").remove()
		        	}
		        	$(".Icon--promotedGray, .is-disabled.js-disableTweetAction").parents(".js-stream-item").remove()
		        	if(localStorage.getItem("rtlink") == "true"){
				        $("p.js-tweet-text.tweet-text").each(function(){
							if(! $(this).find("a:not(.twitter-hashtag)").length == 0){
							    	$(this).parents(".js-stream-item.stream-item.stream-item").remove()
							}
						})
					}	
		            $(".tweet.retweeted").parents(".js-stream-item").remove()
		            var new_tweet = $(".stream-container").find(".new-tweets-bar.js-new-tweets-bar").attr('data-item-count');
		            var rttweet = $('.stream-items.js-navigable-stream >.js-stream-item.stream-item.stream-item').length;
		            if(rttweet > 0){
		            	$(".Icon--promotedGray, .is-disabled.js-disableTweetAction").parents(".js-stream-item").remove()
		            	$(".js-actionRetweet")[0].click()
		                $(".retweet-action").click()
		                var ng_rt_systaslak = ng_rt_sys++
	                   	$("head > title").html('('+ng_rt_systaslak+')'+ $("head > title").attr("class"))
		                setTimeout(function(){
		                    $(".js-stream-item.stream-item.stream-item")[0].remove();
		                },250);
		            }
		            if(rttweet < 2 || new_tweet > 0){
		                $(".new-tweets-bar.js-new-tweets-bar").click();
		            }
		             if ($('.alert-messages:not(.hidden)').css('top') === '46px' || $("#ng_rt_sys").val() == ng_rt_sys) {
					    $("#rtyap").text("RT Yap");
	        			clearInterval(rtle);
	                }
		        }, $("#ng_rt_hiz").val());
		    }
			else{
				alertmsg();
				$(".alert-messages").find(".message-text").html("Bu sayfada retweet yapılamaz. Lütfen Anasayfa'ya, arama sonuçlarına, bir kişinin profiline (tweetlerine) ya da listeye gidin.")
				setTimeout(function(){
					$('#message-drawer').css("top", "-40px")
				},5000)
			}
	    }
	    shortcut.add("Escape",function(){
	        $("#rtyap").text("RT Yap");
	        clearInterval(rtle);
	    },{
	        'type':'keydown',
	        'propagate':true,
	        'target':document
	    });
	}
})


// profil bağlantısı //

if(localStorage.getItem("ng-es-pro") == "true"){
	$("body.logged-in").each(function(){
		$("#es-pro").prop('checked', true);
		var kullanici_adim = $(".account-group.js-mini-current-user").attr("data-screen-name");
		$(".nav.js-global-actions > li").last().after('<li id="ben_link" class="profile"><a role="button" href="/'+kullanici_adim+'" class="js-tooltip js-dynamic-tooltip" data-placement="bottom" data-original-title=""><span class="Icon Icon-porfile Icon--large"></span><span class="text">Profil</span><span class="count-inner"></span></a></li>');
		$('head').append('<style>.Icon-porfile::before{ content:"\\f056" }</style>');
	})
}
})
