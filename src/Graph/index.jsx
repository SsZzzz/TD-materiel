import React, { useEffect } from 'react';
import * as d3 from 'd3';
import styles from './index.less';

function Graph({ nodeSize = 60, data, width = '100%', height = 500 }) {
  useEffect(() => {
    const svg = d3.select('#graph');
    const chart = d3.select('.chart'); // 需要在svg下加个根节点g,不然缩放拖拽都有问题

    const { clientWidth, clientHeight } = document.querySelector('#graph');

    svg.call(
      d3.zoom().on('zoom', function (e) {
        chart.attr('transform', e.transform);
      }),
    );

    const simulation = d3
      .forceSimulation()
      .force(
        'link',
        d3
          .forceLink()
          .id((d) => d.id)
          .distance(() => 160), // 线的长度,改变这个值得加大forceCollide(distance的一半)或者减小strength(-1000)
      )
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(clientWidth / 2, clientHeight / 2))
      .force('collide', d3.forceCollide(80).iterations(5))
      .stop();

    const link = d3.selectAll('.link').data(data.links);

    //边上的文字（人物之间的关系）
    const linkText = d3.selectAll('.linkText').data(data.links);

    const node = d3
      .selectAll('.node')
      .data(data.nodes)
      .call(d3.drag().on('start', dragStarted).on('drag', dragged).on('end', dragEnded));

    simulation.nodes(data.nodes).on('tick', ticked);

    simulation.force('link').links(data.links);

    function ticked() {
      //限制结点的边界
      data.nodes.forEach((d) => {
        d.x = d.x - nodeSize / 2 < 0 ? nodeSize / 2 : d.x;
        d.x = d.x + nodeSize / 2 > clientWidth ? clientWidth - nodeSize / 2 : d.x;
        d.y = d.y - nodeSize / 2 < 0 ? nodeSize / 2 : d.y;
        d.y = d.y + nodeSize / 2 > clientHeight ? clientHeight - nodeSize / 2 : d.y;
      });

      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);

      linkText
        .attr('x', (d) => (d.source.x + d.target.x) / 2)
        .attr('y', (d) => (d.source.y + d.target.y) / 2 - 5)
        .attr(
          'transform',
          (d) =>
            `rotate(${getAngle(d.source.x, d.source.y, d.target.x, d.target.y)},${
              (d.source.x + d.target.x) / 2
            },${(d.source.y + d.target.y) / 2})`,
        );
    }

    function dragStarted(e, d) {
      if (!e.active) simulation.alphaTarget(0.3).restart(); //sets the current target alpha to the specified number in the range [0,1].
      d.fy = d.y;
      d.fx = d.x;
    }

    function dragged(e, d) {
      d.fx = e.x;
      d.fy = e.y;
    }

    function dragEnded(e, d) {
      if (!e.active) simulation.alphaTarget(0);
      d.fx = d.x;
      d.fy = d.y;
    }

    while (simulation.alpha() > simulation.alphaMin()) {
      simulation.tick();
      ticked();
    }

    fixNodes(node);
  }, []);

  return (
    <svg id="graph" width={width} height={height}>
      <g className="chart">
        {/* 线 */}
        <g className={styles.links}>
          {data.links.map((obj, i) => (
            <line key={i} className="link"></line>
          ))}
        </g>
        {/* 线上的文字 */}
        <g className={styles.linkTexts}>
          {data.links.map(({ relation }, i) => (
            <text key={i} className="linkText">
              {relation}
            </text>
          ))}
        </g>
        {/* node和text */}
        <g>
          {data.nodes.map(({ name, id }) => (
            <g key={id} className="node">
              <circle className={styles.circle} r={nodeSize / 2}></circle>
              <foreignObject
                className={styles.nodeText}
                x={-nodeSize / 2}
                y={-nodeSize / 2}
                width={nodeSize}
                height={nodeSize}
              >
                <div>{name}</div>
              </foreignObject>
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}

export default Graph;

function fixNodes(node) {
  node.each((d) => {
    d.fx = d.x;
    d.fy = d.y;
  });
}

function getAngle(starX, startY, endX, endY) {
  const diffX = endX - starX;
  const diffY = endY - startY;
  //返回角度,不是弧度
  return (360 * Math.atan(diffY / diffX)) / (2 * Math.PI);
}
