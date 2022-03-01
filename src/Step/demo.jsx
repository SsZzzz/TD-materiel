import React from 'react';
import { Step } from 'TD-materiel';

function Demo() {
  return (
    <div>
      <Step title="新闻一" description="舆情">
        <div style={{ marginBottom: 32 }}>
          <p>这是一段很长的内容</p>
          <p>这是一段很长的内容</p>
          <p>这是一段很长的内容</p>
          <p>这是一段很长的内容</p>
        </div>
      </Step>
      <Step title="新闻二" description="舆情">
        <div>
          <p>这是一段很长的内容</p>
          <p>这是一段很长的内容</p>
          <p>这是一段很长的内容</p>
          <p>这是一段很长的内容</p>
        </div>
      </Step>
    </div>
  );
}

export default Demo;
