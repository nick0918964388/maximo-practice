---
slug: /integration/idempotency-design
---
# 冪等設計 (Idempotency)：避免外部系統重複建單的 3 種做法

在網路不穩定或外部系統發生自動重試（Retry）時，最常見的問題就是「同一個請求建立了兩次工單」。在 Maximo 中，我們透過 **冪等性 (Idempotency)** 來解決這個問題。

---

## 1. 什麼是冪等性？

簡單來說：**不論你發送幾次同樣的請求，系統的最終狀態都必須是一致的。**（例如：點擊三次「建立」，系統最後只會產生一張工單）。

---

## 2. 做法 A：利用 External ID 檢查 (推薦)

這是在整合中最穩健的做法。在建立工單時，強制要求外部系統帶入一個唯一的 `EXTERNALID`。

### ⚙️ 實現邏輯 (Automation Script)
在工單儲存前檢查該 ID 是否已存在：
```python
extId = mbo.getString("EXTERNALID")
if extId:
    count = mbo.getMboSet("WORKORDER").setWhere("EXTERNALID='" + extId + "'").count()
    if count > 0:
        # 已存在，直接拋錯或略過
        throw MXApplicationException("integration", "duplicate_id")
```

---

## 3. 做法 B：使用 OSLC 的 `oslc.where` 預檢

在發送 `POST` 建立前，先發送一個 `GET` 請求，確認該業務主鍵（例如：外部單號）是否已存在於 Maximo。

- **優點**：簡單，不需要寫腳本。
- **缺點**：存在「競態條件 (Race Condition)」，在高併發環境下可能失效。

---

## 4. 做法 C：Integration Framework 的內建機制

如果你是使用 Maximo 的 **Integration Framework (IFAC)**，系統會自動根據 `INTERFACEID` 和 `TRANSID` 來過濾重複的訊息。

---

## 5. 總結

1.  **設計時務必預留唯一外部欄位**（如 `ERP_REF_ID`）。
2.  **優先在接收端做防重校驗**。
3.  **提供明確的回傳代碼**：當檢測到重複時，回傳 `200 OK` (並附帶已存在的編號) 往往比回傳 `error` 更能降低外部系統的處理複雜度。

---
**下一篇預告：** [SSO 整合實務：連接企業 AD/LDAP 與 Keycloak 設定](./sso-keycloak-setup.md)
