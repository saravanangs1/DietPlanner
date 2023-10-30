import React, { useState, useEffect } from 'react';

function Result({ calories, measurementType, }) {
    const [weightType, setWeightType] = useState('');
    const [weightValue, setWeightValue] = useState('');
    const [gainWeightValue, setGainWeightValue] = useState('');
    const [loseWeightValue, setLoseWeightValue] = useState('');

    useEffect(() => {
        if (measurementType === "metric") {
            setWeightType('kg');
            setWeightValue(0.5);

            // Calculate the values for gaining and losing weight based on weightValue
            setGainWeightValue(calories + 500);
            setLoseWeightValue(calories - 500);
        } else {
            // If not metric, clear the values
            setWeightType('');
            setWeightValue('');
            setGainWeightValue('');
            setLoseWeightValue('');
        }
    }, [calories, measurementType]);

    // Render content only if measurementType is metric
    if (measurementType !== 'metric') {
        return null; // or any other content you prefer when not in metric
    }

    // Define a CSS style object to apply to the table and its cells
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
    };

    const cellStyle = {
        border: '1px solid #ddd', // Add border styling
        padding: '8px', // Add padding for better spacing
        textAlign: 'center',
    };

    return (
        <div className="entry-form">
            <form>
                <div className="calorie-result">
                    <h2>{calories} calories</h2>
                    <p> to maintain your current weight</p>
                </div>

                <table style={tableStyle}>
                    <tr>
                        <th style={cellStyle}> </th>
                        <th style={cellStyle}>Gain Weight</th>
                        <th style={cellStyle}>Lose Weight</th>
                    </tr>
                    <tr>
                        <td style={cellStyle}>{weightValue * 2} {weightType} per week</td>
                        <td style={cellStyle}>{calories + 1000}</td>
                        <td style={cellStyle}>{calories - 1000}</td>
                    </tr>
                </table>
            </form>
        </div>
    );
}

export default Result;
