// import React, { useState } from 'react';

// function ImperialForm({ weightChange, ageChange, heightChange }) {
//     const [feet, setFeet] = useState(0);
//     const [inches, setInches] = useState(0);

//     const handleWeightChange = (e) => {
//         const weight = e.target.value;
//         weightChange(weight * 0.453592);
//     }

//     const handleAgeChange = (e) => {
//         const age = e.target.value;
//         ageChange(age);
//     }

//     const handleFeetChange = (e) => {
//         const newFeet = e.target.value;
//         setFeet(newFeet);
//         handleHeightChange(newFeet, inches);
//     }

//     const handleInchChange = (e) => {
//         const newInches = e.target.value;
//         setInches(newInches);
//         handleHeightChange(feet, newInches);
//     }

//     const handleHeightChange = (feet, inches) => {
//         const FEET_TO_CM = 30.48;
//         const IN_TO_CM = 2.54;
//         const totalHeight = (feet * FEET_TO_CM) + (inches * IN_TO_CM);
//         heightChange(totalHeight);
//     }

//     return (
//         <div className="form-inputs">
//             <label htmlFor="product_name">Weight</label>
//             <input id="product_name" type="text" maxLength="6" className="form-control" placeholder="(lbs)" onChange={handleWeightChange} />

//             <label htmlFor="product_name">Age</label>
//             <input id="product_name" type="text" maxLength="3" className="form-control" placeholder="(years 0-120)" onChange={handleAgeChange} />

//             <label htmlFor="product_name">Height - Feet</label>
//             <input id="product_name" type="number" maxLength="5" className="form-control" name="feet" onChange={handleFeetChange} />
//             <label htmlFor="product_name">Height - Inches</label>
//             <input id="product_name" type="number" maxLength="5" className="form-control" name="inches" onChange={handleInchChange} />

//         </div>
//     );
// }

// export default ImperialForm;
