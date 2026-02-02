---
slug: /concepts/mas-architecture-overview
---
# MAS 架構全覽：Manage, Monitor 與底層 OCP 的聯動

理解 Maximo Application Suite (MAS) 的架構是進行深度客製與效能調優的前提。MAS 不再是單一的應用程式，而是一個運行在 **Red Hat OpenShift (OCP)** 上的「套件組」。

---

## 1. 分層架構圖 (邏輯視角)

從上到下，我們可以分為四個核心層級：

### A. 應用層 (Suite Application Layer)
這是使用者直接接觸的地方。
- **Manage**：即傳統的 Maximo (EAM)。
- **Monitor**：IoT 資料監控與異常偵測。
- **Health / Predict**：資產健康度與預測性維護。

### B. 基礎服務層 (Suite Core Services)
所有應用共用的元件。
- **Keycloak**：身份驗證與授權。
- **MongoDB**：儲存 Suite 層級的設定資料與 Metadata。
- **Kafka**：處理應用間的異步訊息串接。

### C. 平台層 (Red Hat OpenShift Layer)
這是 MAS 的「心臟」。
- **Operator SDK**：自動化部署與維護應用。
- **SDN (Networking)**：負責 Pod 之間的網路通訊。
- **Storage Classes**：對接企業儲存 (RWO/RWX)。

### D. 資料庫與儲存層 (External Services)
- **IBM DB2 / Oracle / SQL Server**：Manage 應用的業務資料主庫。
- **Object Storage (S3)**：儲存附件、日誌與備份檔案。

---

## 2. 開發者為什麼要關心架構？

1.  **連線除錯 (Troubleshooting)**：當 API 回傳 `502 Bad Gateway` 時，你必須知道是 OpenShift 的 **Route** 出問題，還是 **Manage Pod** 已經掛掉。
2.  **整合端點 (Endpoints)**：MAS 的整合 URL 通常是由 OCP 自動產生的，例如 `https://<workspace>.<mas-domain>/maximo`，開發時需動態獲取。
3.  **資源分配**：如果你寫的 Automation Script 耗費太多 CPU，會直接影響該 Pod 的健康度，甚至觸發 OCP 的自動重啟。

---

## 3. 小結：開發思維的轉變

*   **以前**：改 XML 或是 Java 後重啟 WAS。
*   **現在**：透過 **Application Designer** 修改後即時生效；核心 Java 客製則需透過 **Docker Image build**。

---
**下一篇：** [名詞對照表：開發者視角的核心資料模型](../quickstart/glossary)
