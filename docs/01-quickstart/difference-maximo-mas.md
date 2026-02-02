---
slug: /quickstart/difference-maximo-mas
---
# Maximo vs MAS：開發者一定要知道的 5 個核心差異

如果你是從 Maximo 7.6.x 轉向 Maximo Application Suite (MAS)，你可能會發現「外表看起來差不多，但骨子裡全換了」。這篇文章幫你快速釐清兩者在開發與環境上的核心差異。

---

## 1. 運行環境：從 WebSphere 到 OpenShift
這是最大的技術門檻切換。
- **傳統 Maximo**：運行在傳統的 WebSphere Application Server (WAS) 或 WebLogic 上，部署通常是「安裝版」。
- **MAS**：完全基於 **容器化 (Containerization)**，必須運行在 **Red Hat OpenShift (OCP)** 上。
- **對開發者的影響**：你不再去 WAS Console 調整設定，而是透過 OCP 控制台、YAML 檔案或 Operators 來管理實例。

## 2. 身份驗證：內建 Keycloak
- **傳統 Maximo**：通常依賴 WAS 本身的 LDAP 整合或 Maximo 內建認證。
- **MAS**：強制使用套件中的 **Keycloak** 作為身份提供者 (IdP)。
- **對開發者的影響**：所有的 SSO 整合、使用者屬性映射現在都在 Keycloak 完成。

## 3. 部署模式：從 EAR 到 Operator-based
- **傳統 Maximo**：修改代碼後需要重新打包成 `maximo.ear` 並手動部署，過程往往耗時 20-30 分鐘。
- **MAS**：採用 **Operator 模式**。
- **對開發者的影響**：配置變更現在通常是透過修改 OpenShift 的 Custom Resources (CR) 來觸發自動部署，流程更現代化。

## 4. 客製化限制：更嚴格的代碼管理
- **傳統 Maximo**：你可以隨意修改本地 Java 代碼或 JSP 檔案。
- **MAS**：由於運行在不可變容器 (Immutable Containers) 中，你無法直接進入 Pod 修改檔案。
- **對開發者的影響**：強烈建議優先使用 **Automation Scripts** (Python/JS)。如果必須進行 Java 客製，則需透過完整的 Docker Build 流程產出自訂鏡像。

## 5. 模組化整合
- **傳統 Maximo**：各個 Add-on (如 Scheduler, Health) 需要分開安裝與補丁。
- **MAS**：採用 **Suite** 概念，所有的模組 (Manage, Monitor, Health, Predict) 都在同一個管理界面下進行「權限授權」後啟用。
- **對開發者的影響**：跨模組的資料共享與整合變得更加標準化。

---
**下一篇：** [名詞對照表：顧問說的「工單」在資料庫裡長怎樣？](./glossary)
