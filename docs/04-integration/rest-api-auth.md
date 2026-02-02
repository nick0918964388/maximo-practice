---
slug: /integration/rest-api-auth
---
# REST API 實戰 (1)：認證模式選型 (Token vs OIDC)

在進行 IBM Maximo / MAS 的整合開發時，第一關（也是最容易卡關的一關）就是 **「身份驗證 (Authentication)」**。

傳統 Maximo (7.6.x) 與新一代 MAS (8.x+) 在認證機制上有顯著差異。這篇文章將幫開發者釐清該如何選擇。

---

## 1. 核心認證方式對照

| 模式 | 傳統 Maximo (7.6.x) | MAS Manage (8.x+) | 建議使用場景 |
| :--- | :--- | :--- | :--- |
| **API Key** | 支援 (需在個人中心生成) | 支援 (最強大且簡單) | 系統間整合 (M2M)、伺服器腳本 |
| **Basic Auth** | 支援 (Base64 User:Pass) | **不建議** (且常被 WAF 擋) | 僅限內部測試、舊系統遷移 |
| **OIDC / OAuth** | 需額外配置 (如 ISAM) | **原生支援** (內建 Keycloak) | 手機 App、前端 Web 應用、單一登入 |

---

## 2. 方案 A：API Key (整合開發的首選)

在 MAS 中，API Key 仍然是最穩定且效能最好的方式。

### 🛠️ 如何獲取 API Key？
1. 登入 Maximo Manage。
2. 進入 **「個人中心 (Profile)」** -> **「API 資訊」**。
3. 點擊 **「生成 API 金鑰」**。
4. **重要**：生成的 Key 只會顯示一次，請妥善保存。

### 🚀 如何在程式碼中使用？
在 HTTP Header 中加入 `apikey` 即可：

```http
GET /maximo/oslc/os/mxasset?oslc.select=assetnum,description
Host: line.nickai.cc
apikey: YOUR_SECRET_API_KEY_HERE
```

---

## 3. 方案 B：OIDC / OAuth 2.0 (現代化安全方案)

如果您開發的是手機 App 或需要「使用者本人授權」應用的話，則必須使用 OIDC。

### ⚙️ 流程邏輯
1. 應用程式導向 **Keycloak (MAS 內建)** 登入頁面。
2. 使用者輸入企業帳號密碼。
3. Keycloak 回傳 `access_token`。
4. 應用程式帶領 `Authorization: Bearer <token>` 訪問 Maximo。

---

## 4. 常見坑：認證失敗的排查清單

如果您發現帶了 API Key 卻回傳 `401 Unauthorized`，請檢查：

1. **Header 名稱是否寫錯**：是 `apikey` 而不是 `API-KEY` 或 `Authorization`。
2. **網域信任問題**：如果您透過 Cloudflare Tunnel (如 `line.nickai.cc`) 存取，請確認 Web Filter 沒有過濾自訂 Header。
3. **使用者權限**：該 API Key所屬的使用者是否具有「整合權限 (MAXINTERRUPT)」與對應 Object Structure 的訪問權。

---

## 5. 總結與建議

- **如果是後端對後端 (Server-to-Server)**：請無腦選擇 **API Key**，開發最快，維修最簡單。
- **如果是對外入口 (Public App)**：請選 **OIDC**，安全性最高，符合企業合規。

---
**下一篇預告：** [REST API 實戰 (2)：CRUD 工單 (含必填欄位與檢核機制)](./rest-api-crud-wo.md)
