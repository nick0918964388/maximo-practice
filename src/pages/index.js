import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout
      title={`Maximo 實戰`}
      description="從開發到上線的完整指南">
      <main style={{padding: '2rem', textAlign: 'center'}}>
        <h1>Maximo 實戰</h1>
        <p>從開發到上線的完整指南</p>
        <div style={{marginTop: '2rem'}}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            開始學習 ⏱️
          </Link>
        </div>
      </main>
    </Layout>
  );
}
