import React from 'react';

function ActivityLevel({ onChange }) {
    const handleChange = (e) => {
        const activity = e.target.value;
        onChange(activity);
    }

    return (
        <div className="activity-level">
            <label htmlFor="activity">Activity Level</label>
            <select name="activity" id="activity" className="browser-default custom-select" onChange={handleChange}>
                <optgroup>
                    <option value="" disabled>Select your activity level</option>
                    <option value="none">No exercise (or very little)</option>
                    <option value="light">Light exercise (1-3 days per week)</option>
                    <option value="moderate">Moderate Exercise (3-5 days a week)</option>
                    <option value="heavy">Heavy Exercise (6-7 days a week)</option>
                    <option value="v-heavy">Very Heavy Exercise (twice a day/active job)</option>
                </optgroup>  
            </select>
        </div>
    );
}

export default ActivityLevel;
