# Automation Script (1)：Python 還是 JavaScript？語法與效能評估

在 MAS / Maximo 中，**Automation Script (自動化腳本)** 是開發者最常使用的「黑科技」。它不需要停機重啟，寫完即刻生效，能處理 90% 以上的客製化需求。

---

## 1. 為什麼要用腳本，而不是 Java 客製？

| 特性 | Automation Script | Java 客製 (MBO) |
| :--- | :--- | :--- |
| **部署速度** | 立即生效 (寫入資料庫) | 需打包 EAR/Build Image，重啟服務 |
| **維護成本** | 高 (可直接在介面修改) | 中 (需程式碼庫版本控管) |
| **效能** | 中 (略微受限於直譯引擎) | 高 (原生編譯) |
| **升級相容性** | 高 (通常不影響核心升級) | 低 (升級時常需重新編譯與測試) |

---

## 2. 語言選型：Python (Jython) vs JavaScript (Nashorn)

Maximo 支援這兩種主流語言，但開發者通常偏好 **Python**：

- **Python (Jython 2.7)**：
  - **優點**：與 Java 類別庫無縫整合，語法簡潔，社區範例極多。
  - **注意**：它是運行在 JVM 上的 Jython，因此不支援最新的 Python 3 特性。
- **JavaScript (Nashorn)**：
  - **優點**：前端開發者上手快。
  - **注意**：效能與庫的豐富度在 Maximo 環境下略遜於 Jython。

---

## 3. 四大觸發入口 (Launch Points)

腳本「什麼時候跑」是由 Launch Point 決定的：

1.  **Attribute Launch Point (欄位級)**：
    - 例如：當使用者離開「資產編號」欄位時，自動檢查編號格式。
2.  **Object Launch Point (物件級)**：
    - 例如：當「工單」被儲存前 (Save)，自動計算預計完工日。
3.  **Action Launch Point (按鈕/工作流)**：
    - 例如：點擊介面上自訂的「建立備料單」按鈕時執行。
4.  **Integration Launch Point (整合級)**：
    - 例如：當外部系統透過 API 傳入資料時，先進行自訂邏輯轉換。

---
**下一篇：** [Automation Script (2)：欄位驗證與自動帶入邏輯實作](./validation-logic-sample)
