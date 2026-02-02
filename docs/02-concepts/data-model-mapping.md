---
slug: /concepts/data-model-mapping
---
# 資料模型映射：顧問說的「資產」在資料庫裡長怎樣？

開發者在進行整合時，最常面臨的挑戰是將外部資料 (如 ERP 或 IoT) 正確映射到 Maximo。這篇文章帶你從 Table 層級理解核心資料模型。

---

## 1. 資產模型 (Asset & Location)

Maximo 的核心是設備管理。理解以下兩張表的關聯是基礎中的基礎：

| 業務物件 (MBO) | 實體表 | 關鍵欄位 | 說明 |
| :--- | :--- | :--- | :--- |
| **Asset** | `ASSET` | `ASSETNUM`, `SITEID` | 具體的設備編號與站點。 |
| **Location** | `LOCATIONS` | `LOCATION`, `TYPE` | 設備放置的地點或系統階層。 |

**💡 核心邏輯：** 資產是「可移動」的，位置是「固定的」。在資料庫中，資產可以被移動到不同的 Location，但 `LOCATION` 本身不隨資產變動。

---

## 2. 工作紀錄模型 (Work Order)

工單是所有維修動作的載體。

-   **主表**：`WORKORDER`
-   **關鍵關聯**：
    -   `ASSETNUM` -> `ASSET`
    -   `LOCATION` -> `LOCATIONS`
    -   `PMNUM` -> `PM` (若是從預防保養產生的單據)

**開發提醒：** 更新工單狀態時，請務必操作 `WOSERVICE` 或透過 API 觸發，不要直接用 SQL 修改 `STATUS` 欄位，否則會漏掉 **Status History** 的紀錄，導致審計追蹤斷鏈。

---

## 3. 庫存與物料映射 (Item & Inventory)

這部分通常與 ERP 整合最深。

-   **Item (`ITEM`)**：物料的全球定義（如：機油 5W-40）。
-   **Inventory (`INVENTORY`)**：特定倉庫 (`BIN`) 中的物料剩餘量與成本。

**ERP 整合公式：**  
`ERP Material ID` -> `Maximo ITEMNUM`

---

## 4. 實戰建議：使用 SQL 輔助開發

在寫 API 整合前，建議先在資料庫端下 SQL 確認資料一致性：

```sql
-- 範例：查詢特定站點的所有 APPR 狀態工單及其對應的資產描述
SELECT wo.wonum, wo.description, ast.description AS asset_desc
FROM workorder wo
JOIN asset ast ON wo.assetnum = ast.assetnum AND wo.siteid = ast.siteid
WHERE wo.status = 'APPR' AND wo.siteid = 'BEDFORD';
```

---
**下一篇：** [REST API 實戰 (1)：認證模式選型](../04-integration/rest-api-auth.md)
