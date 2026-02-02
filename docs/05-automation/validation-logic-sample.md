# Automation Script (2)：欄位驗證與自動帶入邏輯實作

這一篇我們透過一個經典的業務情境，學習如何撰寫實戰級的 Jython 腳本。

### 業務情境
**需求**：在工單 (WORKORDER) 中，如果使用者選取的資產 (Asset) 類別是 `CRITICAL`，系統必須自動將工單的優先級 (Priority) 設為 `1`，且禁止使用者將預計開工日期設為過去的時間。

---

## 1. 實作：資產類別聯動優先級

這是一個 **Attribute Launch Point** (欄位觸發) 的典型應用。

**腳本名稱**：`WO_ASSET_PRIORITY`  
**觸發欄位**：`ASSETNUM` (Validate 事件)

```python
# 取得目前工單關聯的資產對象
assetMbo = mbo.getMboSet("ASSET").getMbo(0)

if assetMbo:
    # 取得資產類別 (假設欄位是 ASSETTYPE)
    assetType = assetMbo.getString("ASSETTYPE")
    
    if assetType == "CRITICAL":
        # 自動帶入工單優先級
        mbo.setValue("WOPRIORITY", 1)
        # 設定欄位為唯讀 (防止手動修改)
        mbo.setFieldFlag("WOPRIORITY", 7, True) # 7 代表 ReadOnly
```

---

## 2. 實作：日期驗證 (防止過去時間)

這通常放在 **Object Launch Point** (儲存前驗證)。

**腳本名稱**：`WO_SAVE_VALIDATE`  
**觸發事件**：`Save` (On Add or Update)

```python
from java.util import Date
from psdi.util import MXApplicationException

schedStart = mbo.getDate("SCHEDSTART")
now = Date()

if schedStart and schedStart.before(now):
    # 拋出系統異常訊息 (阻止存檔)
    # 假設已在 Database Configuration 定義了訊息群組 'custom' 和編碼 'pastdate'
    params = [mbo.getString("WONUM")]
    throw MXApplicationException("custom", "pastdate", params)
```

---

## 3. 開發技巧：如何 Debug？

雖然介面沒有偵錯工具，但你可以善用日誌：

1.  **程式碼中使用**：`print "### WONUM is: " + mbo.getString("wonum")`
2.  **查看位置**：
    - 進入 **Logging** 應用程式。
    - 搜尋 `autoscript` logger，將層級設為 `DEBUG`。
    - 到 **System Out 日誌** (或是 OCP 的 Pod Logs) 就能看到輸出。

---
**下一篇：** [Workflow 開發：視覺化流程與腳本的深度聯動](./workflow-script-linkage)
