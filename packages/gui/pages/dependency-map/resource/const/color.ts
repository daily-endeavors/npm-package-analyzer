// 提供颜色列表, 用于生成节点颜色. 
// 具体色值来自colorhunt, 接口请求如下
// curl "https://colorhunt.co/php/feed.php" -H "referer: https://colorhunt.co/palettes/popular" --data-raw "step=0&sort=popular&tags=&timeframe=4000" --compressed >> color.json
// curl "https://colorhunt.co/php/feed.php" -H "referer: https://colorhunt.co/palettes/popular" --data-raw "step=1&sort=popular&tags=&timeframe=4000" --compressed >> color.json
// curl "https://colorhunt.co/php/feed.php" -H "referer: https://colorhunt.co/palettes/popular" --data-raw "step=2&sort=popular&tags=&timeframe=4000" --compressed >> color.json
// curl "https://colorhunt.co/php/feed.php" -H "referer: https://colorhunt.co/palettes/popular" --data-raw "step=3&sort=popular&tags=&timeframe=4000" --compressed >> color.json
// curl "https://colorhunt.co/php/feed.php" -H "referer: https://colorhunt.co/palettes/popular" --data-raw "step=4&sort=popular&tags=&timeframe=4000" --compressed >> color.json
// curl "https://colorhunt.co/php/feed.php" -H "referer: https://colorhunt.co/palettes/popular" --data-raw "step=5&sort=popular&tags=&timeframe=4000" --compressed >> color.json

const colorStrList = [
    "222831393e4600adb5eeeeee",
    "e3fdfdcbf1f5a6e3e971c9ce",
    "ffc7c7ffe2e2f6f6f68785a2",
    "f9ed69f08a5db83b5e6a2c70",
    "f9f7f7dbe2ef3f72af112d4e",
    "08d9d6252a34ff2e63eaeaea",
    "f38181fce38aeaffd095e1d3",
    "f4eeffdcd6f7a6b1e1424874",
    "a8d8eaaa96dafcbad3ffffd2",
    "fff5e4ffe3e1ffd1d1ff9494",
    "ad8b73ceab93e3caa5fffbe9",
    "ffb6b9fae3d9bbded661c0bf",
    "1b262c0f4c753282b8bbe1fa",
    "364f6b3fc1c9f5f5f5fc5185",
    "b7c4cfeee3cbd7c0ae967e76",
    "defcf9cadefcc3bef0cca8e9",
    "b1b2ffaac4ffd2daffeef1ff",
    "7d5a50b4846ce5b299fcdec0",
    "fcd1d1ece2e1d3e0dcaee1e1",
    "f8ede3bdd2b6a2b29f798777",
    "ffeddbedcdbbe3b7a0bf9270",
    "e4f9f530e3ca11999e40514e",
    "f67280c06c846c5b7b355c7d",
    "f5efe6e8dfcaaebdca7895b2",
    "2b2e4ae8454590374953354a",
    "2121213232320d737714ffec",
    "fff8ea9e7676815b5b594545",
    "fcd8d4fdf6f0f8e2cff5c6aa",
    "bad7dfffe2e2f6f6f699ddcc",
    "f7fbfcd6e6f2b9d7ea769fcd",
    "e23e5788304e522546311d3f",
    "fdefeff4dfd0dad0c2cdbba7",
    "f8ede3dfd3c3d0b8a87d6e83",
    "ffd5cdefbbcfc3aed68675a9",
    "ffcfdffefdcae0f9b5a5dee5",
    "6096b493bfcfbdcdd6eee9da",
    "ffe6e6f2d1d1daeaf1c6dce4",
    "f6f6f6ffe2e2ffc7c7aaaaaa",
    "93b5c6c9ccd5e4d8dcffe3e3",
    "fef5edd3e4cdadc2a999a799",
    "ff9292ffb4b4ffdcdcffe8e8",
    "2c36393f4e4fa27b5cdcd7c9",
    "fefcf3f5ebe0f0dbdbdba39a",
    "f0f5f9c9d6df52616b1e2022",
    "00b8a9f8f3d4f6416cffde7d",
    "a8e6cfdcedc1ffd3b6ffaaa5",
    "feffdeddffbc91c78852734d",
    "be9fe1c9b6e4e1ccecf1f1f6",
    "2d4059ea5455f07b3fffd460",
    "b5eaeaedf6e5ffbcbcf38ba0",
    "fcf8e8d4e2d4ecb390df7861",
    "a0937de7d4b5f6e6cbe3cdc1",
    "8d7b68a4907cc8b6a6f1dec9",
    "edf1d69dc08b60996640513b",
    "f2d7d9d3cedf9cb4cc748da6",
    "f0ebe3e4dccf7d9d9c576f72",
    "7d5a5af1d1d1f3e1e1faf2f2",
    "ffc8c8ff9999444f5a3e4149",
    "fff5e4ffc4c4ee6983850e35",
    "48466d3d84a846cdcfabedd8",
    "98ddcad5ecc2ffd3b4ffaaa7",
    "faf3e0eabf9fb689731e212d",
    "968c83d6d2c4fff5eaf7dad9",
    "cdf0eaf9f9f9f7dbf0beaee2",
    "999b84d8ac9cefd9d1f4eeed",
    "14285027496d0c7b9300a8cc",
    "2c3333395b64a5c9cae7f6f2",
    "f5e8c7deba9d9e77776f4c5b",
    "a1eafbfdfdfdffcef3cabbe9",
    "e5d9b6a4be7b5f8d4e285430",
    "3ec1d3f6f7d7ff9a00ff165d",
    "a75d5dd3756bf0997dffc3a1",
    "5f71616d8b74efead8d0c9c0",
    "1fab8962d2a29df3c4d7fbe8",
    "fdffbcffeebbffdcb8ffc1b6",
    "eac7c7a0c3d2f7f5ebeae0da",
    "ffe8dffffffff0f0f0888888",
    "ffb6b9fae3d9bbded68ac6d1",
    "def5e5bcead59ed5c58ec3b0",
    "f0ece3dfd3c3c7b198596e79",
    "f9ececf0d9dac8d9ebecf2f9",
    "753422b05b3bd79771ffebc9",
    "87805eb09b71d8cca3eddfb3",
    "ffbbccffccccffddccffeecc",
    "557571d49a89f7d1baf4f4f4",
    "f4f4f2e8e8e8bbbfca495464",
    "d4a5a5ffecdaf9ffeaa6d0e4",
    "ea907afbc687f4f7c5aacdbe",
    "f8ede3dfd3c3d0b8a885586f",
    "fcf5eefbe8e7f7dddeffc4d0",
    "00000052057b892cdcbc6ff1",
    "fdeedcffd8a9f1a661e38b29",
    "f5eee6f3d7cae6a4b4c86b85",
    "3c625561876ea6bb8deae7b1",
    "ffb6b6fde2e2aacfcf679b9b",
    "0000003d0000950101ff0000",
    "dff4f3dde7f2b9bbdf878ecd",
    "222831393e46ffd369eeeeee",
    "f4f9f9ccf2f4a4ebf3aaaaaa",
    "f39189bb80826e7582046582",
    "fff5ebdeedf0f4c7abb2b8a3",
    "f1f6f914274e3948679ba4b4",
    "fef7dce6ddc6c2b8a3a19882",
    "8e806ac3b091e4cda7ffe6bc",
    "867070d5b4b4e4d0d0f5ebeb",
    "f6f5f5d3e0ea1687a7276678",
    "3951444e6c50aa8b56f0ebce",
    "fbf0f0dfd3d3b8b0b07c7575",
    "30384100adb5eeeeeeff5722",
    "ffd4d4ffffe8cde990aacb73",
    "645caaa084cabface0ebc7e8",
    "f3f1f5f0d9ffbfa2db7f7c82",
    "5571537d8f69a9af7ee6e5a3",
    "dddddd22283130475ef05454",
    "0a26471442722052952c74b3",
    "fcecddffc288fea82fff6701",
    "caf7e3edffecf6dfebe4bad4",
    "ffb9b9ffddd2ffacc7ff8dc7",
    "ccd5aee9edc9fefae0faedcd",
    "698474889e81bac7a7e5e4cc",
    "f3c5c5c1a3a3886f6f694e4e",
    "d9e4ddfbf7f0cdc9c3555555",
    "838383ad9d9dd9adadfccbcb",
    "ffd5e5ffffdda0ffe681f5ff",
    "faf8f1faeab1e5ba73c58940",
    "155263ff6f3cff9a3cffc93c",
    "7c9473cfdac8e8eae6cdd0cb",
    "e5e3c9b4cfb094b49f789395",
    "937dc2c689c6ffabe1ffe6f7",
    "fcf8ecd0e8f279a3b1456268",
    "e0ece4f7f2e7d8d3cd797a7e",
    "876445ca965ceec373f4dfba",
    "ccf6c8fafcc2f6d6adf9c0c0",
    "6fe7dd3490de6639a6521262",
    "f8ecd1deb6abac7d8885586f",
    "ccd6a6dae2b6f4ead5fffbe9",
    "e1f2fbf1f9f9f3dfe3e9b2bc",
    "402218865439c68b59d7b19d",
    "f7ecdee9dac19ed2c654bab9",
    "4834346b4f4feed6c4fff3e4",
    "edcfa9e89f71d57149aa4a30",
    "8ef6e49896f1d59bf6edb1f1",
    "07689fa2d5f2fafafaff7e67",
    "2f5d625e8b7ea7c4bcdfeeea",
    "3038413a4750d72323eeeeee",
    "a8e6cffdffabffd3b6ffaaa5",
    "ffe6e6ffabe1a685e26155a6",
    "ede4e0c8dbbe9f8772665a48",
    "f5e8c7ecccb2deb6abac7088",
    "f0ece2dfd3c3c7b198596e79",
    "bfcba85b8a7256776c464f41",
    "7579e79ab3f5a3d8f4b9fffc",
    "2d24245c3d2eb85c38e0c097",
    "f5f0bbc4dfaa90c8ac73a9ad",
    "f4bfbfffd9c0faf0d78cc0de",
    "94b49fcee5d0fcf8e8ecb390",
    "fafafae8f1f5005691004a7c",
    "dbd0c0faeee0f9e4c8f9cf93",
    "a9907ef3debaabc4aa675d50",
    "14285027496d00909edae1e7",
    "3630624d4c7d827397d8b9c3",
    "a7727deddbc7f8ead8f9f5e7",
    "f0e5cff7f6f2c8c6c64b6587",
    "1a374d4068826998abb1d0e0",
    "fee3ecf9c5d5f999b7f2789f",
    "dcedc2ffd3b5ffaaa6ff8c94",
    "bce6ebfdcfdffbbedffca3cc",
    "be8abfea9abbfea5adf8c3af",
    "cc9b6df1ca89f2dac3c8c2bc",
    "faebe0c9e4c5b5cda3c1ac95",
    "8e3200a64b2ad7a86effebc1",
    "d8e3e751c4d3126e82132c33",
    "f6e5f5fbf4f9f6e7e6b9cced",
    "171717444444da0037ededed",
    "fcf8e8ecdfc8ecb390df7861",
    "f85f73fbe8d3928a97283c63",
    "61764b9ba17bcfb997fad6a5",
    "472d2d553939704f4fa77979",
    "f3f8ffdeecffc6cfffe8d3ff",
    "e4fbffb8b5ff7868e6edeef7",
    "9e9d89e4d3cfe2bcb7b67162",
    "071a5208697217b978a7ff83",
    "fce2dbf1c6d3e4a3d4c295d8",
    "d9d7f1fffddee7fbbeffcbcb",
    "fb929effdfdffff6f6aedefc",
    "ccd6a6dae2b6dfe8ccf7eddb",
    "f9f5f6f8e8eefdcedff2bed1",
    "7286d38ea7e9e5e0fffff2f2",
    "85603f9e7540bd9354e3d18a",
    "fbc6a4f4a9a8ce97b0afb9c8",
    "e6ba95fafdd6e4e9bea2b38b",
    "272343ffffffe3f6f5bae8e8",
    "b983ff94b3fd94daff99feff",
    "1c67583d8361d6cda4eef2e6",
    "99e1e5f3e8cbf2c6b4fbafaf",
    "cee5d0f3f0d7fed2aaffbf86",
    "e8ded2a3d2ca5eaaa8056676",
    "bedcfa98acf8b088f9da9ff9",
    "beebe9f4dadaffb6b9f6eec7",
    "cc7351e08f62ded7b19dab86",
    "cffffef9f7d9fce2ceffc1f3",
    "27374d526d829db2bfdde6ed",
    "ff8787f8c4b4e5ebb2bce29e",
    "fff0f0ebd4d4835858463333",
    "faf7f0cdfcf6bccef898a8f8",
    "eeebdd8100006300001b1717",
    "ffacacffbfa9ffebb4fbffb1",
    "d4ecdd345b63152d35112031",
    "1c3879607eaaeae3d2f9f5eb",
    "e97777ff9f9ffcddb0fffad7",
    "ecf9fffffbebffe7ccf8cba6",
    "f0e4d7f5c0c0ff71719fd8df",
    "ffeeeefff6eaf7e9d7ebd8c3",
    "d3e4cd99a799f2ddc1e2c2b9",
    "fef1e6f9d5a7ffb08590aacb",
    "645cbba084dcbface2ebc7e6",
    "faf1e6fdfaf6e4efe7064420",
    "eeebddce12128100001b1717",
    "fcffa6c1ffd7b5deffcab8ff",
    "ffc996ff84749f5f80583d72",
    "232931393e464ecca3eeeeee",
    "f6f6f6d6e4f01e56a0163172",
    "f7f7e8c7cfb79dad7f557174",
    "e9d5da8273974d4c7d363062",
    "e5dcc3c7bea2aaa4929a9483",
    "ffd4b2fff6bdceedc786c8bc",
    "440a6793329eb4aee8ffe3fe",
    "fcf8e894b49fecb390df7861",
    "194350ff8882ffc2b49dbeb9",
    "f1ecc3c9d8b657837b515e63",
    "79b4b7fefbf3f8f0df9d9d9d",
    "cee5d0f3f0d7d8b3845e454b",
    "caf7e3f8ededf6dfebe4bad4",
    "00e0ff74f9ffa6fff2e8ffe8",
    "3932324d45458d6262ed8d8d",
    "f9ebc8fefbe7dae5d0a0bcc2",
    "1a120b3c2a21d5cea3e5e5cb",
    "f7fd04f9b208f98404fc5404",
    "ebfffac6fce56ef3d60dceda",
    "fbfacddebaceba94d17f669d",
]

export const colorList: string[] = []
for (const colorStr of colorStrList) {
    for (let startPos of [0, 6, 12, 18, 24]) {
        const color = colorStr.slice(startPos, startPos + 6)
        colorList.push(color)
    }
}


/**
 * 来自material的颜色
 * https://m3.material.io/styles/color/the-color-system/tokens
 */
export const materialColorList = [
    "6750A4",
    // "EADDFF",
    // "FFFFFF",
    "21005E",
    "D0BCFF",
    "625B71",
    "E8DEF8",
    // "FFFFFF",
    "1E192B",
    "7D5260",
    "FFD8E4",
    // "FFFFFF",
    "370B1E",
    // "FEF7FF",
    "DED8E1",
    // "FEF7FF",
    // "FFFFFF",
    "F7F2FA",
    "F3EDF7",
    "ECE6F0",
    "E6E0E9",
    "E7E0EC",
    "1C1B1F",
    "49454E",
    "313033",
    "F4EFF4",
    // "FEF7FF",
    "1C1B1F",
    "B3261E",
    "F9DEDC",
    // "FFFFFF",
    "410E0B",
    "79747E",
    "C4C7C5",
    "000000",
    "6750A4",
    "000000",
].sort(() => {
    return Math.random() - 0.5
})