# UI 客製：MAS Manage 中的 Application Designer 使用指南

即便在 MAS (Maximo Application Suite) 的時代，**Application Designer (應用程式設計器)** 依然是修改 Maximo 介面的核心工具。這篇文章介紹如何安全地進行 UI 客製，以及開發者需要注意的細節。

---

## 1. 核心操作：拖拉與屬性配置

在 Application Designer 中，你可以：
- **新增欄位**：將資料庫中已定義的欄位拖放到畫面上。
- **修改標籤 (Labels)**：改變欄位在介面上顯示的文字。
- **設定唯讀與必填**：雖然腳本也能做，但 UI 層級的設定最直觀。
- **隱藏區塊**：根據特定條件隱藏不必要的頁籤。

---

## 2. 進階功能：條件式 UI (Conditional UI)

這是不寫代碼就能實現動態介面的強大功能。
- **原理**：定義一個 **Conditional Expression**（例如：`:status = 'WAPPR'`）。
- **應用**：將這個條件應用於 Data Attribute 或 Control。當條件成立時，按鈕才會顯示或欄位才會變為紅色。

---

## 3. 開發者注意：XML 的底層管理

所有的介面修改最終都會被編譯成一段 **XML** 存儲在 `MAXPRESENTATION` 表中。

**💡 專家建議：**
- **備份 XML**：在進行大規模 UI 改動前，務必點擊「Export Application XML」備份。
- **命名空間**：如果您是開發第三方 Add-on，請確保 Control ID 具備唯一首碼，避免衝突。
- **響應式考慮**：在 MAS 環境中，Maximo 介面會被嵌入到 Suite 的 Shell 中，測試時請確保不同解析度下的排版不跑位。

---

## 4. 總結：UI 與腳本的黃金組合

最好的客製化方案通常是：
1.  **UI 層級**：處理靜態排版、欄位顯示、簡單的唯讀邏輯。
2.  **腳本層級**：處理複雜的業務檢核、跨物件的資料計算。

兩者結合，才能打造出既穩定又直覺的使用者體驗。

---
**下一篇：** [工單生命週期：從報修到結案的 8 個標準狀態](../06-functional/wo-lifecycle)
