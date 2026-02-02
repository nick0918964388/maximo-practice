---
slug: /operations/deployment-sop-dev-to-prod
---
# 環境遷移：從 DEV 到 PROD 的打包與部署 SOP

在企業級專案中，「如何把開發環境的改動安全地移到正式環境」是維運最重要的工作。在 MAS 中，我們主要依賴 **Migration Manager** 與 **Kustomize** 進行遷移。

---

## 1. 設定類變更：Migration Manager (已封裝)

對於 Database Configuration、Workflow、Application Designer 等變更，請遵循以下步驟：

1.  **建立 Migration Group**：在 DEV 環境定義包含哪些應用程式或資料表變更。
2.  **建立 Package**：系統會自動抓取相關的 XML 與資料。
3.  **上傳與部署**：在 PROD 環境導入 Package，並進行 **Validation (驗證)**。如果驗證通過，再執行 Deploy。

---

## 2. 程式類變更：Automation Scripts & Java

-   **Automation Scripts**：建議也放入 Migration Manager Package 中遷移，避免手動貼上程式碼導致版本錯誤。
-   **Java 客製**：這需要透過 **Custom Image Build**。你需要將自訂的 `.class` 檔案放入新的 Docker Image，並在 MAS Manage 應用程式中更新 Image Tag。

---

## 3. MAS 平台層配置變更

如果你修改了 OpenShift 層級的設定（如：環境變數、資源限制、Ingress 規則）：

-   **GitOps (推薦)**：將所有的 YAML 檔案存放在 Git Repo 中，使用 **ArgoCD** 或 **Red Hat Advanced Cluster Management** 進行多環境同步。
-   **Manual Apply**：手動使用 `oc apply -f <file>.yaml`，但這種方式極難維護，建議僅限緊急測試使用。

---

## 4. 遷移後的「必做清單」 (Post-Migration Checklist)

1.  **DB 差異檢查**：確認 `MAXATTRIBUTE` 與實體資料表結構一致。
2.  **快取清理**：清空 `Admin Console` 的相關快取。
3.  **端點測試**：檢查 PROD 的 API 是否指向正確的外部測試主機或正式主機。

---
**下一篇預告：** [備份與還原演練：如果 OpenShift 叢集掛了，資產資料怎麼救？](./backup-restore-dr.md)
