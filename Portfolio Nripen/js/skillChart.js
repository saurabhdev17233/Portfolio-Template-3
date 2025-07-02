// Basic D3.js skill chart setup (placeholder)
// This file would typically contain more complex data visualization logic
// using the D3.js library.

// Check if D3.js is loaded
if (typeof d3 !== 'undefined') {
    const skillData = [
        { name: 'Python', value: 90 },
        { name: 'Machine Learning', value: 85 },
        { name: 'Deep Learning', value: 80 },
        { name: 'SQL', value: 75 },
        { name: 'PowerBI', value: 70 }
    ];

    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#skillChart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width]);
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y axis
    const y = d3.scaleBand()
        .range([0, height])
        .domain(skillData.map(d => d.name))
        .padding(.1);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("myRect")
        .data(skillData)
        .enter()
        .append("rect")
        .attr("x", x(0))
        .attr("y", d => y(d.name))
        .attr("width", d => x(d.value))
        .attr("height", y.bandwidth())
        .attr("fill", "var(--primary-color)");

} else {
    console.warn('D3.js not loaded. skillChart.js functionality will be limited.');
}