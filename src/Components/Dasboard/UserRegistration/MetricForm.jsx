import React from 'react';

function MetricForm({ weightChange, ageChange, heightChange }) {
    const handleWeightChange = (e) => {
        const weight = e.target.value;
        weightChange(weight);
    }

    const handleAgeChange = (e) => {
        const age = e.target.value;
        ageChange(age);
    }

    const handleHeightChange = (e) => {
        const height = e.target.value;
        heightChange(height);
    }

    return (
        <div className="form-inputs">
            <label htmlFor="product_name">Weight</label>
            <input id="product_name" type="text" maxLength="6" placeholder="(kg)" className="form-control" onChange={handleWeightChange} />

            <label htmlFor="product_name">Age</label>
            <input id="product_name" type="text" maxLength="3" placeholder="(years 0-120)" className="form-control" onChange={handleAgeChange} />

            <label htmlFor="product_name">Height</label>
            <input id="product_name" type="text" maxLength="5" placeholder="(cm)" className="form-control" onChange={handleHeightChange} />
        </div>
    );
}

export default MetricForm;
