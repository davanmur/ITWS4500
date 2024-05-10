import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const WeatherBarGraph = ({ source }) => {
  const svgRef = useRef();
  const [data, setData] = useState([]);

  // const data = [
  //   { "description": "Sunny", "count": 10 },
  //   { "description": "Cloudy", "count": 7 },
  //   { "description": "Rainy", "count": 3 },
  //   { "description": "Snowy", "count": 1 }
  // ];

  // console.log("WeatherBarGraph");
  useEffect(() => {
    fetch(`${window.location.href}weatherbarchart/${source}`)
      .then(response => response.json())
      .then(responseData => {
        setData(responseData); // Set new data which will trigger re-render
        // console.log("Weather data:", responseData); // Log fetched data
      })
      .catch(error => {
        console.error('Fetch error:', error); // Log fetch errors
      });
  }, [source]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    d3.select(svgRef.current).select('*').remove(); // Clear SVG content

    const margin = { top: 40, right: 30, bottom: 40, left: 190 },
          width = 1200 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");
    
    // Append title
    svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2) + 0)
    .attr("text-anchor", "middle")
    .style("font-size", "22px")
    .style("font-family", "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif")
    .text(`Weather Types: ${source}`);

    // X axis
    const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.count)])
                .range([ 0, width]);
    svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x))
       .selectAll("text")
       .attr("transform", "translate(-10,0)rotate(-45)")
       .style("text-anchor", "end");

    // Y axis
    const y = d3.scaleBand()
                .range([ 0, height ])
                .domain(data.map(d => d.description))
                .padding(.1);
    svg.append("g")
       .call(d3.axisLeft(y))

    //Bars
    svg.selectAll("myRect")
       .data(data)
       .enter()
       .append("rect")
       .attr("x", x(0) )
       .attr("y", d => y(d.description))
       .attr("width", d => x(d.count))
       .attr("height", y.bandwidth())
       .attr("fill", "#475AA4")
  }, [data]);


  return <svg ref={svgRef}></svg>;
};

export default WeatherBarGraph;
