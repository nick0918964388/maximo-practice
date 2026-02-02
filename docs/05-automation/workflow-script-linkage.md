# Workflow 開發：視覺化流程與腳本的深度聯動

Maximo 的 **Workflow (工作流)** 提供了強大的視覺化審核流程管理，但在處理複雜的業務判斷（例如：根據多個條件決定下一個審核人）時，純節點配置往往力有未逮。這時，**Action Launch Point** 腳本就派上用場了。

---

## 1. 核心觀念：腳本在 Workflow 中的角色

在 Workflow 編輯器中，你可以將一個 **Action (動作)** 與腳本關聯。常見場景包括：
- **自動狀態轉換**：在特定的審核路徑中自動修改記錄狀態。
- **動態指派 (Dynamic Assignment)**：根據工單的預算中心或設備類型，即時查找對應的處長或經理。
- **資料完整性檢查**：在工作流流轉到下一個節點前，強制檢查特定附件是否已上傳。

---

## 2. 實戰範例：動態指派審核人

**需求**：當採購單 (PO) 金額超過 10 萬元時，自動指派給「資深財務經理」，否則指派給「一般財務專員」。

### 腳本實作 (Jython)
**Launch Point Type**: Action

```python
# 取得目前記錄的總金額
totalCost = mbo.getDouble("TOTALCOST")
groupName = ""

if totalCost > 100000:
    groupName = "SR_FIN_MGR"
else:
    groupName = "FIN_STAFF"

# 將結果存入工作流變數或自訂欄位，供指派節點使用
mbo.setValue("WF_TARGET_GROUP", groupName)
```

---

## 3. Workflow 腳本開發的最佳實務

1.  **異常處理**：在工作流中拋出的異常 (Exception) 會直接彈出給使用者。請務必提供人性化的提示語，而不是生冷的程式報錯。
2.  **避免耗時操作**：Workflow 腳本是在使用者點擊「傳送」時同步執行的。如果腳本中涉及大量的外部系統 API 調用，會導致介面卡頓，建議考慮異步處理。
3.  **狀態同步**：如果你在腳本中修改了 MBO 的狀態，請確保與 Workflow 的「狀態變更節點」不產生衝突。

---
**下一篇：** [UI 客製：MAS Manage 中的 Application Designer 使用指南](./ui-customization-app-designer)
