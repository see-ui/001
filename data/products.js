const productsData = [
    {
        "id": 1,
        "titleEn": "Labubu Keychain",
        "titleCn": "labubu-p1",
        "price": "$ 0.76",
        "category": "keychain",
        "badge": "Hot<br>热卖",
        "alt": "树脂"
    },
    {
        "id": 2,
        "titleEn": "Flocked Keychain",
        "titleCn": "labubu-p2",
        "price": "$ 0.94",
        "category": "keychain",
        "badge": "",
        "alt": "植绒钥匙扣"
    },
    {
        "id": 3,
        "titleEn": "Gradient Keychain",
        "titleCn": "labubu-p3",
        "price": "$ 0.76",
        "category": "keychain",
        "badge": "",
        "alt": "渐变"
    },
    {
        "id": 4,
        "titleEn": "Leather Keychain",
        "titleCn": "labubu-p4",
        "price": "$ 2.52",
        "category": "keychain",
        "badge": "",
        "alt": "皮质钥匙扣"
    },
    {
        "id": 5,
        "titleEn": "Sanrio Keychain",
        "titleCn": "Sanrio-p5",
        "price": "$ 2.52",
        "category": "keychain",
        "badge": "",
        "alt": "三丽欧"
    },
    {
        "id": 6,
        "titleEn": "Sanrio Keychain",
        "titleCn": "Sanrio-p6",
        "price": "$ 1.13",
        "category": "keychain",
        "badge": "",
        "alt": "三丽欧"
    },
    {
        "id": 7,
        "titleEn": "Sanrio Keychain",
        "titleCn": "Sanrio-p7",
        "price": "$ 0.96",
        "category": "keychain",
        "badge": "",
        "alt": "三丽欧"
    },
    {
        "id": 8,
        "titleEn": "Sanrio Keychain",
        "titleCn": "Sanrio-p8",
        "price": "$ 1.17",
        "category": "keychain",
        "badge": "",
        "alt": "三丽欧"
    },
    {
        "id": 9,
        "titleEn": "Pandora Jewelry",
        "titleCn": "Pandora-p9",
        "price": "$ 12.4",
        "category": "jewelry",
        "badge": "",
        "alt": "潘多拉"
    },
    {
        "id": 11,
        "titleEn": "LV Jewelry",
        "titleCn": "Lv-p10",
        "price": "$ 28.92",
        "category": "jewelry",
        "badge": "",
        "alt": "lv"
    },
    {
        "id": 10,
        "titleEn": "Rolex Watch",
        "titleCn": "Rolex-p11",
        "price": "$ 302.54",
        "category": "others",
        "badge": "",
        "alt": "劳力士"
    },
    {
        "id": 12,
        "titleEn": "LV Jewelry",
        "titleCn": "Lv-p12",
        "price": "$ 25.95",
        "category": "jewelry",
        "badge": "",
        "alt": "lv"
    },
    {
        "id": 13,
        "titleEn": "Hermes Jewelry",
        "titleCn": "Hermes-p13",
        "price": "$ 30.4",
        "category": "jewelry",
        "badge": "",
        "alt": "Hermes"
    },
    {
        "id": 14,
        "titleEn": "Hermes Jewelry",
        "titleCn": "Hermes-p14",
        "price": "$ 30.4",
        "category": "jewelry",
        "badge": "",
        "alt": "Hermes"
    },
    {
        "id": 15,
        "titleEn": "Chrome Hearts Jewelry",
        "titleCn": "Chrome Hearts-p15",
        "price": "$ 33.37",
        "category": "jewelry",
        "badge": "",
        "alt": "Chrome Hearts"
    },
    {
        "id": 16,
        "titleEn": "Naruto",
        "titleCn": "火影-p16",
        "price": "$ 0.44",
        "category": "keychain",
        "badge": "",
        "alt": "亚克力",
        "imageExt": ".webp"
    },
    {
        "id": 17,
        "titleEn": "Dragon Ball manga",
        "titleCn": "七龙珠-p17",
        "price": "$ 1.48",
        "category": "keychain",
        "badge": "",
        "alt": "树脂",
        "imageExt": ".webp"
    },
    {
        "id": 18,
        "titleEn": "Naruto",
        "titleCn": "火影-p18",
        "price": "$ 1.23",
        "category": "keychain",
        "badge": "",
        "alt": "金属",
        "imageExt": ".webp"
    },
    {
        "id": 19,
        "titleEn": "Naruto",
        "titleCn": "火影-19",
        "price": "$ 1.19",
        "category": "keychain",
        "badge": "",
        "alt": "树脂",
        "imageExt": ".webp"
    },
    {
        "id": 20,
        "titleEn": "Tissot",
        "titleCn": "天梭超级玩家-p20",
        "price": "$ 118.63",
        "category": "others",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 21,
        "titleEn": "Cartier-necklace",
        "titleCn": "卡地亚-p21",
        "price": "$ 27.43",
        "category": "jewelry",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 22,
        "titleEn": "Cartier-ring",
        "titleCn": "卡地亚-p22",
        "price": "$ 27.43",
        "category": "jewelry",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 23,
        "titleEn": "Omega",
        "titleCn": "欧米伽-p23",
        "price": "$ 278.78",
        "category": "others",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 24,
        "titleEn": "ESSENTIALS",
        "titleCn": "ESSENTIALS-p24",
        "price": "$ 13.35",
        "category": "others",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 25,
        "titleEn": "HolleKitty Vibration button keychain",
        "titleCn": "HolleKitty-p25",
        "price": "$ 1.22",
        "category": "keychain",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 26,
        "titleEn": "Sanrio",
        "titleCn": "三丽欧-p26",
        "price": "$ 0.9",
        "category": "keychain",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 27,
        "titleEn": "SpongeBob SquarePants",
        "titleCn": "海绵宝宝-p27",
        "price": "$ 0.89",
        "category": "keychain",
        "badge": "",
        "alt": "",
        "imageExt": ".jpg"
    },
    {
        "id": 28,
        "titleEn": "Super Mario",
        "titleCn": "超级马里奥-p28",
        "price": "$ 0.82",
        "category": "keychain",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 29,
        "titleEn": "Super Mario",
        "titleCn": "超级马里奥-p29",
        "price": "$ 1.13",
        "category": "keychain",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 30,
        "titleEn": "M&M",
        "titleCn": "m豆-p30",
        "price": "$ 1.19",
        "category": "keychain",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 31,
        "titleEn": "Super Mario",
        "titleCn": "超级马里奥-p31",
        "price": "$ 1.19",
        "category": "keychain",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 32,
        "titleEn": "Sanrio Zero Wallet Keychain",
        "titleCn": "三丽欧零钱包-p32",
        "price": "$ 1.48",
        "category": "keychain",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 33,
        "titleEn": "Question Mark McLean Chicken Keychain",
        "titleCn": "麦乐鸡-p33",
        "price": "$ 1.19",
        "category": "keychain",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 34,
        "titleEn": "Official My Little Pony product",
        "titleCn": "小马-p34",
        "price": "$ 3.08",
        "category": "keychain",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 35,
        "titleEn": "Official Toy version of \"Toy Story\"",
        "titleCn": "巴斯光年-p35",
        "price": "$ 3.1",
        "category": "keychain",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    },
    {
        "id": 36,
        "titleEn": "Official Little Liu Duck",
        "titleCn": "小刘鸭-p36",
        "price": "$ 1.76",
        "category": "keychain",
        "badge": "",
        "alt": "",
        "imageExt": ".webp"
    }
];