let chartInstance = null; // Variável global para manter a instância do gráfico

document.addEventListener('DOMContentLoaded', function () {
    const weightInput = document.getElementById('weight-input');
    const saveWeightBtn = document.getElementById('save-weight-btn');
    const goalInput = document.getElementById('goal-input');
    const saveGoalBtn = document.getElementById('save-goal-btn');
    const bmiValue = document.getElementById('bmi-value');
    const weightValue = document.getElementById('weight-value');
    const goalWeightValue = document.getElementById('goal-weight-value');

    let weights = [];
    let goalWeight = null;

    saveWeightBtn.addEventListener('click', function () {
        const weight = parseFloat(weightInput.value);
        if (!isNaN(weight) && weight > 0) {
            weights.push({ date: new Date(), weight });
            weightInput.value = '';
            console.log('Weights:', weights); // Log para depuração
            updateBMI();
            updateChart();
        } else {
            alert('Por favor, insira um peso válido.');
        }
    });

    saveGoalBtn.addEventListener('click', function () {
        const goal = parseFloat(goalInput.value);
        if (!isNaN(goal) && goal > 0) {
            goalWeight = goal;
            goalWeightValue.textContent = goal + ' kg';
            goalInput.value = '';
        } else {
            alert('Por favor, insira um objetivo de peso válido.');
        }
    });

    function updateBMI() {
        if (weights.length > 0) {
            const latestWeight = weights[weights.length - 1].weight;
            const height = 1.75; // Assume uma altura fixa para simplificar
            const bmi = (latestWeight / (height * height)).toFixed(2);
            bmiValue.textContent = bmi;
            weightValue.textContent = latestWeight + ' kg';
        }
    }

    function updateChart() {
        const ctx = document.getElementById('bmiChart').getContext('2d');
        const dates = weights.map(entry => entry.date.toLocaleDateString());
        const bmis = weights.map(entry => (entry.weight / (1.75 * 1.75)).toFixed(2));

        console.log('Dates:', dates); // Log para depuração
        console.log('BMIs:', bmis); // Log para depuração

        if (chartInstance) {
            chartInstance.data.labels = dates;
            chartInstance.data.datasets[0].data = bmis;
            chartInstance.update();
        } else {
            chartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'IMC',
                        data: bmis,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }
});
