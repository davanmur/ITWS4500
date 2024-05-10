import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LinePlot = () => {
    const d3Container = useRef(null);
    const data = [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 4 },
        { x: 3, y: 9 },
        { x: 4, y: 16 },
        { x: 5, y: 25 },
        { x: 6, y: 36 }
    ];

    useEffect(() => {
        if (data && d3Container.current) {
            const svg = d3.select(d3Container.current);
            const margin = { top: 20, right: 30, bottom: 30, left: 40 };
            const width = 400 - margin.left - margin.right;
            const height = 200 - margin.top - margin.bottom;

            const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.x)])
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.y)])
                .range([height, 0]);

            const line = d3.line()
                .x(d => x(d.x))
                .y(d => y(d.y));

            svg.selectAll('*').remove(); // Clear svg content before adding new elements

            const graph = svg.append('g')
                             .attr('transform', `translate(${margin.left}, ${margin.top})`);

            graph.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x));

            graph.append('g')
                .call(d3.axisLeft(y));

            graph.append('path')
                .datum(data)
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .attr('stroke-width', 1.5)
                .attr('d', line);
        }
    }, [data]);

    return (
        <svg
            className="d3-component"
            width={400}
            height={200}
            ref={d3Container}
        />
    );
}

export default LinePlot;