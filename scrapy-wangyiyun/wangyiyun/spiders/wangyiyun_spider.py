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
    headers = {
        'Referer': 'https://music.163.com/',
        'Cookie': '_iuqxldmzr_=32; _ntes_nnid=f6dc20e095aaa7f026d6f37fac36c564,1533117286036; _ntes_nuid=f6dc20e095aaa7f026d6f37fac36c564; __utmc=94650624; WM_TID=pexze5d%2BBKTh8wXdj5JLyompccR8Km5o; abt=36; __utma=94650624.1947639297.1533117286.1534085013.1534316112.6; starttime=; nts_mail_user=venomhmn@163.com:-1:1; df=mail163_letter; playliststatus=visible; mail_psc_fingerprint=57be86e3b95d0e39b552bdd933628e29; usertrack=CrH4OluDXiitvAKjAwRvAg==; MUSIC_EMAIL_U=79201f38dddec9bf2ef7a80e6d083962b2305f41ee784fb5efb201858933ac8ffe62401b5362504e593381e2adca859d16749ae4e13b90a5bf122d59fa1ed6a2; P_INFO=venomhmn@163.com|1534947887|2|mail163|00&99|zhj&1534852821&mail163#zhj&330100#10#0#0|&0|mail163|venomhmn@163.com; WM_NI=R8p5lHpY7ieCegVTY1o%2F%2FtcUWP%2B9Ierm7f0no%2B2VM57b4OVUVPSP1aBg6%2BfHQPNhtjhI%2BazCkfG%2BZYddhE4YlanYVwipaeZBbybatFL%2B%2F0sg6ZcOTalcaIHhOsP1l%2FmETmI%3D; WM_NIKE=9ca17ae2e6ffcda170e2e6eed1fc63fc93a8a2d773ba928ea3c55e979f9e85bc39b7a98eccf56481ac8cb3d52af0fea7c3b92a92e8c0d6ef44b487f98ae849a7b99ab5dc3badf1e195e25f9590e5dacc6fb2b3f987b366adf5feb7d03ff5befcb0d55f96909db1b46b82b9facce54493908289f762ac97e582f949a9ba89ccd953a8bca8a6b753b0bfa2bad57dabb0af86d94aa2a7ae82f74e90f5e1d1f26df686adb0d76bb0bdafaacb648dada0d2ef25af9b9c8ecc37e2a3; __remember_me=true; JSESSIONID-WYYY=TuaPAcrzIdjvX75MRxZgiDMn29jNo4G122qQ3DYRf3F%2FNi4Mq2pV8s5GAc7a1NY3%5CY0i3ih%2BP5vD%2FxmMclqh8OnltHE84%2Bi%5CXa4E%5Cu7u2QveOcUPrHAn6OIrAy5v14tiRovMCu4YTrhFrxisxmKz9ak5ptdEP0tzf4W6f3kcMFEGuPwo%3A1562854900305; MUSIC_U=1e4598e666d77ee82ef52d631f08afa2b39e96280ea3b3550e3b99dbf617777179fb01c7c5d7d12d63f73d19537ad3db41049cea1c6bb9b6; __csrf=3a245ebfa9cdfc9018da0f2a1fc325e6'
    }

    def start_requests(self):
        return self.get_music()

    # 加载歌曲列表
    def get_music(self):
        # 设置固定的返回值
        response = '<ul class="f-hide"><li><a href="/song?id=1336856864">形容</a></li><li><a href="/song?id=519136840">只只</a></li><li><a href="/song?id=546723152">拥抱</a></li><li><a href="/song?id=1310137029">着迷</a></li><li><a href="/song?id=1336871144">宝贝</a></li><li><a href="/song?id=287035">遇见</a></li><li><a href="/song?id=421423808">虚拟</a></li><li><a href="/song?id=507815173">觅香</a></li><li><a href="/song?id=26075548">初爱</a></li><li><a href="/song?id=1311319058">东西</a></li><li><a href="/song?id=470712349">想和你</a></li><li><a href="/song?id=1354629987">去见你</a></li><li><a href="/song?id=375328">小情歌</a></li><li><a href="/song?id=27694142">他和她</a></li><li><a href="/song?id=85571">我们俩</a></li><li><a href="/song?id=569214126">可能否</a></li><li><a href="/song?id=557584888">往后余生</a></li><li><a href="/song?id=202373">南方姑娘</a></li><li><a href="/song?id=186453">春夏秋冬</a></li><li><a href="/song?id=26348068">天天想你</a></li><li><a href="/song?id=1365898499">失眠飞行</a></li><li><a href="/song?id=1356499052">你的姑娘</a></li><li><a href="/song?id=376417">一生有你</a></li><li><a href="/song?id=417596830">美好事物</a></li><li><a href="/song?id=38576323">春风十里</a></li><li><a href="/song?id=554241732">我的名字</a></li><li><a href="/song?id=208902">红色高跟鞋</a></li><li><a href="/song?id=541687281">慢慢喜欢你</a></li><li><a href="/song?id=25850223">我只在乎你</a></li><li><a href="/song?id=110026">我愿人长久</a></li><li><a href="/song?id=33071053">为了遇见你</a></li><li><a href="/song?id=109998">贝加尔湖畔</a></li><li><a href="/song?id=185700">思念是一种病</a></li><li><a href="/song?id=1357999885">请你吃个冰激凌</a></li><li><a href="/song?id=427016671">爱你就像爱生命</a></li><li><a href="/song?id=490595991">星期三或礼拜三</a></li><li><a href="/song?id=1354477597">像风走了八千里</a></li><li><a href="/song?id=1353194608">今天也想见到你</a></li><li><a href="/song?id=375168">无与伦比的美丽</a></li><li><a href="/song?id=506092654">我看着你的时候</a></li><li><a href="/song?id=479219330">我一定会爱上你</a></li><li><a href="/song?id=1344897943">你是人间四月天</a></li><li><a href="/song?id=374597">你被写在我的歌里</a></li><li><a href="/song?id=35403523">陪你度过漫长岁月</a></li><li><a href="/song?id=5239564">你是我心内的一首歌</a></li><li><a href="/song?id=439122550">愿长夜里有人陪你说话</a></li><li><a href="/song?id=520482501">像暗杀似的绕到背后突然拥抱你</a></li></ul>'
        self.song_list = re.findall(r'<li><a href="/song\?id=(.+?)">', response, re.S|re.M)
        return self.get_comment()
        
    # 加载评论列表
    def get_comment(self):     
        for song_id in self.song_list:
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
            comment_item['avatar'] = i['user']['avatarUrl']
            # comment_item['music'] = '我是歌曲名，但是我还不知道我叫什么'
            yield comment_item
