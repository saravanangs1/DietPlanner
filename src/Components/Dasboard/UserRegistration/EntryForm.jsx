import React, { useState } from "react";
import ActivityLevel from "./ActivityLevel";
// import ImperialForm from "./ImperialForm";
import MetricForm from "./MetricForm";
import Result from "./Result";
import Header from "../../Header/HeaderLogin";
import './EntryForm.css';
import { useNavigate } from "react-router-dom";
function EntryForm(props) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [height, setHeight] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [measurementSelected, setMeasurementSelected] = useState(false);
  const [result, setResult] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [resultForm, setResultForm] = useState("");

  const handleMeasurementChange = (event) => {
    setMeasurement(event.target.value);
    setMeasurementSelected(true);
  };

    const navigate = useNavigate();
    const handleGenerateMeal = () => {
      navigate("/browse");
    };

  const changeGender = (event) => {
    setGender(event.target.value);
  };

  const changeWeight = (newWeight) => {
    setWeight(newWeight);
  };

  const changeAge = (newAge) => {
    setAge(newAge);
  };

  const changeHeight = (newHeight) => {
    setHeight(newHeight);
  };

  const changeActivity = (newActivity) => {
    setActivity(newActivity);
  };

  const validEntry = () => {
    let fields = [gender, age, weight, height, activity];

    for (let i in fields) {
      if (fields[i].length === 0) {
        return false;
      }
    }

    if (age < 0 || age > 120) {
      return false;
    }
    if (weight < 0) {
      return false;
    }
    if (height < 0) {
      return false;
    }

    return true;
  };

  const getCalories = (event) => {
    if (!validEntry()) {
      setShowResult(true);
      setResultForm(
        <Result calories={calculateCalories()} measurementType={measurement} />
      );
    } else {
      alert(
        "Please make sure that you have entered valid information in every field."
      );
    }
  };

  const calculateCalories = () => {
    let bmr = 0;
    if (gender === "male") {
      bmr = 66.473 + 13.75116 * weight + 5.033 * height - 6.755 * age;
    } else {
      bmr = 655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * age;
    }

    switch (activity) {
      case "none":
        bmr = bmr * 1.2;
        break;
      case "light":
        bmr = bmr * 1.375;
        break;
      case "moderate":
        bmr = bmr * 1.55;
        break;
      case "heavy":
        bmr = bmr * 1.725;
        break;
      case "v-heavy":
        bmr = bmr * 1.9;
        break;
    }
    return Math.round(bmr);
  };

  return (
    <>
      <Header
        props={{
          name: `${props.props.name}`,
          age: `${props.props.age}`,
          email: `${props.props.email}`,
        }}
      />
      <div className="entry-form1">
        <div className="entry-form">
          <form>
            <p>Select unit of measurement:</p>
            <div className="measurement-choice">
              <input
                type="radio"
                id="metric"
                value="metric"
                checked={measurement === "metric"}
                onChange={handleMeasurementChange}
              />
              <label htmlFor="metric">Metric (kg/cm)</label>
              
            </div>

            <div className="gender-choice">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                required
                className="browser-default custom-select"
                onChange={changeGender}
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {measurement === "metric" && (
              <MetricForm
                weightChange={changeWeight}
                ageChange={changeAge}
                heightChange={changeHeight}
              />
            )}
            {/* {measurement === "imperial" && (
              <ImperialForm
                weightChange={changeWeight}
                ageChange={changeAge}
                heightChange={changeHeight}
              />
            )} */}
            {measurementSelected && <ActivityLevel onChange={changeActivity} />}
            {measurementSelected && (
              <button
                type="button"
                className="btn btn-primary"
                id="calculate-btn"
                required
                onClick={getCalories}
              >
                Calculate my calories
              </button>
            )}
          </form>
        </div>
        
        <div>{showResult && (<>{resultForm}
          <button
                type="button"
                className="btn btn-primary"
                id="generate-meal-btn" // Add an ID to the button
                onClick={handleGenerateMeal}
              
              >
                Generate Meal
              </button>
        </>)}
        </div>
        
      </div>
    </>
  );
}

export default EntryForm;
