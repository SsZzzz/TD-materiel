/**
 * iframe: 510
 */
import React from 'react';
import { Graph } from 'TD-materiel';

const data = {
  nodes: [
    {
      id: 1,
      name: '张忠彩',
    },
    {
      id: 2,
      name: '苏泽',
    },
    {
      id: 3,
      name: '李璞',
    },
    {
      id: 4,
      name: '姚晓玲',
    },
    {
      id: 5,
      name: '陈明磊',
    },
    {
      id: 6,
      name: '郑翔',
    },
    {
      id: 7,
      name: '徐益清',
    },
    {
      id: 8,
      name: '杭州同盾科技',
    },
    {
      id: 9,
      name: 'mendia',
    },
  ],
  links: [
    { source: 7, target: 1, relation: '父子' },
    { source: 7, target: 6, relation: '朋友' },
    { source: 7, target: 2, relation: 'friend' },
    { source: 7, target: 3, relation: 'friend' },
    { source: 7, target: 8, relation: 'friend' },
    { source: 8, target: 4, relation: 'friend' },
    { source: 8, target: 5, relation: 'friend' },
    { source: 8, target: 6, relation: 'friend' },
    { source: 9, target: 8, relation: 'friend' },
  ],
};

function Demo() {
  return <Graph nodeSize={60} data={data} width="100%" height={500} />;
}

export default Demo;
