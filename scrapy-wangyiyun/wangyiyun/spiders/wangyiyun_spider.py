# -*- coding: utf-8 -*-
import scrapy
import json
import re
from wangyiyun.items import WangyiyunItem

class WangyiyunSpiderSpider(scrapy.Spider):
    name = 'wangyiyun_spider'
    allowed_domains = ['music.163.com']
    csrf_token = '3a245ebfa9cdfc9018da0f2a1fc325e6'
    params = 'vkNQQ+LDKjUnHFUYZ+xV8AqvASj5HaQreGADk0D8UP8LCyzzeTalKOeaLc6y5OBn5NVxJrDPmtOX3nkChbFRkn7gNeaiFtieGwP2JVcWW2IpWdmnYRjtpLOspHD2CkxHccpczJNy1ystTmv0FWAaBNXqmwjwuHG1ETnRSzVj8BLKntzjhhMO1bQ6+Dcuv7WX6hBAsgK/v/xlPWpEdvbxMJI/5tkP9/hEMRBW3YoYKG0VLewq2nkMjbAcKN+bKcGRF1Z9+aCH9mBBoB5y9fUjYsUA2qxLesGtwnk9luZiZ7ibGPxj12b5QAPTrbuY+Y8LowpMaQSBaDB0pJnTnCgzFL7hF1Imgjn3zQ0xQy4vQz2+cgQjhAp4Wle0UG2sdD6f'
    encSecKey = '02db96a1f368c1991e55f524dacea421127e2c2823a4bbd8d486f4623774f5b22fe3dd335392c3de530137f88035db3e107a1c6355b77e394c1514a88c7e10f922aede4806c2e57309d330b9f972146bba67fdabdfeaea3a6c9ca8b0b1ccb538c0ed1ba3df787e302ba91956b0ce61cd4828c58b987e97eeeacd0eef75a65b31'
    song_list = []
    song_name_current = ''
    headers = {
        'Referer': 'https://music.163.com/',
        'Cookie': '_iuqxldmzr_=32; _ntes_nnid=f6dc20e095aaa7f026d6f37fac36c564,1533117286036; _ntes_nuid=f6dc20e095aaa7f026d6f37fac36c564; __utmc=94650624; WM_TID=pexze5d%2BBKTh8wXdj5JLyompccR8Km5o; abt=36; __utma=94650624.1947639297.1533117286.1534085013.1534316112.6; starttime=; nts_mail_user=venomhmn@163.com:-1:1; df=mail163_letter; playliststatus=visible; mail_psc_fingerprint=57be86e3b95d0e39b552bdd933628e29; usertrack=CrH4OluDXiitvAKjAwRvAg==; MUSIC_EMAIL_U=79201f38dddec9bf2ef7a80e6d083962b2305f41ee784fb5efb201858933ac8ffe62401b5362504e593381e2adca859d16749ae4e13b90a5bf122d59fa1ed6a2; P_INFO=venomhmn@163.com|1534947887|2|mail163|00&99|zhj&1534852821&mail163#zhj&330100#10#0#0|&0|mail163|venomhmn@163.com; WM_NI=R8p5lHpY7ieCegVTY1o%2F%2FtcUWP%2B9Ierm7f0no%2B2VM57b4OVUVPSP1aBg6%2BfHQPNhtjhI%2BazCkfG%2BZYddhE4YlanYVwipaeZBbybatFL%2B%2F0sg6ZcOTalcaIHhOsP1l%2FmETmI%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eed1fc63fc93a8a2d773ba928ea3c55e979f9e85bc39b7a98eccf56481ac8cb3d52af0fea7c3b92a92e8c0d6ef44b487f98ae849a7b99ab5dc3badf1e195e25f9590e5dacc6fb2b3f987b366adf5feb7d03ff5befcb0d55f96909db1b46b82b9facce54493908289f762ac97e582f949a9ba89ccd953a8bca8a6b753b0bfa2bad57dabb0af86d94aa2a7ae82f74e90f5e1d1f26df686adb0d76bb0bdafaacb648dada0d2ef25af9b9c8ecc37e2a3; __remember_me=true; JSESSIONID-WYYY=TuaPAcrzIdjvX75MRxZgiDMn29jNo4G122qQ3DYRf3F%2FNi4Mq2pV8s5GAc7a1NY3%5CY0i3ih%2BP5vD%2FxmMclqh8OnltHE84%2Bi%5CXa4E%5Cu7u2QveOcUPrHAn6OIrAy5v14tiRovMCu4YTrhFrxisxmKz9ak5ptdEP0tzf4W6f3kcMFEGuPwo%3A1562854900305; MUSIC_U=1e4598e666d77ee82ef52d631f08afa2b39e96280ea3b3550e3b99dbf617777179fb01c7c5d7d12d63f73d19537ad3db41049cea1c6bb9b6; __csrf=3a245ebfa9cdfc9018da0f2a1fc325e6'
    }

    def start_requests(self):
        return self.get_music()

    # 加载歌曲列表
    def get_music(self):
        # 设置固定的返回值
        response = '<ul class="f-hide"><li><a href="/song?id=417833754">画风</a></li><li><a href="/song?id=1325897863">缘起 (前世今生版)</a></li><li><a href="/song?id=863066106">愿我</a></li><li><a href="/song?id=428095913">江湖 </a></li><li><a href="/song?id=400875065">灵主不悔</a></li><li><a href="/song?id=1318023218">从别后（Cover：流浪的蛙蛙）</a></li><li><a href="/song?id=405253647">夕山谣</a></li><li><a href="/song?id=29498099">扶桑树</a></li><li><a href="/song?id=539450075">《不羡明月知》——魔道祖师魏无羡原创同人歌</a></li><li><a href="/song?id=414118616">天行九歌</a></li><li><a href="/song?id=439142028">三生</a></li><li><a href="/song?id=512308908">人世终白首-《魔道祖师》忘羡同人曲</a></li><li><a href="/song?id=1354293519">寄</a></li><li><a href="/song?id=467164564">归云乡</a></li><li><a href="/song?id=462686460">此彼绘卷</a></li><li><a href="/song?id=28643048">梦太晚</a></li><li><a href="/song?id=462688968">与君说</a></li><li><a href="/song?id=453397729">北冥有鱼</a></li><li><a href="/song?id=4873065">月光</a></li><li><a href="/song?id=462686463">铃舟</a></li><li><a href="/song?id=34248829">阑珊</a></li><li><a href="/song?id=35617509">长歌行</a></li><li><a href="/song?id=439139027">御心</a></li><li><a href="/song?id=32303044">不良人</a></li></ul>'
        self.song_list = re.findall(r'<li><a href="/song\?id=(.+?)">(.+?)</a></li>', response, re.S|re.M)
        for id,name in self.song_list:
            print(id,name)
        return self.get_comment()
        
    # 加载评论列表
    def get_comment(self):     
        for song_id,song_name in self.song_list:
            self.song_name_current = song_name
            url = 'https://music.163.com/weapi/v1/resource/comments/R_SO_4_' + song_id + '?csrf_token=' + self.csrf_token
            yield scrapy.FormRequest(
                url = url,
                headers = self.headers,
                formdata = {
                    "params": self.params,
                    "encSecKey": self.encSecKey
                },
                callback = self.parse_comment)
        
    # 解析评论
    def parse_comment(self, response):
        response = response.body
        response_json = json.loads(response.decode("utf-8"))
        hotComments = response_json['hotComments']
        for i in hotComments:
            comment_item = WangyiyunItem()
            comment_item['comment'] = i['content']
            comment_item['like'] = i['likedCount']
            comment_item['name'] = i['user']['nickname']
            comment_item['music'] = self.song_name_current
            yield comment_item
