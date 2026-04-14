/**
 * JSON 比較工具 - 主邏輯程式碼
 * 已修正字串解析錯誤，並適配固定寬度佈局
 */
document.addEventListener("DOMContentLoaded", () => {
    const groupSelect = document.getElementById("groupSelect");
    const tableBody = document.getElementById("tableBody");
    const flashHeader = document.getElementById("flashHeader");
    const proHeader = document.getElementById("proHeader");

    // 1. 初始化選單
    const initApp = () => {
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
        // 1. 更新影片連結連結
        updateVideoLink(groupName);

        const configs = fileNameDescribe.filter(
            (f) => f.groupDisplayName === groupName,
        );
        const flashConf = configs.find((c) => c.model === "flash");
        const proConf = configs.find((c) => c.model === "pro");

        if (!flashConf || !proConf) return;

        flashHeader.textContent = flashConf.fileDisplayName;
        proHeader.textContent = proConf.fileDisplayName;

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

    // 新增函式：根據群組名稱更新影片超連結
    function updateVideoLink(groupDisplayName) {
        const videoLinkEl = document.getElementById("videoLink");
        // 從 config.js 的 groupDescribe 找尋該群組資料
        const groupInfo = groupDescribe.find(
            (g) => g.groupDisplayName === groupDisplayName,
        );

        if (
            groupInfo &&
            groupInfo.videoUrl &&
            groupInfo.videoUrl.trim() !== ""
        ) {
            videoLinkEl.href = groupInfo.videoUrl;
            videoLinkEl.classList.remove("hidden"); // 如果有連結就顯示
        } else {
            videoLinkEl.classList.add("hidden"); // 沒有連結就隱藏
        }
    }

    // 判斷是否為「純物件」 (排除陣列與空值)
    const isObject = (val) =>
        val && typeof val === "object" && !Array.isArray(val);

    // 3. 渲染表格邏輯
    function renderComparisonTable(flash, pro) {
        tableBody.innerHTML = "";
        const l1Keys = [
            ...new Set([...Object.keys(flash), ...Object.keys(pro)]),
        ];

        l1Keys.forEach((l1) => {
            const fL1 = flash[l1];
            const pL1 = pro[l1];

            // 處理第一層即為數值的情況 (如 videoName)
            if (!isObject(fL1) && !isObject(pL1)) {
                addRowToTable(l1, "-", "-", fL1, pL1, true);
                return;
            }

            // 進入第二層 (中類)
            const l2Keys = [
                ...new Set([
                    ...Object.keys(fL1 || {}),
                    ...Object.keys(pL1 || {}),
                ]),
            ];
            l2Keys.forEach((l2, l2Idx) => {
                const fL2 = fL1?.[l2];
                const pL2 = pL1?.[l2];

                // 如果第二層即為數值
                if (!isObject(fL2) && !isObject(pL2)) {
                    addRowToTable(l1, l2, "-", fL2, pL2, l2Idx === 0);
                    return;
                }

                // 進入第三層 (小類)
                const l3Keys = [
                    ...new Set([
                        ...Object.keys(fL2 || {}),
                        ...Object.keys(pL2 || {}),
                    ]),
                ];
                l3Keys.forEach((l3, l3Idx) => {
                    const fL3 = fL2?.[l3];
                    const pL3 = pL2?.[l3];

                    // 處理細項展開 (如 location 內的 country/city)
                    if (isObject(fL3) || isObject(pL3)) {
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
                                l4,
                                fL3?.[l4],
                                pL3?.[l4],
                                isFirst,
                            );
                        });
                    } else {
                        const isFirst = l2Idx === 0 && l3Idx === 0;
                        addRowToTable(l1, l2, l3, fL3, pL3, isFirst);
                    }
                });
            });
        });
    }

    // 4. 建立表格 Row
    function addRowToTable(grand, middle, small, fVal, pVal, isFirstInGroup) {
        const tr = document.createElement("tr");
        tr.className = "border-b border-slate-800/50";

        // 對應 HTML 的 10, 10, 10, 35, 35 比例
        tr.innerHTML = `
            <td class="p-4 border-r border-slate-800 font-bold text-blue-300/80 text-[11px]">${isFirstInGroup ? grand : ""}</td>
            <td class="p-4 border-r border-slate-800 text-slate-400 text-[11px]">${middle}</td>
            <td class="p-4 border-r border-slate-800 text-slate-100 text-[11px] font-semibold">${small}</td>
            <td class="p-4 border-r border-slate-800 text-sm leading-relaxed">${formatValue(fVal)}</td>
            <td class="p-4 text-sm leading-relaxed">${formatValue(pVal)}</td>
        `;
        tableBody.appendChild(tr);
    }

    // 5. 值格式化 (標籤化陣列、布林值處理)
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
        return `<div class="text-slate-300">${val}</div>`;
    }

    groupSelect.addEventListener("change", (e) =>
        loadComparisonData(e.target.value),
    );
    initApp();
});
