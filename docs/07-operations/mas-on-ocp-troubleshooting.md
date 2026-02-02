# MAS on OpenShift：Route, TLS 憑證與 Webhook 失敗排查

在 MAS 環境下，維運人員最常碰到的問題往往不是 Maximo 程式出錯，而是底層的 **OpenShift (OCP) 網路層** 設定不當。本篇整理了最常見的 3 個網路障礙排查手冊。

---

## 1. 外部 API 連不進來？檢查 OCP Route

當你的外部系統報出 `Connection Refused` 或 `503 Service Unavailable` 時，請按此順序檢查：

1.  **Route 狀態**：登入 OCP Console，進入 **Networking -> Routes**。確認 `manage-all` (或其他對應的 Route) 是正常狀態。
2.  **Whitelist (白名單)**：檢查 OCP 的 Ingress Controller 是否有設定 IP 白名單或網路原則（NetworkPolicy），導致外部 IP 被擋掉。
3.  **TLS Termination**：MAS 預設使用 `Reencrypt` 或 `Edge` 模式。如果外部系統不支援 SNI (Server Name Indication)，連線將會失敗。

---

## 2. 憑證過期或不信任 (SSL/TLS Issues)

當瀏覽器或 API 工具彈出 `Certificate Unknown` 時：

-   **檢查 CA 鏈**：確保你的外部系統（如 SAP 或 Java App）已將 MAS 的 **Root CA** 匯入其 Truststore。
-   **Cert-Manager**：MAS 依賴 OCP 的 Cert-Manager Operator 來自動更新憑證。如果發現憑證過期，請檢查 Cert-Manager 的 Logs，通常是 DNS-01 或 HTTP-01 的 Challenge 失敗。

---

## 3. Webhook 出不去？出口排查

如果你寫了 Automation Script 呼叫外部 Webhook 卻沒反應：

1.  **DNS 解析**：進入 Manage Pod (`oc exec -it <pod-name> -- bash`)，嘗試 `ping` 或 `curl` 外部目標，確認 Pod 內部能解析該網域。
2.  **Egress 防火牆**：企業環境通常會限制 OCP 的出口流量。確認該 Namespace 已被授權訪問特定的外部 IP 與 Port（通常是 443）。
3.  **Proxy 設定**：如果企業強制使用 Proxy 上網，請確認 MAS 的 **Suite-level設定** 中已正確配置 HTTP_PROXY。

---

## 💡 維運小撇步

遇到怪問題時，第一步永遠是看 **Operator Logs**。  
`oc logs -n ibm-common-services -l name=ibm-cert-manager-operator`  
這能幫你省下至少 2 小時的瞎猜時間。

---
**下一篇預告：** [環境遷移：從 DEV 到 PROD 的打包與部署 SOP](./deployment-sop-dev-to-prod)
