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
    },
    {
        groupName: "0_shufen",
        groupDisplayName: "0_shufen",
        videoUrl: "",
        enable: true,
    },
    {
        groupName: "3ctim",
        groupDisplayName: "3ctim-3C有意思",
        videoUrl: "",
        enable: true,
    }, // 新增這組
    {
        groupName: "2uncle987_v7e",
        groupDisplayName: "2uncle987_二伯",
        videoUrl: "",
        enable: true,
    },
    {
        groupName: "yga0721",
        groupDisplayName: "yga0721",
        videoUrl: "",
        enable: true,
    },
    {
        groupName: "achusan0817",
        groupDisplayName: "achusan0817",
        videoUrl: "",
        enable: true,
    },
    {
        groupName: "5inana",
        groupDisplayName: "5inana",
        videoUrl: "",
        enable: true,
    },
];

const fileNameDescribe = [
    // 1. 料理123
    {
        fileName: "wecook_pro.json",
        fileDisplayName: "WeCook (Pro)",
        groupDisplayName: "料理123 - 火山燒肉丼",
        url: "./data/wecook123123-20251031183452-1639312187523748_pro.json",
        model: "pro",
        video_url: "",
    },
    {
        fileName: "wecook_flash.json",
        fileDisplayName: "WeCook (Flash)",
        groupDisplayName: "料理123 - 火山燒肉丼",
        url: "./data/wecook123123-20251031183452-1639312187523748_flash.json",
        model: "flash",
        video_url: "",
    },
    // 2. WalkerDad
    {
        fileName: "walkerdad_pro.json",
        fileDisplayName: "WalkerDad (Pro)",
        groupDisplayName: "喪失老爸 - Dance Cover",
        url: "./data/walkerdad1228-20250923040624-25870566612599789_pro.json",
        model: "pro",
        video_url: "",
    },
    {
        fileName: "walkerdad_flash.json",
        fileDisplayName: "WalkerDad (Flash)",
        groupDisplayName: "喪失老爸 - Dance Cover",
        url: "./data/walkerdad1228-20250923040624-25870566612599789_flash.json",
        model: "flash",
        video_url: "",
    },
    // 3. khshu (修正檔名含有底線 khshu_)
    {
        fileName: "khshu_pro.json",
        fileDisplayName: "khshu (Pro)",
        groupDisplayName: "千千 - 聖誕樹髮型",
        url: "./data/khshu_-20251228133052-1388935893035804_pro.json",
        model: "pro",
        video_url: "",
    },
    {
        fileName: "khshu_flash.json",
        fileDisplayName: "khshu (Flash)",
        groupDisplayName: "千千 - 聖誕樹髮型",
        url: "./data/khshu_-20251228133052-1388935893035804_flash.json",
        model: "flash",
        video_url: "",
    },
    // 4. 2uncle (修正檔名含有 2uncle987)
    {
        fileName: "2uncle_pro.json",
        fileDisplayName: "2uncle (Pro)",
        groupDisplayName: "二伯 - 勝尾寺 Vlog",
        url: "./data/2uncle987-20250311234240-1201464022133636_pro.json",
        model: "pro",
        video_url: "",
    },
    {
        fileName: "2uncle_flash.json",
        fileDisplayName: "2uncle (Flash)",
        groupDisplayName: "二伯 - 勝尾寺 Vlog",
        url: "./data/2uncle987-20250311234240-1201464022133636_flash.json",
        model: "flash",
        video_url: "",
    },
    // 5. Happy 5歲生日 (新增 wia627 檔案)
    {
        fileName: "happy_pro.json",
        fileDisplayName: "Happy (Pro)",
        groupDisplayName: "上發條俱樂部 - 5歲生日 Vlog",
        url: "./data/wia627-20250212084030-1642331380410258_pro.json",
        model: "pro",
        video_url: "",
    },
    {
        fileName: "happy_flash.json",
        fileDisplayName: "Happy (Flash)",
        groupDisplayName: "上發條俱樂部 - 5歲生日 Vlog",
        url: "./data/wia627-20250212084030-1642331380410258_flash.json",
        model: "flash",
        video_url: "",
    },
    // batch-flash
    {
        fileName: "0_shufen-20250902190256-1774419209918701.json",
        fileDisplayName: "0_shufen1",
        groupDisplayName: "0_shufen",
        url: "./data/0_shufen-20250902190256-1774419209918701.json",
        model: "flash",
        video_url: "",
    },
    {
        fileName: "0_shufen-20250903140356-1918596815532232.json",
        fileDisplayName: "0_shufen2",
        groupDisplayName: "0_shufen",
        url: "./data/0_shufen-20250903140356-1918596815532232.json",
        model: "pro",
        video_url: "",
    },
    // 3ctim
    {
        fileName: "3ctim-20250218131707-1573856370549552.json",
        fileDisplayName: "蘋果紅包",
        groupDisplayName: "3ctim-3C有意思",
        url: "./data/3ctim-20250218131707-1573856370549552.json",
        model: "flash",
        video_url: "https://www.instagram.com/reels/DFUnpOeTanI/",
    },
    {
        fileName: "3ctim-20250218131707-1986947205572402.json",
        fileDisplayName: "介紹 Dyson 耳機",
        groupDisplayName: "3ctim-3C有意思",
        url: "./data/3ctim-20250218131707-1986947205572402.json",
        model: "pro",
        video_url: "https://www.instagram.com/reel/DGDDATOv65A/",
    },
    // 2uncle987_v7e
    {
        fileName: "2uncle987-20250324075334-1286548589951164.json",
        fileDisplayName: "HaHaBaby新竹巨城",
        groupDisplayName: "2uncle987_二伯",
        url: "./data/2uncle987-20250324075334-1286548589951164.json",
        model: "flash",
        video_url: "https://www.instagram.com/reel/DHVmP70vZRa/",
    },
    {
        fileName: "2uncle987-20250628195039-1911215139504147.json",
        fileDisplayName: "日本富士山飯店介紹",
        groupDisplayName: "2uncle987_二伯",
        url: "./data/2uncle987-20250628195039-1911215139504147.json",
        model: "pro",
        video_url: "https://www.youtube.com/shorts/bqF93NIpJqU",
    },
    // yga0721
    {
        fileName: "yga0721-20250913013718-1208344100967893.json",
        fileDisplayName: "yga0721",
        groupDisplayName: "yga0721",
        url: "./data/yga0721-20250913013718-1208344100967893.json",
        model: "flash",
        video_url: "",
    },
    {
        fileName: "yga0721-20250731003224-2306346656531665.json",
        fileDisplayName: "yga0721",
        groupDisplayName: "yga0721",
        url: "./data/yga0721-20250731003224-2306346656531665.json",
        model: "pro",
        video_url: "",
    },
    // achusan0817
    {
        fileName: "achusan0817-20250802181312-1930533867546917.json",
        fileDisplayName: "achusan0817",
        groupDisplayName: "achusan0817",
        url: "./data/achusan0817-20250802181312-1930533867546917.json",
        model: "flash",
        video_url: "https://www.youtube.com/shorts/A17KAkB0REI",
    },
    {
        fileName: "achusan0817-20250522071346-1427164119064164.json",
        fileDisplayName: "achusan0817",
        groupDisplayName: "achusan0817",
        url: "./data/achusan0817-20250522071346-1427164119064164.json",
        model: "pro",
        video_url: "",
    },
    // 5inana
    {
        fileName: "5inana-20250508064327-1231918062400462.json",
        fileDisplayName: "5inana",
        groupDisplayName: "5inana",
        url: "./data/5inana-20250508064327-1231918062400462.json",
        model: "flash",
        video_url: "",
    },
    {
        fileName: "5inana-20250701123040-937232652216330.json",
        fileDisplayName: "5inana",
        groupDisplayName: "5inana",
        url: "./data/5inana-20250701123040-937232652216330.json",
        model: "pro",
        video_url: "",
    },
];
