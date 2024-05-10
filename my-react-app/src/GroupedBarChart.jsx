import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const WeatherBarGraph = ({ source }) => {
  const svgRef = useRef();
  const [data, setData] = useState([]);

  // const data = [
  //   { city: 'City A', temp: 25, feels_like: 28 },
  //   { city: 'City B', temp: 23, feels_like: 26 },
  //   { city: 'City C', temp: 24, feels_like: 27 },
  // ];

  // console.log("GroupedBarChart");
  useEffect(() => {
    fetch(`${window.location.href}groupedbarchart/${source}`)
      .then(response => response.json())
      .then(responseData => {
        setData(responseData); // Set new data which will trigger re-render
        // console.log("Grouped data:", data); // Log fetched data
      })
      .catch(error => {
        console.error('Fetch error:', error); // Log fetch errors
      });
  }, [source]);

  useEffect(() => {
    if (data.length === 0) return; // Do nothing if data is empty

    // Clear existing SVG to prevent overlaying charts
    d3.select(svgRef.current).select('*').remove();

    const margin = { top: 40, right: 30, bottom: 70, left: 70 }; // Adjust margins for title and key
    const width = 1500 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x0 = d3.scaleBand().rangeRound([0, width]).paddingInner(0.1);
    const x1 = d3.scaleBand().padding(0.05);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const cities = data.map(d => d.city);
    const categories = Object.keys(data[0]).filter(d => d !== 'city');

    x0.domain(cities);
    x1.domain(categories).rangeRound([0, x0.bandwidth()]);
    y.domain([0, d3.max(data, d => d3.max(categories, c => d[c]))]).nice();

    // Define custom colors
    const colors = d3.scaleOrdinal().domain(categories).range(['#586ab5', '#39477D']);

    // Append title
    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 0 - (margin.top / 2) +10)
      .attr("text-anchor", "middle")
      .style("font-size", "22px")
      .style("font-family", "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif")
      .text(`Tempature vs. Feels Like: ${source}`);

    // Append key (legend)
    const legend = svg.selectAll(".legend")
      .data(categories)
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => "translate(0," + (i * 20) + ")")
      .style("font-family", "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif");

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", d => colors(d));

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(d => d);

    // Append x-axis
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-0.8em")
      .attr("dy", "-0.5em")
      .attr("transform", "rotate(-45)");

    // Append y-axis
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

    // Append bars
    svg.selectAll(".bar")
      .data(data)
      .enter().append("g")
      .attr("class", "bar")
      .attr("transform", d => `translate(${x0(d.city)},0)`)
      .selectAll("rect")
      .data(d => categories.map(key => ({ key, value: d[key] })))
      .enter().append("rect")
      .attr("x", d => x1(d.key))
      .attr("y", d => y(d.value))
      .attr("width", x1.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", d => colors(d.key));
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default WeatherBarGraph;
