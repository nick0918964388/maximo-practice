# 名詞對照表：開發者視角的核心概念

在跟顧問溝通時，他們用的業務術語在資料庫裡都有對應的「分身」。這份表幫你快速翻譯：

---

## 🏗️ 基礎資產模型

| 業務名詞 | 說明 | 資料庫核心 Table |
| :--- | :--- | :--- |
| **Asset (資產)** | 實體設備 (如發電機、冷氣)。 | `ASSET` |
| **Location (位置)** | 設備存放的地方或系統層次。 | `LOCATIONS` |
| **Site (站點)** | 最細的資料隔離層級 (通常對應一個廠區)。 | `SITE` |
| **Org (組織)** | 跨站點的設定層級 (通常對應一家公司)。 | `ORGANIZATION` |

## 🛠️ 維護與工單

| 業務名詞 | 說明 | 資料庫核心 Table |
| :--- | :--- | :--- |
| **Work Order (工單)** | 執行的具體工作任務紀錄。 | `WORKORDER` |
| **PM (預防保養)** | 自動產生工單的規則與排程。 | `PM` |
| **Job Plan (工作計畫)** | 工作 SOP，定義需要的工時、料件。 | `JOBPLAN` |
| **Failure Class (故障類別)** | 設備壞掉的分類結構。 | `FAILURECODE` |

## 📦 庫存與物料

| 業務名詞 | 說明 | 資料庫核心 Table |
| :--- | :--- | :--- |
| **Item (物料)** | 零件的定義。 | `ITEM` |
| **Inventory (庫存)** | 特定倉庫裡的物料數量。 | `INVENTORY` |
| **PO (採購單)** | 向供應商買東西的紀錄。 | `PO` |

---

## 💡 開發者小筆記

1.  **MBO (Maximo Business Object)**：你在 Java 或腳本中操作的不是 Table，而是 MBO，它包含了業務邏輯（如狀態檢查）。
2.  **OSLC (Open Services for Lifecycle Collaboration)**：REST API 的底層標準，MAS 的所有整合幾乎都建立在此之上。
3.  **App Designer**：用來調整介面 (XML) 的工具，雖然是 GUI，但底層存儲在 `MAXPRESENTATION` 表。

---
**下一篇：** [MAS 架構全覽：Manage, Monitor 與底層 OCP 的聯動](../02-concepts/mas-architecture-overview)
