// 資料設定檔
const groupDescribe = [
    {
        groupName: "wecook",
        groupDisplayName: "料理123 - 火山燒肉丼",
        videoUrl: "https://www.instagram.com/reels/DQeDNyygOa0/",
        enable: true,
    },
    {
        groupName: "walkerdad",
        groupDisplayName: "喪失老爸 - Dance Cover",
        videoUrl: "https://www.youtube.com/watch?v=mmAI6_uHO0E",
        enable: true,
    },
    {
        groupName: "khshu",
        groupDisplayName: "千千 - 聖誕樹髮型",
        videoUrl: "https://www.instagram.com/reels/DSkJ1XvkkQe/",
        enable: true,
    },
    {
        groupName: "2uncle",
        groupDisplayName: "二伯 - 勝尾寺 Vlog",
        videoUrl: "https://www.instagram.com/reels/DG0R_ygPI_K/",
        enable: true,
    },
    {
        groupName: "happy",
        groupDisplayName: "上發條俱樂部 - 5歲生日 Vlog",
        videoUrl: "https://www.youtube.com/watch?v=lwHF4Gf74Ho",
        enable: true,
    }, // 新增這組
];

const fileNameDescribe = [
    // 1. 料理123
    {
        fileName: "wecook_pro.json",
        fileDisplayName: "WeCook (Pro)",
        groupDisplayName: "料理123 - 火山燒肉丼",
        url: "./data/wecook123123-20251031183452-1639312187523748_pro.json",
        model: "pro",
    },
    {
        fileName: "wecook_flash.json",
        fileDisplayName: "WeCook (Flash)",
        groupDisplayName: "料理123 - 火山燒肉丼",
        url: "./data/wecook123123-20251031183452-1639312187523748_flash.json",
        model: "flash",
    },
    // 2. WalkerDad
    {
        fileName: "walkerdad_pro.json",
        fileDisplayName: "WalkerDad (Pro)",
        groupDisplayName: "喪失老爸 - Dance Cover",
        url: "./data/walkerdad1228-20250923040624-25870566612599789_pro.json",
        model: "pro",
    },
    {
        fileName: "walkerdad_flash.json",
        fileDisplayName: "WalkerDad (Flash)",
        groupDisplayName: "喪失老爸 - Dance Cover",
        url: "./data/walkerdad1228-20250923040624-25870566612599789_flash.json",
        model: "flash",
    },
    // 3. khshu (修正檔名含有底線 khshu_)
    {
        fileName: "khshu_pro.json",
        fileDisplayName: "khshu (Pro)",
        groupDisplayName: "千千 - 聖誕樹髮型",
        url: "./data/khshu_-20251228133052-1388935893035804_pro.json",
        model: "pro",
    },
    {
        fileName: "khshu_flash.json",
        fileDisplayName: "khshu (Flash)",
        groupDisplayName: "千千 - 聖誕樹髮型",
        url: "./data/khshu_-20251228133052-1388935893035804_flash.json",
        model: "flash",
    },
    // 4. 2uncle (修正檔名含有 2uncle987)
    {
        fileName: "2uncle_pro.json",
        fileDisplayName: "2uncle (Pro)",
        groupDisplayName: "二伯 - 勝尾寺 Vlog",
        url: "./data/2uncle987-20250311234240-1201464022133636_pro.json",
        model: "pro",
    },
    {
        fileName: "2uncle_flash.json",
        fileDisplayName: "2uncle (Flash)",
        groupDisplayName: "二伯 - 勝尾寺 Vlog",
        url: "./data/2uncle987-20250311234240-1201464022133636_flash.json",
        model: "flash",
    },
    // 5. Happy 5歲生日 (新增 wia627 檔案)
    {
        fileName: "happy_pro.json",
        fileDisplayName: "Happy (Pro)",
        groupDisplayName: "上發條俱樂部 - 5歲生日 Vlog",
        url: "./data/wia627-20250212084030-1642331380410258_pro.json",
        model: "pro",
    },
    {
        fileName: "happy_flash.json",
        fileDisplayName: "Happy (Flash)",
        groupDisplayName: "上發條俱樂部 - 5歲生日 Vlog",
        url: "./data/wia627-20250212084030-1642331380410258_flash.json",
        model: "flash",
    },
];
