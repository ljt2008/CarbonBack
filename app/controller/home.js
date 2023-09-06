'use strict'

const Controller = require('egg').Controller
/**
 * @controller home模块
 */
class HomeController extends Controller {
    /**
     * @summary 拉取home的categoryList
     * @description 注册用户信息
     * @router get /v1/home/categoryList
     * @request body RequestRegister
     */
    async categoryList() {
        const { service, helper, request, validate, rule } = this.ctx
        const categoryList = [
            {
                id: 1,
                name: '恋爱',
                to: '/tag/32'
            },
            {
                id: 2,
                name: '古风',
                to: '/tag/31'
            },
            {
                id: 3,
                name: '穿越',
                to: '/tag/41'
            },
            {
                id: 4,
                name: '大女主',
                to: '/tag/42'
            },
            {
                id: 5,
                name: '青春',
                to: '/tag/92'
            },
            {
                id: 6,
                name: '非人类',
                to: '/tag/43'
            },
            {
                id: 7,
                name: '奇幻',
                to: '/tag/83'
            },
            {
                id: 8,
                name: '都市',
                to: '/tag/81'
            },
            {
                id: 9,
                name: '总裁',
                to: '/tag/11'
            },
            {
                id: 10,
                name: '强剧情',
                to: '/tag/13'
            },
            {
                id: 11,
                name: '玄幻',
                to: '/tag/16'
            },
            {
                id: 12,
                name: '系统',
                to: '/tag/54'
            },
            {
                id: 13,
                name: '悬疑',
                to: '/tag/46'
            },
            {
                id: 14,
                name: '末世',
                to: '/tag/76'
            },
            {
                id: 15,
                name: '全部',
                to: '/tag/0'
            }
        ]
        helper.success(categoryList, '拉取成功')
    }
    /**
    * @summary 拉取home的editorsChoice
    * @description 注册用户信息
    * @router get /v1/home/editorsChoice
    * @request body RequestRegister
    */
    async editorsChoice() {
        const { helper } = this.ctx
        const editorsChoice = [
            {
                id: 1,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/220926/Sxis8cdUn.webp-t.w207.webp.h',
                author: '囍千千（原著）+五彩石漫画社',
                laud: '9.9万',
                title: '快穿女配冷静点',
                fenlei: '女生1',
                to: '/topic/123'
            },
            {
                id: 2,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/230218/6GSsKyh4X.webp-t.w207.webp.h',
                author: '囍千千（原著）+五彩石漫画社',
                laud: '7723',
                title: '别惹小狗',
                fenlei: '女生2',
                to: '/topic/123'
            },
            {
                id: 3,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/230223/0h0l0NmBj.webp-t.w207.webp.h',
                author: '寻梦魂',
                laud: '99万+',
                title: '鸩由川',
                fenlei: '女生3',
                to: '/topic/123'
            },
            {
                id: 4,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/211207/ozpNJqXDl.webp-t.w207.webp.h',
                author: '画漫画的阿达',
                laud: '9万',
                title: '和老妈的日常',
                fenlei: '女生4',
                to: '/topic/123'
            },
            {
                id: 5,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/201106/HbTpNxGzE.webp-t.w180.webp.h',
                author: '夜枭',
                laud: '99万+',
                title: '魔皇大管家',
                fenlei: '奇幻古风',
                to: '/topic/123'
            },
            {
                id: 6,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/200414/gwCcn5slh.webp-t.w180.webp.h',
                author: '火力熊猫',
                laud: '99万+',
                title: '恰似寒光遇骄阳',
                fenlei: '恋爱',
                to: '/topic/123'
            }
        ]
        helper.success(editorsChoice, '拉取成功')
    }
    /**
 * @summary 拉取home的news
 * @description 注册用户信息
 * @router get /v1/home/news
 * @request body RequestRegister
 */
    async news() {
        const { helper } = this.ctx
        const editorsChoice = [
            {
                id: 7,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/200414/gwCcn5slh.webp-t.w180.webp.h',
                author: '火力熊猫',
                laud: '99万+',
                title: '恰似寒光遇骄阳',
                fenlei: '恋爱',
                to: '/topic/123'
            },
            {
                id: 8,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/230712/t8LJ2m7pR.webp-t.w207.webp.h',
                author: '清一色Qing',
                laud: '99万+',
                title: '只有你能触碰我',
                fenlei: '都市',
                to: '/topic/123'
            },
            {
                id: 9,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/230729/rU3jP5jHe.webp-t.w207.webp.h',
                author: '塔那·长发',
                laud: '99万+',
                title: '柃木神月',
                fenlei: '恋爱',
                to: '/topic/123'
            },
            {
                id: 10,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/230712/EcK3IhgL9.webp-t.w207.webp.h',
                author: '于wy',
                laud: '99万+',
                title: '小魔传奇',
                fenlei: '少年',
                to: '/topic/123'
            },
            {
                id: 11,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/230627/mDLppkqav.webp-t.w207.webp.h',
                author: 'KK世界居民ZzrH32',
                laud: '99万+',
                title: '汉末英杰志',
                fenlei: '奇幻',
                to: '/topic/123'
            },
            {
                id: 12,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/230716/zduG1pzCq.webp-t.w207.webp.h',
                author: 'XX老混沌了',
                laud: '99万+',
                title: '梦梦梦梦梦人!',
                fenlei: '少年',
                to: '/topic/123'
            }
        ]
        helper.success(editorsChoice, '拉取成功')
    }
    /**
 * @summary 拉取home的hots
 * @description 注册用户信息
 * @router get /v1/home/hots
 * @request body RequestRegister
 */
    async hots() {
        const { helper } = this.ctx
        const hots = [
            {
                id: 1,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/230209/wYPGM3UUB.webp-w750.jpg',
                author: '猫不错_',
                laud: '99万+',
                title: '五只猫',
                fenlei: '治愈',
                to: '/topic/123'
            },
            {
                id: 2,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/211102/H34H1uj2j.webp-w750.jpg',
                author: '墨小鱼漫画工作室',
                laud: '99万+',
                title: '灵墟',
                fenlei: '古风',
                to: '/topic/123'
            },
            {
                id: 3,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/210107/nteWiXbrm.webp-w750.jpg',
                author: '塔那·长发',
                laud: '99万+',
                title: '和老妈的日常',
                fenlei: '搞笑',
                to: '/topic/123'
            },
            {
                id: 4,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/230223/WQrNx95iE.webp-w750.jpg',
                author: '于wy',
                laud: '99万+',
                title: '寻梦魂',
                fenlei: '剧情',
                to: '/topic/123'
            },
            {
                id: 5,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/230218/IkesVPuQW.webp-w750.jpg',
                author: 'KK世界居民ZzrH32',
                laud: '99万+',
                title: '别惹小狗',
                fenlei: '萌系',
                to: '/topic/123'
            },
            {
                id: 6,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/220926/Rs94nKoSY.webp-w750.jpg',
                author: '有泮工作室',
                laud: '99万+',
                title: '一窝凤凰!',
                fenlei: '少年',
                to: '/topic/123'
            },
            {
                id: 7,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/220113/xtHZsqFTm.webp-w750.jpg',
                author: '獸獸',
                laud: '99万+',
                title: '黑无常!',
                fenlei: '投稿',
                to: '/topic/123'
            },
            {
                id: 8,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/210126/10hdbOqHZ.webp-w750.jpg',
                author: '我被自己撩走',
                laud: '99万+',
                title: 'Mean girls茶裡茶氣!',
                fenlei: '投稿',
                to: '/topic/123'
            },
            {
                id: 9,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/220217/UlQ6WvZB7.webp-w750.jpg',
                author: '老晨不吃鱼',
                laud: '99万+',
                title: '日常高校',
                fenlei: '原创',
                to: '/topic/123'
            },
            {
                id: 10,
                imgsrc:
                    'https://tn1-f2.kkmh.com/image/221201/tPRvVyhlP.webp-w750.jpg',
                author: '小壶',
                laud: '99万+',
                title: '微尘',
                fenlei: '唯美',
                to: '/topic/123'
            }
        ]
        helper.success(hots, '拉取成功')
    }
}
module.exports = HomeController
