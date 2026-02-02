/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '🚀 快速開始',
      link: { type: 'generated-index' },
      items: [
        'quickstart/difference-maximo-mas',
        'quickstart/glossary',
      ],
    },
    {
      type: 'category',
      label: '🏗️ 概念與架構',
      link: { type: 'generated-index' },
      items: [
        'concepts/mas-architecture-overview',
        'concepts/data-model-mapping',
      ],
    },
    {
      type: 'category',
      label: '🔗 整合開發實戰',
      link: { type: 'generated-index' },
      items: [
        'integration/rest-api-auth',
        'integration/rest-api-crud-wo',
        'integration/sync-vs-async',
        'integration/idempotency-design',
        'integration/sso-keycloak-setup',
      ],
    },
    {
      type: 'category',
      label: '🤖 自動化與配置',
      link: { type: 'generated-index' },
      items: [
        'automation/autoscript-intro',
        'automation/validation-logic-sample',
        'automation/workflow-script-linkage',
        'automation/ui-customization-app-designer',
      ],
    },
    {
      type: 'category',
      label: '📋 新手顧問專區',
      link: { type: 'generated-index' },
      items: [
        'functional/wo-lifecycle',
        'functional/pm-jobplan-config',
        'functional/inventory-accounting',
      ],
    },
    {
      type: 'category',
      label: '🛡️ 維運與安全',
      link: { type: 'generated-index' },
      items: [
        'operations/mas-on-ocp-troubleshooting',
        'operations/deployment-sop-dev-to-prod',
        'operations/backup-restore-dr',
      ],
    },
  ],
};

module.exports = sidebars;
