import React from 'react';
import './style.css';

const DemoMessage = () => {
    return (
        <div className="demo-container">
            <div className="demo-message">
                <h2>Demo Version Notice</h2>
                <p>This website is currently running in demo mode. Some features are not available in this version.</p>
                
                <div className="available-features">
                    <p>You can explore these available features:</p>
                    <ul>
                        <li><strong>Sorting Algorithms</strong> → Merge Sort</li>
                        <li><strong>Miscellaneous</strong> → Stack Visualization</li>
                    </ul>
                </div>

                <div className="contact-info">
                    <p>Sorry, This algorithm will be added soon</p>
                </div>
            </div>
        </div>
    );
};

export default DemoMessage;
