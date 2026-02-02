---
slug: /integration/rest-api-crud-wo
---
# REST API 實戰 (2)：CRUD 工單 (含必填欄位與檢核機制)

學會認證後，接下來就是真正的實戰：**如何透過 API 對工單 (Work Order) 進行增刪改查。** 這是所有整合專案的核心。

---

## 1. 查詢工單 (GET)

不要直接請求所有欄位，這會導致效能低落。請使用 `oslc.select` 來精確篩選。

**範例請求：**
`GET /maximo/oslc/os/mxwo?oslc.where=status="APPR"&oslc.select=wonum,description,status`

**回傳解析：**
你會得到一個包含 `member` 陣列的 JSON，裡面只有你指定的欄位。

---

## 2. 建立工單 (POST) - 必填欄位陷阱

建立工單時，最常遇到 `MBO validation error`。

**標準 Payload 範本：**
```json
{
  "siteid": "BEDFORD",
  "description": "透過 API 建立的測試工單",
  "worktype": "CM",
  "assetnum": "11400",
  "location": "BR450"
}
```

**💡 專家提示：**
- **SiteID 是必須的**：即便你只有一個 Site，Maximo 依然要求明確指定。
- **自動編號**：如果你的系統有設 `WONUM` 自動編號，POST 時不需要帶 `wonum` 欄位。

---

## 3. 更新工單 (PATCH / POST with headers)

在 MAS/Maximo 中，更新現有記錄建議使用 `PATCH`。

**情境：將工單狀態改為「已完成 (COMP)」**
```http
PATCH /maximo/oslc/os/mxwo/_S0VORDUvMTAwMQ--
Content-Type: application/json
x-method-override: PATCH
```
*註：URL 後方的加密字串是該紀錄的 `_rowid` 或透過 `href` 取得。*

---

## 4. 常見報錯與解法

| 報錯訊息 | 原因 | 解決方案 |
| :--- | :--- | :--- |
| `400 Bad Request` | JSON 格式錯誤或缺少括號 | 使用 JSON Validator 檢查格式 |
| `MBO Read-only` | 該工單已結案，無法修改 | 檢查 `status` 是否為 CLOSE 或 CAN |
| `Validation failed` | 欄位長度超限或數值不合法 | 檢查 `MAXATTRIBUTE` 定義的欄位長度 |

---
**下一篇預告：** [整合模式：同步 (Sync) vs 非同步 (Async) 的場景選型](./sync-vs-async.md)
