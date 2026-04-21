/**
 * JSON 比較工具 - 主邏輯程式碼
 * 核心修正：確保 L1~L4 所有欄位路徑與 json_structure.json 註解完全對齊
 */
document.addEventListener("DOMContentLoaded", () => {
    const groupSelect = document.getElementById("groupSelect");
    const tableBody = document.getElementById("tableBody");
    const flashHeader = document.getElementById("flashHeader");
    const proHeader = document.getElementById("proHeader");

    let annotationMap = {}; // 儲存 { "路徑": "註解文字" }

    /**
     * 非標準 JSON 解析器：提取 // 後的文字，並處理 L4 合併邏輯
     */
    async function loadAndParseSchema() {
        try {
            const response = await fetch("json_structure.json");
            const text = await response.text();
            const lines = text.split("\n");

            let pathStack = [];
            const commentRegex = /\/\/ (.*)/;
            const keyRegex = /"([^"]+)"/;

            lines.forEach((line) => {
                const keyMatch = line.match(keyRegex);
                const commentMatch = line.match(commentRegex);

                // 1. 處理進入層級
                if (line.includes("{") && keyMatch) {
                    pathStack.push(keyMatch[1]);
                }

                // 2. 提取註解
                if (keyMatch && commentMatch) {
                    const currentKey = keyMatch[1];
                    const comment = commentMatch[1].trim();

                    // 構建與數據渲染一致的完整路徑
                    let fullPathArray = [...pathStack];
                    // 如果當前行不是物件起始（沒有 {），代表是終端欄位
                    if (!line.includes("{")) {
                        fullPathArray.push(currentKey);
                    }

                    const depth = fullPathArray.length;

                    if (depth <= 4) {
                        const keyPath = fullPathArray.join(".");
                        annotationMap[keyPath] = comment;
                    } else {
                        // 只有第五層以上才合併到第四層
                        const fourthLevelPath = fullPathArray
                            .slice(0, 4)
                            .join(".");
                        if (!annotationMap[fourthLevelPath]) {
                            annotationMap[fourthLevelPath] = comment;
                        } else {
                            if (
                                !annotationMap[fourthLevelPath].includes(
                                    comment,
                                )
                            ) {
                                annotationMap[fourthLevelPath] +=
                                    `\n\n${comment}`;
                            }
                        }
                    }
                }

                // 3. 處理退出層級
                if (line.includes("}")) {
                    pathStack.pop();
                }
            });
            console.log("註解映射表對齊完成", annotationMap);
        } catch (err) {
            console.error("無法載入或解析註解規範檔", err);
        }
    }

    // 1. 初始化選單
    const initApp = async () => {
        await loadAndParseSchema();

        const activeGroups = groupDescribe.filter((g) => g.enable);
        activeGroups.forEach((group) => {
            const opt = document.createElement("option");
            opt.value = group.groupDisplayName;
            opt.textContent = group.groupDisplayName;
            groupSelect.appendChild(opt);
        });
        if (activeGroups.length > 0)
            loadComparisonData(activeGroups[0].groupDisplayName);
    };

    // 2. 非同步載入 JSON
    async function loadComparisonData(groupName) {
        updateVideoLink(groupName);

        const configs = fileNameDescribe.filter(
            (f) => f.groupDisplayName === groupName,
        );
        const flashConf = configs.find((c) => c.model === "flash");
        const proConf = configs.find((c) => c.model === "pro");

        if (!flashConf || !proConf) return;

        flashHeader.innerHTML = `${flashConf.fileDisplayName} ${
            flashConf.video_url
                ? `<a href="${flashConf.video_url}" target="_blank" class="ml-1 text-blue-400 hover:text-blue-300">🔗</a>`
                : ""
        }`;

        proHeader.innerHTML = `${proConf.fileDisplayName} ${
            proConf.video_url
                ? `<a href="${proConf.video_url}" target="_blank" class="ml-1 text-purple-400 hover:text-purple-300">🔗</a>`
                : ""
        }`;

        try {
            const [flashJson, proJson] = await Promise.all([
                fetch(flashConf.url).then((r) => r.json()),
                fetch(proConf.url).then((r) => r.json()),
            ]);
            renderComparisonTable(flashJson, proJson);
        } catch (err) {
            tableBody.innerHTML = `<tr><td colspan="5" class="p-8 text-center text-red-400">無法讀取 JSON 檔案</td></tr>`;
        }
    }

    function updateVideoLink(groupDisplayName) {
        const videoLinkEl = document.getElementById("videoLink");
        const groupInfo = groupDescribe.find(
            (g) => g.groupDisplayName === groupDisplayName,
        );

        if (
            groupInfo &&
            groupInfo.videoUrl &&
            groupInfo.videoUrl.trim() !== ""
        ) {
            videoLinkEl.href = groupInfo.videoUrl;
            videoLinkEl.classList.remove("hidden");
        } else {
            videoLinkEl.classList.add("hidden");
        }
    }

    const isObject = (val) =>
        val && typeof val === "object" && !Array.isArray(val);

    // 3. 渲染表格邏輯 (確保所有層級都計算正確 path)
    function renderComparisonTable(flash, pro) {
        tableBody.innerHTML = "";
        const l1Keys = [
            ...new Set([...Object.keys(flash), ...Object.keys(pro)]),
        ];

        l1Keys.forEach((l1) => {
            const fL1 = flash[l1];
            const pL1 = pro[l1];

            // L1 終端欄位
            if (!isObject(fL1) && !isObject(pL1)) {
                addRowToTable(l1, "-", "-", "-", fL1, pL1, true, l1);
                return;
            }

            const l2Keys = [
                ...new Set([
                    ...Object.keys(fL1 || {}),
                    ...Object.keys(pL1 || {}),
                ]),
            ];
            l2Keys.forEach((l2, l2Idx) => {
                const fL2 = fL1?.[l2];
                const pL2 = pL1?.[l2];

                // L2 終端欄位
                if (!isObject(fL2) && !isObject(pL2)) {
                    addRowToTable(
                        l1,
                        l2,
                        "-",
                        "-",
                        fL2,
                        pL2,
                        l2Idx === 0,
                        `${l1}.${l2}`,
                    );
                    return;
                }

                const l3Keys = [
                    ...new Set([
                        ...Object.keys(fL2 || {}),
                        ...Object.keys(pL2 || {}),
                    ]),
                ];
                l3Keys.forEach((l3, l3Idx) => {
                    const fL3 = fL2?.[l3];
                    const pL3 = pL2?.[l3];

                    // L3 終端欄位
                    if (!isObject(fL3) && !isObject(pL3)) {
                        const isFirst = l2Idx === 0 && l3Idx === 0;
                        addRowToTable(
                            l1,
                            l2,
                            l3,
                            "-",
                            fL3,
                            pL3,
                            isFirst,
                            `${l1}.${l2}.${l3}`,
                        );
                        return;
                    }

                    // L4 處理
                    const l4Keys = [
                        ...new Set([
                            ...Object.keys(fL3 || {}),
                            ...Object.keys(pL3 || {}),
                        ]),
                    ];
                    l4Keys.forEach((l4, l4Idx) => {
                        const isFirst =
                            l2Idx === 0 && l3Idx === 0 && l4Idx === 0;
                        addRowToTable(
                            l1,
                            l2,
                            l3,
                            l4,
                            fL3?.[l4],
                            pL3?.[l4],
                            isFirst,
                            `${l1}.${l2}.${l3}.${l4}`,
                        );
                    });
                });
            });
        });
    }

    // 4. 建立表格 Row (加入 Tooltip)
    function addRowToTable(
        l1,
        l2,
        l3,
        l4,
        fVal,
        pVal,
        isFirstInGroup,
        fullPath,
    ) {
        const tr = document.createElement("tr");
        tr.className = "border-b border-slate-800/50";

        const hint = annotationMap[fullPath] || "";

        // 自動判斷註解應該掛在哪個層級的文字上 (抓最深且不為 "-" 的那層)
        let cellToAnnotate = "l4";
        if (l4 === "-") cellToAnnotate = "l3";
        if (l4 === "-" && l3 === "-") cellToAnnotate = "l2";
        if (l4 === "-" && l3 === "-" && l2 === "-") cellToAnnotate = "l1";

        const wrapWithTooltip = (text) => {
            if (!hint) return text;
            return `
            <div class="relative group inline-block">
                <span class="border-b border-dashed border-slate-500 cursor-help hover:text-blue-300 transition-colors">${text}</span>
                <div class="invisible group-hover:visible absolute left-0 top-full w-72 max-h-60 overflow-y-auto bg-slate-800 text-yellow-200 text-[12px] p-3 rounded-lg border border-slate-600 shadow-2xl z-50 whitespace-pre-line leading-normal">
                    ${hint}
                </div>
            </div>`;
        };

        // 寬度分配：原本 30% 分給三欄，現在 30% 分給四欄 (各約 7.5%)
        tr.innerHTML = `
        <td class="p-4 border-r border-slate-800 font-bold text-blue-300/80 text-[10px] w-[7.5%]">
            ${isFirstInGroup ? (cellToAnnotate === "l1" ? wrapWithTooltip(l1) : l1) : ""}
        </td>
        <td class="p-4 border-r border-slate-800 text-slate-400 text-[10px] w-[7.5%]">
            ${cellToAnnotate === "l2" ? wrapWithTooltip(l2) : l2}
        </td>
        <td class="p-4 border-r border-slate-800 text-slate-400 text-[10px] w-[7.5%]">
            ${cellToAnnotate === "l3" ? wrapWithTooltip(l3) : l3}
        </td>
        <td class="p-4 border-r border-slate-800 text-slate-100 text-[10px] font-semibold w-[7.5%]">
            ${cellToAnnotate === "l4" ? wrapWithTooltip(l4) : l4}
        </td>
        <td class="p-4 border-r border-slate-800 text-sm leading-relaxed w-[35%]">
            ${formatValue(fVal)}
        </td>
        <td class="p-4 text-sm leading-relaxed w-[35%]">
            ${formatValue(pVal)}
        </td>
    `;
        tableBody.appendChild(tr);
    }

    // 5. 值格式化 (保留原本寫法)
    function formatValue(val) {
        if (val === undefined || val === null)
            return `<span class="text-slate-600">—</span>`;
        if (typeof val === "boolean") {
            return val
                ? `<span class="text-emerald-400 font-bold">YES</span>`
                : `<span class="text-rose-400 font-bold">NO</span>`;
        }
        if (Array.isArray(val)) {
            if (val.length === 0)
                return `<span class="text-slate-600">None</span>`;
            return val
                .map(
                    (v) =>
                        `<span class="inline-block bg-slate-800 border border-slate-700 rounded px-2 py-0.5 m-0.5 text-[10px] text-blue-200">${v}</span>`,
                )
                .join("");
        }
        if (typeof val === "object" && val !== null) {
            return `<pre class="text-slate-300 text-xs bg-slate-800 p-1 rounded overflow-x-auto">${JSON.stringify(val, null, 2)}</pre>`;
        }
        return `<div class="text-slate-300">${val}</div>`;
    }

    groupSelect.addEventListener("change", (e) =>
        loadComparisonData(e.target.value),
    );
    initApp();
});
