// CANVAS_HEIGHT: 650
const materials = [
    {
        name: 'Structural Steel',
        color: 'gray',
        density: 490,
        compressive: 50000,
        tensile: 50000,
        moe: 29000000,
        expansion: 0.0000065,
        conductivity: 312,
        designNote: 'Extremely strong in both tension and compression.',
        use: 'Beams, columns, and long-span trusses.',
        weakness: 'Loses strength at high temperatures; susceptible to corrosion.'
    },
    {
        name: 'Aluminum',
        color: 'lightgray',
        density: 170,
        compressive: 35000,
        tensile: 35000,
        moe: 10000000,
        expansion: 0.000013,
        conductivity: 1400,
        designNote: 'Lightweight with a high strength-to-weight ratio.',
        use: 'Window frames, curtain walls, and lightweight enclosures.',
        weakness: 'Expands significantly with heat; highly conductive.'
    },
    {
        name: 'Normal-weight Concrete',
        color: '#d2b48c', // tan
        density: 145,
        compressive: 4000,
        tensile: 400,
        moe: 3000000,
        expansion: 0.0000055,
        conductivity: 12,
        designNote: 'Strong in compression, very weak in tension.',
        use: 'Foundations, slabs, and massive structural elements.',
        weakness: 'Requires steel reinforcement to handle tensile stresses.'
    },
    {
        name: 'Clay Brick Masonry',
        color: '#a0522d', // sienna/tan
        density: 120,
        compressive: 3000,
        tensile: 300,
        moe: 2000000,
        expansion: 0.000003,
        conductivity: 5,
        designNote: 'Durable and fire-resistant but brittle.',
        use: 'Exterior cladding and load-bearing walls.',
        weakness: 'Requires mortar joints which can deteriorate and leak.'
    },
    {
        name: 'Softwood Lumber',
        color: '#8b4513', // brown
        density: 35,
        compressive: 1500,
        tensile: 1000,
        moe: 1500000,
        expansion: 0.000002,
        conductivity: 1,
        designNote: 'Good strength-to-weight ratio; renewable.',
        use: 'Light-frame construction (studs, joists, rafters).',
        weakness: 'Combustible, decays when wet, expands with moisture.'
    },
    {
        name: 'Glass',
        color: '#add8e6', // light blue
        density: 160,
        compressive: 10000,
        tensile: 4000,
        moe: 10000000,
        expansion: 0.000005,
        conductivity: 7,
        designNote: 'Transparent but extremely brittle.',
        use: 'Windows, curtain walls, and skylights.',
        weakness: 'Shatters upon impact; poor thermal insulator compared to walls.'
    },
    {
        name: 'Rigid Foam Insulation',
        color: '#ffd700', // yellow
        density: 2,
        compressive: 20,
        tensile: 20,
        moe: 1000,
        expansion: 0.00003,
        conductivity: 0.2,
        designNote: 'Highly resistant to heat flow.',
        use: 'Thermal insulation in walls, roofs, and foundations.',
        weakness: 'Structurally very weak; many types are highly combustible.'
    }
];

const props = {
    'density': { key: 'density', label: 'Density', unit: 'lb/ft³' },
    'compressive': { key: 'compressive', label: 'Compressive Strength', unit: 'psi' },
    'tensile': { key: 'tensile', label: 'Tensile Strength', unit: 'psi' },
    'moe': { key: 'moe', label: 'Modulus of Elasticity', unit: 'psi' },
    'expansion': { key: 'expansion', label: 'Thermal Expansion', unit: '/ °F' },
    'conductivity': { key: 'conductivity', label: 'Thermal Conductivity', unit: 'BTU·in/h·ft²·°F' }
};

let myChart;

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const propSelect = document.getElementById('propSelect');
    const logToggle = document.getElementById('logToggle');
    const specificToggle = document.getElementById('specificToggle');
    const infoBox = document.getElementById('infoBox');
    
    function getChartData(propKey, isSpecific) {
        return materials.map(m => {
            let val = m[propKey];
            if (isSpecific && propKey !== 'density') {
                val = val / m.density;
            }
            return val;
        });
    }
    
    function updateChart() {
        const propKey = propSelect.value;
        const isLog = logToggle.checked;
        const isSpecific = specificToggle.checked;
        const propConfig = props[propKey];
        
        let label = propConfig.label;
        let unit = propConfig.unit;
        if (isSpecific && propKey !== 'density') {
            label = `Specific ${label} (per lb/ft³ density)`;
            unit = `${unit} / (lb/ft³)`;
            document.getElementById('specificNote').style.display = 'block';
        } else {
            document.getElementById('specificNote').style.display = 'none';
        }
        
        if (isSpecific && propKey === 'density') {
            specificToggle.checked = false; // doesn't make sense to divide density by density
            updateChart();
            return;
        }

        const data = getChartData(propKey, isSpecific);
        
        if (myChart) {
            myChart.data.datasets[0].data = data;
            myChart.data.datasets[0].label = `${label} (${unit})`;
            myChart.options.scales.x.type = isLog ? 'logarithmic' : 'linear';
            myChart.options.plugins.title.text = label;
            myChart.update();
        } else {
            myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: materials.map(m => m.name),
                    datasets: [{
                        label: `${label} (${unit})`,
                        data: data,
                        backgroundColor: materials.map(m => m.color),
                        borderColor: 'gray',
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: false,
                    onClick: (event, elements) => {
                        if (elements.length > 0) {
                            const dataIndex = elements[0].index;
                            const mat = materials[dataIndex];
                            infoBox.innerHTML = `<strong>${mat.name}</strong><br/>
                                <em>Typical uses:</em> ${mat.use}<br/>
                                <em>Main weakness:</em> <span style="color:#d32f2f;">${mat.weakness}</span>`;
                        }
                    },
                    plugins: {
                        title: { display: true, text: label, font: { size: 16 } },
                        legend: { display: false },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const val = context.raw;
                                    const mat = materials[context.dataIndex];
                                    let formattedVal = val;
                                    if (val > 1000) formattedVal = Math.round(val).toLocaleString();
                                    else if (val < 0.01) formattedVal = val.toExponential(2);
                                    else formattedVal = val.toFixed(2);
                                    
                                    return [
                                        `${formattedVal} ${unit}`,
                                        `Design note: ${mat.designNote}`
                                    ];
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            type: isLog ? 'logarithmic' : 'linear',
                            beginAtZero: !isLog,
                            title: { display: true, text: `Value (${unit})` }
                        }
                    }
                }
            });
        }
    }
    
    propSelect.addEventListener('change', updateChart);
    logToggle.addEventListener('change', updateChart);
    specificToggle.addEventListener('change', updateChart);
    
    updateChart();
});
